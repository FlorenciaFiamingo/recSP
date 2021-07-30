import { Anuncio_Auto } from "./datos.js";
var data = [];
var idGlobal;
//var foto;

window.addEventListener("DOMContentLoaded", () => {

    var titulo = document.getElementById("checkTitulo");
    var transaccion = document.getElementById("checkTransaccion");
    var descripcion = document.getElementById("checkDescripcion");
    var precio = document.getElementById("checkPrecio");
    var puertas = document.getElementById("checkPuertas");
    var kilometros = document.getElementById("checkKilometros");
    var potencia = document.getElementById("checkPotencia");

    titulo.addEventListener('change', filtrarCheckbox);
    transaccion.addEventListener('change', filtrarCheckbox);
    descripcion.addEventListener('change', filtrarCheckbox);
    precio.addEventListener('change', filtrarCheckbox);
    puertas.addEventListener('change', filtrarCheckbox);
    kilometros.addEventListener('change', filtrarCheckbox);
    potencia.addEventListener('change', filtrarCheckbox);

    var select = document.getElementById("filtro");
    select.addEventListener("change", filtrarVentaAlquiler);

    document.forms[0].addEventListener("submit", handlerSubmit);
    document.addEventListener("click", handlerClick);

    var btnPromedio = document.getElementById("btnPromedio");
    btnPromedio.addEventListener("click", calcularPromedio);

    var btnMax = document.getElementById("btnMaximo");
    btnMax.addEventListener("click", calcularMaximo);

    var btnMin = document.getElementById("btnMinimo");
    btnMin.addEventListener("click", calcularMinimo);

    var btnPot = document.getElementById("btnPromedioPot");
    btnPot.addEventListener("click", calcularPromedioPotencia);
    
    getDatosAjax();



});

function mostrarImagen(){

    var fileInput = document.getElementById("img");
    var selectedFile =  fileInput.files[0];
  //  console.log(selectedFile);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);
    fileReader.onload = function(){
        var divImg  = document.getElementById("mostrarImg");
        var img = document.createElement("img");

        if(!(document.getElementById("imagen"))){

            img.setAttribute("id", "imagen");
            img.setAttribute("src", fileReader.result);
            img.setAttribute("display", "block");
            img.setAttribute("width", "150");
            divImg.appendChild(img);
            foto = fileReader.result;
        }else{
            divImg.innerHTML="";
            img.setAttribute("display", "block");
            img.setAttribute("width", "150");
            img.setAttribute("id", "imagen");
            img.setAttribute("src", fileReader.result);
            divImg.appendChild(img);
            foto = fileReader.result;

        }

    };
}

function calcularPromedio() {

    const filtro = document.getElementById("filtro").value;
    const tr = document.querySelectorAll('tr');
    const td = document.querySelectorAll('td');

    const arrayPreciosTodos = [];
    const arrayPreciosAlquiler = [];
    const arrayPreciosVenta = [];


  for (let index = 0; index < td.length; index++) {
      
    const element = td[index];

      if(element.dataset.idcol == 5){
          arrayPreciosTodos.push(parseInt(element.textContent));

          if(element.parentNode.dataset.transaccion == "venta"){
              arrayPreciosVenta.push(parseInt(element.textContent));
          }else if(element.parentNode.dataset.transaccion == "alquiler"){
            arrayPreciosAlquiler.push(parseInt(element.textContent));
          }
        
      }
      
  }
    const reducer = (acum, next) => acum + next;
    var promedio = 0;

      if(filtro == "todos"){
        promedio = arrayPreciosTodos.reduce(reducer);
        promedio = promedio/arrayPreciosTodos.length;
    }else if(filtro == "venta"){
        promedio = arrayPreciosVenta.reduce(reducer);
        promedio = promedio/arrayPreciosVenta.length;
    }else if(filtro== "alquiler"){
        promedio = arrayPreciosAlquiler.reduce(reducer);
        promedio = promedio/arrayPreciosAlquiler.length;
    }
    console.log(promedio);
    var prom = document.getElementById("promedio");
    prom.value = promedio;
 // console.log(arrayPreciosTodos);
 // console.log(arrayPreciosAlquiler);
 // console.log(arrayPreciosVenta);

}


