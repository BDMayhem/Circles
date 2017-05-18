var circles = []
var destinations = []

function onKeyDown(event){
	var x = Math.floor(Math.random() * view.size.width);
	var y = Math.floor(Math.random() * view.size.height);
	var size = Math.floor(Math.random() * 200);
	var red = Math.random();
	var green = Math.random();
	var blue = Math.random();
	var alpha = Math.random();
	var newCircle = Path.Circle(new Point(x, y), size);

	newCircle.fillColor = new Color(red, green, blue);
	circles.push(newCircle);
	destination = Point.random() * view.size;
	destinations.push(destination);
	if (circles.length >= 1000){
		circles.shift();
	};
	if (destinations.length >= 1000){
		destinations.shift();
	};
};

var sat = false;

function onFrame(event){
	for (var i = 0; i < circles.length; i++){
	circles[i].scale(0.999);
	circles[i].fillColor.hue += 0.05;
	if (!sat){
		circles[i].fillColor.saturation += 0.01;
		if (circles[i].fillColor.saturation >= 0.9){
			sat = true;
		}
	} else {
		circles[i].fillColor.saturation -= 0.01;
		if (circles[i].fillColor.saturation <= 0.1){
			sat = false;
		}
	}
	var vector = destinations[i] - circles[i].position;
	circles[i].position += vector/20;
	};
};

var text = new PointText(new Point(view.size.width/2, 100));
text.justification = "center";
text.fillColor = "white";
text.content = "Press a key to make a random, useless circle."
text.fontSize = "20px";
