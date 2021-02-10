// main.js

console.log('app starting...');
var CONST = {
    BOARD_SIZE: 6,
    CARDS_PER_ROW: 2,
    CARD_INVISIBLE: "oi oi-aperture text-primary",
    CARD_PAIR_FOUND: "oi oi-check text-success",

    GAME_STATE_NO_TURNED_CARDS: 0,
    GAME_STATE_ONE_TURNED_CARD: 1,
    GAME_STATE_TWO_TURNED_CARDS: 2,
    GAME_STATE_GAME_OVER: 3,
    CARD_STATE_IN_GAME: 0,
    CARD_STATE_GAME_OVER: 1,

    TURN_INVISIBLE_DELAY: 800,
};

var MemoryCard = function (id, gameController){
var that = this;
this.id = id;
this.iconClass = "";
this.gameController = gameController;
this.state = CONST.CARD_STATE_IN_GAME;

this.onClickHandeler = function(){
    if(gameController.state == 2)
    {
        
        console.log("idling");
        if(gameController.cards[gameController.firstCard].getIconClass()==gameController.cards[gameController.secondCard].getIconClass()){  
            clearTimeout(gameContoller.GameOverTimeout);
            gameController.cards[gameController.firstCard].turnGameOver(); 
            gameController.cards[gameController.secondCard].turnGameOver();
            gameController.addProgressLevel();
            gameController.state = CONST.GAME_STATE_NO_TURNED_CARDS;
        }
        else{
            clearTimeout(gameContoller.NoMatchTimeout);
            gameController.cards[gameController.firstCard].turnInvisible();
            gameController.cards[gameController.secondCard].turnInvisible();
            gameController.state = CONST.GAME_STATE_NO_TURNED_CARDS;
        }
    }
    var id = that.id.substr(5);
    console.log("card pressed: card-"+id);
    if( that.state == CONST.CARD_STATE_IN_GAME){
        that.gameController.turnCard(id);
        that.gameController.addTurnCount();
    }
    else{
        console.log("this card is no loger playable!");
    }
}

this.turnVisible = function(){
    var id = this.id.substr(5);
    //document.getElementById("span-"+id).className = this.iconClass;
    //document.getElementById("span-"+id).className += " animated flip";//" animated flipOutX";
    document.getElementById("span-"+id).className = this.iconClass + " animated flipInX";
}
this.turnInvisible = function(){
    var id = this.id.substr(5);
    //document.getElementById("span-"+id).className = this.iconClass;
    //document.getElementById("span-"+id).className += " animated flipOutY";
    document.getElementById("span-"+id).className = CONST.CARD_INVISIBLE + " animated flipInY";
}
this.turnGameOver = function(){
    var id = this.id.substr(5);
    document.getElementById("span-"+id).className = CONST.CARD_PAIR_FOUND + " animated flip";
    this.state = CONST.CARD_STATE_GAME_OVER;
}
this.setCardState = function(state){
    this.state = state;
}
this.getIconClass = function(){
    return this.iconClass;
}
this.setIconClass = function(icon){
    this.iconClass = icon+" text-primary";
}
}

