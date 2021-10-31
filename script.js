var my_ip = document.getElementById('my_ip');
var input = document.querySelector('.inputIP');
var button = document.querySelector('.submit');
var ip = document.getElementById('ip');
var hostname = document.getElementById('hostname');
var city = document.getElementById('city');
var region = document.getElementById('region');
var pin = document.getElementById('pin');
var coords = document.getElementById('coords');
var org = document.getElementById('org');
var timezone = document.getElementById('timezone');

fetch('https://api.ipify.org/?format=json')  //fetching API to show current IP Address
    .then(response => response.json())
    .then(data => {
        my_ip.innerHTML = "Your IP Address: " + data['ip'];
    })
button.addEventListener('click', function (name) {     //Submit button event listener to show info about the user specified IP Address
    ip.innerHTML = "Fetching IP Address Information...";
    fetch('https://ipinfo.io/' + input.value + '/geo')
        .then(response => response.json())
        .then(data => {
            ip.innerHTML = "IP Address: " + data['ip'];
            city.innerHTML = "City: " + data['city'];
            hostname.innerHTML = "Host Name: " + data['hostname'];
            region.innerHTML = "Region: " + data['region'] + ", " + data['country'];
            coords.innerHTML = "Co-ordinates: " + data['loc'];
            org.innerHTML = "Organization: " + data['org'];
            pin.innerHTML = "PIN Code: " + data['postal'];
            timezone.innerHTML = "Timezone: " + data['timezone'];
        })
        .catch(err => ip.innerHTML = "Wrong Input!");
})
