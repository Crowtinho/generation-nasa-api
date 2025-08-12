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
    saveApod(apod)
}



function getApod(){
    const item = localStorage.getItem("apod")
    if(!item){
        return []
    }
    return JSON.parse(item)
}


function saveApod(){
    localStorage.setItem("apod",JSON.stringify(datos))
    
}





