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
        // Initialize other modules
        Game.Model.init();
        Game.Template.init();
        Game.ComponentEvents.init();
        Game.Reversi.init();

        // Setup the listeners for 2FA input
        _initPasswordAnd2FaClick();

        // Set up the socket listeners which communicate with the reversi server.
        _initSignalRHubListeners(); 

        // Set the page location data for 2FA page and register page
        _initLocationForDedicatedPages();

        // Show password eye
        _initPasswordToggleShow();

        // Setup the custom password strength meter and listener
        _initPasswordStrengthMeter();
        
        // Listens to the buttons for deleting players (Moderator)
        _initModerateUserPageButtons();
        
        // Initialize Stats module
        Game.STATS.init();

        afterInit();
    };

    const _initPasswordAnd2FaClick = () => {
        Game.ComponentEvents.addClick("btn-update-password", _openDialog, "update-user-password-dialog");
        Game.ComponentEvents.addClick("btn-update-2fa", _openDialog, "update-2fa-dialog");
        Game.ComponentEvents.addClick("btn-close-update-user-password-dialog", _closeDialog, "update-user-password-dialog");
    };

    const _initSignalRHubListeners = () => {
        Game.Model.listen("Redirect", _redirect);
        Game.Model.listen("OnMove", _onMove)
        Game.Model.listen("OnWrongMove", _wrongMoveMessage);
        Game.Model.listen("OnDisableMove", _disableMovePlacement);
        Game.Model.listen("OnFinish", _finish);
        Game.Model.listen("OnError", _onError);
        Game.Model.listen("OnPlayerOnline", _test);
        Game.Model.listen("OnCreateGame", _gameCreated);
        Game.Model.listen("OnDeletedUser", _onDeletedUserMessage);
    };

    const _initLocationForDedicatedPages = () => {
        let location = window.location.pathname;
        let locationList = location.split('/');
        let locationListLength = locationList.length - 1;

        Game.LoginWith2faPage.init(locationList[locationListLength]);
        Game.RegisterPage.init(locationList[locationListLength]);
    };

    const _initPasswordToggleShow = () => {
        Game.ComponentEvents.addClickOnClass("show__password__icon", showPassword);
        Game.ComponentEvents.addClickOnClass("hide__password__icon", hidePassword);
    };

    const _initPasswordStrengthMeter = () => {
        Game.ComponentEvents.addOnFocus("register__password", showPasswordStrengthMeter);
        Game.ComponentEvents.addOnFocusOut("register__password", hidePasswordStrengthMeter);

        Game.ComponentEvents.addOnFocus("register__confirm__password", showPasswordStrengthMeter);
        Game.ComponentEvents.addOnFocusOut("register__confirm__password", hidePasswordStrengthMeter);

        Game.ComponentEvents.addOnInput("register__password", udpatePasswordMeter);       
        Game.ComponentEvents.addOnInput("register__confirm__password", udpatePasswordMeter);
    };

    const _initModerateUserPageButtons = () => {
        Game.ComponentEvents.addClickOnClass("del-user", _showDeleteUserDialog);

        Game.ComponentEvents.addClick("close__dialog", _closeDeleteUserDialog);

        Game.ComponentEvents.addClick("confirm__delete__user__dialog", _submitDeleteUserDialog);
        Game.ComponentEvents.addClick("close__deleted__user__dialog", _closeDeletedUserMessageDialog);
    };
    // ------- DELETE USER DIALOG -------
    const _showDeleteUserDialog = (component) => {        
        const dialog = document.getElementById("delete-user-dialog");

        const userId = component.getAttribute("user-id");

        const userIdInput = document.getElementsByName("userId")[0];
        userIdInput.value = userId;

        dialog.showModal();
    };

    const _closeDeleteUserDialog = (event) => {
        event.preventDefault();

        const dialog = document.getElementById("delete-user-dialog");
        dialog.close();
    };

    const _closeDeletedUserMessageDialog = (event) => {
        const dialog = document.getElementById("account__deletion__dialog");
        dialog.close();
        location.reload(true);
    };

    const _submitDeleteUserDialog = (event) => {
        event.preventDefault();
        const dialog = document.getElementById("delete-user-dialog");

        const form = dialog.children[2];
        const userIdInput = document.getElementsByName("userId")[0];
        const reasonInput = document.getElementsByName("reason")[0];

        form.submit();
    };

    // ------- PASSWORD CHECKER -------
    const _hasUpperCase = (string) => {
        return (/[A-Z]/.test(string));
    };

    const _hasLowerCase = (string) => {
        return (/[a-z]/.test(string));
    };

    const _hasNumber = (string) => {
        return /\d/.test(string);
    };

    const _hasNonAlphaNumeric = (string) => {
        return /[^a-zA-Z\d\s:]/g.test(string);
    };

    const _togglePasswordRequirement = (element, passwordCondition) => {
        if (passwordCondition) {
            element.classList.add("included");
            element.classList.remove("not-included");
            element.classList.remove("none");

            element.children[0].innerText = "task_alt";
            return;
        } 

        element.classList.add("not-included");
        element.classList.remove("none");
        element.classList.remove("included");

        element.children[0].innerText = "close";
    };

    const udpatePasswordMeter = (element) => {
        for (let nextElement of element.parentNode.children) {
            if (nextElement.classList.contains("password__strength__checker")) {
                let requirements = nextElement.children[1].children;
                
                if (element.value.length === 0) {
                    for (let el of requirements) {
                        if (!el.classList.contains("none")) {
                            el.classList.add("none");
                            el.children[0].innerText = "close";
                        }
                        el.classList.remove("not-included", "included");
                    }

                    return;
                }

                _togglePasswordRequirement(requirements[0], element.value.length >= 12 && element.value.length <= 128);
                _togglePasswordRequirement(requirements[1], _hasUpperCase(element.value));
                _togglePasswordRequirement(requirements[2], _hasLowerCase(element.value));
                _togglePasswordRequirement(requirements[3], _hasNumber(element.value));
                _togglePasswordRequirement(requirements[4], _hasNonAlphaNumeric(element.value));

            }
        }
    };

    const hidePasswordStrengthMeter = (componentId) => {
        for (let nextElement of componentId.parentNode.children) {
            if (nextElement.classList.contains("password__strength__checker")) {
                nextElement.style.display = 'none';
            }
        }
    };

    const showPasswordStrengthMeter = (componentId) => {
        let strengthPasswordMeter = document.getElementsByClassName('password__strength__checker');
        for (let element of strengthPasswordMeter) {
            element.style.display = 'none';
        }

        for (let nextElement of componentId.parentNode.children) {
            if (nextElement.classList.contains("password__strength__checker")) {
                nextElement.style.display = 'flex';
            }
        }
    };

    const showPassword = (element) => {
        
        element.style.display = 'none';
        for(let nextElement of element.parentNode.children) {
            if (nextElement.classList.contains("hide__password__icon")) {
                nextElement.style.display = 'block';
            }

            if (nextElement.tagName.toLowerCase() === 'input') {
                nextElement.type = 'text';
            }
        }
    };

    const hidePassword = (element) => {
        element.style.display = 'none';
        for(let nextElement of element.parentNode.children) {
            if (nextElement.classList.contains("show__password__icon")) {
                nextElement.style.display = 'block';
            }

            if (nextElement.tagName.toLowerCase() === 'input') {
                nextElement.type = 'password';
            }
        }
    }

    const _test = (message) => {
        let counter = document.getElementById("online__player__counter");
       
        if (counter !== null)
            counter.innerText = `players online: ${message}`;
    };

    const _closeDialog = (dialogId) => {
        let dialogComponent = document.getElementById(dialogId);

        if (dialogComponent == null)
            throw new Error("Dialog Id Not Found!");

        if (typeof dialogComponent.showModal === "function") 
            dialogComponent.close();
    };

    const _openDialog = (dialogId) => {
        let dialogComponent = document.getElementById(dialogId);

        if (dialogComponent == null)
            throw new Error("Dialog Id Not Found!");

        if (typeof dialogComponent.showModal === "function") 
            dialogComponent.showModal();
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

    // ---------- SOCKET LISTENER FUNCTIONS ---------
    // Function which handles the game after the opponent has placed a fiche.
    const _onMove = (fichesToTurnAround, aanDeBeurt) => {
        console.log("Movement")
        console.log("Turn", aanDeBeurt);
        
        Game.STATS.push(fichesToTurnAround, aanDeBeurt);
        _turnFiches(fichesToTurnAround, aanDeBeurt);
        let buttons = document.querySelectorAll(".fiche");
     
        buttons.forEach(button => {
            button.disabled = false;
            button.style = "pointer-events: auto;";
        });

        // High light current user.
        let leftScoreOwner = document.querySelector(".game__ownedboardbalance__player-1");
        let rightScoreOwner = document.querySelector(".game__ownedboardbalance__player-2");

        rightScoreOwner.classList.remove("big");
        leftScoreOwner.classList.add("big");

        Game.Reversi.displayJoke();
    };

    // Function for when a player has executed a wrong move.
    const _wrongMoveMessage = async (notExecutedMessage) => {
        console.log(notExecutedMessage); 
        let element = document.getElementById("wrong_move_info");
        console.log("Element:" + element);
        element.innerHTML = iconText("notification_important", notExecutedMessage);
        element.style.display = "flex";
        await delay(4000);
        element.style.display = "none";
    };

    // Function to disable the current player move so it knows that it is not/her his turn
    const _disableMovePlacement = (fichesToTurnAround, aanDeBeurt) => {
        Game.STATS.push(fichesToTurnAround, aanDeBeurt);
        _turnFiches(fichesToTurnAround, aanDeBeurt);

        let buttons = document.querySelectorAll(".fiche");

        buttons.forEach(button => {
            button.disabled = true;
            button.style = "pointer-events: none;";
        });

        // Stop highlightin current user and highlight opponent
        let leftScoreOwner = document.querySelector(".game__ownedboardbalance__player-1");
        let rightScoreOwner = document.querySelector(".game__ownedboardbalance__player-2");

        rightScoreOwner.classList.add("big");
        leftScoreOwner.classList.remove("big");
    };

    // Function to handle the finished game
    const _finish = (gameResult) => {
        console.log("Game Finished", gameResult);
    };
 
    // Function to show the user that his or her account has been deleted
    const _onDeletedUserMessage = (reason) => {
        const dialog = document.getElementById("account__deletion__dialog");
        const dialogMessage = document.getElementById("account__deletion__reason");
        dialogMessage.innerText = reason;
        dialog.showModal();
    };

    // Function to show error, when one occurs on the server side.
    const _onError = (message) => {
        console.log('Error', message);
        console.log('TODO: ', 'create a proper popup error message')
    };

    // Function to rederict user to reversi game page when a game has started.
    const _gameCreated = () => {
        console.debug("Game Created");

        let location = window.location.pathname;
        let locationList = location.split('/');
        let pageName = locationList[locationList.length -1];
        
        console.debug("Pagename:", pageName);

        if (pageName !== "AvailableGames")
            return;

        window.location.reload();
    }

    const _getCurrentGameState = () => {
        setInterval(() => {
            Game.Model.getGameState().then(result => {
                stateMap.gameState = result.data;
                console.log(stateMap.gameState);
            });
        }, 2000);
    };

    return {
        init: privateInit
    };
})(API_URL);