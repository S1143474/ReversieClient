Game.API = (() => {

    const configMap = {
        // Categories which are available in the get random image API.
        imageCategories: ["nature", "city", "technology", "food", "still_life", "abstract", "wildlife"],
    };
    
    const _privateInit = () => {
        console.log("API: Initialization");
    };

    // API Function to retrieve a single dad joke as a string.
    const getRandomDadJoke = async () => {
        try {
            return await Game.Data.get("https://icanhazdadjoke.com/");
        } catch (error) {
            throw new Error("Failed to fetch a dad joke");
        }
    };

    // API Function to retrieve a random image and assigns it on a given image element.
    const getRandomImage = async (imageElement) => {
        const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        
        try {
            const randomCategory = configMap.imageCategories[Math.floor(Math.random() * configMap.imageCategories.length)];
            const imageSrc = await Game.Data.getImage(`https://api.api-ninjas.com/v1/randomimage?category=${randomCategory}`);
            const base64EncodedStr = imageSrc.toString('base64');
            debugger;
            const isBase64 = base64regex.test(base64EncodedStr)
            imageElement.src = `data:image/*;base64,${base64EncodedStr}`;
            if (isBase64) {
                
            }
        } catch (error) {
            throw new Error("Failed to fetch and display a random image", error);
        }
    };

    return {
        init: _privateInit,
        getRandomDadJoke,
        getRandomImage
    };
})();