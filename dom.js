"use strict";
//Titulo
let titulo = document.createElement("h1");
titulo.innerHTML = "FORMULARIO VALIDADO";
document.body.appendChild(titulo);

//Primer div
let divi = document.createElement("div");
divi.className = "box";
document.body.appendChild(divi);

//Segundo div
let div = document.createElement("div");
div.className = "box boxshow";
document.body.appendChild(div);

//Creación del form
let form = document.createElement("form");
form.onsubmit = function () {
  return false;
};
divi.appendChild(form);

//Mensaje de error
let error = document.createElement("p");
error.innerHTML = "**DATOS INCORRECTOS** (Revise que el nombre no contenga números y que la edad no contega letras)";
error.id = "error";
error.style.display = "none";
divi.appendChild(error);
//Arrays que contienen los nombres y ids de los labels e inputs
let labels = ["label_nombre", "label_apellido", "label_edad", "label_genero"];
let inner_labels = ["Nombre", "Apellido", "Edad", "Genero"];
let inputs = ["input_nombre", "input_apellido", "input_edad", "input_genero"];
var cont = 0; // Contador para agregar un data-id incrementado a los inputs para validar posteriormente los textos y numeros
let arr_val = [false, false, false, false]; // Este array contiene un estado que comienza en falso para todos los inputs
//Funcion para llenar el formulario
function llenarForm() {
  labels.forEach(function (element, index) {
    element = document.createElement("label");
    //Cuando el index es 2 se trata de la edad entonces ponemos la condicion
    if (index == 2) {
      element.innerHTML = "<br>Escriba la " + inner_labels[index] + "<br>";
    } else {
      element.innerHTML = "<br>Escriba el " + inner_labels[index] + "<br>";
    }
    form.appendChild(element);
    //Creamos los inputs por cada etiqueta
    inputs[index] = document.createElement("input");
    inputs[index].dataset.id = cont++;
    inputs[index].type = "text";
    inputs[index].id = inner_labels[index]; //No podemos igualar al mismo inputs[index] debido a que va cambiado su valor
    inputs[index].placeholder = inner_labels[index];
    form.appendChild(inputs[index]);
  });
}

//Funcionalidad del submit
function enviar() {
  //Creamos el submit
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.className = "submit";
  submit.value = "Enviar";
  submit.id = "Enviar";
  submit.disabled = true;
  form.appendChild(submit);
  //Ocultamos el div que contiene la informacion a enviar
  let showdiv = document.querySelector(".boxshow");
  showdiv.style.display = "none";
  //Creamos el evento del submit al darle click
  form.addEventListener("submit", function () {
    //Al enviar se muestra el div que contoene la información
    showdiv.style.display = "block";
    //Creamos la etiqueta que despliega la información y la agregamos al div correspondiente
    var nombre = document.createElement("p");
    nombre.id = "lleno";
    nombre.innerHTML =
      "<p align='center'><b>DATOS ENVIADOS:</b><br></p>"+
      "<b>El nombre es:</b> " +
      Nombre.value +
      "<br>" +
      "<b>El apellido es:</b> " +
      Apellido.value +
      "<br>" +
      "<b>La edad es:</b> " +
      Edad.value +
      "<br>" +
      "<b>El genero es:</b> " +
      Genero.value;
    div.appendChild(nombre);
    console.log(nombre.innerHTML);
    //Cuando ya se muestra la información, el boton enviar se oculta para no seguir enviando nuevos datos, solo permite uno a la vez
    let ocultar = document.querySelector("#Enviar");
    ocultar.style.display = "none";
    //El boton nuevo reemplaza a enviar 
    let boton = document.createElement("button");
    boton.innerHTML = "Nuevo";
    boton.id = "boton_nuevo";
    divi.appendChild(boton);
    enBlanco(boton, nombre, submit);
  });
}

