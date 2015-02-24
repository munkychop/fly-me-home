"use strict";

var _pixi = require("pixi.js");
var _assetManager = require("model/asset-manager");
var _keyboardController = require("controller/keyboard-controller");

function HeroController ()
{
    var WALK_SPEED = 5;

    var _self = this;
    var _x = 0;
    var _y = 0;
    var _minPosX;
    var _maxPosX;

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

        var halfHeroWidth = _self.view.width * 0.5;

        _minPosX = halfHeroWidth;
        _maxPosX = _self.canvasWidth - halfHeroWidth;

        _keyboardController.init();

        // TODO : add gravity
    };

    _self.destroy = function ()
    {
        // TODO : remove keyboard listeners etc.
    };

    _self.update = function ()
    {
        if (_keyboardController.keys.left.isKeyDown)
        {
            // move left
            _x -= WALK_SPEED;

            if (_x < _minPosX) _x = _minPosX;
        }
        
        if (_keyboardController.keys.right.isKeyDown)
        {
            // move right
            _x += WALK_SPEED;

            if (_x > _maxPosX) _x = _maxPosX;
        }

        // TODO : jump
        // if (_keyboardController.keys.up.isKeyDown)
        // {
        // }

        _self.view.position.x = _x;
        _self.view.position.y = _y;
    };
}

module.exports = new HeroController();