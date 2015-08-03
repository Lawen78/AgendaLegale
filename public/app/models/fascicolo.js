/**
 * Created by Lorenzo on 03/08/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var enumOrgano = ['TAR Lazio','Consiglio di Stato','Altro'];

var fascicoloSchema = new Schema({
    organo:{
        type: String,
        required: true,
        enum: enumOrgano
    },
    numeroRG:{
        type: String,
        required: true,
        match:/^[0-9]*\/[0-9]{4}$/
    },
    RUP:{
        type: String,
        required: true
    },
    Assegnazione:{
        type: String,
        require: true
    },
    Procedura:{
        nome:{
            type: String,
            required: true
        },
        anno:{
            type: String,
            required: true,
            match: /^[0-9]{4}$/
        },
        atto:{
            type: String,
            required: true
        },
        note:{
            type: String,
            max: 2000
        }
    },
    Sospensiva:Boolean,
    Ricorrente:[
        {
            nominativo:{
                type: String,
                required: true
            },
            recapito:{
                type: String,
                required: true,
                match:/^[0-9]*$/
            },
            riferimento:{
                type: String,
                required: true
            },
            note:{
                type: String,
                max: 2000
            }
        }
    ]
});

fascicoloSchema.path('Ricorrente').validate(function (v) {
    return v.length > 0
}, 'Ricorrente è un campo richiesto');



fascicoloSchema.post('save', function(document){
    console.log('Documento salvato')
});

module.exports = mongoose.model('Fascicolo',fascicoloSchema,'fascicoli');