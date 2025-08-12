let datos;

function getFecha() {
    return document.getElementById("dateA").value;
}

function buscarDato() {
    let date = getFecha();
    let hoy = new Date().toISOString().split("T")[0];

    if (date > hoy) {
        alert("No puedes seleccionar una fecha futura");
        return;
    }

    fetch(`https://api.nasa.gov/planetary/apod?api_key=VdkAcypNNGbR9GcaVta6x68abrfan8xYRIObJ6Nl&date=${date}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error.message);
        }

        datos = {
            title: data.title,
            description: data.explanation,
            image: data.media_type === "image"  
                ? `<img src="${data.url}" alt="${data.title}" class="img-fluid">`  
                : `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`,
            date: data.date
        };

        document.getElementById("currentApod").innerHTML = `
            <div class="card simple-card">
                <div class="card-body">
                    <h5 class="card-title">${datos.title}</h5>
                    ${datos.image}
                    <p class="card-text mt-3">${datos.description}</p>
                    <p class="text-muted">Fecha: ${datos.date}</p>
                </div>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error al consumir la API:', error);
        alert("No se pudo consumir la API: " + error.message);
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
    return item ? JSON.parse(item) : [];
}

function saveApod(apod) {
    localStorage.setItem("apod", JSON.stringify(apod));
}

function showApod() {
    const apod = getApod();
    const container = document.getElementById("apodList");
    container.innerHTML = "";

    apod.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
            <div class="card simple-card h-100">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    ${item.image}
                    <p class="card-text mt-3">${item.description}</p>
                    <p class="text-muted">Fecha: ${item.date}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

window.onload = showApod;
