//global var
var _body = document.getElementsByTagName("body")[0];
var _content = document.getElementById("content");
//functions
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
    if (_body.clientWidth < 800) {
        // console.log("now auto");
        _content.style.width = "auto";
    }
    else {
        // console.log("now 800");
        _content.style.width = "800px";
    }
};
function changeBackground(j) {
    console.log("next bg " + j);
    if (j == 6) {
        j = 0;
    }
    _body.style.backgroundImage = `url(/img/bg/${j}.jpg)`;
    return ++j;
};

loadJSON(function (scrawl) {
    console.dir(scrawl);

    var locale = "en";

    if (window.navigator.language == "ru") {
        //_body.innerHTML = "<div class=\"logo\">Японский по Sekiro: Shadows Die Twice</div>";
        document.getElementById("logo").innerText = "Японский по Sekiro: Shadows Die Twice";
        document.getElementsByTagName("title")[0].innerText = "Японский по Sekiro: Shadows Die Twice";
        locale = "ru";
    }

    //for (var i = 0; i < Object.keys(scrawl).length; i++) {
    for (var i in scrawl) {
        //console.log(i);
        var scl = scrawl[i];

        _content.innerHTML += `<br>
            <div class=\"scrawl\">
                <div class=\"hieroglyph\">
                    <a style=\"color:${scl.color}\" href=\"img\\${i}.jpg\">${i}</a>
                </div>
                <div class=\"characteristic\">
                    <p>${scl.value[locale]}</p>
                    <p>${scl.description[locale]}</p>
                </div>
            </div>`;
    }

    // _body.innerHTML += `<br>
    // <div class=\"footer\">
    // Copyright (c) 2019 Giro. 
    // The site was created by a person who does not know Japanese and does not know English well. 
    // With support anime-viewer.
    // </div>`;
});

changeSizeContent();

_body.onresize = function () {
    changeSizeContent();
};

changeBackground(0);
var j = 1;
setInterval(function () {
    j = changeBackground(j);
}, 20000);

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