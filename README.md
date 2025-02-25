# TGGolf

Welcome to TGGolf!

This 3-D golf game consists of 9 holes. Your objective is to hit the ball into the hole in as few strokes as possible!

## Instructions

### Hitting the Ball
- Adjust the aim with the "Aim" slider. You can use the arrow keys for more precision.
- Use the "Power" slider to adjust the power of the shot.
- When you're ready to hit, select the "Hit" button.

### Camera Controls
This game implements THREE.js orbit controls:
- Left click and drag to rotate the scene.
- Right click and drag to move without rotating.

By default, each hole will start with the camera looking at and tracking the ball. If you input camera controls, the automatic tracking will be disabled. Select "Reset Camera" to re-enable automatic camera movement.

### Navigation
You'll be taken to Hole 1 at the start. Once you complete the hole, navigate to the next hole by using the "Go To Hole" buttons in the scorecard. Much like real golf, you are required to record your own score. At the bottom is a provided scorecard to do so.

## Dependencies

- [THREE.js](https://threejs.org/)
- [Cannon.js](https://github.com/schteppe/cannon.js)

