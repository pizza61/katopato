const express = require("express");
const axios = require("axios");
const app = express();

const config = require("./config.json");

let danzig = [{
        id: "2210",
        miasto: "Gdańsk",
        nazwa: "Przymorze, Rzeczypospolitej 4C"
    },{
        id: "2256",
        miasto: "Gdańsk",
        nazwa: "Wrzeszcz, Grunwaldzka 163"
    },{
        id: "3432",
        miasto: "Gdańsk",
        nazwa: "Śródmieście, Pocztowa"
    },{
        id: "2812",
        miasto: "Gdańsk",
        nazwa: "Orunia, Smoleńska"
    }];
let roksanaWungiel = [{
        id: "700",
        miasto: "Katowice",
        nazwa: "3 Maja 21"
    },{
        id: "2595",
        miasto: "Mysłowice",
        nazwa: "Bytomska"
    },{
        id: "775",
        miasto: "Gliwice",
        nazwa: "Spółdzielcza"
    },{
        id: "6232",
        miasto: "Zabrze",
        nazwa: "Wolności"
    },{
        id: "738",
        miasto: "Sosnowiec",
        nazwa: "Modrzejowska 6"
    },{
        id: "740",
        miasto: "Jaworzno",
        nazwa: "Plac Górników"
    }];
class KatoPato {
    constructor() {
        this.dane = {
            updated: (new Date()).getTime()/1000,
            gdansk: {},
            slask: {},
        }
        this.pobierz()
        // tutaj wywolujemy funkcje pobierająca dane z api airly
    }

    init() {
        app.get('/api', (req, res) => {
            // no to tutaj jest api
            let teraz = (new Date()).getTime()/1000;
            if(teraz < this.dane.updated+900) {
                res.send(this.dane)
            } else {
                this.pobierz()
                .then(() => res.send(this.dane))  
            }
              
        })
        app.use(express.static('public'))
        // a tutaj jest stronka
        app.get('/', (req, res) => {
            res.redirect("/api")
        })
    }

    pobierz() {
        console.log("Pobrano dane z airly")
        return new Promise(resolve => {
            const wegiel = Math.floor(Math.random() * roksanaWungiel.length);
            const jod = Math.floor(Math.random() * danzig.length);
    
            rq(roksanaWungiel[wegiel].id)
            .then(slask => {
                this.dane.slask = {
                    pm10: slask.pm10,
                    temp: slask.temp,
                    miasto: roksanaWungiel[wegiel].miasto,
                    adres: roksanaWungiel[wegiel].nazwa
                }
                rq(danzig[jod].id)
                .then(gdansk => {
                    this.dane.gdansk = {
                        pm10: gdansk.pm10,
                        temp: gdansk.temp,
                        miasto: "Gdańsk",
                        adres: danzig[jod].nazwa,
                    }
                    this.dane.updated = (new Date()).getTime()/1000;

                    resolve();
                })
            })
        })
        
    }
}

function rq(id) {
    return new Promise((resolve, reject) => {
        axios.get("https://airapi.airly.eu/v2/measurements/installation", {
            params: {
                'installationId': id
            },
            headers: {
                'Accept': 'application/json',
                'apikey': config.key
            }
        }).then(resp => {
            const pm10 = resp.data.current.values.find(x => x.name == "PM10")
            const temp = resp.data.current.values.find(x => x.name == "TEMPERATURE")
    
            resolve({
                pm10: pm10.value,
                temp: temp.value
            })
        }).catch(err => {
            reject(err);
        })
    })
   
}
const kp = new KatoPato();
kp.init();

app.listen(1121)
console.log("Uruchomiono na porcie :1121")