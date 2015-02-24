"use strict";

function CollisionManager ()
{
    var _self = this;
    var _collidables = [];

    _self.hero = undefined;

    function checkCollisions (collisionCallback)
    {
        var i = 0;
        var length = _collidables.length;
        var currentCollidable;
        var dx;
        var dy;

        for (i; i < length; i++)
        {
            currentCollidable = _collidables[i];

            dx = Math.abs(_self.hero.position.x - currentCollidable.position.x);

            // assumes centred anchor points.
            if (dx < (_self.hero.width * 0.5) + (currentCollidable.width * 0.5))
            {
                // x-axis is in collision range... check y-axis.
                dy = Math.abs(_self.hero.position.y - currentCollidable.position.y);

                // assumes centred anchor points.
                if (dy < (_self.hero.height * 0.5) + (currentCollidable.height * 0.5))
                {
                    // collision
                    collisionCallback({hero: _self.hero, collidable: currentCollidable});
                }
            }
        }
    }

    function add (collidable)
    {
        _collidables.push(collidable);
    }

    function addMultiple (collidableArray)
    {
        _collidables.concat(collidableArray);
    }

    function remove (collidable)
    {
        var index = _collidables.indexOf(collidable);

        if (index !== -1)
        {
            _collidables.splice(index, 1);
        }
    }

    return {
        checkCollisions : checkCollisions,
        add : add,
        addMultiple : addMultiple,
        remove : remove
    };
}

module.exports = new CollisionManager();