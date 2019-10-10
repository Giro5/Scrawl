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
                    <p class="desc">${descrip}</p>
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