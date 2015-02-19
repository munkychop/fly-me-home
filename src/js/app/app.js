var PIXI = require("pixi.js");

var _stage = new PIXI.Stage(0x0);
var _renderer = PIXI.autoDetectRenderer(1024, 768);

document.addEventListener("DOMContentLoaded", init);

function init (event)
{
    console.log("init");

    // add the renderer view element to the DOM
    document.body.appendChild(_renderer.view);

    requestAnimFrame(animate);
}

function animate()
{ 
    requestAnimFrame(animate);

    // render the stage   
    _renderer.render(stage);
}