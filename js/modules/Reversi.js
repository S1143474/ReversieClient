Game.Reversi = (() => {
    let configMap = {

    };

    let stateMap = {
        orignalRoles: {
            Speler: [],
            Moderator: [],
            Admin: [],
        },
        changedRoles: [],
    };

    // Assign event listeners to the select input for changing the roles.
    const _assignEventListeners = () => {
        let currentLocation = window.location.pathname.split('/')[2];

        if (currentLocation !== "AsignRoles")
            return;

        var rows = document.getElementsByTagName("table")[0].rows;
        // var last = rows[rows.length - 1];
        // var cell = last.cells[0];
        // var value = cell.innerHTML
   
        for (let i = 1; i < rows.length; i++) {
            let role = rows[i].cells[2].getElementsByTagName("select")[0].value;
            let guid = rows[i].cells[0].getElementsByTagName("input")[0].value

            stateMap.orignalRoles[role].push(guid);

            Game.ComponentEvents.addOnChange(rows[i].cells[2], (component, event) => {                
                let user = stateMap.changedRoles.find(el => el.id === guid)
                if (user === undefined) {
                    stateMap.changedRoles.push({id: guid, role: component.value})
                } else {
                    user.role = component.value;
                }
                let inputList = document.getElementById("changeListInput");
                inputList.value = JSON.stringify(stateMap.changedRoles);
                // Now that atleast one change has been made we can show the save butotn
                _showSaveButton();
            });
        }
    }

    const _submitRoleChange = () => {
        console.log("Submit: ", stateMap.changedRoles);
    };

    // Show the save button function
    const _showSaveButton = () => {
        let saveBtn = document.getElementById("savechangesbtn");
        saveBtn.style.display = "block";
    };

    // Function to retrieve a random dad joke from the API module.
    // It also assings the joke to a generated template
    const getRandomJokeTemplate = async () => {
        let jokeJson = await Game.API.getRandomDadJoke();
        console.log(jokeJson);
        if (jokeJson === undefined)
            return;

        let dadjoke = jokeJson.joke;

        let jokeTemplate = Game.Template.parseTemplate("dadjoke.randomdadjoke", {
            joke: dadjoke
        });

        return jokeTemplate;
    };

    // Dipslay the dad joke that has ben generated through a template
    const displayJoke = async () => {
        let template = await getRandomJokeTemplate()

        let dadJokeHtml = $("#current-dad-joke");
        dadJokeHtml.html(template);
    };

    const privateInit = () => {
        _assignEventListeners();

        Game.ComponentEvents.addClick("savechangesbtn", _submitRoleChange)
        return true;
    };

    return {
        init: privateInit,
        displayJoke,
    }
})();