Game.ComponentEvents = (() => {
    
    let configMap = {};

    let stateMap = {};

    const privateInit = () => {
        
    };

    // Listener function for click event
    const privateAddClickListener = (id, callback, param) => {
        let componentId = document.getElementById(id);

        if (componentId == null) {
            console.error(`Component Id: ${id} Not Found`);
            return;
        }
        componentId.addEventListener('click', (event) => { callback(event, param) });
    };

    // Listener function for class click event
    const privateAddClickOnClassListener = (id, callback) => {
        let components = document.getElementsByClassName(id);

        if (components == null) {
            console.error(`Component class: ${id} Not Found`);
            return;
        }

        for (let component of components) {
            component.addEventListener('click', () => { callback(component) });
        }
    };

    // Listener function for focus event
    const privateAddOnFocusListener = (id, callback) => {
        let componentId = document.getElementById(id);

        if (componentId == null) {
            console.error(`Component Id: ${id} Not Found`);
            return;
        }
        componentId.addEventListener('focus', () => { callback(componentId) });
    };

    // Listener function for focus out event
    const privateAddOnFocusOutListener = (id, callback) => {
        let componentId = document.getElementById(id);

        if (componentId == null) {
            console.error(`Component Id: ${id} Not Found`);
            return;
        }
        componentId.addEventListener('focusout', () => { callback(componentId) });
    };

    // Listener function for input event
    const privateAddOnInputListener = (id, callback) => {
        let componentId = document.getElementById(id);

        if (componentId == null) {
            console.error(`Component Id: ${id} Not Found`);
            return;
        }
        componentId.addEventListener('input', () => { callback(componentId) });
    };

    // Listener function for change input event
    const _addOnChangeListener = (id, callback) => {
        if (typeof(id) === 'string')
            return;

        let component = id.getElementsByTagName("select")[0]

        if (component == null) {
            console.error(`Component: ${id} Not Found`);
            return;
        }
       
        if (component.getAttribute('listener') === 'true')
            return;

        component.setAttribute('listener', 'true');
        component.addEventListener('change', (event) => { callback(component, event) });
    };

    return {
        init: privateInit,
        addClick: privateAddClickListener,
        addClickOnClass: privateAddClickOnClassListener,
        addOnFocus: privateAddOnFocusListener,
        addOnFocusOut: privateAddOnFocusOutListener,
        addOnInput: privateAddOnInputListener,
        addOnChange: _addOnChangeListener,
    }
})();