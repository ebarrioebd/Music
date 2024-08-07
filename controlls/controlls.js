

const Musics_url = require("../models/music_url");
const Config = require("../models/config");
const UrlImg = require("../models/urlImg");

async function buscarDB(req, res) {
    const data = await Musics_url.find({}); 
    res.send(data);

}
async function buscarConfig(req, res) {
    const data = await Config.find({}); 
    res.send(data);
}
async function buscarImgs(req, res) {
    const data =await UrlImg.find({});
    console.log("UrlImgUrlImg::",data);
    res.send(data);
} 


async function actualizarConfig(req,res){ 
    await Config.findOneAndUpdate({id:"1b3b41fc34d2453ccf321dce_1"},req.body)
    .then((user )=>{
        console.log('Dato actualizado:', user);
        res.send({msg:"Echo"})
    })
    .catch((err) =>{ 
        console.error('Error al actualizar usuario', err)
        res.send({err:err})
    });
}
async function addUrlMusicDropbox(req,res){
    await Musics_url(req.body).save()
    .then(() => {
        console.log('Url music agregada...', req.body);
        res.send({msg:"Echo"})
    })
    .catch(err => {console.error('Error al crear Musics_url', err);
        res.send({msg:err})
    });
}
async function addUrlImage(req,res){
    await UrlImg(req.body).save()
    .then(() => {
        console.log('Url UrlImg agregada...', req.body);
        res.send({msg:"Echo"})
    })
    .catch(err => {console.error('Error al crear UrlImg', err);
        res.send({msg:err})
    });
}
module.exports = { buscarDB, buscarConfig,buscarImgs,actualizarConfig,addUrlMusicDropbox,addUrlImage};