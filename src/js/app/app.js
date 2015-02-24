"use strict";

var _pixi = require("pixi.js");
var _eventConstants = require("model/event-constants");
var _assetManager = require("model/asset-manager");
var _umbrellaController = require("controller/umbrella-controller");
var _heroController = require("controller/hero-controller");

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

    var w = _renderer.width;
    var h = _renderer.height;

    _umbrellaController.init(w, h);
    _stage.addChild(_umbrellaController.view);

    _heroController.init(w, h);
    _stage.addChild(_heroController.view);

    // start the main animation loop.
    requestAnimationFrame(animate);
}

function animate ()
{ 
    requestAnimationFrame(animate);

    _umbrellaController.update();
    _heroController.update();

    //_collisionManager.checkForCollisions(collisionHandler);

    // render the stage   
    _renderer.render(_stage);
}

//function collisionHandler(displayObject, collidable){}