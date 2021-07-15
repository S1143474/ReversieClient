const Game = ((url) => {

    let configMap = {
        apiUrl: url
    };

    let stateMap = {
        gameState: 0
    }; 

    let privateInit = (callBack) => {
        Game.Reversi.init(configMap.apiUrl);

        _getCurrentGameState();

        callBack();
    };

    let _getCurrentGameState = ()  => {
        Game.Model.getGameState().then(function (result) {
          stateMap.gameState = result;
        }); //return stateMap.gameState;
    };

    return {
        init: privateInit
    }

})("https://localhost:44339/api/");
