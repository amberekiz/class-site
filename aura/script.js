const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];


let mouse = {
	x: null,
	y: null,
    radius: 80
}
window.addEventListener('mousemove',
	function(event){
		mouse.x = event.x + canvas.clientLeft/2;
		mouse.y = event.y + canvas.clientTop/2;
});

function drawImage(){
    let imageWidth = png.width || png.naturalWidth;
    let imageHeight = png.height || png.naturalHeight;
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    class Particle {
        constructor(x, y, color, size){
            this.x = x + canvas.width/2-png.width*2,
            this.y = y + canvas.height/2-png.height*2,
            this.color = color,
            this.size = 2,
            this.baseX = x + canvas.width/2-png.width*2,
            this.baseY = y + canvas.height/2-png.height*2,
            this.density = ((Math.random() * 10) + 2);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            ctx.fillStyle = this.color;
            // check mouse position/particle position - collision detection
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            // distance past which the force is zero
            var maxDistance = 100;
            var force = (maxDistance - distance) / maxDistance;

            // if we go below zero, set it to zero.
            if (force < 0) force = 0;

            let directionX = (forceDirectionX * force * this.density) * 0.9;
            let directionY = (forceDirectionY * force * this.density) * 0.9;

            if (distance < mouse.radius + this.size){
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX ) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.x -= dx/5;
                } if (this.y !== this.baseY) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.y -= dy/5;
                }
            }
            this.draw();
        }
    }
    function init(){
        particleArray = [];

        for (var y = 0, y2 = data.height; y < y2; y++) {
            for (var x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb("+data.data[(y * 4 * data.width)+ (x * 4)]+","+data.data[(y * 4 * data.width)+ (x * 4) +1]+","+data.data[(y * 4 * data.width)+ (x * 4) +2]+")";

                    particleArray.push(new Particle(positionX*4, positionY*4, color));

                }
            }
        }

    }
    function animate(){
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(255,255,255,.2)';
        ctx.fillRect(0,0,innerWidth,innerHeight);
        ctx.clearRect(0,0,innerWidth,innerHeight);


	    for (let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
	    }
    }
    init();
    animate();


    window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	});
}


var png = new Image();
png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACFCAIAAAAimMokAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHaWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxNTUyZTQxYy01MmE2LWQ4NDgtOThmOS1kMWIzNjA5Y2FmYjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YTg1ZjBhZDgtZGJjMy00OTZjLWI0NWEtYmU5NGEwNWQ4ZTliIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkFCMzhBNkZBOEJENkRGOEJGQTUyMDVDQjRBQjA5MTM0IiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9ImMyIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0xMS0wMlQwMzowMzowNS0wNDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMTEtMDJUMTc6MTI6NDQtMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMTEtMDJUMTc6MTI6NDQtMDQ6MDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYjhlOGRkOC1kNzBiLTQ0MmQtOGMyOC1jYWUyZjJmMDFjOWMiIHN0RXZ0OndoZW49IjIwMjEtMTEtMDJUMTc6MTI6NDQtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gaW1hZ2UvanBlZyB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGltYWdlL2pwZWcgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphODVmMGFkOC1kYmMzLTQ5NmMtYjQ1YS1iZTk0YTA1ZDhlOWIiIHN0RXZ0OndoZW49IjIwMjEtMTEtMDJUMTc6MTI6NDQtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYjhlOGRkOC1kNzBiLTQ0MmQtOGMyOC1jYWUyZjJmMDFjOWMiIHN0UmVmOmRvY3VtZW50SUQ9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";

// Run drawImage after page has been fully loaded
window.addEventListener('load', (event) => {
    console.log('page has loaded');
    ctx.drawImage(png, 0, 0);
    drawImage();
});
