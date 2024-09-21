/* Carrossel */
const parags = document.getElementById('parCar');
const parag = document.querySelectorAll('#parCar p');

let idx = 0;

function carrossel() {
    idx++;

    if (idx >= parag.length) {
        idx = 0;
    }

    const largura = parags.clientWidth; // Usar a largura do elemento pai
    parags.style.transform = `translateX(${-idx * largura}px)`; // Usar largura dinâmica
}

setInterval(carrossel, 1800);

/*-----------Relógio--------------*/
const hrs = document.getElementById("horas");
const mnt = document.getElementById("minutos");
const sgd = document.getElementById("segundos");

function atualizarRelogio() {
    const dataAtual = new Date();
    hrs.textContent = String(dataAtual.getHours()).padStart(2, '0');
    mnt.textContent = String(dataAtual.getMinutes()).padStart(2, '0');
    sgd.textContent = String(dataAtual.getSeconds()).padStart(2, '0');
}

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio(); // Chama uma vez para não esperar um segundo inicial