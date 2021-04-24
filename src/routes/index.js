const { Router } = require('express')
const router = Router();

const usuarios = require('../usuarios.json');
const provincias = require('../provincias.json');
const movies = require('../sample.json');

var nombreprov;
var latlong;

router.get('/usuarios', (req, res) => {
    const { usuario } = req.body;
    const { pass } = req.body;
    console.log(usuario);
    console.log(pass);
    console.log(usuarios.usuario);

    if (usuario && pass) {
        if (usuarios.usuario === usuario) {
            if (usuarios.pass === pass) {
                res.json("El usuario y la contraseña es correcta.")
            } else {
                res.json("La contraseña no es correcta.")
            }
        } else {
            res.json("Usuario no registrado.");    
        }
    } else {
        res.json("Falta Usuario y/o Contraseña");
    }

});


router.get('/provincias2', (req, res) => {
    res.json(provincias)});


router.get('/provincias', (req, res) => {

        const { nombre } = req.body;

        if (nombre) {
            
            var coincide = false;
            for (var i = 0; i < provincias.cantidad; i++) {
                latlong = provincias.provincias[i].centroide;
                nombreprov = provincias.provincias[i].nombre;
                if (nombreprov === nombre) {
                    coincide = true;
                    res.json("Provincia encontrada " + nombreprov + ". Su latitud: " + latlong.lat + " y longitud:" + latlong.lon);                    
                }
            }
            if (coincide) {

            } else {
                res.json("El nombre no coincide con alguna provincia.");
            }

        } else {
            res.status(500).json({error: 'Falta nombre de la provincia.'});            
        }
    });

router.get('/test', (req, res) =>{ 
    const data = {
        "name": "Javier",
        "website": "javier.com"
    };
    res.json(data);
});

module.exports = router;