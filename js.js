const canvas = document.getElementById('canvas');
const pauseBtn = document.getElementById('pause');
const del = document.getElementById('del');

let ctx = canvas.getContext('2d');

let pause = false;

let alive = [];
let timer;

let neighbors = [
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, 1],
	[1, 1]
];

canvas.onclick = event => {
	let x = event.offsetX;
	let y = event.offsetY;
	alive[Math.floor(y / 10)][Math.floor(x / 10)] = true;
	draw();
}

pauseBtn.onclick = () => {
	pause = !pause;
}

del.onclick = () => {
	location.reload();
}

const fillArr = () => {
	for (let i = 0; i < 30; i++) {
		alive[i] = [];
		for (let j = 0; j < 30; j++) {
			alive[i][j] = false;
		}
	}
}

const draw = () => {
	ctx.clearRect(0, 0, 300, 300);
	for (let i = 0; i < 30; i++) {
		for (let j = 0; j < 30; j++) {
			if (alive[i][j] == 1) {
				ctx.fillRect(j*10, i*10, 10, 10);
			}
		}
	}
}

const getNeighborsCount = coords => {
	let count = 0;
	neighbors.forEach(item => {
		try {
			if (alive[(coords[0] + item[0])][(coords[1] + item[1])] == true) {
				count++;
			}
		}
		catch {

		}
	})
	return count;
}

const start = () => {
	document.getElementById('start').disabled = true; 
	if (!pause) {
		let newAlive = [];
		for (let i = 0; i < 30; i++) {
			newAlive[i] = [];
			for (let j = 0; j < 30; j++) {
				let nc = getNeighborsCount([i, j]);
				if (nc == 3 || nc == 2) {
					if (nc == 3) {
						newAlive[i][j] = true;
					} 
					else if (alive[i][j] && nc == 2) {
						newAlive[i][j] = true;
					}
				}
				else {
					newAlive[i][j] = false;
				}
			}
		}
		alive = newAlive;
		draw();
	}

	timer = setTimeout(start, 100);
}

fillArr();

document.getElementById('start').onclick = start;