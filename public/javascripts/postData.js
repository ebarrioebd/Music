
async function getImgs() {
    try {
        const response = await fetch("/getImgs", {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({ id: "img" })
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud.', response.statusText);
        }
        const data = await response.json();
        addImgSelect(data);
    } catch (error) {
        console.log('Error.', error)
    }
}

async function getMusics() {
    try {
        const response = await fetch("/getMusic", {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({ id: "music" })
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud.", res.statusText)
        }
        const data = await response.json();
        music_url = data;
        actualizarLista();
    } catch (error) {
        console.log(error)
    }
}
async function actualizarDatos() {
    // Los datos que deseas enviar   
    try {
        const response = await fetch('/actualizar_config', {
            cache: 'no-cache',
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json' // Indica que estamos enviando JSON
            },
            body: JSON.stringify(DataBD) // Convierte el objeto data a una cadena JSON
        });
        if (!response.ok) {
            throw new Error("Error al solicitar.", response.statusText);
        }
        const data = await response.json();
        console.log("Susses:", data)
    } catch (error) {
        console.error('Error:', error);

    }
}
async function getDataConfig() {
    try {
        const response = await fetch("/getData", {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({ id: "1b3b41fc34d2453ccf321dce_1" })
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud.", response.statusText)
        }
        const data = await response.json();
        console.log("dataConfig:",data)
        DataBD.blurFondo = data[0].blurFondo;
        DataBD.colorFrecuencia = data[0].colorFrecuencia;
        DataBD.imgFondo = data[0].imgFondo;
        cambiarBlur(DataBD.blurFondo);
        cambiarFondo(DataBD.imgFondo);
        seleccionarColor(DataBD.colorFrecuencia);
        console.log('Success:', DataBD);

    } catch (error) {
        console.log("Error:",error)
        alert(error)
    };
}

async function addUrlMusic() {
    const inputNombre = document.getElementById("nombreAudio");
    const inputUrlAudio = document.getElementById("urlAudio");
    inputNombre.style.borderColor = "white";
    inputUrlAudio.style.borderColor = "white";

    const nombre = inputNombre.value;
    const urlAdio = inputUrlAudio.value;

    if (nombre.length === 0) { inputNombre.style.borderColor =  "red"; return null; }
    if (urlAdio.length === 0) { inputUrlAudio.style.borderColor =  "red"; return null; }
    if (urlAdio.slice(0, 24) !== "https://www.dropbox.com/") { inputUrlAudio.style.borderColor = "red"; return null; }

    try {
        let url_direct = "https://dl.dropboxusercontent.com" + urlAdio.slice(23, urlAdio.length - 5);

        console.log(url_direct);
        const music_data = {
            nombre: nombre,
            url: url_direct,
            id: "music"
        }
        //vaciar campos de texto
        document.getElementById("nombreAudio").value = "";
        document.getElementById("urlAudio").value = "";

        const response = await fetch('/addUrlMusicDropbox', {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json' // Indica que estamos enviando JSON
            },
            body: JSON.stringify(music_data) // Convierte el objeto data a una cadena JSON
        });
        if (!response.ok) {
            throw new Error("Erro en la solicitud..", response.statusText)
        }
        const data = await response.json();
        music_url.push(music_data);
        actualizarLista();
        console.log(music_data)
        console.log('Success:', data);

    } catch (error) {
        console.log(error)
    }
}

function addUrlImg() {
    const inputImgUrl = document.getElementById("urlImg");
    inputImgUrl.style = "";

    const urlimg = inputImgUrl.value; 
    if (urlimg.slice(0, 24) !== "https://www.dropbox.com/") { inputImgUrl.style = "border-color:red;"; return null }

    let url_direct = "https://dl.dropboxusercontent.com" + urlimg.slice(23, urlimg.length - 5);
    const data = { urlImg: url_direct, id: "img" };
    console.log(data);
    fetch('/addUrlImage', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Indica que estamos enviando JSON
        },
        body: JSON.stringify(data) // Convierte el objeto data a una cadena JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Si el servidor devuelve JSON, parsea el cuerpo de la respuesta
        })
        .then(data => {
            const selectElement = document.getElementById('select_img');
            // Crea un nuevo elemento <option>
            const nuevaOpcion = document.createElement('option');
            // Establece el valor y el texto de la opción
            nuevaOpcion.value = url_direct;
            nuevaOpcion.textContent = `img${img_index}.jpg`;
            // Agrega la nueva opción al <select>
            selectElement.appendChild(nuevaOpcion);
            console.log('Success:', data);
            document.getElementById("urlImg").value = ""
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
getDataConfig();
getImgs();
getMusics();
