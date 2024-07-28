
function addImgSelect(data) {
    const selcect = document.getElementById("select_img");
    for (let i = 0; i < data.length; i++) {
        selcect.innerHTML+= `<option value="${data[i].urlImg}">img${i}.jpg</option>`
        console.log(data[i]);
    }
}
function getImgs() {
    fetch("/getImgs", {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Indica que estamos enviando JSON
        }
        , body: JSON.stringify({ id: "img" }) // Convierte el objeto data a una cadena JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Si el servidor devuelve JSON, parsea el cuerpo de la respuesta
        })
        .then(data => {
            addImgSelect(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}
getImgs();

function optenerNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//const colors = ["#0f99dd", "#35bbdd", "#68dca7", "#e3f46c", "#fcfd61", "#fecf4f", "#fea43d", "#fa4815", "#fa4815"];
const colors = ['#00FF90', '#00FF6C', '#00FF48', '#00FF24', '#00FF00', '#24FF00', '#48FF00', '#6CFF00', '#90FF00', '#B4FF00', '#D8FF00', '#FFFF00', '#FFD800', '#FFB400', '#FF9000', '#FF6C00', '#FF4800', '#FF2400', '#FF0000'];

function obtenerColor(v) {
    var z = v / 255
    if (z < 0) { z = 0 } else if (z > 1) { z = 1 } else if (isNaN(z)) { z = 0 }
    return colors[Math.floor((colors.length - 1) * z)]
}
let music_url = [];
function getMusic() {
    fetch("/getMusic", {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Indica que estamos enviando JSON
        }
        , body: JSON.stringify({ id: "music" }) // Convierte el objeto data a una cadena JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Si el servidor devuelve JSON, parsea el cuerpo de la respuesta
        })
        .then(data => {
            music_url = data;
            console.log(data)
            cargarAudio();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}
getMusic();
const DataBD = {
    colorFrecuencia: "",
    imgFondo: "",
    blurFondo: 0,
}

const audio = document.getElementById('audio');
const audioSource = document.getElementById('audioSource');

const audioNameDisplay = document.getElementById('audioName');

function cargarAudio() {

    audioSource.src = music_url[0].url;
    audio.load();

    audioNameDisplay.textContent = music_url[0].nombre;
    console.log("music_url[0].nombre;:", music_url[0].nombre)
}




const canvas = document.getElementById('canvas');
const cCava = { x: 0, y: canvas.height / 2 }
const ctx = canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', function () {

    let index_music = 0;


    const playOpause = document.getElementById("playOpause");
    const currentTimeDisplay = document.getElementById('currentTime');
    const currentTimeMin = document.getElementById("currentTimeMin");
    const totalTimeMinDisplay = document.getElementById('totalTimeMin');
    const totalTimeSegDisplay = document.getElementById('totalTimeSeg');

    const rangeValor = document.getElementById("range");

    const volumeControl = document.getElementById('volumeControl');

    const boton_adelante = document.getElementById("bAdelante");
    const boton_atras = document.getElementById("bAtras");

    // Obtén el nombre del archivo de audio y actualízalo en el DOM
    const audioSrc = audioSource.src;



    audio.addEventListener('timeupdate', function () {
        currentTimeDisplay.textContent = audio.currentTime.toFixed(0) % 60;
        currentTimeMin.textContent = "0" + parseInt(audio.currentTime.toFixed(0) / 60);
        rangeValor.value = audio.currentTime.toFixed(2);
    });
    let totalTiempo = 0;
    audio.addEventListener('loadedmetadata', function () {
        rangeValor.max = audio.duration.toFixed(2);
        totalTiempo = audio.duration.toFixed(2);
        totalTimeMinDisplay.textContent = parseInt(audio.duration.toFixed(0) / 60);
        totalTimeSegDisplay.textContent = parseInt(audio.duration.toFixed(2) % 60);
    });

    console.log("=", totalTiempo);

    let isPause = true;
    playOpause.addEventListener('click', function () {
        if (isPause) {
            audio.play();
            isPause = false;
            document.getElementById("img_play_pause").src = "img/pause.png";
        } else if (!isPause) {
            audio.pause();
            isPause = true;
            document.getElementById("img_play_pause").src = "img/play.png";
        }
    });

    boton_adelante.addEventListener('click', function () {
        index_music = (index_music + 1) % music_url.length;
        audioNameDisplay.textContent = music_url[index_music].nombre;
        cambiarAudio();
    });
    boton_atras.addEventListener('click', function () {
        index_music = (index_music - 1 + music_url.length) % music_url.length;
        audioNameDisplay.textContent = music_url[index_music].nombre;
        cambiarAudio();
    });
    function cambiarAudio() {
        document.getElementById("img_play_pause").src = "img/pause.png";
        isPause = false;
        console.log("index_music:", index_music)
        audioSource.src = music_url[index_music].url;
        audio.load();
        audio.play();
    }
    // Control de volumen
    volumeControl.addEventListener('input', function () {
        audio.volume = volumeControl.value;
    });
    ////////dibujar las barras 

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;//32, 64, 128, 256, 512, 1024, 2048 

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        //document.getElementById("reproducStyle").style.padding = dataArray[parseInt(bufferLength / 2)] == 0 ? "15px" : ((20 * dataArray[parseInt(bufferLength / 2)]) / 255 + "px");
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        // Fondo transparente
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 1;
        let barHeight;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            //barHeight = dataArray[optenerNumero(16,48)] / 255 * (canvas.height*0.4); // Escalar la altura de la barra
            barHeight = dataArray[i] / 255 * (canvas.height * 0.4); // Escalar la altura de la barra

            // Color blanco brillante
            ctx.fillStyle = DataBD.colorFrecuencia;
            //cd ctx.fillStyle = obtenerColor(dataArray[i])
            //barras de abajo hacia arriba
            //ctx.fillRect(x, cCava.y - barHeight+20, ancBarra, barHeight);
            ctx.fillRect(x, cCava.y - barHeight, barWidth, barHeight);

            //minicuadr0s
            ctx.fillRect(x, cCava.y - barHeight, barWidth, 2); //importante 

            //barras de arriba hacia abajo
            ctx.fillRect(x, cCava.y, barWidth, barHeight);


            x += barWidth + 1;
        }
    }
    audio.addEventListener('play', () => {
        audioContext.resume().then(() => {
            draw();
        });
    });

    //////fin de dibujar las barras
});


const container = document.getElementById("container");
const valueTextBlur = document.getElementById("valueTextBlur");
function cambiarBlur(blur) {
    DataBD.blurFondo = blur;
    console.log(DataBD)
    container.style.filter = "blur(" + blur + "px)";
    valueTextBlur.textContent = "Blur(" + blur + "px)";
}
function abrirVentanaAdd() {
    document.getElementById("ventanaAdd").style.display = ""
}
function cerrarVentanaAdd() {
    document.getElementById("ventanaAdd").style.display = "none"

}

function abrirVentanaConfig() {
    document.getElementById("ventanaConfig").style.display = "";
}
function cerrarVentanaConfig() {
    document.getElementById("ventanaConfig").style.display = "none";
}
function cambiarFondo(src) {
    DataBD.imgFondo = src;
    document.getElementById("container").style.backgroundImage = `url(${src})`;
    document.getElementById("imgCaratula").src = `${src}`;
}
function seleccionarColor(c) {
    DataBD.colorFrecuencia = c;
    console.log(c);
}

