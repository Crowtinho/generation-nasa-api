let datos;

function getFecha() {
    const date = document.getElementById("dateA").value;
    return date;
}

function buscarDato() {
    let date = getFecha();

    let hoy = new Date().toISOString().split("T")[0];
    if (date > hoy) {
        alert("No puedes seleccionar una fecha futura");
        return;
    }

    fetch(`https://api.nasa.gov/planetary/apod?api_key=VdkAcypNNGbR9GcaVta6x68abrfan8xYRIObJ6Nl&date=${date}`)
        .then(response => response.json())
        .then(data => {
            datos = {
                title: data.title,
                description: data.explanation,
                image: data.media_type === "image" 
                        ? `<img src="${data.url}" alt="${data.title}">` 
                        : `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`,
                date: data.date
            };

            document.getElementById("currentApod").innerHTML = `
                <h2>${datos.title}</h2>
                <p>${datos.description}</p>
                ${datos.image}
                <p>Fecha: ${datos.date}</p>
                <button onclick="addApod()">Agregar a Favoritos</button>
            `;
        })
        .catch(error => {
            console.error('Error al consumir la API:', error);
            alert("No se pudo consumir la API");
        });
}

function addApod() {
    let apod = getApod();
    apod.push(datos);
    saveApod(apod);
    showApod();
}

function getApod() {
    const item = localStorage.getItem("apod");
    if (!item) {
        return [];
    }
    return JSON.parse(item);
}

function saveApod(apod) {
    localStorage.setItem("apod", JSON.stringify(apod));
}

function showApod() {
    const apod = getApod();
    const container = document.getElementById("apodContainer");
    container.innerHTML = ""; // Limpiar antes de mostrar

    apod.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            ${item.image}
            <p>Fecha: ${item.date}</p>
        `;
        container.appendChild(card);
    });
}

window.onload = showApod;