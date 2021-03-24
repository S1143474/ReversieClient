// Communication with server
Game.Data = (() => {

    let configMap = {
        mock: [
            {
                url: "api/Spel/Beurt/abcdef",
                beurt: 1
            }, 
            {
                url: "api/Spel/Beurt/9ed14313-ad1c-4685-ab22-5df8ae47b8b8",
                beurt: 2
            }
        ],
        apiKey: "c778bc363492651972bdfdb03db2cbda"
    };

    let stateMap = {
        environment: "production"
    };

    const privateInit = (environment) => {
        stateMap.environment = environment;

        // Check if environment is legal
        if (stateMap.environment !== "development" && stateMap.environment !== "production") {
            throw new Error("Ongeldig environment!");
        }

        return true;
    };

    const getMockData = (url) => {
        const mockData = configMap.mock.find(item => item.url === url);
        return new Promise((resolve, reject) => {
            resolve(mockData);
        });
    };
    
    const get = (url) => {
        if (stateMap.environment === "development") {
            return getMockData(url);
        } else if (stateMap.environment === "production") {
            return getAjax(url).then(r => { return r; }).catch(e => { console.log(e.message); });
        }
    };

    const put = (url, data) => {
        if (stateMap.environment === "development") {
            console.log("dev-env, nothing to post");
        } else if (stateMap.environment === "production") {
            return putAjax(url, data).then(r => { return r; }).catch(e => { console.log(e.message); })
        }
    }

    const putAjax = (url, data) => {
        return $.ajax({
            method: "PUT",
            contentType: 'application/json',
            url: url,
            data: JSON.stringify(data),
            dataType: 'json',

            success: (response) => {
                return response;
            },
            error: (response) => {
                console.log("error");
            }
        })
    };

    const getAjax = (url) => {
        return $.ajax({
            method: "GET",
            url: url,
            headers: {
                "accept": "application/json",
            },
            success: (response) => {
                return response;
            },
            error: (response) => {
                console.log("error");
            }
        });
    };

    return {
        init: privateInit,
        get: get,
        put: put
    }
})();