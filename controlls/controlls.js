const Datastore = require('nedb');
const db = new Datastore({ filename: './bd/basedata.db', autoload: true });

const id = "1b3b41fc34d2453ccf321dce_1";

function insertDB(req, res) {
    //const dataSave = { id: req.body.id, colorFrecuencia: "white", imgFondo: "/img/img4.jpg", blurFondo: 5 }
    const dataSave = req.body;
    console.log("dataSave:",dataSave);
    db.insert(dataSave, (err, newDoc) => {
        if (err) {
            console.log('Error inserting document:', err);
        } else {
            console.log('Inserted document:', newDoc);
            res.send( {data:newDoc})
        }
    }); 
    //res.send({msg:"echos"})
}
function buscarDB(req, res) {
    dato = db.find({ id: req.body.id }, (err, docs) => {
        if (err) {
            console.log('Error finding documents:', err);
        } else {
            console.log('Found documents:', docs);
            res.send(docs);
        }
    });

}
function actualizarDB(req, res) {
    let dat = req.body
    console.log(req.body);
    db.update(
        { id: dat.id },
        {
            $set: {
                colorFrecuencia: dat.data.colorFrecuencia,
                imgFondo: dat.data.imgFondo,
                blurFondo: dat.data.blurFondo
            }
        }, {}, (err, numReplaced) => {
            if (err) {
                console.log('Error updating document:', err);
            } else {
                console.log('Number of documents updated:', numReplaced);
            }
        });
    res.send({})
}
function eliminarDB(req, res) {
    db.remove({ name: 'Alice' }, {}, (err, numRemoved) => {
        if (err) {
            console.log('Error removing document:', err);
        } else {
            console.log('Number of documents removed:', numRemoved);
        }
    });
}
function eliminarSolo(id){
    db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
            console.log('Error removing document:', err);
        } else {
            console.log('Number of documents removed:', numRemoved);
        }
    });
}
//eliminarSolo("NmQOVtZNvx4QT2gw");
module.exports = { insertDB, actualizarDB, buscarDB, eliminarDB };