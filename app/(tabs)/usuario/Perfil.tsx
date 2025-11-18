import React from 'react';
import {
  SafeAreaView,
  Image,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import {
  PaperProvider,
  DataTable,
  TextInput,
  Modal,
  Portal,
  IconButton,
  Button,
  Text
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles/PerfilStyles';
import useUserManagement from './hooks/useUserManagement';

const GerenciamentoUser = () => {
  const {
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
    setUserPhoto
  } = useUserManagement();

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../../assets/images/Elysium.png')}
          style={styles.image}
        />

        <Button
          icon="plus"
          mode="contained"
          onPress={() => showModal('addUser')}
          textColor="white"
          buttonColor="#A67B5B"
          contentStyle={{ flexDirection: 'row', alignItems: 'center' }}
          labelStyle={{ marginLeft: 12 }}
        >
          Adicionar Usuário
        </Button>

        <TextInput
          label="Pesquisar"
          mode="outlined"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          style={styles.searchInput}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.tableTitle}>Lista de Usuários</Text>
        </View>

        <ScrollView horizontal style={styles.scrollContainer}>
          <ScrollView style={styles.verticalScroll}>
            <DataTable style={styles.dataTable}>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title style={styles.columnHeader}><Text style={styles.columnHeaderText}>Nome</Text></DataTable.Title>
                <DataTable.Title style={styles.columnHeader}><Text style={styles.columnHeaderText}>Email</Text></DataTable.Title>
                <DataTable.Title style={styles.columnHeader}><Text style={styles.columnHeaderText}>Senha</Text></DataTable.Title>
                <DataTable.Title style={styles.columnHeader}><Text style={styles.columnHeaderText}>Tipo Usuário</Text></DataTable.Title>
                <DataTable.Title style={styles.columnHeader}><Text style={styles.columnHeaderText}>Ações</Text></DataTable.Title>
              </DataTable.Header>

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <DataTable.Row key={user.id} style={index % 2 === 0 ? styles.zebraRowEven : styles.zebraRowOdd}>
                    <DataTable.Cell style={styles.columnCell}><Text>{user.nome}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.columnCell}><Text>{user.email}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.columnCell}><Text>{user.senha}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.columnCell}><Text>{user.tipoUsuario}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.columnCell}>
                      <IconButton icon="pencil" size={20} onPress={() => { setCurrentUser(user); showModal('editUser'); }} iconColor="blue" />
                      <IconButton icon="delete" size={20} onPress={() => { setCurrentUser(user); showModal('deleteUser'); }} iconColor="red" />
                    </DataTable.Cell>
                  </DataTable.Row>
                ))
              ) : (
                <DataTable.Row><DataTable.Cell><Text>Nenhum usuário encontrado</Text></DataTable.Cell></DataTable.Row>
              )}
            </DataTable>
          </ScrollView>
        </ScrollView>

        <Text style={styles.counterText}>Total de usuários: {filteredUsers.length}</Text>

        {/* Modal: Adicionar */}
        <Portal>
          <Modal visible={visible.addUser} onDismiss={() => hideModal('addUser')} contentContainerStyle={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, paddingTop: 50 }}>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                style={{ maxHeight: '85%' }}>
                <View style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}><Text style={styles.modalTitle}>Adicionar Usuário</Text></View>
                    <View style={styles.gridContainer}>
                      <TextInput label="Nome" mode="outlined" value={newUser.nome} onChangeText={text => setNewUser(prev => ({ ...prev, nome: text }))} style={styles.gridItem} />
                      <TextInput label="Email" mode="outlined" value={newUser.email} onChangeText={text => setNewUser(prev => ({ ...prev, email: text }))} style={styles.gridItem} />
                      <TextInput label="Senha" mode="outlined" secureTextEntry value={newUser.senha} onChangeText={text => setNewUser(prev => ({ ...prev, senha: text }))} style={styles.gridItem} />
                      <Text>Tipo Usuário</Text>
                      <View style={{ height: 53, width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                        <Picker selectedValue={newUser.tipoUsuario} onValueChange={itemValue => setNewUser(prev => ({ ...prev, tipoUsuario: itemValue }))} style={{ height: '100%', width: '100%' }}>
                          <Picker.Item label="Administrador" value={0} />
                          <Picker.Item label="Cliente" value={1} />
                        </Picker>
                      </View>
                    </View>

                    <Text style={{ textAlign: 'center', marginBottom: 8, color: '#5D4037' }}>
                      Clique na imagem para mudar a foto de perfil
                    </Text>
                    <View style={styles.imageContainer}>
                      <TouchableOpacity onPress={pickUserImage}>
                        {userPhoto ? (
                          <Image source={{ uri: userPhoto }} style={styles.profileImage} />
                        ) : (
                          <View style={styles.placeholder}>
                            <Image source={require('../../../assets/images/user-placeholder.png')} style={styles.placeholderImage} />
                          </View>
                        )}
                      </TouchableOpacity>
                      {userPhoto && (
                        <Button mode="outlined" onPress={() => setUserPhoto(null)} style={{ marginTop: 10 }} textColor="#8B4513" icon="close">Remover Foto</Button>
                      )}
                    </View>

                    <View style={styles.modalFooter}>
                      <Button mode="contained" onPress={addUser} style={styles.agendamentoButton}>Adicionar</Button>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>
        </Portal>

        {/* Modal: Editar */}
        <Portal>
          <Modal visible={visible.editUser} onDismiss={() => hideModal('editUser')} contentContainerStyle={styles.modal}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}><Text style={styles.modalTitle}>Editar Usuário</Text></View>
              <View style={styles.gridContainer}>
                <TextInput label="Nome" mode="outlined" value={currentUser?.nome || ''} onChangeText={text => setCurrentUser(prev => prev ? { ...prev, nome: text } : null)} style={styles.gridItem} />
                <TextInput label="Email" mode="outlined" value={currentUser?.email || ''} onChangeText={text => setCurrentUser(prev => prev ? { ...prev, email: text } : null)} style={styles.gridItem} />
                <TextInput label="Senha" mode="outlined" secureTextEntry value={currentUser?.senha || ''} onChangeText={text => setCurrentUser(prev => prev ? { ...prev, senha: text } : null)} style={styles.gridItem} />
                <View style={{ height: 53, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 16 }}>
                  <Picker selectedValue={currentUser?.tipoUsuario} onValueChange={itemValue => setCurrentUser(prev => prev ? { ...prev, tipoUsuario: itemValue } : { tipoUsuario: itemValue, nome: '', senha: '', email: '' })} style={{ height: '100%', width: '100%' }}>
                    <Picker.Item label="Administrador" value={0} />
                    <Picker.Item label="Cliente" value={1} />
                  </Picker>
                </View>
              </View>
              <View style={styles.modalFooter}>
                <Button mode="contained" onPress={updateUser} style={styles.agendamentoButton}>Atualizar</Button>
              </View>
            </View>
          </Modal>
        </Portal>

        {/* Modal: Deletar */}
        <Portal>
          <Modal visible={visible.deleteUser} onDismiss={() => hideModal('deleteUser')} contentContainerStyle={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 18, marginBottom: 16 }}>Deseja realmente excluir o usuário <Text style={{ fontWeight: 'bold' }}>{currentUser?.nome}</Text>?</Text>
              <View style={styles.modalFooter}>
                <Button mode="outlined" onPress={() => hideModal('deleteUser')} style={{ marginRight: 10 }}>Cancelar</Button>
                <Button mode="contained" onPress={deleteUser}>Excluir</Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default GerenciamentoUser;
