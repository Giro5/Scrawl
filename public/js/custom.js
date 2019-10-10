//global var
let _body = document.getElementsByTagName("body")[0];
let _content = document.getElementById("content");
let locale = "";
let scrawls;

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
for (var i = 0; i < filters[locale].length; i++)
    document.getElementById("filters").innerHTML += `<div class="filter">${filters[locale][i]}</div>`;
document.getElementById("footer").innerText = footers[locale];

//first connection to json
loadJSON(function (scrawl) {
    console.dir(scrawl);
    ScrawlBlocks(scrawl);
    scrawls = scrawl;
    changeSizeContent();
});

//defining the window resolution
_body.onresize = function () {
    changeSizeContent();
};

//changing bg
setInterval(function () {
    _body.style.backgroundImage = `url(/img/bg/${k == 10 ? k = 0 : ++k}.jpg)`;
    // document.getElementById("wrapper").style.backgroundImage = `url(img/bg/${k == 10 ? k = 0 : ++k}.jpg)`;
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