/**
 * Created by Lorenzo on 03/08/15.
 */

var Fascicolo = require('../models/fascicolo');

module.exports = function(app,express){

    var api = express.Router();

// definisco il modello, dando il nome, lo schema e la collezione.
//var Fascicolo = dbConnection.model('Fasciolo',fascicoloSchema,'fascicoli');

    api.post('/fascicolo', function(req,res){
        var fascicolo = new Fascicolo(req.body);
        fascicolo.save(function(err,results){
            if (err) {
                switch (err.name) {
                    case 'ValidationError':
                        var answer="";
                        for (var field in err.errors) {
                            switch (err.errors[field].properties.type) {
                                case 'exists':
                                    answer += field+" Esiste"+"\n";
                                    break;
                                case 'invalid':
                                    answer += field+" Invalido"+"\n";
                                    break;
                                case 'regexp':
                                    answer += field+" Espressione regolare non valida"+"\n";
                                    break;
                                case 'enum':
                                    answer += field+" Enumerazione non valida"+"\n";
                                    break;
                                case 'required':
                                    answer += field+" richiesto!!!"+"\n";
                                    break;
                                case 'user defined':
                                    answer += field+" ("+err.errors[field].properties.message+") è richiesto.\n";
                                    break;
                                default:
                                    answer += field+" (default) "+err.errors[field].properties.message+"\n";
                            }
                        }
                        res.send(answer);
                        break;
                    default:
                        res.send(err.name);
                }
            }
            res.send(results);
        })
    });

    api.get('/fascicolo', function(req,res){
        Fascicolo.find({}, {_id:false,__v:false}, function(err,results){
            if(!err)
                res.send(results);
            else{
                res.send(error.message);
            }
        })
    });

    api.get('/',function(req,res){
        res.send('Specifica una API');
    });

    return api;

}

