class MemoryCard {
    constructor(id,gameController,config) {
        this.id = id;
        this.gameController = gameController;
        this.config = config;
        this.that = this;

        this.iconClass = '';
    }
    onClickHandler(e) {
        console.log('Card clicked:'+ this.id);
        return true;
    }
    setIconClass(icon) {
        this.iconClass = icon;
    }
    getIconCLass() {
        return this.iconClass;
    }
}

module.exports = MemoryCard;