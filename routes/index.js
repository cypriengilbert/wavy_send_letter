var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs = require('fs');
var parser = require('xml2json');
var request = require("request");
var Seeuletter = require('seeuletter')('test_92dedb4e-8e32-4dde-8916-39021b5c58ba')
var new_saloon;
var json;




var url = "http://cypriengilbert.com/public_hungryup/"+ req.param('fichier');
console.log(url);

request({
    url: url,
    headers: {'Content-Type': 'text/xml'}
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {

        json = parser.toJson(body);
        new_saloon = JSON.parse(json);

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}




const start = async () => {
  await asyncForEach(new_saloon.annonces.annonce, async (element) => {
    await waitFor(5000);
    if (element.personnes.personne.dirigeants.dirigeant.length > 1) {
        var dirigeant = element.personnes.personne.dirigeants.dirigeant[0];
    }
    else{
        var dirigeant = element.personnes.personne.dirigeants.dirigeant;
    }
    
    if(dirigeant.nom !== undefined && dirigeant.prenom !== undefined){
        name = dirigeant.prenom + " " + dirigeant.nom;
    }
    else if( dirigeant.prenom === undefined && dirigeant.civilite !== undefined){
        name = dirigeant.civilite + " " + dirigeant.nom;
    }
    else{
        name = "";
    }
    address_line1 = dirigeant.adresse.rue;
    address_city = dirigeant.adresse.ville;
    address_postalcode = dirigeant.adresse.codePostal;
    address_country : "France";
    if(name !== "" && address_line1 !== undefined && address_city !== undefined && address_postalcode !== undefined){
      console.log(name);
       /* Seeuletter.letters.create({
            "description": "Ouverture Salon " + name + " " + Date.now(),
            "to": {
              "name": name,
              "address_line1": address_line1,
              "address_city": address_city,
              "address_postalcode": address_postalcode.toString(),
              "address_country": "France"
            },
            "color" : "color",
            "postage_type" : "prioritaire",
            "source_file_type": "template_id",
            "source_file": "HkPR_58cG"
          }, function(err, response){
           if(err) console.log('err : ', err)
           console.log('Done'+ name );
         });*/
    }    
    });
  }
start()
}
})
  res.render('index', { title: "hello" });
});

module.exports = router;
