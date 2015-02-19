function AssetManager ()
{
    var _pixi = require("pixi.js");
    var _bullet = require("bullet-pubsub");
    var _eventConstants = require("model/event-constants");

    var _self = this;
    var _assetLoader;
    var _assets = ["img/collectibles/umbrella.png"];

    function preloadAssets ()
    {
        _assetLoader = new _pixi.AssetLoader(_assets);
        _assetLoader.addEventListener("onProgress", loadProgressHandler);
        _assetLoader.addEventListener("onComplete", loadCompleteHandler);
        _assetLoader.load();
    }

    function loadProgressHandler (event)
    {
        //var percentLoaded = event.content.loadCount / event.content.assetURLs.length;

        console.log("AssetManager:: [loadProgressHandler] event:", event);

        _bullet.trigger(_eventConstants.PRELOAD_PROGRESS);//, percentLoaded);
    }

    function loadCompleteHandler (event)
    {
        _assetLoader.removeEventListener("onProgress", loadProgressHandler);
        _assetLoader.removeEventListener("onComplete", loadCompleteHandler);

        console.log("AssetManager:: [loadCompleteHandler] event:", event);

        _bullet.trigger(_eventConstants.PRELOAD_COMPLETE);
    }

    function on (eventName, cb)
    {
        // throw an error if the event name doesn't exist within the _eventConstants object.
        if (typeof _eventConstants[eventName] === "undefined") throw new Error("The event named: " + eventName + " doesn't exist within event-constants.js");
        
        _bullet.on(eventName, cb);
    }

    function off (eventName, cb)
    {
        // throw an error if the event name doesn't exist within the _eventConstants object.
        if (typeof _eventConstants[eventName] === "undefined") throw new Error("The event named: " + eventName + " doesn't exist within event-constants.js");
        
        _bullet.off(eventName, cb);
    }

    return {
        preloadAssets : preloadAssets,
        on : on,
        off : off
    };
}

module.exports = new AssetManager();