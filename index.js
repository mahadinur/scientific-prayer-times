
function sin(theta) {
    return Math.sin((Math.PI / 180) * theta);
}

function cos(theta) {
    return Math.cos((Math.PI / 180) * theta);
}

function arccos(x) {
    return (180 / Math.PI) * Math.acos(x);
}

function arcsin(x) {
    return (180 / Math.PI) * Math.asin(x);
}

function cot(theta) {
    return 1 / Math.tan((Math.PI / 180) * theta);
}

function arccot(x) {
    return (180 / Math.PI) * Math.atan(1 / x);
}

function getDayNumber() {
    var date = new Date();
    var start = new Date(date.getFullYear(), 0, 1);
    return Math.floor((date - start) / 86400000) + 1;
}

var latitude = 43.745109;
var longitude = -79.213195;
var standard_meridian_est = -75;
var N = getDayNumber();
var B = (360 / 365) * (N - 81)
var declination = 23.45 * sin(B);
var E = 9.87 * sin(2 * B) - 7.53 * cos(B) - 1.5 * sin(B);
var DST = 0;

function solar_time_1(theta) {
    return (1 / 15) * arcsin((sin(theta) - sin(latitude) * sin(declination)) / (cos(latitude) * cos(declination))) + 6;
}

function solar_time_2(theta) {
    return (1 / 15) * arccos((sin(theta) - sin(latitude) * sin(declination)) / (cos(latitude) * cos(declination))) + 12;
}

function theta(solar_time) {
    return arcsin(sin(latitude) * sin(declination) + cos(latitude) * cos(declination) * cos(15 * (solar_time - 12)));
}

function local_time(solar_time) {
    return solar_time - (4 / 60) * (longitude - standard_meridian_est) - (1 / 60) * E + DST;
}

function hour(h) {
    var end = "PM";
    if (h - 12 < 0) {
        end = "AM";
    }
    var minutes = Math.floor((h % 1) * 60);
    var seconds = Math.floor(((h % 1) * 60 % 1) * 60);
    var hours = Math.floor(h % 12);
    if (h == 12) {
        hours = 12;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${end}`;
}

var dawn_solar = hour(solar_time_1(-15));
var dawn_local = hour(local_time(solar_time_1(-15)));

var noon_solar = hour(12);
var noon_local = hour(local_time(12));

var hanafi = 0;

var afternoon_solar = hour(solar_time_2(arccot(1 + hanafi + cot(theta(12)))));
var afternoon_local = hour(local_time(solar_time_2(arccot(1 + hanafi + cot(theta(12))))));

var sunset_solar = hour(solar_time_2(0));
var sunset_local = hour(local_time(solar_time_2(0)));

var dusk_solar = hour(solar_time_2(-15));
var dusk_local = hour(local_time(solar_time_2(-15)));

function update() {
    document.getElementById("dawn-solar").textContent = dawn_solar;
    document.getElementById("dawn-local").textContent = dawn_local;

    document.getElementById("noon-solar").textContent = noon_solar;
    document.getElementById("noon-local").textContent = noon_local;

    document.getElementById("afternoon-solar").textContent = afternoon_solar;
    document.getElementById("afternoon-local").textContent = afternoon_local;

    document.getElementById("sunset-solar").textContent = sunset_solar;
    document.getElementById("sunset-local").textContent = sunset_local;

    document.getElementById("dusk-solar").textContent = dusk_solar;
    document.getElementById("dusk-local").textContent = dusk_local;
}

window.onload = function() {
    update();
}

// console.log(`
//     Astronomical Dawn:\t\t${dawn}
//     Solar Noon:\t\t\t${noon}
//     Afternoon:\t\t\t${afternoon}
//     Sunset:\t\t\t${sunset}
//     Astronomical Dusk:\t\t${dusk}
// `);
