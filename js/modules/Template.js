Game.Template = (() => {
    const privateInit = () => {
        console.log("init template")

        // Register handlebars
        Handlebars.registerHelper('ifCond', function(v1, v2, options) {
            if(v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    };

    // Function to retrieve the handlebars template.
    const getTemplate = (templateName) => {
        let templates = spa_templates.templates;
        console.log(templates)
        for (let t of templateName.split(".")) {
            templates = templates[t];
        }
        
        return templates;
    };

    // Function to parse a template and includes it data
    const parseTemplate = (templateName, data) => {
        let template = getTemplate(templateName);

        return template(data);
    };

    return {
        init: privateInit,
        getTemplate,
        parseTemplate,
    }
})();