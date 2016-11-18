// Aliases
var Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite,
	TextureCache = PIXI.utils.TextureCache,
	Rectangle = PIXI.Rectangle;

	
// Create stage, renderer.
// Add renderer.view to DOM
var stage = new Container(),
	renderer = autoDetectRenderer(256, 256, {antialias: true});
document.body.appendChild(renderer.view);


// Load assets, run 'setup' when all loaded
loader
	.add("images/cat.png")
	.add("images/tileset.png")
	.on("progress", loadProgressHandler)
	.load(setup);

function loadProgressHandler(loader) {
	console.log("progess: " + loader.progress + "%");
}

// Sprites
var rocket;
var cat;

function setup() {
	// create 'tileset' sprite from texture
	var tileset = TextureCache["images/tileset.png"];
	
	// create rect object that defines position & size of
	// sub-image from 'tileset'
	var rect = new Rectangle(96, 64, 32, 32);
	
	// have 'tileset' use 'rect' lens
	tileset.frame = rect;
	
	// Create sprite from texture
	rocket = new Sprite(tileset);
	cat = new Sprite(resources["images/cat.png"].texture);
	
	// Position 'rocket'
	rocket.position.set(32, 32);
	
	// Position 'cat'
	cat.pivot.set(32, 32)
	cat.anchor.set(0, 1);
	cat.x = (renderer.view.width / 2);
	cat.y = (renderer.view.height / 2);
	
	// Add sprites to the stage
	stage.addChild(rocket);
	stage.addChild(cat);
	

	gameLoop();
}

var shrink = true;
function gameLoop() {
	requestAnimationFrame(gameLoop);
	
	cat.rotation += 0.01;
	if (shrink) {
		cat.scale.x -= 0.001;
		cat.scale.y -= 0.001;
		shrink = !(cat.scale.x <= 0.1);
	} else {
		cat.scale.x += 0.001;
		cat.scale.y += 0.001;
		shrink = cat.scale.x >= 1;
	}
	
	renderer.render(stage);
}