function calcularMaximo() {

    const filtro = document.getElementById("filtro").value;
    const tr = document.querySelectorAll('tr');
    const td = document.querySelectorAll('td');

    const arrayPreciosTodos = [];
    const arrayPreciosAlquiler = [];
    const arrayPreciosVenta = [];


  for (let index = 0; index < td.length; index++) {
      
    const element = td[index];

      if(element.dataset.idcol == 5){
          arrayPreciosTodos.push(parseInt(element.textContent));

          if(element.parentNode.dataset.transaccion == "venta"){
              arrayPreciosVenta.push(parseInt(element.textContent));
          }else if(element.parentNode.dataset.transaccion == "alquiler"){
            arrayPreciosAlquiler.push(parseInt(element.textContent));
          }
        
      }
      
  }
    var promedio = 0;

      if(filtro == "todos"){
             promedio = arrayPreciosTodos.reduce(
                (accumulator, currentValue) => {
                     return (accumulator > currentValue ? accumulator : currentValue);
                }
            );
        }else if(filtro == "venta"){
            promedio = arrayPreciosVenta.reduce(
                (accumulator, currentValue) => {
                     return (accumulator > currentValue ? accumulator : currentValue);
                }
            );
        }else if(filtro== "alquiler"){
            promedio = arrayPreciosAlquiler.reduce(
                (accumulator, currentValue) => {
                     return (accumulator > currentValue ? accumulator : currentValue);
                }
            );
        }
    console.log(promedio);
    var prom = document.getElementById("maximo");
    prom.value = promedio;
}

function calcularMinimo() {

    const filtro = document.getElementById("filtro").value;
    const tr = document.querySelectorAll('tr');
    const td = document.querySelectorAll('td');

    const arrayPreciosTodos = [];
    const arrayPreciosAlquiler = [];
    const arrayPreciosVenta = [];


  for (let index = 0; index < td.length; index++) {
      
    const element = td[index];

      if(element.dataset.idcol == 5){
          arrayPreciosTodos.push(parseInt(element.textContent));

          if(element.parentNode.dataset.transaccion == "venta"){
              arrayPreciosVenta.push(parseInt(element.textContent));
          }else if(element.parentNode.dataset.transaccion == "alquiler"){
            arrayPreciosAlquiler.push(parseInt(element.textContent));
          }
        
      }
      
  }
    var promedio = 0;

      if(filtro == "todos"){
             promedio = arrayPreciosTodos.reduce(
                (accumulator, currentValue) => {
                     return (accumulator < currentValue ? accumulator : currentValue);
                });

        }else if(filtro == "venta"){
            promedio = arrayPreciosVenta.reduce(
                (accumulator, currentValue) => {
                     return (accumulator < currentValue ? accumulator : currentValue);
                });
        }else if(filtro== "alquiler"){
            promedio = arrayPreciosAlquiler.reduce(
                (accumulator, currentValue) => {
                     return (accumulator < currentValue ? accumulator : currentValue);
                });
        }
    console.log(promedio);
    var prom = document.getElementById("minimo");
    prom.value = promedio;
}

function calcularPromedioPotencia() {

    const filtro = document.getElementById("filtro").value;
    const tr = document.querySelectorAll('tr');
    const td = document.querySelectorAll('td');

    const arrayPreciosTodos = [];
    const arrayPreciosAlquiler = [];
    const arrayPreciosVenta = [];


  for (let index = 0; index < td.length; index++) {
      
    const element = td[index];

      if(element.dataset.idcol == 8){
          arrayPreciosTodos.push(parseInt(element.textContent));

          if(element.parentNode.dataset.transaccion == "venta"){
              arrayPreciosVenta.push(parseInt(element.textContent));
          }else if(element.parentNode.dataset.transaccion == "alquiler"){
            arrayPreciosAlquiler.push(parseInt(element.textContent));
          }
        
      }
      
  }
    const reducer = (acum, next) => acum + next;
    var promedio = 0;

      if(filtro == "todos"){
        promedio = arrayPreciosTodos.reduce(reducer);
        promedio = promedio/arrayPreciosTodos.length;
    }else if(filtro == "venta"){
        promedio = arrayPreciosVenta.reduce(reducer);
        promedio = promedio/arrayPreciosVenta.length;
    }else if(filtro== "alquiler"){
        promedio = arrayPreciosAlquiler.reduce(reducer);
        promedio = promedio/arrayPreciosAlquiler.length;
    }
    console.log(promedio);
    var prom = document.getElementById("promedioPot");
    prom.value = promedio;
 // console.log(arrayPreciosTodos);
 // console.log(arrayPreciosAlquiler);
 // console.log(arrayPreciosVenta);

}





