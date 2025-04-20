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

// Regex for validating IP
function isValidIP(ip) {
    const ipv4 = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    const ipv6 = /^(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})$/;
    return ipv4.test(ip) || ipv6.test(ip);
}

function clearIPInfo() {
    ip.innerHTML = "";
    city.innerHTML = "";
    hostname.innerHTML = "";
    region.innerHTML = "";
    coords.innerHTML = "";
    org.innerHTML = "";
    pin.innerHTML = "";
    timezone.innerHTML = "";
}

// Function to fetch and display IP info
function fetchIPInfo(targetIP) {
    ip.innerHTML = "Fetching IP Address Information...";
    fetch('https://ipinfo.io/' + targetIP + '/geo')
        .then(response => response.json())
        .then(data => {
            ip.innerHTML = "IP Address: " + data.ip;
            city.innerHTML = "City: " + data.city;
            hostname.innerHTML = "Host Name: " + (data.hostname || "Unavailable");
            region.innerHTML = "Region: " + data.region + ", " + data.country;
            coords.innerHTML = "Co-ordinates: " + data.loc;
            org.innerHTML = "Organization: " + data.org;
            pin.innerHTML = "PIN Code: " + data.postal;
            timezone.innerHTML = "Timezone: " + data.timezone;
        })
        .catch(err => ip.innerHTML = "Error fetching IP info!");
}

// Get and display user's IP
fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => {
        my_ip.innerHTML = "Your IP Address: " + data.ip;
        fetchIPInfo(data.ip);  // Fetch info about user's IP on load
    });

// Button click handler
button.addEventListener('click', () => {
    const userInput = input.value.trim();
    if (isValidIP(userInput)) {
        fetchIPInfo(userInput);
    } else {
        clearIPInfo();  // Clear previous data
        ip.innerHTML = "Invalid IP address format!";
    }
});
