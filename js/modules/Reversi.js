Game.Reversi = (() => {

    let configMap = {
        currentPlayer: '1',
        fiches: []
    };

    const privateInit = (baseUrl) => {
        Game.Model.init(baseUrl);

        // Setup Board
        Game.Model.getGameReversiViaSpelToken().then(result => {
            // set starting player
            configMap.currentPlayer = result.aandeBeurt;

            //game_info_current_turn = 

            for (let i = 0; i < result.bord.length; i++) {
                $("#game_table_body").append('<tr>');
                let row =  $("#game_table_body").children().eq(i);

                for (let j = 0; j < result.bord[i].length; j++) {
                    // Empty cell
                    if (result.bord[i][j] == 0) row.append('<td><div class="fiche"></div></td>');

                    // White Fiche
                    if (result.bord[i][j] === 1) $("#game_table_body").children().eq(i).append('<td><div class="fiche fiche__white"></div></td>');
                    
                    // Black Fiche
                    if (result.bord[i][j] === 2) $("#game_table_body").children().eq(i).append('<td><div class="fiche fiche__black"></div></td>');
                }
                $("#game_table_body").append('</tr>');
            }

            let cells = $('#game_table_body').find('td');

            // Set cell listeners
            cells.each((index, item) => { 
                let fiche = new Fiche(item, index);
                configMap.fiches.push(fiche);  

                $(item).on('mouseover', () => { fiche.hoverFiche(configMap.currentPlayer) });
                $(item).on('mouseout', () => { fiche.hoverOffFiche(configMap.currentPlayer) });
                $(item).on('mousedown', () => { sendFiche(fiche); /*fiche.showFiche(configMap.currentPlayer);*/ })    
            });
        });       

        return true;
    };

    let sendFiche = (fiche) => {
        let data = {
            HasPassed: false,
            X: fiche.x,
            Y: fiche.y,
            Token: null,
            SpelerToken: "20e6009a-84fe-4b55-98de-c2e388b3e50c"
        }

        Game.Model.putNewMove(data).then(result => {
            if (result.executed === true) { 
                fiche.showFiche(configMap.currentPlayer); 

                // Dev

                for (let cell in result.cells) {
                    console.log(cell);
                }
            }
        });
    };

    return {
        init: privateInit
    }
})();