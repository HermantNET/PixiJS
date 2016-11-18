// Aliases
var Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite;

	
// Create stage, renderer.
// Add renderer.view to DOM
var stage = new Container(),
	renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);


// Load assets, run 'setup' when all loaded
loader
	.add("images/cat.png")
	.load(setup);


function setup() {
	// Create sprite from texture
	var cat = new Sprite(resources["images/cat.png"].texture);
	
	// Add 'cat' to the stage
	stage.addChild(cat);
	
	// Center 'cat'
	cat.x = (renderer.view.width / 2) - cat.width / 2;
	cat.y = (renderer.view.height / 2) - cat.height / 2;
	
	
	// Render the stage
	renderer.render(stage);
}