import selecaoCotacao from "./imprimirCotacao.js";
const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    }
  });

  //setInterval(() =>conectaAPI(), 5000)

// async function conectaAPI() {
//     const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
//     const conectaTraduzido = await conecta.json();
//     //console.log(conectaTraduzido)
//     let tempo = getHorario();
//     let valor = conectaTraduzido.USDBRL.ask;
//     adicionarDados(graficoParaDolar, tempo, valor)
//     imprimirCotacao("Dólar", valor)
// }

function getHorario() {
  let data = new Date();
  let horario =  `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
  return horario
}
//getHorario()

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda)
  grafico.data.datasets.forEach(datasets => datasets.data.push(dados))
  grafico.update();
}

let workerDola = new Worker('./js/workers/workerDola.js')
workerDola.postMessage('usd')

workerDola.addEventListener("message", event => {
  const tempo = getHorario()
  const valor = event.data.ask;
  selecaoCotacao("dolar", valor)
  adicionarDados(graficoParaDolar, tempo, valor)
})

const graficoIene = document.querySelector('#graficoIene')
const graficoMoeda = new Chart(graficoIene, {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: 'Moeda',
          data: [],
          borderWidth: 1
      }]
  }
})

const workerMoeda = new Worker('./js/workers/workerMoeda.js')
workerMoeda.postMessage('moeda');
workerMoeda.addEventListener("message", event => {
  let tempo = getHorario();
  let valor = event.data.ask;
  adicionarDados(graficoMoeda, tempo, valor);
  selecaoCotacao("moeda", valor)
})

const graficoWon = document.getElementById('graficoWon');
const graficoParaWon = new Chart(graficoWon, {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: 'Argentino',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 100, 192)',
          tension: 0.1
      }]
  }
});

const workerWon = new Worker("./js/workers/workerWon.js");
workerWon.postMessage('peso');

workerWon.addEventListener("message", event => {
  let tempo = getHorario();
  let valor = event.data.ask;
  adicionarDados(graficoParaWon, tempo, valor);
  selecaoCotacao("peso", valor);
})