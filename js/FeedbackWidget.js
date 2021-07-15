class FeedbackWidget {
    constructor(elementId) {
        this._elementId = elementId;
    }

    get elementId() {
        return this._elementId;
    }

    show() {
        let element = document.getElementById(this._elementId);

        if (element.style.display === "none") {
            element.style.display = "block";
        }
    }

    hide() {
        let element = document.getElementById(this._elementId);

        if (element.style.display === "block") {
            element.style.display = "none"
        }
    }
}