function actualizarDatos() {
    // Los datos que deseas enviar  
    //Realizar la solicitud fetch
    fetch('/actualizar_config', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Indica que estamos enviando JSON
        },
        body: JSON.stringify(DataBD) // Convierte el objeto data a una cadena JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Si el servidor devuelve JSON, parsea el cuerpo de la respuesta
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function obtenerDatos() {
    fetch("/getData", {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Indica que estamos enviando JSON
        }
        , body: JSON.stringify({ id: "1b3b41fc34d2453ccf321dce_1" }) // Convierte el objeto data a una cadena JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Si el servidor devuelve JSON, parsea el cuerpo de la respuesta
        })
        .then(data => {
            console.log('data:', data);
            DataBD.blurFondo = data[0].blurFondo;
            DataBD.colorFrecuencia = data[0].colorFrecuencia;
            DataBD.imgFondo = data[0].imgFondo;
            cambiarBlur(DataBD.blurFondo);
            cambiarFondo(DataBD.imgFondo);
            seleccionarColor(DataBD.colorFrecuencia);
            console.log('Success:', DataBD);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

function addUrlMusic() {
    const nombre = document.getElementById("nombreAudio").value;
    const urlAdio = document.getElementById("urlAudio").value;
    if (nombre.length > 0 && urlAdio.length > 0) {
        let url_direct = "https://dl.dropboxusercontent.com" + urlAdio.slice(23, urlAdio.length - 5);
        console.log("nombre:", nombre);
        console.log(url_direct);
        const music_data = {
            nombre: nombre,
            url: url_direct,
            id: "music"
        }
        //Realizar la solicitud fetch
        fetch('/addUrlMusicDropbox', {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json' // Indica que estamos enviando JSON
            },
            body: JSON.stringify(music_data) // Convierte el objeto data a una cadena JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Si el servidor devuelve JSON, parsea el cuerpo de la respuesta
            })
            .then(data => {
                music_url.push(music_data)
                console.log(music_data)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
    }
}

function addUrlImg() {
    const urlimg = document.getElementById("urlImg").value;

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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
obtenerDatos(); 