var MemoryGame = function(size, cardsPerRow){
this.nbrOfCards = size;
this.cardsPerRow = cardsPerRow;
var that = this;
this.state = CONST.GAME_STATE_NO_TURNED_CARDS;
this.firstCard = -1;
this.secondCard = -1;
this.cards = [];

this.startTime = -1;
this.playTime = 0;
this.turnCount = 0;
this.progresslevel = 0;


this.startGame = function(){
    this.createDivs();
    this.setEventListeners();
    this.setIconClassToCards();
    this.setStartTime();
    this.timer = setInterval(this.timerfunc,1000);
}
this.getNextUninitializedIconClassIndex = function(x){
    var i;
    for(i=0; i<this.nbrOfCards; i++)
    {
        if(this.cards[(x+i) % (this.nbrOfCards)].getIconClass() == ""){
            return (x+i)%this.nbrOfCards;
        }
    }
    
   return 0;
}

this.setIconClassToCards = function(){
    var i;
    var icon;
    var x, y;

    for(i = 0; i < this.nbrOfCards/2; i++){
        icon = i;//Math.floor(Math.random() * ICONNAMES.length); 
        x = Math.floor(Math.random()* this.nbrOfCards);
        y =  Math.floor(Math.random()* this.nbrOfCards);
        x = this.getNextUninitializedIconClassIndex(x);
        this.cards[x].setIconClass(ICONNAMES[icon]);
        y = this.getNextUninitializedIconClassIndex(y);
        this.cards[y].setIconClass(ICONNAMES[icon]);
        console.log("icon: " +ICONNAMES[icon]+" set to"+x+" and "+y);
    }
}

this.setEventListeners = function(){
    var i;
    var cardId;
    

    for(i=0; i<this.nbrOfCards; i++)
    {
        cardId = "card-"+i;
        this.cards[i] = new MemoryCard(cardId, this);
        document.getElementById(cardId).addEventListener("click", this.cards[i].onClickHandeler);
    }
}

this.createRow = function(id){
    var divRow;
    divRow = document.createElement("div");
    divRow.id = "row-"+id;
    divRow.className = "row";
    return divRow;
}

this.createCard = function(id){
    var divCard;
    divCard = document.createElement("div");
    divCard.id = "card-"+id;
    divCard.className = "col-sm card";
    return divCard;
}

this.createCardBody = function(){
    var divCardBody;
    divCardBody = document.createElement("div");
    divCardBody.className = "card-body";
    return divCardBody;
}


this.createIcon = function(id){
    var iconSpan;
    iconSpan = document.createElement("span");
    iconSpan.id = "span-"+id;
    iconSpan.className = CONST.CARD_INVISIBLE;
    return iconSpan;
}

this.createDivs = function(id){
    var i, j;
    var cardId = 0;
    var rowElement;
    var cardElement;
    var cardBodyElement;
    var iconElement;

    for(i=0; i< this.nbrOfCards / this.cardsPerRow; i++){
        rowElement = this.createRow(i);
        for ( j=0; j<this.cardsPerRow;j++)
        {
            cardId = (j + (i*this.cardsPerRow));
            cardElement = this.createCard(cardId);
            cardBodyElement = this.createCardBody();
            iconElement = this.createIcon(cardId);
            
            cardBodyElement.appendChild(iconElement);
            cardElement.appendChild(cardBodyElement);
            rowElement.appendChild(cardElement);
        }
        document.getElementById("game-content").appendChild(rowElement);
    }
}
this.setStartTime = function(){
    this.startTime = new Date();
}

this.addProgressLevel = function(){
    this.progresslevel += 2;
    progressbarElement.style.width=(this.progresslevel/this.nbrOfCards)*100+"%";
    console.log("Cards found: "+this.progresslevel);
            if (this.progresslevel == CONST.BOARD_SIZE){
            clearInterval(this.timer);
            this.scoreBoard();
            document.getElementById("highScoreModal").setAttribute("style", "display: block;");
            this.addRestartButton();
            }
}

this.addTurnCount = function(){
    this.turnCount++;
    console.log(this.turnCount);
    turnCountElement.innerHTML = "Turns: "+Math.floor(this.turnCount);
}

this.addRestartButton = function(){ 
    var buttonexist = document.getElementById("rstrtbtn"); 
    if (buttonexist)    
    {
        buttonexist.style="display: block; margin: 10px auto;";
    }
    else{
    var restartButton = document.createElement("BUTTON");
    restartButton.id = "rstrtbtn";
    restartButton.className = "btn btn-primary";
    restartButton.style="display: block; margin: 10px auto;";
    restartButton.addEventListener("click", this.restartLevel);
    var t = document.createTextNode("RESTART");
    restartButton.appendChild(t);
    document.body.appendChild(restartButton);
    }
}

this.restartLevel = function(){
    that.state = CONST.GAME_STATE_NO_TURNED_CARDS;
    that.firstCard = -1;
    that.secondCard = -1;

    that.startTime = -1;
    that.playTime = 0;
    that.turnCount = 0;
    turnCountElement.innerHTML = "Turns: "+Math.floor(that.turnCount);
    that.progresslevel = 0;
    progressbarElement.style.width=(that.progresslevel/that.nbrOfCards)*100+"%";
    for (var i = 0; i < CONST.BOARD_SIZE/CONST.CARDS_PER_ROW; i++){
        var rowid = "row-"+i;
        var elem = document.getElementById(rowid);
        elem.parentNode.removeChild(elem);
    }
    document.getElementById("rstrtbtn").style="display: none;";
    that.startGame();
}

this.scoreBoard = function(){

if(Array.isArray(this.highScore))
{
    this.highScore.push([this.turnCount,this.PlayTime]);
}
else{
    this.highScore = [[this.turnCount,this.PlayTime]];
}

console.log(this.highScore);
//WITH SECOND COLUMN
this.highScore = this.highScore.sort(function(a,b) {
    return a[1] - b[1];
});
//WITH FIRST COLUMN
this.highScore = this.highScore.sort(function(a,b) {
    return a[0] - b[0];
});


document.getElementById("player-score-1").innerHTML = "High score #1: Turns: "+this.highScore[0][0]+" Time: "+this.highScore[0][1];
if (this.highScore.length > 1)
{
    document.getElementById("player-score-2").innerHTML = "High score #2: Turns: "+this.highScore[1][0]+" Time: "+this.highScore[1][1];
}
if (this.highScore.length > 2){
    document.getElementById("player-score-3").innerHTML = "High score #3: Turns: "+this.highScore[2][0]+" Time: "+this.highScore[2][1];
}

document.getElementById("high-score").innerHTML = "Your score: Turns: "+this.turnCount+" Time: "+this.PlayTime;
}

this.timerfunc = function(){
    that.setPlayTime();
    playTimeElement.innerHTML = "Playtime: "+Math.floor(that.PlayTime)+"s"; 
}

this.setPlayTime = function(){
    if(this.state == CONST.GAME_STATE_GAME_OVER)
    return;
    this.PlayTime = (new Date() - this.startTime) / 1000; 
}
this.turnCard = function(id){
    if(this.state == CONST.GAME_STATE_NO_TURNED_CARDS){
        console.log("Test...");
        this.cards[id].turnVisible();
        this.firstCard = id;
        this.state = CONST.GAME_STATE_ONE_TURNED_CARD;
    }
    else if(this.state == CONST.GAME_STATE_ONE_TURNED_CARD){
        if(id == this.firstCard)
        {
            this.turnCount -= 1;
            return;
        } 
        this.cards[id].turnVisible();
        this.secondCard = id;
        this.state = CONST.GAME_STATE_TWO_TURNED_CARDS;
        if(that.cards[this.firstCard].getIconClass()==this.cards[this.secondCard].getIconClass()){
            this.GameOverTimeout = setTimeout(function(){
                that.cards[that.firstCard].turnGameOver(); 
                that.cards[that.secondCard].turnGameOver();
                that.addProgressLevel();
                that.state = CONST.GAME_STATE_NO_TURNED_CARDS;
            },
            CONST.TURN_INVISIBLE_DELAY
            );
        }
        else{
            this.NoMatchTimeout = setTimeout(function(){
                that.cards[that.firstCard].turnInvisible();
                that.cards[that.secondCard].turnInvisible();
                
                that.state = CONST.GAME_STATE_NO_TURNED_CARDS;
            },
            CONST.TURN_INVISIBLE_DELAY
            );  
    }
}
}
}


var closeModal = function(){
    document.getElementById("highScoreModal").setAttribute("style", "display: none;");
}

var playTimeElement = document.getElementById("play-time");
var turnCountElement = document.getElementById("turn-count");
var progressbarElement = document.getElementById("progress-bar");
var memoryGame = new MemoryGame(CONST.BOARD_SIZE, CONST.CARDS_PER_ROW);
memoryGame.startGame();