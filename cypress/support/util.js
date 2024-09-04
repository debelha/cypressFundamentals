// Função para formatar um valor
export const format = (value) => {
    let formattedValue;
  
    // Substitui vírgulas por pontos e divide a string em partes, mantendo a parte depois do 's'
    formattedValue = value.replace(',', '.');
    formattedValue = Number(formattedValue.split('s')[1].trim());
  
    // Verifica se a string original contém o caractere '-' e ajusta o valor formatado
    formattedValue = String(value).includes('-') ? -formattedValue : formattedValue;
  
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
  