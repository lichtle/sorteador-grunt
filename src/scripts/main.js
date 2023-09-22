document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("form-sorteador")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Impede que a página seja recarregada ao clicar no botão de submit
      let numeroMaximo = document.getElementById("numero-maximo").value; // Pegando o número inserido pelo usuário no input
      numeroMaximo = parseInt(numeroMaximo); // Como o número pode vir em formato de string, é necessário transformá-lo em um number através da função parseInt

      let numeroAleatorio = Math.random() * numeroMaximo; // Utilizando a função Math.random para gerar um número aleatório e multiplicando-o pelo numero inserido pelo usuário

      numeroAleatorio = Math.floor(numeroAleatorio + 1); // O resultado da linha de código acima será um número quebrado, e para arredondá-lo utilizaremos o Math.floor, para arredondar o número sempre pra baixo. Visto que ainda temos a adição do número 1 e o número sorteado não pode exceder nunca o número sorteado, realmente precisamos usar a função Math.floor. Não podemos utilizar a função Math.round (arredondar) ou Math.ceil (arredondar pra cima), por exemplo, pois se o número máximo escolhido for 2, pode ser que o resultado do sorteio seja 3 (visto que ainda temos a adição do número 1), o que está errado, visto que o número máximo escolhido foi 2. Adicionamos 1 ao cálculo pois o resultado da multiplicação na linha de código acima pode ser 0, visto que a função de gerar números randômicos pode gerar o número 0, e qualquer número multiplicado por 0 é igual à 0, e não faz sentido o número sorteado ser 0

      document.getElementById("resultado-valor").innerText = numeroAleatorio; // Adicionamos ao texto de resultado do HTML o número resultante da linha de código acima
    });
}); // Irá executar o JS apenas após o HTML e CSS terem sido corretamente carregados
