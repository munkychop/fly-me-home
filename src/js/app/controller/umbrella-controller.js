"use strict";

var _pixi = require("pixi.js");
var _assetManager = require("model/asset-manager");

function UmbrellaController ()
{
    var TOTAL_UMBRELLAS = 10;
    var MOVE_DISTANCE_Y = 4;

    var _self = this;

    _self.view = new _pixi.DisplayObjectContainer();
    _self.canvasWidth = 0;
    _self.canvasHeight = 0;

    _self.init = function (w, h)
    {
        _self.canvasWidth = w;
        _self.canvasHeight = h;

        // add all the umbrellas to the stage.
        var i = 0;
        var umbrellaSprite;
        var randomPosX;
        var randomPosY;
        
        for (i; i < TOTAL_UMBRELLAS; i++)
        {
            umbrellaSprite = new _pixi.Sprite.fromImage(_assetManager.spriteSheets.umbrella);

            randomPosX = Math.round(Math.random() * _self.canvasWidth);
            randomPosY = Math.round(Math.random() * _self.canvasHeight);

            // centre the sprite's anchor point.
            umbrellaSprite.anchor.x = umbrellaSprite.anchor.y = 0.5;

            umbrellaSprite.position.x = randomPosX;
            umbrellaSprite.position.y = randomPosY;

            _self.view.addChild(umbrellaSprite);
        }
    };

    _self.update = function ()
    {
        var i = 0;
        var totalSprites = _self.view.children.length;
        var umbrellaSprite;
        var halfSpriteHeight;
        var yPos;
        
        for (i; i < totalSprites; i++)
        {
            umbrellaSprite = _self.view.getChildAt(i);

            halfSpriteHeight = umbrellaSprite.height * 0.5;

            yPos = umbrellaSprite.position.y + MOVE_DISTANCE_Y;

            if (yPos > _self.canvasHeight + halfSpriteHeight)
            {
                // randomize x position.
                umbrellaSprite.position.x = Math.round(Math.random() * _self.canvasWidth);

                // reset y position to the top.
                yPos = -halfSpriteHeight;
            }

            umbrellaSprite.position.y = yPos;
        }
    };
}

module.exports = new UmbrellaController();