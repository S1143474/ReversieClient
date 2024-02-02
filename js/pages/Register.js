Game.RegisterPage =(() => {
    let configMap = {
        page: 'Register',
    };

    let stateMap = {
        currentPage: '',
        isLocated: false,

        pincode: [],
    };

    const privateInit = (page) => {
        stateMap.currentPage = page;
        stateMap.isLocated = configMap.page === page;

        if (!stateMap.isLocated)
            return;

        // Game.ComponentEvents.addClickOnClass("show__password__icon", showPassword)
        // Game.ComponentEvents.addClickOnClass("hide__password__icon", hidePassword)
    };

    

    return {
        init: privateInit,
    }
})();