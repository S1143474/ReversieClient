class FeedbackWidget {

    constructor(elementId) {
        this._elementId = elementId;
        this._key = "feedback_widget";
    }

    get elementId() {
        return this._elementId;
    }

    show(message, type) {
        let element = document.getElementById(this._elementId);
        debugger;
        if (message instanceof String || typeof message === 'string') {
            $(element).find(".alert__title").text(message);
            $(element).find(".alert__message").text(null);
        } else if (message.hasOwnProperty('title') && message.hasOwnProperty('msg')) {
            $(element).find(".alert__title").text(message['title']);
            $(element).find(".alert__message").text(message['msg']);
            
        }
        
        // Alter alert based on type
        element.classList.add((type == "success") ? 'alert-success' : 'alert-danger');
        if (type == "success") {
            element.classList.add("alert-hover");
            $(element).find(".alert__close").hide();
        }

        if (element.style.display === "none") {
            element.style.display = "block";
        }

        this.log({
            "message": message,
            "type": type
        });
    }

    hide() {
        let element = document.getElementById(this._elementId);

        if (element.style.display === "block") {
            element.style.display = "none"
        }
    }

    log(message) {
        let localStorage = window.localStorage;

        localStorage.setItem(this._key, JSON.stringify(message));
    }

    removeLog() {
        
    }
}