function filtrarVentaAlquiler() {

    let arrayTr = document.querySelectorAll('tr');
    let array = [...arrayTr];

    let filasMostrar = array.filter((tx) => {

        let tr = document.querySelectorAll("tr");
        let arrayTr = [...tr];
        let filtro = document.getElementById("filtro").value;
        if (filtro == "venta") {
            arrayTr.filter((tx) => {
                if (tx.dataset.transaccion == "venta") {
                    tx.hidden = false;
                } else if (tx.dataset.transaccion == "alquiler") {
                    tx.hidden = true;
                }

            });

        } else if (filtro == "alquiler") {
            arrayTr.filter((tx) => {
                if (tx.dataset.transaccion == "venta") {
                    tx.hidden = true;
                } else if (tx.dataset.transaccion == "alquiler") {
                    tx.hidden = false;
                }

            });
        } else if (filtro == "todos") {
            tx.hidden = false;
        }

    });

    filasMostrar.map(tx => tx.hidden = false);


}
function filtrarCheckbox() {

    let arrayTh = document.querySelectorAll('th');
    let arrayTd = document.querySelectorAll('td');
    let arrayTabla = [...arrayTh, ...arrayTd];

    arrayTabla.map((tx) => {
        if (tx.dataset.idcol != 1)
            tx.hidden = true;
    });

    let celdasMostrar = arrayTabla.filter((tx) => {
        let idCol = parseInt(tx.dataset.idcol);

        switch (idCol) {
            case 2:
                return checkTitulo.checked;
            case 3:
                return checkTransaccion.checked;
            case 4:
                return checkDescripcion.checked;
            case 5:
                return checkPrecio.checked;
            case 6:
                return checkPuertas.checked;
            case 7:
                return checkKilometros.checked;
            case 8:
                return checkPotencia.checked;
        }
    });

    celdasMostrar.map(tx => tx.hidden = false);
}
function handlerSubmit(e) {
    e.preventDefault();
    const frm = e.target;

    if (frm.id.value) {
        const editDato = new Anuncio_Auto(parseInt(frm.id.value), frm.titulo.value, frm.transaccion.value, frm.descripcion.value, frm.precio.value, frm.puertas.value, frm.kilometros.value, frm.potencia.value);
        console.log(editDato);
        if (confirm("Confirmar modificación?")) {
           // updateDatosAjax(editDato);
           updateDatosFetch(editDato);

        }

    } else {
        const nuevoDato = new Anuncio_Auto(Date.now(), frm.titulo.value, frm.transaccion.value, frm.descripcion.value, frm.precio.value, frm.puertas.value, frm.kilometros.value, frm.potencia.value);
       // const nuevoDato = new Anuncio_Auto(Date.now(), frm.titulo.value, frm.transaccion.value, frm.descripcion.value, frm.precio.value, frm.puertas.value, frm.kilometros.value, frm.potencia.value, frm.img);
       // console.log(foto);
        // altaDatoAjax(nuevoDato);
        postDatosFetch(nuevoDato);
    }
}
const createSpinner = () => {
    const spinner = document.createElement('img');
    spinner.setAttribute("src", "./assets/spinner.gif");
    spinner.setAttribute("alt", "Imagen Spinner");
    return spinner;
}
function almacenarDatos(d) {
    //localStorage.setItem("lista", JSON.stringify(d));
    handlerLoadList();
}
function modificarDato(p) {
    let index = data.findIndex((d) => {
        return d.id == p.id;
    });

    data.splice(index, 1, p);
    almacenarDatos(data);
}
function renderizarLista(lista, contenedor) {
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    if (lista) {
        contenedor.appendChild(lista);
    }
}