//Funcion que permite al boton Nuevo vaciar los inputs y el contenido del div de resultados, además vuelve a mostrar el boton enviar pero bloqueado
function enBlanco(button, p, sub) {
  button.addEventListener("click", function () {
    Nombre.value = "";
    Apellido.value = "";
    Edad.value = "";
    Genero.value = "";
    p.innerHTML = "";
    button.style.display = "none";
    sub.disabled = true;
    sub.style.display = "block";
    div.style.display = "none";
    let error = document.querySelector("#error");
    error.style.display = "none";
    arr_val = [false, false, false, false]; // se reinicia en falso el array de estado para no tener erres
  });
}

//Validar inputs / SOLO TEXTO - SOLO NUMEROS
function validar(){

inner_labels.forEach(function (element) {
  let a = document.querySelector(`#${element}`);
  a.addEventListener("change", function () {
    let reg_let = "^[a-zA-Z]"; //Expresion regular para que comience por una letra
    let reg_num = "[0-9]+"; //Expresion regular para que contenga al menos un numero
    let reg_num_n = "^[0-9]"; //Expresion regular para que comience por un numero
    let reg_let_n = "[a-zA-Z]+";//Expresion regular para que contenga al menos una letra
    //Validacion para solo numeros
    if (a.id == "Edad") {
      if (a.value.match(reg_num_n)) {
        let letra = a.value.match(reg_let_n);
        if (letra == null) {
          //Si comienza por un numero y no encuentra al menos una letra
          //Se cambia el array de estado por true en la posicion del index.id
          arr_val.splice(a.dataset.id, 1, true);
          console.log(arr_val);
        }
        else {
          //Si encuentra letras en el input muestra el parrafo de error
          //Volvemos a poner falso debido a que si el primer intento de modificar la edad es correcta pero se vuelve a ingresar un dato falso hay que volver a pasar de estado a false
          let ver_error = document.querySelector("#error");
          ver_error.style.display = "block";
          arr_val.splice(a.dataset.id, 1, false);
          console.log("datasetid: " + a.dataset.id);
          console.log(arr_val);
        }
      }/* else {
        //Si encuentra letras en el input muestra el parrafo de error
        //Volvemos a poner falso debido a que si el primer intento de modificar la edad es correcta pero se vuelve a ingresar un dato falso hay que volver a pasar de estado a false
        let ver_error = document.querySelector("#error");
        ver_error.style.display = "block";
        arr_val.splice(a.dataset.id, 1, false);
        console.log("datasetid: " + a.dataset.id);
        console.log(arr_val);
      }*/
    } else {
      //Validacion solo letras
      console.log("entro a letras"+" "+typeof a.value);
      if (a.value.match(reg_let)) {
        console.log("entro al primer if letras");
        let num = a.value.match(reg_num);
        if (num == null) {
          console.log("entro al segundo if numeros");
          //Si comienza por una letra y no encuentra al menos un numero
          //Se cambia el array de estado a true en la posicion del index.id
          arr_val.splice(a.dataset.id, 1, true);
          console.log(arr_val);
          console.log("Entro aqui true");
        }
        else {
          //Muestra el mensaje de error su encontro al menos un numero
          //Se pone el valor del array de estado nuevamente en falso 
          let ver_error = document.querySelector("#error");
          ver_error.style.display = "block";
          arr_val.splice(a.dataset.id, 1, false);
          console.log(arr_val);
          console.log("Entro aqui else");
        }

      } /*else {
        //Muestra el mensaje de error su encontro al menos un numero
        //Se pone el valor del array de estado nuevamente en falso 
        let ver_error = document.querySelector("#error");
        ver_error.style.display = "block";
        arr_val.splice(a.dataset.id, 1, false);
        console.log(arr_val);
        console.log("Entro aqui falso");
      }*/
    }
    //Si en el array se encuentra sin valores falsos, se puede enviar el formulario
    let array_validator = arr_val.indexOf(false);
    if (array_validator == -1) {
      //Se habilita el boton enviar y se oculta el error
      let activar = document.querySelector("#Enviar");
      activar.disabled = false;
      let ver_error = document.querySelector("#error");
      ver_error.style.display = "none";
      
    } else {
      //Se vuelve a deshabilitar si un valor esta en falso en el array de estado
      let activar = document.querySelector("#Enviar");
      activar.disabled = true;
    }
  });
});
}
llenarForm();
enviar();
validar();
