console.log(2);
var doc = document,
    docEl = document.documentElement,
    body = doc.body,
    win = window;

var slider = doc.createElement('div'),
    sliderSize = doc.createElement('div'),
    controller = doc.createElement('div'),
    sliderContent = doc.createElement('iframe'),
    scale = 0.1,
    realScale = scale;

slider.className = 'slider';
sliderSize.className = 'slider__size';
controller.className = 'slider__controller';

sliderContent.className += ' slider__content';
sliderContent.style.transformOrigin = '0 0';

slider.appendChild(sliderSize);
slider.appendChild(controller);
slider.appendChild(sliderContent);
body.appendChild(slider);

// var html = doc.documentElement.outerHTML.replace(/<script([\s\S]*?)>([\s\S]*?)<\/script>/gim, '');
var html = doc.getElementById("wrapper").innerHTML;

var script = '<script>var slider=document.querySelector(".slider"); slider.parentNode.removeChild(slider);</script>';

// html = html.replace('</body>', script + '</body>');

var iframeDoc = sliderContent.contentWindow.document;

iframeDoc.open();
iframeDoc.write(html);
console.dir(html);
iframeDoc.close();


function getDimensions() {
    var bodyWidth = body.clientWidth,
        bodyRatio = body.clientHeight / bodyWidth,
        winRatio = win.innerHeight / win.innerWidth;

    slider.style.width = (scale * 100) + '%';

    // Рассчитать фактический масштаб в случае установки max-width/min-width.
    realScale = slider.clientWidth / bodyWidth;

    sliderSize.style.paddingTop = (bodyRatio * 100) + '%';
    controller.style.paddingTop = (winRatio * 100) + '%';

    sliderContent.style.transform = 'scale(' + realScale + ')';
    sliderContent.style.width = (100 / realScale) + '%';
    sliderContent.style.height = (100 / realScale) + '%';
}

getDimensions();
win.addEventListener('resize', getDimensions);
win.addEventListener('load', getDimensions);

function trackScroll() {
    controller.style.transform = 'translate(' +
        ((win.pageXOffset * realScale)) + 'px, ' +
        ((win.pageYOffset * realScale)) + 'px)';
}

win.addEventListener('scroll', trackScroll);

var mouseY = 0,
    mouseX = 0,
    mouseDown = false;

function pointerDown(e) {
    e.preventDefault();
    mouseDown = true;
    mouseX = e.touches ? e.touches[0].clientX : e.clientX;
    mouseY = e.touches ? e.touches[0].clientY : e.clientY;

    var offsetX = ((mouseX - slider.offsetLeft) - (controller.clientWidth / 2)) / realScale;
    var offsetY = ((mouseY - slider.offsetTop) - (controller.clientHeight / 2)) / realScale;

    win.scrollTo(offsetX, offsetY);
}
slider.addEventListener('mousedown', pointerDown);
slider.addEventListener('touchdown', pointerDown);

function pointerMove(e) {
    if (mouseDown) {
        e.preventDefault();

        var x = e.touches ? e.touches[0].clientX : e.clientX,
            y = e.touches ? e.touches[0].clientY : e.clientY;

        win.scrollBy((x - mouseX) / realScale, ((y - mouseY) / realScale));
        mouseX = x;
        mouseY = y;
    }
}
win.addEventListener('mousemove', pointerMove);
win.addEventListener('touchmove', pointerMove);

function pointerReset(e) { mouseDown = false; }
win.addEventListener('mouseup', pointerReset);
win.addEventListener('touchend', pointerReset);

function pointerLeave(e) {
    if (e.target === body) { mouseDown = false; }
}
body.addEventListener('mouseleave', pointerLeave);
body.addEventListener('touchleave', pointerLeave);

console.log(2);