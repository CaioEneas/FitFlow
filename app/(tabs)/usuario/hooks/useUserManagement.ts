import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import API_URL from '../../../../conf/api'; // ajuste o caminho conforme a pasta

const useUserManagement = () => {
  const [visible, setVisible] = useState({
    addUser: false,
    editUser: false,
    deleteUser: false,
  });

  const [currentUser, setCurrentUser] = useState<{ id?: string; nome: string; senha: string; tipoUsuario: number; email: string } | null>(null);
  const [users, setUsers] = useState<{ id?: string; nome: string; senha: string; tipoUsuario: number; email: string }[]>([]);
  const [newUser, setNewUser] = useState<{ nome: string; senha: string; tipoUsuario: number; email: string }>({ nome: '', senha: '', tipoUsuario: 0, email: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  // Filter users based on the search query
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.nome.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.senha.toLowerCase().includes(query) ||
      user.tipoUsuario.toString().includes(query) // Convert tipoUsuario to string for comparison
    );
  });
  const pickUserImage = async () => {
    Alert.alert(
      "Foto de Perfil",
      "Escolha uma opção",
      [
        {
          text: "Tirar Foto",
          onPress: async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            if (!cameraPermission.granted) {
              Alert.alert("Permissão necessária", "Permissão da câmera é necessária!");
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });

            if (!result.canceled) {
              const uri = result.assets[0].uri;
              setUserPhoto(uri);
            }
          },
        },
        {
          text: "Escolher da Galeria",
          onPress: async () => {
            const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!galleryPermission.granted) {
              Alert.alert("Permissão necessária", "Permissão de acesso à galeria é necessária!");
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });

            if (!result.canceled) {
              const uri = result.assets[0].uri;
              setUserPhoto(uri);
            }
          },
        },
        { text: "Cancelar", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', (error as Error).message);
    }
  };

  const addUser = async () => {
    // Validações
    if (!newUser.nome || !newUser.senha || (newUser.tipoUsuario !== 0 && newUser.tipoUsuario !== 1) || !newUser.email) {
      Alert.alert("Campos Obrigatórios", "Por favor, preencha todos os campos obrigatórios: nome, senha, email e tipo usuario.", [{ text: "OK" }]);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(newUser.email)) {
      Alert.alert("E-mail inválido", "Por favor, preencha um e-mail válido.", [{ text: "OK" }]);
      return;
    }

    await fetchUsers(); // Verifica se o e-mail já existe
    const emailExists = users.some(user => user.email === newUser.email);
    if (emailExists) {
      Alert.alert("E-mail já cadastrado", "Por favor, preencha um e-mail que não exista conosco.", [{ text: "OK" }]);
      return;
    }

    try {
      const formData = new FormData();

      formData.append('nome', newUser.nome);
      formData.append('senha', newUser.senha);
      formData.append('email', newUser.email);
      formData.append('tipoUsuario', String(newUser.tipoUsuario)); // precisa ser string

      if (userPhoto) {
        const fileName = userPhoto.split('/').pop()!;
        const fileType = userPhoto.endsWith('.png') ? 'image/png' : 'image/jpeg';

        formData.append('foto', {
          uri: userPhoto,
          name: fileName,
          type: fileType
        } as any); // "as any" resolve tipo do React Native
      }

      await axios.post(`${API_URL}/usuario/inserir`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setNewUser({ nome: '', senha: '', tipoUsuario: 0, email: '' });
      setUserPhoto(null);
      hideModal('addUser');
      fetchUsers();
      Alert.alert("Usuário Adicionado", "O usuário foi cadastrado com sucesso.", [{ text: "OK" }]);
    } catch (error) {
      console.error('Erro ao adicionar usuário:', (error as Error).message);
      Alert.alert("Erro", "Erro ao cadastrar usuário.");
    }
  };


  const updateUser = async () => {
    if (currentUser?.id) {
      try {
        await axios.put(`${API_URL}/usuarios/atualizar/${currentUser.id}`, currentUser);
        setCurrentUser(null);
        console.log('Hiding modal editUser');
        hideModal('editUser'); // Ensure hideModal is being called
        fetchUsers();
        Alert.alert("Usuário Atualizado", "O usuário foi atualizado com sucesso.", [{ text: "OK" }]);
      } catch (error) {
        console.error('Error updating user:', (error as Error).message);
      }
    }
  };

  const deleteUser = async () => {
    if (currentUser?.id) {
      try {
        await axios.delete(`${API_URL}/usuario/deletar/${currentUser.id}`);
        setCurrentUser(null);
        console.log('Hiding modal deleteUser');
        hideModal('deleteUser'); // Ensure hideModal is being called
        fetchUsers();
        Alert.alert("Usuário Excluído", "O usuário foi excluído com sucesso.", [{ text: "OK" }]);
      } catch (error) {
        console.error('Error deleting user:', (error as Error).message);
      }
    }
  };

  const showModal = (type: 'addUser' | 'editUser' | 'deleteUser') => {
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type: 'addUser' | 'editUser' | 'deleteUser') => {
    console.log(`Hiding modal: ${type}`);
    setVisible(prevVisible => ({
      ...prevVisible,
      [type]: false,
    }));
  };

  return {
    visible,
    users,
    filteredUsers,
    newUser,
    currentUser,
    searchQuery,
    userPhoto,
    setNewUser,
    setSearchQuery,
    showModal,
    hideModal,
    addUser,
    updateUser,
    deleteUser,
    setCurrentUser,
    pickUserImage,
    setUserPhoto,
  };
};

export default useUserManagement;
