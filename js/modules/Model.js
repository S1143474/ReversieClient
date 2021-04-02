Game.Model = (() => {
    
    let configMap = {
        baseUrl: null,
        //token: "f20407ce-037f-41d6-98cd-ab0889c12536"
    };

    const privateInit = (baseUrl) => {
        configMap.baseUrl = baseUrl;

        _getGameReversiViaSpelToken();
        return true;
    };

    const _getGameState = () => {
        // Aanvraag via Game.Data
        let gameState = Game.Data.get(configMap.baseUrl + "Spel/Beurt/" + configMap.token);

        return gameState.then(result => {   
            if (result.beurt > 2 || result.beurt < 0) {
                throw new Error("De gameState waarde ligt buiten bereik");
            } else {
                return result.beurt;
            }
        });
    };

    const _getGameReversiViaSpelToken = (token) => {
        let result = Game.Data.get(configMap.baseUrl + "Spel/" + token);

        return result.then(result => {
            return result;
        });
    };

    const _putNewMove = (data) => {
        data.Token = configMap.token;
        let result = Game.Data.put(configMap.baseUrl + "Spel/Zet", data)

        return result.then(r => {
            return r;
        });
    }

    return {
        init: privateInit,
        getGameState: _getGameState,
        getGameReversiViaSpelToken: _getGameReversiViaSpelToken,
        putNewMove: _putNewMove
    }
})();
