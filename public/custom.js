//global var
var _body = document.getElementsByTagName("body")[0];
var _content = document.getElementById("content");
var locale = "en";
var logos = {
    "en": "Japanese by Sekiro: Shadows Die Twice",
    "ru": "Японский по Sekiro: Shadows Die Twice"
}
var footers = {
    "en": "Copyright (c) 2019 Giro. The site was created by a person who does not know Japanese and does not know English well. With support anime-viewer.",
    "ru": "Copyright (c) 2019 Giro. Сайт был создан человеком, не знающим Японский и плохо знающим Английский. С поддержкой анимешника."
}
//global functions
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "hieroglyphs.json", true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
};
function changeSizeContent() {
    var collel = document.getElementsByClassName("scrawl");
    if (_body.clientWidth < 800) {
        _content.style.width = "auto";
        for (var el of collel) {
            el.setAttribute("style", "flex-direction: column;");
            el.getElementsByClassName("hieroglyph")[0].setAttribute("style", "");
        }
    }
    else {
        _content.style.width = "800px";
        for (var el of collel) {
            el.setAttribute("style", "");
            el.getElementsByClassName("hieroglyph")[0].setAttribute("style", "padding-left: 15px;");
        }
    }
};

if (window.navigator.language == "ru")
    locale = "ru";

document.getElementsByTagName("title")[0].innerText = logos[locale];
document.getElementById("logo").innerText = logos[locale];

loadJSON(function (scrawl) {
    for (var i in scrawl) {
        _content.innerHTML += `<br>
            <div class=\"scrawl\">
                <div class=\"hieroglyph\">
                    <a style=\"color:${scrawl[i].color}\" href=\"img\\${i}.jpg\">${i}</a>
                </div>
                <div class=\"characteristic\">
                    <p>${scrawl[i].value[locale]}</p>
                    <p>${scrawl[i].description[locale]}</p>
                </div>
            </div>`;
    }
    changeSizeContent();
    document.getElementById("footer").innerText = footers[locale];
});

//defining the window resolution
_body.onresize = function () {
    changeSizeContent();
};

//change bg
setInterval(function () {
    _body.style.backgroundImage = `url(/img/bg/${k == 5 ? k = 0 : ++k}.jpg)`;
}, 20000, k = 0);

//loading other bg
for (var i = 1; i < 6; i++) {
    var img = new Image();
    img.src = `/img/bg/${i}.jpg`;
}

//methods of connection to json

//first method
// function loadJSON(callback) {
//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open("GET", "hieroglyphs.json", true);
//     xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//             callback(JSON.parse(xobj.responseText));
//         }
//     };
//     xobj.send(null);
// };
// loadJSON(function (myjson) {
//     console.dir(myjson);
// });

//second method
// < script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" ></script >
// $.getJSON("hieroglyphs.json", function (myjson) {
//     console.dir(myjson);
// });