function crearTabla(items) {
    const tabla = document.createElement("table");
    tabla.setAttribute("class","table table-hover");
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    return tabla;
}

function crearThead(item) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    for (const key in item) {
        const td = document.createElement("td");
        const th = document.createElement("th");
        const texto = document.createTextNode(key);
        if (key == "id") {
            td.setAttribute("data-idcol", "1");
        }
        if (key !== "id" && key !=="img") {
            if (key === "titulo") {
                th.setAttribute("data-idcol", "2");

            } else if (key === "transaccion") {
                th.setAttribute("data-idcol", "3");
                th.setAttribute("class", "transaccion");

            } else if (key === "descripcion") {
                th.setAttribute("data-idcol", "4");

            } else if (key === "precio") {
                th.setAttribute("data-idcol", "5");

            } else if (key === "puertas") {
                th.setAttribute("data-idcol", "6");

            } else if (key === "kilometros") {
                th.setAttribute("data-idcol", "7");

            } else if (key === "potencia") {
                th.setAttribute("data-idcol", "8");
            }
            th.appendChild(texto);
            tr.appendChild(th);
        }

    }
    thead.appendChild(tr);
    return thead;
}

function crearTbody(item) {
    const tbody = document.createElement("tbody");

    item.forEach(item => {
        const tr = document.createElement("tr");

        for (const key in item) {

            const td = document.createElement("td");
            if (key === "id") {
                tr.setAttribute("data-id", item[key]);
                td.setAttribute("data-idcol", "1");
            } else if(key !== "img"){
                td.textContent = item[key];
                tr.appendChild(td);

                if (key === "titulo") {
                    td.setAttribute("data-idcol", "2");

                } else if (key === "transaccion") {
                    td.setAttribute("data-idcol", "3");
                    tr.setAttribute("data-transaccion", td.textContent);

                } else if (key === "descripcion") {
                    td.setAttribute("data-idcol", "4");

                } else if (key === "precio") {
                    td.setAttribute("data-idcol", "5");

                } else if (key === "puertas") {
                    td.setAttribute("data-idcol", "6");

                } else if (key === "kilometros") {
                    td.setAttribute("data-idcol", "7");

                } else if (key === "potencia") {
                    td.setAttribute("data-idcol", "8");
                }
            }
        }
        tbody.appendChild(tr);
    });

    return tbody;
}

function handlerClick(e) {

    if (e.target.matches("td")) {
        const _id = parseInt(e.target.parentNode.dataset.id);
        idGlobal = _id;
        console.log(_id);
        cargarFormulario(_id);
        document.getElementById("divForm").setAttribute("class", "visible");

    } else if (e.target.matches("#btnEliminar")) {
        if (confirm("Confirmar eliminación?")) {
            //deleteDatoAjax(idGlobal);
            deleteDatosFetch(idGlobal);
            console.log(idGlobal);
        }
    }
}

function cargarFormulario(id) {
    let dato = null;
    dato = data.filter(d => d.id === parseInt(id))[0];

    const { titulo, transaccion, descripcion, precio, puertas, kilometros, potencia } = dato;

    const frm = document.forms[0];
    frm.titulo.value = titulo;
    frm.transaccion.value = transaccion;
    frm.descripcion.value = descripcion;
    frm.precio.value = precio;
    frm.id.value = id;
    frm.puertas.value = puertas;
    frm.kilometros.value = kilometros;
    frm.potencia.value = potencia;

    document.getElementById("btnSubmit").value = 'Modificar';
    document.getElementById("btnEliminar").setAttribute("class", "visible");

    localStorage.setItem("dato", JSON.stringify(dato));
    sessionStorage.setItem("dato", dato);



}

