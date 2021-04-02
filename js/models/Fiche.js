class Fiche {
    
    constructor(item, id) {    
        this._item = item;
        this._id = id;
        this.x = this._id % 8;
        this.y = Math.floor(this._id / 8);
        console.log(item);
    }
  
    showFiche(currentPlayer) {
        let fiche = $(this._item).find('div')[0];
        let ficheStyle = fiche.classList;
  
        if (!ficheStyle.contains('fiche__white') && !ficheStyle.contains('fiche__black')) {
            if (currentPlayer == 1) {
                $(fiche).removeClass('fiche__white-hover');
                $(fiche).addClass('fiche__white fiche__animation-white');
            }
  
            if (currentPlayer == 2) {
                $(fiche).removeClass('fiche__black-hover');
                $(fiche).addClass('fiche__black fiche__animation-black');
            }
        }
    }

    flip() {
        let fiche = $(this._item).find('div')[0];
        let ficheStyle = fiche.classList;

        if (ficheStyle.contains('fiche__white')) {
            $(fiche).removeClass('fiche__white');
            $(fiche).addClass('fiche__black fiche__animation-black');
        } else if (ficheStyle.contains('fiche__black')) {
            $(fiche).removeClass('fiche__black');
            $(fiche).addClass('fiche__white fiche__animation-white');
        }
    }
    
    hoverFiche(currentPlayer) {
        let fiche = $(this._item).find('div')[0];
        let ficheStyle = fiche.classList; //console.log("X: " + (this._id % 8) + " Y: " + (Math.floor(this._id / 8)));
  
        if (!ficheStyle.contains('fiche__white') && !ficheStyle.contains('fiche__black')) {
            if (currentPlayer == 1) {
                $(fiche).removeClass('fiche__white');
                $(fiche).addClass('fiche__white-hover');
            }
    
            if (currentPlayer == 2) {
                $(fiche).removeClass('fiche__black');
                $(fiche).addClass('fiche__black-hover');
            }
        }
    }

    hoverOffFiche(currentPlayer) {
        let fiche = $(this._item).find('div')[0];
        let ficheStyle = fiche.classList;
  
        if (ficheStyle.contains('fiche__white-hover') || ficheStyle.contains('fiche__black-hover')) {
            if (currentPlayer == 2) {
                $(fiche).removeClass('fiche__black-hover');
            }
    
            if (currentPlayer == 1) {
                $(fiche).removeClass('fiche__white-hover');
            }
        }
    };
}
