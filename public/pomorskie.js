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
    byId("slaskpm").innerText = data.slask.pm10;
    byId("slaskpro").innerText = ((data.slask.pm10/50)*100).toFixed(0);

    if(data.slask.pm10 < 50) {
        byId("slaskpm").style.color = '#409b2e';
    } else if (data.slask.pm10 <= 50 && data.slask.pm10 < 100) {
        byId("slaskpm").style.color = '#edb924';
    } else {
        byId("slaskpm").style.color = '#ef413a';
    }
    //// gdańsk
    byId("gdanskpm").innerText = data.gdansk.pm10;
    byId("gdanskpro").innerText = ((data.gdansk.pm10/50)*100).toFixed(0);

    if(data.gdansk.pm10 < 50) {
        byId("gdanskpm").style.color = '#409b2e';
    } else if (data.gdansk.pm10 <= 50 && data.gdansk.pm10 < 100) {
        byId("gdanskpm").style.color = '#edb924';
    } else {
        byId("gdanskpm").style.color = '#ef413a';
    }
    // TEMPERATURA
    //// śląsk
    byId("slasktemp").innerText = data.slask.temp.toFixed(1);
    byId("gdansktemp").innerText = data.gdansk.temp.toFixed(1);

    // RÓŻNICE
    //// PM10
    byId("roznicapro").innerText = ((Math.abs(data.slask.pm10-data.gdansk.pm10)/data.gdansk.pm10)*100).toFixed(0);
    //// TEMPERATURA
    byId("roznicatemp").innerText = (Math.abs(data.slask.temp-data.gdansk.temp)).toFixed(1);

    let date = new Date(data.updated*1000);

    let hours = date.getHours();
    let minutes = "0" + date.getMinutes()

    let day = date.getDate();
    let month = "0" + date.getMonth()+1;
    let year = date.getFullYear();

    let formattedDate = hours + ':' + minutes.substr(-2) + " "+day+"/"+month.substr(-2)+"/"+year;
    byId("upDate").innerText = formattedDate;
})
