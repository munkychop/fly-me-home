"use strict";

var _pixi = require("pixi.js");
var _eventConstants = require("model/event-constants");
var _assetManager = require("model/asset-manager");
var _umbrellaController = require("controller/umbrella-controller");

var _stage;
var _renderer;

document.addEventListener("DOMContentLoaded", init);

function init (event)
{
    console.log("init");

    _stage = new _pixi.Stage(0xb3ebde);
    _renderer = _pixi.autoDetectRenderer(1024, 600);

    // add the renderer view element to the DOM.
    document.body.appendChild(_renderer.view);

    // TODO : render loading text/animation.

    // preload all assets.
    _assetManager.on(_eventConstants.PRELOAD_COMPLETE, preloadCompleteHandler);
    _assetManager.preloadAssets();
}

function preloadCompleteHandler ()
{
    console.log("app:: [preloadCompleteHandler]");

    // cleanup event listeners.
    _assetManager.off(_eventConstants.PRELOAD_COMPLETE, preloadCompleteHandler);


    _umbrellaController.init(_renderer.width, _renderer.height);
    _stage.addChild(_umbrellaController.view);

    // start the main animation loop.
    requestAnimationFrame(animate);
}

function animate ()
{ 
    requestAnimationFrame(animate);

    _umbrellaController.update();

    // render the stage   
    _renderer.render(_stage);
}