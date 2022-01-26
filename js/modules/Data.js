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
        environment: 'development'
    };

    const listen = (hubMethodName, callback, ...others) => {
        console.log("Listening to: ", hubMethodName);
        configMap.hubConnection.on(hubMethodName, (...others) => {
            console.log(others);
            callback(...others);
        });
    };

    const start = () => {
        try {
            configMap.hubConnection.start();
        } catch (error) {
            console.debug(error);
            setTimeout(start, 3000);
        }
    };

    const get = (url) => {
        return (stateMap.environment == 'development') ? getMockData(url) : $.get(url)
        .then(result => {
            return result;
        }).catch(error => {
            console.error(error.message);
        });;
    };

    const getMockData = (url) => {
        const mockData = configMap.mock.filter(data => data.url == url);

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });
    };

    const privateInit = (environment) => {
        console.log("Data: Init");

        $("#reversiboardform").on("submit", (event) => {
            event.preventDefault();
            clickAudio.play();
        
            let element = document.getElementById("extra-info");
            element.textContent = null;
            // console.log(event);
            let x = parseInt(event.originalEvent.submitter.getAttribute('x'));
            let y = parseInt(event.originalEvent.submitter.getAttribute('y'));
        
            let data = {
                x: x,
                y: y,
                hasPassed: false
            };
        
            // console.log("X:", x);
            // console.log("Y:", y);

            configMap.hubConnection.invoke("OnMove", data);
        
            /*return false;*/
        });
        configMap.hubConnection = new signalR.HubConnectionBuilder().withUrl(configMap.hubUrl).build();
        configMap.hubConnection.onclose(async () => {
            await start();
        });
        start();
        
        if (environment != 'production' && environment != 'development')
            throw new Error('De environment welke gebruikt dient te worden bestaat niet.');
        
        stateMap.environment = environment;

        return true;
    };

    
    
    return {
        init: privateInit,
        get: get,
        listen: listen
    };
})();