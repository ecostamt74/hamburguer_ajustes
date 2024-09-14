/*carroseul
const parags = document.getElementById('parCar')
const parag  = document.querySelectorAll('parCar p')

let idx = 0

function carroseul(){
    idx++

    if(idx > parag.length -1){
        idx = 0
    }

    parags.style.transform = 'translateX(${-idx * 500}px)';
}

setInterval(carroseul,1800)*/

/*-----------relógio--------------*/
const hrs = document.getElementById("horas");
const mnt = document.getElementById("minutos");
const sgd = document.getElementById("segundos");
let dataAtual = new Date();
let segundos = 60 - dataAtual.getSeconds();
let minutos = 59 - dataAtual.getMinutes();
let horas = 23 -  dataAtual.getHours();

hrs.textContent = horas;
mnt.textContent = minutos;
sgd.textContent = segundos;  

function relogio(valor)
{
    segundos = segundos - valor;
    sgd.textContent = segundos;
    //onsole.log("segundos : ",segundos)
    if(segundos == 0){
        segundos = 60;
        minutos = minutos - valor;
        mnt.textContent = minutos;
        //console.log("minutos : ",minutos)
        if(minutos == 0){
          minutos = 60
          horas = horas - valor;
          hrs.textContent = horas;
         // console.log("horas : ",horas)
        }

    }
 
  //sgd.textContent = segundos;  

};

setInterval(relogio, 1000, 1);