const postDatosFetch = (dato) => {
    document.querySelector(".spinner").appendChild(createSpinner());

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dato)
    }

    fetch("http://localhost:5000/datos", options)
        .then((res) => {
            console.log(res);
            return res.ok ? res.json() : Promise.reject
                (res);
        })
        .then((data) => {
            console.log(data);

        })
        .catch(err => {
            console.error(`Error: ${err.status}: ${err.statusText}`);
        })
        .finally(() => {
            document
                .querySelector(".spinner")
                .removeChild(
                    document.querySelector(".spinner").firstElementChild
                );

        });
}
/*
const altaDatoAjax = (dato)=>{
    // Instanciar el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
  //  document.querySelector(".spinner").appendChild(createSpinner());

    // Asignar un handler para la petición
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 299){
                data = JSON.parse(xhr.responseText);
                console.log(data);
               // renderizarLista(crearTabla(data),document.getElementById("divLista"));
            }
            else{
                const statusText = xhr.statusText || "Ocurrió un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
       //     document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        }
    }

    // Abrir petición
    xhr.open("POST", "http://localhost:5000/datos");
    
    // Settear cabecera
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf8"); 

    // Enviar petición
    xhr.send(JSON.stringify(dato));
    console.log(dato);
}
*/
const getDatosAjax = () => {

    // Instanciar el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
    //  document.querySelector(".spinner").appendChild(createSpinner());

    // Asignar un handler para la petición
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 299) {
                data = JSON.parse(xhr.responseText);
                //console.log(data);
                renderizarLista(crearTabla(data), document.getElementById("divLista"));
            }
            else {
                const statusText = xhr.statusText || "Ocurrió un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }

            //  document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        }
    }

    // Abrir petición
    xhr.open("GET", "http://localhost:5000/datos");

    // Enviar petición
    xhr.send();


}
/*
const deleteDatoAjax = (id)=>{

    // Instanciar el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
    //document.querySelector(".spinner").appendChild(createSpinner());

    // Asignar un handler para la petición
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 299){
                data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                const statusText = xhr.statusText || "Ocurrió un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
         //   document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        }
    }
    // Abrir petición
    xhr.open("DELETE", `http://localhost:5000/datos/${id}`);
    
    // Enviar petición
    xhr.send();
}

*/

const deleteDatosFetch = (id) => {
    document.querySelector(".spinner").appendChild(createSpinner());

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch("http://localhost:5000/datos/" + id, options)
        .then((res) => {
            console.log(res);
            return res.ok ? res.json() : Promise.reject
                (res);
        })
        .then((data) => {
            console.log(data);

        })
        .catch(err => {
            console.error(`Error: ${err.status}: ${err.statusText}`);
        });
       /* .finally(() => {
            document
                .querySelector(".spinner")
                .removeChild(
                    document.querySelector(".spinner").firstElementChild
                );

        });*/
}


const updateDatosAjax = (dato) => {

    // Instanciar el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
    document.querySelector(".spinner").appendChild(createSpinner());

    // Asignar un handler para la petición
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 299) {
                data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else {
                const statusText = xhr.statusText || "Ocurrió un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
           // document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        }
    }

    // Abrir petición
    xhr.open("PUT", `http://localhost:5000/datos/${dato.id}`);

    // Settear cabecera
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf8"); //mime types

    // Enviar petición
    xhr.send(JSON.stringify(dato));
}



const updateDatosFetch = (dato)=>{
    document.querySelector(".spinner").appendChild(createSpinner());

    const options = {
        method : "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(dato)
    }

    fetch(`http://localhost:5000/datos/${dato.id}`, options)
    .then((res)=>{
        console.log(res);
        return res.ok? res.json(): Promise.reject
        (res);
    })
    .then((data)=>{
        console.log(data);

    })
    .catch(err=>{
        console.error(`Error: ${err.status}: ${err.statusText}`);
    })
    .finally(()=>{
        document
        .querySelector(".spinner")
            .removeChild(
                document.querySelector(".spinner").firstElementChild
                );

    });
}


