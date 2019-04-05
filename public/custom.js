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
    }
    else {
        _body.innerHTML = "<div class=\"logo\">Japanese by Sekiro: Shadows Die Twice</div>";
    }

    for (var i = 0; i < Object.keys(scrawl).length; i++) {
        if (window.navigator.language == "ru")
            _body.innerHTML += "<br><div class=\"scrawl\"><div class=\"hieroglyph\" style=\"color:" + scrawl[i].color
                + "\">" + String(scrawl[i].hieroglyph).split("").map(function (str) { return str = "<p>" + str; }).join("")
                + "</div><div>" + scrawl[i].value_ru + "</div><div>" + scrawl[i].description_ru + "</div></div>";
        else
            _body.innerHTML += "<br><div class=\"scrawl\"><div class=\"hieroglyph\" style=\"color:" + scrawl[i].color
                + "\">" + String(scrawl[i].hieroglyph).split("").map(function (str) { return str = "<p>" + str; }).join("")
                + "</div><div>" + scrawl[i].value + "</div><div>" + scrawl[i].description + "</div></div>";
    }
    // var glphs = document.getElementsByClassName("hieroglyph");
    // for (var i = 0; i < glphs.length; i++) {
    //     glphs
    // }

    _body.innerHTML += "<div class=\"footer\">Copyright (c) 2019 Giro. The site was created by a person who does not know Japanese and does not know English well. With support anime-viewer.</div>"
});

//second method
//< script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" ></script >
// $.getJSON("hieroglyphs.json", function (myjson) {
//     console.dir(myjson);
// });

/*var scrawl = {
    "0": {
        "hieroglyph": "隻狼",
        "pronunciation": "sekiro",
        "value": "One-armed wolf",
        "value_ru": "Однорукий волк",
        "description": "Character moniker & game title",
        "description_ru": "Кличка персонажа и название игры",
        "隻": {
            "pronunciation": "seki",
            "value": "One-armed"
        },
        "狼": {
            "pronunciation": "okami",
            "value": "Wolf"
        }
    },
    "1": {
        "hieroglyph": "死",
        "pronunciation": "shi",
        "value": "Death",
        "value_ru": "Смерть",
        "description": "At the moment of death",
        "description_ru": "При смерти"
    },
    "2": {
        "hieroglyph": "危",
        "pronunciation": "ki",
        "value": "Dangerous attack",
        "value_ru": "Берегись",
        "description": "At the moment of a dangerous attack",
        "description_ru": "При опасной атаке"
    },
    "3": {
        "hieroglyph": "治",
        "pronunciation": "osamu",
        "value": "Heal",
        "value_ru": "Лечение",
        "description": "At the moment of use a healing gourd",
        "description_ru": "При испоьзовании лечащей тыквы"
    },
    "4": {
        "hieroglyph": "回生",
        "pronunciation": "kaisei",
        "value": "Resurrection",
        "value_ru": "Воскрешение",
        "description": "At the moment of resurrection",
        "description_ru": "При воскрешении",
        "回": {
            "pronunciation": "kai",
            "value": "Times"
        },
        "生": {
            "pronunciation": "nama",
            "value": "Birth"
        }
    },
    "5": {
        "hieroglyph": "冥助あリ",
        "pronunciation": "mei suke a ri",
        "value": "Unseen aid",
        "value_ru": "Невидимая помощь",
        "description": "At the moment of activation of an unseen aid",
        "description_ru": "При срабатывании невидимой помощи",
        "冥": {
            "pronunciation": "mei",
            "value": "Moth"
        },
        "助": {
            "pronunciation": "suke",
            "value": "Assistant"
        },
        "あ": {
            "pronunciation": "a",
            "value": "Ah"
        },
        "リ": {
            "pronunciation": "ri",
            "value": "The"
        }
    },
    "6": {
        "hieroglyph": "吽護",
        "pronunciation": "un mamoru",
        "value": "Protection",
        "value_ru": "Защита",
        "description": "At the moment of use a Ungo's sugar",
        "description_ru": "При использовании леденца Унго",
        "吽": {
            "pronunciation": "un",
            "value": "Moth"
        },
        "護": {
            "pronunciation": "mamoru",
            "value": "Protection"
        }
    },
    "7": {
        "hieroglyph": "毒",
        "pronunciation": "docu",
        "value": "Poison",
        "value_ru": "Яд",
        "description": "At the moment of poisoning",
        "description_ru": "При отравлении"
    }
}*/