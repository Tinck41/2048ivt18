var grid = [];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sizes = document.getElementById('size');
var size = sizes.value;
var score = 0;
var min = 0;
var max = size*size-1;
var position = [];
var OK = document.getElementById('OK');
var playing = 0;
var width = canvas.width/size;
var color=["gray","#61edd5","#4048bc","#40bc5a","#dcff56","#ff35d6","#fc19bc","#00C800","#fc1951","#b0fc19","#ff0000","#ff00d4","#ff00d4"];

function clickOK() {
	grid = [];
	sizes = document.getElementById('size');
	size = sizes.value; 
	if (size<3 || size>18 ) return false;
	max = size*size-1;
	width = canvas.width/size;
	setup();
	score = 0;
	document.getElementById('score').innerHTML = score;
}

setup();

document.onkeypress = function(event) {
	if (event.keyCode == 115) {
		if (slideDown()) {
			slideDown();
			addNumber();
	    	draw();
    	}
	} else if (event.keyCode == 119) {
		slideUp();
		addNumber();
    	draw();
	} else if (event.keyCode == 97) {
		slideLeft();
		addNumber();
    	draw();
	} else if (event.keyCode == 100) {
		slideRight();
		addNumber();
    	draw();
	}
    console.table(grid);
}


function setup() {
	playing = 1;
	for (var i = 0; i < size; i++){
    	grid[i] = [];
    	for (var j = 0; j < size; j++){
       		grid[i][j] = 0;
		}
	}
	console.table(grid);
	addNumber();
	addNumber();
	console.table(grid);
}

function addNumber() {
	for (i = 0; i < size; i++){
    	for (j = 0; j < size; j++){
    		if (grid[i][j]===0) {
    			position.push ({
    				x: i,
    				y: j
    			})
    		}
		}
	}
	while(true) {
		var add = position[(min + Math.floor(Math.random() * (max + 1 - min)))];
		var r = Math.random();
		if (grid[add.x][add.y]==0) {
			grid[add.x][add.y] = r > 0.5 ? 4 : 2;
			draw();
			return;
		}
	}
}

function draw() {
	var w = canvas.width/size;
	for (i = 0; i < size; i++){
    	for (j = 0; j < size; j++) {
    		if(grid[i][j]!=0)
				ctx.fillStyle=color[Math.log2(grid[i][j])];
			else{
				ctx.fillStyle="rgb(230,230,230)";}
			ctx.fillRect(i*w+2,j*w+2,w-4,w-4);

			if(grid[i][j]!=0){
				ctx.font = "40px Aria";
				ctx.fillStyle = "black";
				ctx.textAlign = "center";
				ctx.fillText(grid[i][j], i*w+w/2,j*w+w/2+w/7); 
			}

		}
	}
}



function slideDown() {
	slideD();
	multiplyD();
}

function slideD() {
	for (i=0; i<size; i++) {
		for (k=0; k<size; k++) {
			for (j=0; j<size; j++) {
				if (grid[i][j]!=0) {
					var coll = j;
					while (coll<size) {
						if (grid[i][coll+1]==0) {
							grid[i][coll+1]=grid[i][coll];
							grid[i][coll] = 0;
							coll++;
						} else break;
					}
				}
			}
		}
	}
}

function multiplyD() {
	for (i=0; i<size; i++) {
		for (j=size-1; j>-1; j--) {
			if (grid[i][j]!=0) {
				var coll = j;
				while (coll-1>-1) {
					if (grid[i][coll]==grid[i][coll-1]) {
						grid[i][coll-1] *= 2;
						grid[i][coll] = 0;
						score += grid[i][coll-1]; 
						document.getElementById('score').innerHTML =score;
						coll-=2;
						j--;
						break;
					} else break;
				}
			}
		}
	}
	slideD();
}

function slideUp() {
	slideU();
	multiplyU();
}

function slideU() {
	for (i=0; i<size; i++) {
		for (k=0; k<size; k++) {
			for (j=size-1; j>-1; j--) {
				if (grid[i][j]!=0) {
					var coll = j;
					while (coll>-1) {
						if (grid[i][coll-1]==0) {
							grid[i][coll-1]=grid[i][coll];
							grid[i][coll] = 0;
							coll--;
						} else break;
					}
				}
			}
		}
	}
}

function multiplyU() {
	for (i=0; i<size; i++) {
		for (j=0; j<size; j++) {
			if (grid[i][j]!=0) {
				var coll = j;
				while (coll+1<size) {
					if (grid[i][coll]==grid[i][coll+1]) {
						grid[i][coll+1] *= 2;
						grid[i][coll] = 0;
						score += grid[i][coll+1];
						document.getElementById('score').innerHTML =score;
						coll+=2;
						j++;
						break;
					} else break;
				}
			}
		}
	}
	slideU();
}

function slideLeft() {
	slideL();
	multiplyL();
}

function slideL() {
	for (j=0; j<size; j++) {
		for (k=0; k<size; k++) {
			for (i=size-1; i>=0; i--) {
				if (grid[i][j]!=0) {
					var row = i;
					while (row > -1) {
						if (row-1>-1) {
								if (grid[row-1][j]==0) {
								grid[row-1][j] = grid[row][j];
								grid[row][j] = 0;
								} 
							row--;
						} else break;
					}
				}
			}
		}
	}
}

function multiplyL() {
	for (j=0; j<size; j++) {
		for (i=0; i<size; i++) {
			if (grid[i][j]!=0) {
				var row = i;
				while (row+1<size) {
					if (grid[row][j]==grid[row+1][j]) {
						grid[row][j] *= 2;
						grid[row+1][j] = 0;
						score += grid[row][j];
						document.getElementById('score').innerHTML =score;
						row+=2;
						i++;
						break;
					} else break;
				}
			}
		}
	}
	slideL();
}

function slideRight() {
	slideR();
	multiplyR();
}

function slideR() {
	for (j=0; j<size; j++) {
		for (k=0; k<size; k++) {
			for (i=0; i<size; i++) {
				if (grid[i][j]!=0) {
					var row = i;
					while (row<size) {
						if (row+1<size) {
							if (grid[row+1][j]==0) {
								grid[row+1][j]=grid[row][j];
								grid[row][j] = 0;
							} 
							row ++;
						} else break;
					}
				}
			}
		}
	}
}

function multiplyR() {
	for (j=0; j<size; j++) {
		for (i=size-1; i>-1; i--) {
			if (grid[i][j]!=0) {
				var row = i;
				while (row-1>-1) {
					if (grid[row][j]==grid[row-1][j]) {
						grid[row][j] *= 2;
						grid[row-1][j] = 0;
						score += grid[row][j];
						document.getElementById('score').innerHTML =score;
						row-=2;
						i--;
						break;
					} else break;
				}
			}
		}
	}
	slideR();
}
