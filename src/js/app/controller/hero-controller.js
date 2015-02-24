"use strict";

var _pixi = require("pixi.js");
var _assetManager = require("model/asset-manager");

function HeroController ()
{
    var _self = this;
    var _x = 0;
    var _y = 0;

    _self.view = undefined;
    _self.canvasWidth = 0;
    _self.canvasHeight = 0;

    _self.init = function (w, h)
    {
        _self.view = new _pixi.Sprite.fromImage(_assetManager.spriteSheets.hero);
        
        _self.canvasWidth = w;
        _self.canvasHeight = h;

        _x = w * 0.5;
        _y = h - (_self.view.height * 0.5);

        _self.view.anchor.x = _self.view.anchor.y = 0.5; // centre the sprite's anchor point.
        _self.view.position.x = _x;
        _self.view.position.y = _y;

        // TODO : add gravity
        // TODO : add keyboard controls
    };

    _self.update = function ()
    {
        _self.view.position.x = _x;
        _self.view.position.y = _y;
    };
}

module.exports = new HeroController();