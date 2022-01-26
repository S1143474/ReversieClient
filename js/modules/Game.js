const API_URL = 'https://localhost:44339/api/';

const Game = ((url) => {
    console.log('Hallo vanuit een module!');

    let configMap = {
        apiUrl: url
    };

    let stateMap = {

    };

    // Private function init
    const privateInit = (afterInit) => {
        Game.Model.init();
        Game.Model.listen("Redirect", _redirect);
        Game.Model.listen("OnMove", _onMove)
        Game.Model.listen("OnWrongMove", _wrongMoveMessage);
        Game.Model.listen("OnDisableMove", _disableMovePlacement);
        console.log(configMap.apiUrl);
        _getCurrentGameState();
        afterInit();
    };

    const _turnFiches = (fichesToTurnAround, turn) => {
        let cells = document.querySelectorAll(".fiche");

        cells.forEach((cell) => {
            let x = parseInt(cell.getAttribute('x'));
            let y = parseInt(cell.getAttribute('y'));

            fichesToTurnAround.forEach((fiche) => {
                if (fiche.x == x && fiche.y == y) {
                    if (turn == 1) {
                        cell.classList.remove("fiche-white", "fiche-empty");
                        cell.classList.add("fiche-black");                        
                    } else {
                        cell.classList.remove("fiche-black", "fiche-empty");
                        cell.classList.add( "fiche-white");
                    }
                }
            });
        });
    };

    const _redirect = (url) => {
        console.log(url);
        window.location.pathname = url;
    };

    const _onMove = (fichesToTurnAround, aanDeBeurt) => {
        console.log("Movement")
        console.log("Turn", aanDeBeurt);

        _turnFiches(fichesToTurnAround, aanDeBeurt);
        let buttons = document.querySelectorAll(".fiche");
     
        buttons.forEach(button => {
            button.disabled = false;
            button.style = "pointer-events: auto;";
        });
    };

    const _wrongMoveMessage = () => {
        let element = document.getElementById("extra-info");
        element.textContent = "Verkeerde zet, probeer het nog eens";
    };

    const _disableMovePlacement = (fichesToTurnAround, aanDeBeurt) => {
        _turnFiches(fichesToTurnAround, aanDeBeurt);
        let buttons = document.querySelectorAll(".fiche");

        buttons.forEach(button => {
            button.disabled = true;
            button.style = "pointer-events: none;";
        });
    };

    const _getCurrentGameState = () => {
        setInterval(() => {
            Game.Model.getGameState().then(result => {
                stateMap.gameState = result.data;
                console.log(stateMap.gameState);
            });
        }, 2000);
    };
    // Return value/object to the outer scope.
    return {
        init: privateInit
    };
})(API_URL);