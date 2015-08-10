# [Flappy Bird in Space Clone](http://wattersnathen.github.io/FlappyBirdClone/)
---

My custom version of the Flappy Bird game. Tap or click with your mouse to keep your bird afloat (in space? - yes, it's a game it doesn't have to make sense). Make your way through the pipes to earn points, but watch out for shuttles: they are not there to pick you up!

### Features and Enhancements to be Added:

1. Sound effect for when user achieves a new high score, if a previous high score had already existed
2. Sound effect for when user is close to achieving a new high score, so the user has an audio clue of when they are getting close - one less distraction
3. Add a proper game screen with:
  * Play new game option
  * Resume game (if a game is currently paused) option
  * Reset high score option
  * ... other menu items ...
4. Change from a Pipe System to a Meteor System where instead of two pipes coming from right to left with a fixed middle - send staggered meteors from right to left (maybe slightly angled too? ooo that's evil)
5. Add items to the game that either give the user extra points, or certain "abilities" for a certain amount of time.

### Current Issues:

* Shuttle - Bird collision is off. Will need to adjust the collision handler to accomodate the size and dimensions of the shuttle. Collision also isn't centered on the shuttle - it currently setups on the left edge of the image

### Summary of App Development

* Game development offers a unique experience which requires strong attention to detail and emphasis on best practices and proper system decoupling. 
* I find myself "testing" the game more than developing it, which resulted in a slower build time. Yeah, let's go with that excuse...