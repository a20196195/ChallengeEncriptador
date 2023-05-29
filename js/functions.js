var mensajeTextarea = document.getElementById("texto-input");
var mensajeCopiadoTextarea = document.getElementById("mensajeCopiado");

var mensajeNoEncontrado = document.querySelector(".mensajeNoEncontrado");

var botonCopiar = document.querySelector(".btn-copiar");
var botonEncriptar = document.querySelector(".btn-encriptar");
var botonDesencriptar = document.querySelector(".btn-desencriptar");

var mensajeCopiado = "";

document.addEventListener("DOMContentLoaded", verificarEstadoInicial);
botonEncriptar.addEventListener("focus", ocultarMostrarBotonCopiar);
botonDesencriptar.addEventListener("focus", ocultarMostrarBotonCopiar);

function verificarEstadoInicial() {
    if (mensajeTextarea.value.trim() === '') {
        mensajeCopiadoTextarea.style.backgroundImage = "url('./img/MensajeEncontrado.png')";
    } else {
        mensajeCopiadoTextarea.style.backgroundImage = 'none';
    }
}

function ocultarMostrarBotonCopiar(){
    if(mensajeTextarea.value.trim() == ""){
        botonCopiar.style.display = "none";
        mensajeNoEncontrado.style.display = "block";
    }
    else{
        botonCopiar.style.display = "block";
        mensajeNoEncontrado.style.display = "none";   
    }
}

botonCopiar.addEventListener("click", () => {
    mensajeCopiado = mensajeCopiadoTextarea.value;
    copiarMensaje();
});

function copiarMensaje() {
    const textoCopiar = mensajeCopiadoTextarea.value;
    navigator.clipboard.writeText(textoCopiar)
}
function mostrarTextoEncriptado(textoEncriptado) {
    mensajeCopiadoTextarea.value = textoEncriptado;
    if (textoEncriptado.trim() === '') {
        mensajeCopiadoTextarea.style.backgroundImage = "url('./img/MensajeEncontrado.png')";
    } else {
        mensajeCopiadoTextarea.style.backgroundImage = 'none';
    }
}

function mostrarTextoDesencriptado(textoDesencriptado) {
    mensajeCopiadoTextarea.value = textoDesencriptado;
    if (textoDesencriptado.trim() === '') {
        mensajeCopiadoTextarea.style.backgroundImage = "url('./img/MensajeEncontrado.png')";
    } else {
        mensajeCopiadoTextarea.style.backgroundImage = 'none';
    }
}

var codigo = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat",
}

function encriptar(){
    var texto = mensajeTextarea;
    var textoEncriptado = "";
    for(var i = 0; i < texto.value.length; i++){
        if(texto.value.charAt(i) in codigo){
            textoEncriptado += codigo[texto.value.charAt(i)];
        }
        else{
            textoEncriptado += texto.value.charAt(i);
        }
    }
    mostrarTextoEncriptado(textoEncriptado);
}

var textoDesencriptado = "";
var i=0,iAux, encontrado;

function verificar(texto){
    if(texto.value.charAt(i) in codigo &&
       texto.value.length - i >= codigo[texto.value.charAt(i)].length){
        iAux = i;
        for(iAux; iAux-i < codigo[texto.value.charAt(i)].length; iAux++){
            if(texto.value.charAt(iAux) != codigo[texto.value.charAt(i)].charAt(iAux-i)){
                encontrado = 0;
                break;
            }
            encontrado = 1;
        }
        if(encontrado){ //salió naturalmente del for
            textoDesencriptado += texto.value.charAt(i); //Agregamos la llave
            i=iAux-1; //saltar la parte encriptada de la cadena
        }
    }
}

function desencriptar(){
    var texto = mensajeTextarea;
    //                         |   |
    //                         v   v
    //Caso desencriptar: m a n e n t e r z    length = 9      Codigo: "enter" length = 5
    //                i: 0 1 2 3 4 5 6 7 8
    while(i < texto.value.length){
        encontrado = 0;
        verificar(texto);
        if(!encontrado)
            textoDesencriptado += texto.value.charAt(i);
        i++;
    }
    mostrarTextoDesencriptado(textoDesencriptado);
    textoDesencriptado = "";
    i = 0;
}

botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;
