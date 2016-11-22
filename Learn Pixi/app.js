function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

// Aliases
var Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite,
	TextureCache = PIXI.utils.TextureCache,
	Rectangle = PIXI.Rectangle,
	Graphics = PIXI.Graphics;

	
// Create stage, renderer.
// Add renderer.view to DOM
var stage = new Container(),
	renderer = autoDetectRenderer(256, 256, {antialias: true, transparent: true});
document.body.appendChild(renderer.view);
renderer.view.setAttribute("tabIndex", 1);

// Load assets, run 'setup' when all loaded
loader
	.add("images/cat.png")
	.on("progress", loadProgressHandler)
	.load(setup);

function loadProgressHandler(loader) {
	console.log("progess: " + loader.progress + "%");
}

// Sprites
var cat, rectangle, state;

function setup() {
	// Create sprite from texture
	cat = new Sprite(resources["images/cat.png"].texture);
	
	// Position 'cat'
	cat.pivot.set(32, 32)
	cat.anchor.set(0, 1);
	cat.x = (renderer.view.width / 2);
	cat.y = (renderer.view.height / 2);
	cat.vx = 0;
	cat.vy = 0;
	
	// Capture keyboard controls
	var left = keyboard(37),
		up = keyboard(38),
		right = keyboard(39),
		down = keyboard(40);
		
	left.press = function() {
		cat.vx = -1;
		cat.vy = 0;
	}
	left.release = function() {
		if (!right.isDown && cat.vy === 0) {
			cat.vx = 0;
		}
	}
	
	up.press = function() {
		cat.vy = -1;
		cat.vx = 0;
	};
	up.release = function() {
		if (!down.isDown && cat.vx === 0) {
			cat.vy = 0;
		}
	};
	
	right.press = function() {
		cat.vx = +1;
		cat.vy = 0;
	}
	right.release = function() {
		if (!left.isDown && cat.vy === 0) {
			cat.vx = 0;
		}
	}
	
	down.press = function() {
		cat.vy = 1;
		cat.vx = 0;
	};
	
	down.release = function() {
		if (!up.isDown && cat.vx === 0) {
			cat.vy = 0;
		}
	};
	
	// Add sprites to the stage
	stage.addChild(cat);
	
	rectangle = new Graphics();
	rectangle.lineStyle(4, 0x3F1350, 1);
	rectangle.beginFill(0x16DC0C);
	rectangle.drawRect(0, 0, 64, 64);
	rectangle.endFill();
	rectangle.x = 170;
	rectangle.y = 170;
	rectangle.pivot.set(32, 32);
	rectangle.alpha = 0.2;
	stage.addChild(rectangle);
	
	// Set the game state
	state = play;
	
	// Start the game loop
	gameLoop();
}

function gameLoop() {
	requestAnimationFrame(gameLoop);
	
	state();
	
	renderer.render(stage);
}

var playState = {
	shrink: false
};
function play() {
	cat.x += cat.vx;
	cat.y += cat.vy;
	
	rectangle.rotation += 0.05;
	
	if (playState.shrink === false) {
		rectangle.scale.x += 0.02;
		rectangle.scale.y += 0.02;
		if (rectangle.scale.x > 1) playState.shrink = true;
	} else {
		rectangle.scale.x -= 0.02;
		rectangle.scale.y -= 0.02;
		if (rectangle.scale.x < 0.1) playState.shrink = false;
	}
}