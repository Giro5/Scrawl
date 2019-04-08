//first method
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

loadJSON(function (scrawl) {
    console.dir(scrawl);

    var _body = document.getElementsByTagName("body")[0];

    if (window.navigator.language == "ru") {
        _body.innerHTML = "<div class=\"logo\">Японский по Sekiro: Shadows Die Twice</div>";
        document.getElementsByTagName("title")[0].innerText = "Японский по Sekiro: Shadows Die Twice";
    }

    //for (var i = 0; i < Object.keys(scrawl).length; i++) {
    for (var i in scrawl) {
        console.log(i);
        var scl = scrawl[i];
        if (window.navigator.language == "ru") {
            _body.innerHTML += `<br>
            <div class=\"scrawl\">
                <div class=\"hieroglyph\">
                    <a style=\"color:${scl.color}\" href=\"img\\${i}.jpg\">${i}</a>
                </div>
                <div><p>${scl.value_ru}</p>
                <p>${scl.description_ru}</p></div>
            </div>`;
        }
        else {
            _body.innerHTML += `<br>
            <div class=\"scrawl\">
                <div class=\"hieroglyph\">
                    <a style=\"color:${scl.color}\" href=\"img\\${i}.jpg\">${i}</a>
                </div>
                <div>${scl.value}</div>
                <div>${scl.description}</div>
            </div>`;
        }
    }

    _body.innerHTML += "<br><div class=\"footer\">Copyright (c) 2019 Giro. The site was created by a person who does not know Japanese and does not know English well. With support anime-viewer.</div>"
});

//second method
//< script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" ></script >
// $.getJSON("hieroglyphs.json", function (myjson) {
//     console.dir(myjson);
// });