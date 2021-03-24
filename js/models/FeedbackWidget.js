class FeedbackWidget {

    constructor (elementId) {  
        this._elementId = elementId;
        this._key = 'feedback_widget';
        let id = document.getElementById(elementId);
    }
  
    show(message, type) {
        let id = document.getElementById(this._elementId); // $(id).removeClass((type === 'success') ? 'alert-danger' : 'alert-success');
        // $(id).addClass((type === 'success') ? 'alert-success' : 'alert-danger');
        //$(id).text(message);
  
        $(id).attr('style', 'display: block');
        $(id).removeClass('fade--out');
        $(id).addClass('fade--in');
        this.log({
            message: "Bijna klaar, tijd voor koffe",
            type: "success"
        });
    }
    
    hide() {
        let id = document.getElementById(this._elementId);
        $(id).removeClass('fade--in');
        $(id).addClass('fade--out');
        id.addEventListener('webkitAnimationEnd', hideWidget);
  
        function hideWidget() {
            $(id).attr('style', 'display: none;');
            id.removeEventListener('webkitAnimationEnd', hideWidget);
        }
    }
    
    log(message) {
        // Retrieve
        let jsonString = localStorage.getItem(this._key);
  
        if (jsonString != null) {
            let obj = JSON.parse(jsonString);
            obj.push(message); // if json object consist of ten items remove the first item.
    
            if (Object.keys(obj).length > 10) obj.shift();
            obj = JSON.stringify(obj);
            localStorage.setItem(this._key, obj);
        } else {
            let json = JSON.stringify(message);
            localStorage.setItem(this._key, "[" + json + "]");
        }
    } 
    
    removeLog() {
        localStorage.removeItem(this._key);
    }
    
    history() {
        let jsonString = localStorage.getItem(this._key);
        let jsonObj = JSON.parse(jsonString); b
        let result = "";

        for (let i = 0; i < jsonObj.length; i++) {
            result += "type |" + jsonObj[i].type + "| - " + jsonObj[i].message + "\n";
        }
  
        this.show(result);
    };
}