const byId = function( id ) { return document.getElementById( id ); };

fetch("/api")
.then(resp => resp.json())
.then(data => {
    // LOKALIZACJA
    //// śląsk
    byId("slaskmiasto").innerText = data.slask.miasto;
    byId("slaskczujnik").innerText = data.slask.adres;
    //// gdańsk
    byId("gdanskczujnik").innerText = data.gdansk.adres;

    // PM10
    //// śląsk
    let config = {
        min: 0, 
        max: 200, 
        title: "µg/m3", 
        valueFontColor: "#FFFFFF", 
        gaugeWidthScale: 0.6, 
        levelColors: ["#2E7D32", "#FFEB3B", "#E64A19", "#F44336"], 
        valueFontFamily: "Roboto Condensed", 
        titlePosition: "below"
    }

    config.id = "slaskpm";
    config.value = data.slask.pm10;
    let s = new JustGage(config);

    config.id = "gdanskpm";
    config.value = data.gdansk.pm10;
    let g = new JustGage(config);

    // TEMPERATURA
    //// śląsk
    byId("slasktemp").innerText = data.slask.temp.toFixed(1);
    //// gdańsk
    byId("gdansktemp").innerText = data.gdansk.temp.toFixed(1);

    let date = new Date(data.updated*1000);

    let hours = date.getHours();
    let minutes = "0" + date.getMinutes()

    let day = date.getDate();
    let month = "0" + date.getMonth()+1;
    let year = date.getFullYear();

    let formattedDate = hours + ':' + minutes.substr(-2) + " "+day+"/"+month.substr(-2)+"/"+year;
    
    byId("upDate").innerText = formattedDate;
})
