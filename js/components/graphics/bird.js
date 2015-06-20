var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function () {
    console.log('Drawing a Bird');
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;