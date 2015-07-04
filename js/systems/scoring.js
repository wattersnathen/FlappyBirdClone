var ScoringSystem = function () {
	this.currentScore = 0;
	this.scoreElem = document.getElementById('score');
};

ScoringSystem.prototype.resetScore = function () {
	this.currentScore = 0;
	this.scoreElem.innerText = this.currentScore;
};

ScoringSystem.prototype.updateScore = function () {
	this.currentScore = this.currentScore + 1;
	this.scoreElem.innerText = this.currentScore;
};

exports.ScoringSystem = ScoringSystem;