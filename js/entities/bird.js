var graphicsComponent = require('../components/graphics/bird');
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/circle");
var score = require('./score');

var settings = require("../settings");

var Bird = function () {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = settings.birdStartPos.y;
    physics.acceleration.y = settings.gravity;
    
    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Bird.prototype.onCollision = function (entity) {

    if (entity instanceof score.Score) {
        settings.scoreAudio.play();
        return;
    }
    settings.collisionAudio.play();
    window.app.pause("You're dead", (function () {

        window.app.resetGame();
    }).bind(this));
};

exports.Bird = Bird;