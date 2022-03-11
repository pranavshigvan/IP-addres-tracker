const form = document.getElementById("form")
const input = document.getElementById("ip_input")
const ip = document.getElementById("ip")
const ipLocation = document.getElementById("location")
const timezone = document.getElementById("timezone")
const isp = document.getElementById("isp")


// $.getJSON("https://api.ipify.org?format=json", function(data) {
//         getIpData(data.ip)
//     })

const setDefault = ()=>{
    fetch("https://api.ipify.org?format=json")
    .then( res => res.json())
    .then( data => getIpData(data.ip))
}
setDefault()

form.onsubmit =(e)=>{
    e.preventDefault()
    getIpData(input.value)
    input.value = ""
}

const getIpData = (ipAddress)=>{
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_RRCIwZGYIT4rEO3r7yZghMQ9WzCcG&ipAddress=${ipAddress}`)
    .then( res => res.json())
    .then( data => {
        setMap(data.location.lng,data.location.lat)
        setPageData(data)
    })
    .catch( error => {
        form.className = "error"
    })
}

const setMap = (lng,lat)=>{
    mapboxgl.accessToken = 'pk.eyJ1IjoicHJhbmF2c2hpZ3ZhbiIsImEiOiJjbDBqcWR5MjMwMTZ2M2pwN3QycTF3MWxxIn0.EZNftBJ6_KR16TRqaXOQnw';
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [lng, lat], // starting position [lng, lat]
    zoom: 13 // starting zoom
    });
}
const setPageData = (data)=>{
    ip.innerText = data.ip;
    ipLocation.innerText = `${data.location.country},${data.location.region},${data.location.city}`;
    timezone.innerText = `UTC${data.location.timezone}`;
    isp.innerText = data.isp;
} 