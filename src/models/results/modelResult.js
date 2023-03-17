const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultShema = new Schema({
    Resultados : [
        {
            Nombre: { type: String, required: true },
            ResultComp: [ { type: String, required: true } ]
        }
    ]
});

const ResultModel = mongoose.model('result', resultShema);
module.exports = ResultModel;