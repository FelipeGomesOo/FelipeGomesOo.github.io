const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldChar = '░';
const pathChar = '*';

class Field {
  constructor(gameWidth, gameHeight) {
    this.originalGrid = []; 
    this.gameGrid = [];
    this.myPosition = {
      line: 0,
      cell: 0
    };
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  get getOriginalGrid(){
    return this.originalGrid;
  }
  // Store user coordinates 
  get nextCell() {
    // If its out of bounds it resets the game
    if(this.myPosition.line < 0 || this.myPosition.cell < 0){
      return "out-of-bounds";
    }else {
      return this.gameGrid[this.myPosition.line][this.myPosition.cell];
    }
  }
  // Calculates the field area
  get gameArea(){
    return this.gameWidth * this.gameHeight;
  }
  // Resets user position when game resets
  set resetMyPosition(param) {
    this.myPosition.line = param; 
    this.myPosition.cell = param; 
  } 
  // I have a hard copy of the Grid so i can restore the field when player is off the path 
  resetGameGrid(){
    this.gameGrid = JSON.parse(JSON.stringify(this.originalGrid)); 
  }
  // Creates a field based on user input
  generateField(){
    this.originalGrid = [];
    const sumPath = 1;
    const sumHat = 1;
    const sumHole = Math.ceil(this.gameArea * 0.2);
    const sumField = this.gameArea -(sumHole + sumPath + sumHat);
    const charPairs = [[pathChar, sumPath],[hat, sumHat],[hole, sumHole],[fieldChar, sumField]];
    const arrSorted = [];    
    const arrIndex = [0];
    const arrShufled = [];
    // Creates an Array with all field elements
    charPairs.forEach((element) => {
      for(let i = 0; i < element[1]; i++){
         arrSorted.push(element[0]);
      }        
    });
    // Creates an array of unsorted Index numbers       
    while (arrIndex.length < this.gameArea) {
      let randomNumber = Math.floor(Math.random() * this.gameArea);
      if (!arrIndex.includes(randomNumber)) {
        arrIndex.push(randomNumber);
      }
    }
    // Creates a Shufled array with all field elements
    arrIndex.forEach((element) => {      
      arrShufled.push(arrSorted[element]);          
    });
    // Creates the grid
    let j = 0;
    while (this.originalGrid.length < this.gameHeight ) { 
        let arr = [];        
        for(let i = 0 ; i < this.gameWidth ; i++){
          arr.push(arrShufled[j]);
          j++;
        } 
        this.originalGrid.push(arr);     
    }  
     this.resetGameGrid(); 
  } 
  // Start new Game with a new grid
  startGame(){ 
    this.resetMyPosition = 0;   
    this.generateField();
    this.playGame("Use W A S D to find your hat");         
  }
  // Clear screen
  clear(){ 
    return process.stdout.write('\u001b[2J\u001b[0;0H');
  }
  playAnotherRound(){
   console.log("You found your hat!");
   const again = prompt('Would you like to play again? y n');
   switch (again) {
    case "y": this.startGame(); break;
    case "n": console.log('Bye!'); break;          
    default: console.log('Type y for YES or n for NO');
    } 
  } 
  // Go back to the begining of existing grid 
  reset(feedback){
    this.resetMyPosition = 0;
    this.resetGameGrid();  
    this.playGame(feedback);
  }
  // Prints a copy of the original grid     
  gridPrint(){ 
    this.gameGrid.forEach((element) => {
      console.log(element.join(''));
    }); 
  }
  // Prints player footsteps
  footPrint(){
    this.gameGrid[this.myPosition.line][this.myPosition.cell] = pathChar;
  }
  // Changes player coordinates 
  moveMe(){     
    const move = prompt('Move!');            
    switch (move) {
      case "w": this.myPosition.line--; break;
      case "s": this.myPosition.line++; break;
      case "a": this.myPosition.cell--; break;
      case "d": this.myPosition.cell++; break;          
      default: console.log('Use W A S D to find your hat'); this.moveMe();
    }
  }
  // What happens when player moves
  moveResult(){
    switch (this.nextCell) {
      case fieldChar: this.footPrint(); this.playGame("Nice!"); break;
      case pathChar: this.reset("Oops! Let's try again!"); break;
      case hole: this.reset("Oops! Fell in a hole. Let's try again!"); break; 
      case hat: this.playAnotherRound(); break;
      default: this.reset("You are out of bounds! Let's try again!");   
    }  
  }
  playGame(feedback){
    this.clear();            
    this.gridPrint();
    feedback ? console.log(feedback) : false; 
    this.moveMe();
    this.moveResult(); 
  }
}
const myField = new Field(10,6);
myField.startGame();  