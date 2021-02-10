    // GameController.js

    let MemoryCard = require('./MemoryCard');

    class GameController {
        constructor(config) {
            this.config = config;

            this.cards =[];

        }
        initialize() {
            console.log('Initializing Memory Game');
            this.createDivs();
            this.setEventListeteners();
            this.setIconClassToCards();
        }

        createRow = function(i){
            let divRow;
            divRow = document.createElement('div');
            divRow.id = 'row-'+i;
            divRow.className = 'row';
            return divRow;
        }

        createCard = function(cardId){
            let divCard;
            divCard = document.createElement('div');
            divCard.id = 'card-'+cardId;
            divCard.className = "col-sm card";
            return divCard;
        }

        createCardBody = function(){
            let divCardBody;
            divCardBody = document.createElement('div');
            divCardBody.className = 'card-body';
            divCardBody.style.margin = 'auto';
            return divCardBody;
        }

        createIcon = function(i){
            let iconSpan;
            iconSpan = document.createElement('span');
            iconSpan.className = this.config.CARD_INVISBLE;
            iconSpan.id = 'Span-'+i;
            return iconSpan;
        }

        createDivs = function() {
            let i, j;
            let cardId = 0;

            let rowElement;
            let cardElement;
            let cardBodyElement;
            let iconElement;

            const rows = this.config.BOARD_SIZE/this.config.CARDS_PER_ROW;
            for( i = 0; i < rows; i++){
                rowElement = this.createRow(i);
                for( j = 0; j < this.config.CARDS_PER_ROW; j++){
                    cardId = (j + (i * this.config.CARDS_PER_ROW));
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

        setEventListeteners() {
            let i;
            let id = "";

            for( i = 0; i < this.config.BOARD_SIZE; i++) {
                id = 'card-'+i;
                let memoryCard = new MemoryCard(i, this, this.config);
                this.cards[i] = memoryCard;

                document.getElementById(id).addEventListener('click',(e) => {memoryCard.onClickHandler(e);});
            }
        }
        setIconClassToCards() {
           //TÄSSÄ OLLAAN 
        }
    }

    module.exports = GameController;