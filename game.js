class Game{
	constructor(){
		this.players = [];
		this.markers = ['X', "O"];
		this.scores = [0,0];
		this.players[0] = "player1";
		this.players[1] = "player2";
		this.playerTurn = 0;
		this.winValues = [7,56,73,84,146,273,292,448];
		this.gameOver = false;
		document.getElementById('gameMessage').innerHTML = this.players[this.playerTurn] + '\' starter';
		this.onStartGame();
		
	}

	onStartGame(){
		document.getElementById('board').addEventListener('click', this.play.bind(this));
	}

	play(e){
		
		// as long as game is not over
		if (!this.gameOver) {
			if (e.target.innerText !== ''){
				return
			}

			let clickedPoints = parseInt(e.srcElement.dataset.points);
			this.pointCount(clickedPoints);


			e.target.innerHTML = `<span>${this.markers[this.playerTurn]}</span>`;

			//every click checks for a win
			this.winCheck();
			
			// only if the game is not done yet, switch player
			if (!this.gameOver) {
				this.switchPlayerTurn();
				document.getElementById('gameMessage').innerHTML = this.players[this.playerTurn] + '\'s tur';
			}
			console.log(this.players[this.playerTurn]);
		}
	}

	pointCount(points){
		this.scores[this.playerTurn] += points;
	}

	switchPlayerTurn(){
		return this.playerTurn == 0 ? this.playerTurn = 1 : this.playerTurn = 0;
	}

	winCheck(){
		// loop throgh the wins array to check if there's a winner
		this.winValues.forEach((winValue, i) => {
			
			if ((winValue & this.scores[this.playerTurn]) == winValue) {
				this.gameOver = true;
				document.getElementById('gameMessage').innerText = this.players[this.playerTurn] + "'s Wins";
				document.getElementById('gameMessage').classList.add('success');
			}
		});

		// if the total is 511 then the board is full and it's a draw
		if (((this.scores[0] + this.scores[1]) == 511) && !this.gameOver) {
			document.getElementById('gameMessage').innerText = "Det blev uafgjort";
			document.getElementById('gameMessage').classList.add('draw');
			this.gameOver = true;
		}
	}

	debug(){
		console.log('-------------------------');
		console.log(this);
		// console.log(this.players);
		// console.log(this.markers);
		// console.log(this.scores);
		// console.log(this.players[0]);
		// console.log(this.players[1]);
		// console.log(this.playerTurn);
		// console.log(this.winValues);
		console.log('-------------------------');
	}
}


// 1  2   4
// 8  16  32
// 64 128 256