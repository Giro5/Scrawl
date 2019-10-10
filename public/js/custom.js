//global var
var _body = document.getElementsByTagName("body")[0];
var _content = document.getElementById("content");
var locale = "";
var logos = {
    "en": "Hieroglyphs from Sekiro: Shadows Die Twice",
    "ru": "Иероглифы из Sekiro: Shadows Die Twice"
};
var footers = {
    "en": "Copyright (c) 2019 Giro. The site was created by a person who doesn't know Japanese and doesn't know English well. Supported by a weebs.",
    "ru": "Copyright (c) 2019 Giro. Сайт был создан человеком, который не знает Японский и плохо знает Английский. При поддержке анимешника."
};
var filters = {
    "en": ["Items", "Status", "Other"],
    "ru": ["Предметы", "Статусы", "Другое"]
};
var zero_scrawl = {
    "en": "Nothing",
    "ru": "Ничего"
};
var scrawls = {};

//global functions
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "json/hieroglyphs.json", true);
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
        }
    }
    else {
        _content.style.width = "800px";
        for (var el of collel) {
            el.setAttribute("style", "");
        }
    }
};

function ScrawlString(glyph, value, descrip, styleback, styletext) {
    return `
            <div class=\"scrawl\" id=\"${glyph}\">
                <div class=\"hieroglyph\" style=\"${styleback}\">
                    <a style=\"${styletext}\" href=\"img\\${glyph}.jpg\" target="_blank">${glyph}</a>
                </div>
                <div class=\"inf\">
                    <p>${value}</p>
                    <p>${descrip}</p>
                </div>
            </div>`;
}

function ScrawlBlocks(scrawl) {
    //console.log(Object.keys(scrawl).length);
    _content.innerHTML = "";
    for (var i in scrawl) {
        if (document.getElementsByClassName("filter")[0].style.textDecorationLine == "line-through"
            && scrawl[i].type == "item") {
            continue;
        }
        if (document.getElementsByClassName("filter")[1].style.textDecorationLine == "line-through"
            && scrawl[i].type == "status") {
            continue;
        }
        if (document.getElementsByClassName("filter")[2].style.textDecorationLine == "line-through"
            && scrawl[i].type == "other") {
            continue;
        }
        var styleText = "";
        var styleBack = "";
        if (typeof (scrawl[i].color) != "string") {
            styleBack = `background:linear-gradient(${scrawl[i].color.join(",")});
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;`;
        }
        else {
            styleText = `color:${scrawl[i].color};`;
        }
        _content.innerHTML += ScrawlString(
            i,
            scrawl[i].value[locale],
            scrawl[i].description[locale],
            styleBack,
            styleText
        );
    }
    console.log("count scrawl " + _content.getElementsByClassName("scrawl").length);
    if (_content.getElementsByClassName("scrawl").length == 0) {
        _content.innerHTML += ScrawlString("何も", zero_scrawl[locale], "^_^", "", "color:#e5e0e5;");
    }
};

//defining locale language
switch (window.navigator.language) {
    case "ru":
        locale = "ru";
        break;
    case "en":
    default:
        locale = "en";
        break;
}


//setting the language
document.getElementsByTagName("html")[0].setAttribute("lang", locale);
document.getElementsByTagName("title")[0].innerText = logos[locale];
document.getElementById("logo").innerText = logos[locale];
for (var i = 0; i < filters["en"].length; i++)
    document.getElementById("filters").innerHTML += `<div class="filter">${filters[locale][i]}</div>`;
document.getElementById("footer").innerText = footers[locale];

//first connection to json
loadJSON(function (scrawl) {
    console.dir(scrawl);
    ScrawlBlocks(scrawl);
    scrawls = scrawl;
    changeSizeContent();
});

console.log(document.location.href);
console.log();

//defining the window resolution
_body.onresize = function () {
    changeSizeContent();
};

//changing bg
setInterval(function () {
    // _body.style.backgroundImage = `url(/img/bg/${k == 10 ? k = 0 : ++k}.jpg)`;
    document.getElementById("wrapper").style.backgroundImage = `url(img/bg/${k == 10 ? k = 0 : ++k}.jpg)`;
    console.log(k);
}, 20000, k = 0);

//loading other bg
for (var i = 1; i < 11; i++) {
    var img = new Image();
    img.src = `img/bg/${i}.jpg`;
}

//set an event on filters
for (var i = 0; i < 3; i++) {
    document.getElementsByClassName("filter")[i].onclick = function () {
        if (this.style.textDecorationLine == "") {
            this.style.textDecorationLine = "line-through";
        }
        else
            this.style.textDecorationLine = "";
        // loadJSON(function (scrawl) {
        //     ScrawlBlocks(scrawl);
        //     changeSizeContent();
        // });
        ScrawlBlocks(scrawls);
    };
}

document.getElementById("lang").onchange = function (e) {
    console.log(e.target.value);
    locale = e.target.value;
    document.getElementsByTagName("html")[0].setAttribute("lang", locale);
    document.getElementsByTagName("title")[0].innerText = logos[locale];
    document.getElementById("logo").innerText = logos[locale];
    document.getElementById("filters").innerHTML = "";
    for (var i = 0; i < filters["en"].length; i++)
        document.getElementById("filters").innerHTML += `<div class="filter">${filters[locale][i]}</div>`;
    document.getElementById("footer").innerText = footers[locale];
    ScrawlBlocks(scrawls);
    for (var i = 0; i < 3; i++) {
        document.getElementsByClassName("filter")[i].onclick = function () {
            if (this.style.textDecorationLine == "") {
                this.style.textDecorationLine = "line-through";
            }
            else
                this.style.textDecorationLine = "";
            // loadJSON(function (scrawl) {
            //     ScrawlBlocks(scrawl);
            //     changeSizeContent();
            // });
            ScrawlBlocks(scrawls);
        };
    }
};

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