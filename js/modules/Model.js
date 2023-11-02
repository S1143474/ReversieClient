Game.Model = (() => {

    let configMap = {
        
    };

    const privateInit = () => {
        Game.Data.init('production');

        Game.Data.listen("StartGame", () => {});
        Game.Data.listen("Redirect", () => {}, "url");
        return true;
    };

    // Model Function Listener to pass through the data
    const _listen = (on, callback) => {
        // TODO: Checking possibilities or something and validate data.
        Game.Data.listen(on, callback)
    };

    // Function to retrieve Current GameState
    const _getGameState = () => {
        return Game.Data.get('api/Spel/Beurt/1').then(result => {
            if (result != null && result[0].data != null && result[0].data >= 0 && result[0].data <= 2) {
                return result[0];
            }
            throw new Error('Er ging iets mis met het opvragen van de huidige gamestate.');
        });
    };

    return {
        init: privateInit,
        listen: _listen,
        getGameState: _getGameState,
    };
})();