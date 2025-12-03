// 1. O CONTRATO (Regra Geral)
// Aqui dizemos: "Todo método de pagamento PRECISA ter uma função chamada processarPagamento".
// Não importa se é Pix ou Cartão, eles têm que obedecer essa regra.
export interface MetodoPagamento {
  processarPagamento(valor: number): string; // Vai devolver uma mensagem de texto no final
}

// 2. AS FORMAS DE PAGAR (Os "Tipos" diferentes)

// Lógica específica para quem escolhe PIX
export class PagamentoPix implements MetodoPagamento {
  processarPagamento(valor: number): string {
    // Aqui iria o código real do banco para gerar o Pix.
    // Como é um protótipo, simulamos uma mensagem de sucesso.
    return `Gerando código PIX Copia e Cola para R$ ${valor.toFixed(2)}...\n\n(Simulação: Código copiado para a área de transferência!)`;
  }
}

// Lógica específica para quem escolhe CARTÃO
export class PagamentoCartao implements MetodoPagamento {
  processarPagamento(valor: number): string {
    // Aqui iria a conexão com a Visa/Mastercard.
    return `Conectando à operadora do cartão...\n\nCobrança de R$ ${valor.toFixed(2)} aprovada com sucesso!`;
  }
}

// 3. O SISTEMA CENTRAL
// Essa função recebe o método escolhido (Pix ou Cartão) e o valor.
// O interessante é que ela NÃO sabe qual método chegou, ela só manda executar.
// Isso é o POLIMORFISMO: tratar coisas diferentes da mesma maneira.
export function finalizarCompra(metodo: MetodoPagamento, valor: number): string {
  return metodo.processarPagamento(valor); 
}