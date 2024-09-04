// Função para formatar um valor
export const format = (value) => {
  let formattedValue = value;

  // Verifica se o valor é uma string e remove possíveis espaços em branco no início e no fim
  if (typeof formattedValue === 'string') {
    formattedValue = formattedValue.trim();
  }

  // Substitui vírgulas por pontos e remove qualquer caractere que não seja número, ponto ou hífen
  formattedValue = formattedValue.replace(',', '.').replace(/[^0-9.-]+/g, '');

  // Converte o valor para número
  formattedValue = Number(formattedValue);

  // Se não for um número válido, retorna o valor original sem formatação
  if (isNaN(formattedValue)) {
    return value;
  }

  return formattedValue;
};

  
  // Função para gerar um número aleatório entre 0 e 100
  export const randomNumber = () => {
    return Math.floor(Math.random() * 101);
  };
  
  // Função para preparar o localStorage com dados fictícios
  export const prepareLocalStorage = (win) => {
    win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
      {
        description: "Mesada",
        amount: randomNumber() * 100,
        date: "11/03/2021",
      },
      {
        description: "Suco Kapo",
        amount: - (randomNumber() * 100),
        date: "12/03/2021",
      }
    ]));
  };
  