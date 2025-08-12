let datos;

function getFecha(){
    const date = document.getElementById("dateA").value
    return date;
}

function buscarDato(){
    let date = getFecha()
    fetch(`https://api.nasa.gov/planetary/apod?api_key=VdkAcypNNGbR9GcaVta6x68abrfan8xYRIObJ6Nl&date=${date}`)
    .then(response => response.json())
    .then(data => {
        datos = {
            title:data.title,
            description: data.explanation,
            image: data.url,
            date: data.date
        }
        console.log(datos);
        // return datos;
    }).catch(error => {
            console.error('Error al consumir la API:', error);
            alert("no se pudo consumir")
        });
}

function addApod(){
    let apod = getApod();
    apod.push(datos);
    saveApod(apod);
}



function getApod(){
    const item = localStorage.getItem("apod")
    if(!item){
        return []
    }
    return JSON.parse(item)
}


function saveApod(apod){
    localStorage.setItem("apod", JSON.stringify(apod));
}

function showApod(){
    const apod = getApod();
    const container = document.getElementById("apodContainer");
    container.innerHTML = ""; // Limpiar el contenedor antes de mostrar los datos

    apod.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <img src="${item.image}" alt="${item.title}">
            <p>Date: ${item.date}</p>
        `;
        container.appendChild(card);
    });
}






