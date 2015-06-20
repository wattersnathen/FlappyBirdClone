var flappyBird = require('./flappybird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new flappyBird.FlappyBird();
    app.run();
});