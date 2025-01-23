$(document).ready(function(){
    var accessKey="T2UzUC05Mi1qRTNUejZjYTNSMzk=";
    var secretKey = "UlZERHN5blYyYV91eVd5bEhfSmQ2ckI5LXUyc19neVhLQQ==";
    var deviceId = "dony01_IoT_device";
    var outputTemp = document.getElementById("output");

function startWeatherStation(){
var settings = {
  "url": "https://wizklub.com/api/secured/wiziot-poll-request/",
  "method": "POST",
  "dataType": "json",
  "contentType": "application/json; charset=utf-8",
  "headers": {"Api-Access-Key": accessKey, "Api-Secret-Key": secretKey, "Content-Type": "application/json"},
  "data": JSON.stringify({"mode": "WRITE", "device_id": deviceId, "source": "API", "api": "sensor", "sensor": "weather", "state": "start"}),
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
}
function fetchTemp(){
    var fetchsettings = {
  "url": "https://wizklub.com/api/secured/wiziot-poll-request/",
  "method": "POST",
  "dataType": "json",
  "contentType": "application/json; charset=utf-8",
  "headers": {"Api-Access-Key": accessKey, "Api-Secret-Key": secretKey , "Content-Type": "application/json"},
  "data": JSON.stringify({"mode": "READ", "device_id": deviceId, "source": "API", "api": "sensor", "sensor": "weather"}),
};

$.ajax(fetchsettings).done(function (response) {
    let temp=response.response.worker_response.iot.value.temperature
    let tempString="temperature: " + temp;
    console.log(tempString)
  console.log(response);
  $('#output').text(temp);
  displayTemp(tempString)
  outputTemp.innerHTML = tempString;
});
}

function displayTemp(temp)
{
    var settings = {
  "url": "https://wizklub.com/api/secured/wiziot-poll-request/",
  "method": "POST",
  "dataType": "json",
  "contentType": "application/json; charset=utf-8",
  "headers": {"Api-Access-Key": accessKey, "Api-Secret-Key": secretKey, "Content-Type": "application/json"},
  "data": JSON.stringify({"mode": "WRITE", "device_id": deviceId, "source": "API", "api": "oled", "type": "text", "msg_to_write": temp, "x_axis": "3", "y_axis": "3"}),
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
}

$('#button').click(function(){
    startWeatherStation();
    fetchTemp();
});

});
