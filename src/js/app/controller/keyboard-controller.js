"use strict";

function KeyboardController ()
{
    var _self = this,
        _keysPressedArray = []; // an array for storing the order in which keys are pressed.

    // create an object containing the keycodes of keys
    // that we will be checking for later.
    _self.keys = {
        left: {code: 37, isKeyDown: false},
        up: {code: 38, isKeyDown: false},
        right: {code: 39, isKeyDown: false},
        //down: {code: 40, isKeyDown: false},
        lastKeyPressed: null,
    };

    // a public variable that details the number of keys that are
    // currently pressed down (only including the keys we are checking for).
    _self.totalKeysDown = 0;

    _self.init = function ()
    {
        // add a listener for the 'keydown' event, which fires when any
        // key on the keyboard is pressed down.
        // when this happens, the 'keyDownHandler' function is run.
        window.addEventListener ("keydown", keyDownHandler, false);

        // add a listener for the 'keyup' event, which fires when any
        // key on the keyboard which was previously pressed down is released.
        // when this happens, the 'keyUpHandler' function is run.
        window.addEventListener ("keyup", keyUpHandler, false);
    };

    _self.destroy = function ()
    {
        // remove the listener for the 'keydown' event.
        window.removeEventListener ("keydown", keyDownHandler);

        // remove the listener for the 'keyup' event.
        window.removeEventListener ("keyup", keyUpHandler);
    };

    // an event object is automatically passed to this function from the
    // 'keydown' event listener when a key is pressed.
    function keyDownHandler (event)
    {
        // 'keyCode' is a default property of the event object - a part
        // of the core javascript language.

        // we use a switch statement to check if the key code is equal to any of the
        // ones we put in the 'keys' object that we defined earlier.
        switch (event.keyCode)
        {
            case _self.keys.left.code :

                // the key code is equal to the value stored in 'keys.left.code'.
                // run the 'updateKeyDownState' function, passing in the relavant
                // object and 'true' to set its 'isKeyDown' property.
                updateKeyDownState(_self.keys.left, true);
                break;

            case _self.keys.up.code :

                // the key code is equal to the value stored in 'keys.up.code'.
                // run the 'updateKeyDownState' function, passing in the relavant
                // object and 'true' to set its 'isKeyDown' property.
                updateKeyDownState(_self.keys.up, true);
                break;

            case _self.keys.right.code :

            // the key code is equal to the value stored in 'keys.right.code'.
                // run the 'updateKeyDownState' function, passing in the relavant
                // object and 'true' to set its 'isKeyDown' property.
                updateKeyDownState(_self.keys.right, true);
                break;

            // case _self.keys.down.code :

            //     // the key code is equal to the value stored in 'keys.down.code'.
            //     // run the 'updateKeyDownState' function, passing in the relavant
            //     // object and 'true' to set its 'isKeyDown' property.
            //     updateKeyDownState(_self.keys.down, true);
            //     break;
        }
    }

    function keyUpHandler (event)
    {
        switch (event.keyCode)
        {
            case _self.keys.left.code :

                // the key code is equal to the value stored in 'keys.left.code'.
                // run the 'updateKeyDownState' function, passing in the relevant
                // object and 'false' to set its 'isKeyDown' property.
                updateKeyDownState(_self.keys.left, false);
                break;

            case _self.keys.up.code :

                // the key code is equal to the value stored in 'keys.up.code'.
                // run the 'updateKeyDownState' function, passing in the relevant
                // object and 'false' to set its 'isKeyDown' property.
                updateKeyDownState(_self.keys.up, false);
                break;

            case _self.keys.right.code :

                // the key code is equal to the value stored in 'keys.right.code'.
                // run the 'updateKeyDownState' function, passing in the relevant
                // object and 'false' to set its 'isKeyDown' property.
                updateKeyDownState(_self.keys.right, false);
                break;

            // case _self.keys.down.code :

            //     // the key code is equal to the value stored in 'keys.down.code'.
            //     // run the 'updateKeyDownState' function, passing in the relevant
            //     // object and 'false' to set its 'isKeyDown' property.
            //     updateKeyDownState(_self.keys.down, false);
            //     break;
        }

        // console.log("[keyUpHandler] keycode: " + event.keyCode);
        // console.log("total keys down: " + _self.totalKeysDown);
    }

    // this function sets the 'isKeyDown' property on whichever object is
    // passed in as the first parameter, based on the second 'isKeyDown' parameter.
    function updateKeyDownState (key, isKeyDown)
    {
        if (key.isKeyDown === isKeyDown) return;

        var releasedKeyArrayIndex;

        key.isKeyDown = isKeyDown;

        if(isKeyDown === true)
        {
            _keysPressedArray.push(key.code);
            _self.keys.lastKeyPressed = key.code;
            // the key state is pressed down, so increase the value of our variable for
            // the total amount of keys that are down.
            _self.totalKeysDown++;
        }
        else
        {
            // find index of released key and remove it from the array.
            releasedKeyArrayIndex = _keysPressedArray.indexOf(key.code);
            _keysPressedArray.splice(releasedKeyArrayIndex, 1);

            // the key state is released, so decrease the value of our variable for
            // the total amount of keys that are down.
            _self.totalKeysDown--;

            if (_self.totalKeysDown === 0)
            {
                _self.keys.lastKeyPressed = null;
            }
            else
            {
                // set the 'lastKeyPressed' property to equal the code of the calue in the last index of 'keysPressedArray'.
                _self.keys.lastKeyPressed = _keysPressedArray[_keysPressedArray.length - 1];
            }
        }
    }
}

module.exports = new KeyboardController();