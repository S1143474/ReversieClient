Game.Data = (() => {

    let configMap = {
        apiKey: '',
        hubUrl: '/reversiHub',
        hubConnection: '',

        mock: [
            {
                url: 'api/Spel/Beurt/1',
                data: 1,
            }
        ],
    };

    let stateMap = { 
        environment: 'production'
    };

    // Function To listen to a socket connection from the server
    const listen = (hubMethodName, callback, ...others) => {
        console.log("Listening to: ", hubMethodName);
        configMap.hubConnection.on(hubMethodName, (...others) => {
            console.log(others);
            callback(...others);
        });
    };

    // Function to start Socket/Hub connection with the server
    const start = () => {
        try {
            configMap.hubConnection.start();
        } catch (error) {
            console.debug(error);
            setTimeout(start, 3000);
        }
    };

    // Function to retrieve an image through a GET request.
    const getImage = (url) => {
        return $.ajax({
            url: url,
            headers: { 'X-Api-Key': 'pXIbEgubhq8hsoBRXyfuRA==59cec1dOsdZ0R21p', 'Accept': 'image/jpg'},
            success: function(result) {
                console.log(result);
                return result;
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    };

    // Function to retrieve specific json data provided by the server.
    const get = (url) => {
        return (stateMap.environment == 'development') ? getMockData(url) : $.ajax({
            url: url, 
            dataType: 'json', 
            type: 'GET', 
            contentType: 'application/json; charset=utf-8',
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }  
        })
        .then(result => {
            console.log(result);
            return result;
        }).catch(error => {
            console.error(error.message);
        });;
    };

    // Function to retieve mock data when environment is in development mode
    const getMockData = (url) => {
        const mockData = configMap.mock.filter(data => data.url == url);

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });
    };

    const privateInit = (environment) => {
        console.log(`Data: Init with environment: ${environment}`);

        // Listener for Reversi surrender button
        $("#game-resign-button").on("click", (event) => {
            configMap.hubConnection.invoke("OnSurrender");
        });

        // Listener for Reversi Pass button
        $("#game-pass-button").on("click", (event) => {
            let data = {
                x: -1,
                y: -1,
                hasPassed: true
            };

            configMap.hubConnection.invoke("OnMove", data);
        });

        // Listener for reversi Move button
        $("#reversiboardform").on("submit", (event) => {
            event.preventDefault();

            // Play Click Audio
            clickAudio.play();

            let x = parseInt(event.originalEvent.submitter.getAttribute('x'));
            let y = parseInt(event.originalEvent.submitter.getAttribute('y'));
        
            let data = {
                x: x,
                y: y,
                hasPassed: false
            };

            configMap.hubConnection.invoke("OnMove", data);
        });

        // Setup SingalRConecction
        configMap.hubConnection = new signalR.HubConnectionBuilder().withUrl(configMap.hubUrl).build();

        // Restart Connection on close
        configMap.hubConnection.onclose(async () => {
            await start();
        });
        start();
        
        // Throw error if provided environment is not applicable
        if (environment != 'production' && environment != 'development')
            throw new Error('De environment welke gebruikt dient te worden bestaat niet.');
        
        stateMap.environment = environment;

        return true;
    };

    return {
        init: privateInit,
        get: get,
        getImage,
        listen: listen
    };
})();