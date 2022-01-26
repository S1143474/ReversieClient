Game.Model = (() => {

    let configMap = {
        
    };

    const privateInit = () => {
        Game.Data.init('development');

        Game.Data.listen("StartGame", () => {});
        Game.Data.listen("Redirect", () => {}, "url");

        // Game.Data.listen("OnMove", (aanDeBeurt) => { console.log(aanDeBeurt); }, "aanDeBeurt");
        return true;
    };

    const _listen = (on, callback) => {
        // TODO: Checking possibilities or something.
        Game.Data.listen(on, callback)
    };

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