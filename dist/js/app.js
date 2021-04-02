"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = function (url) {
  var configMap = {
    apiUrl: url
  };
  var stateMap = {
    gameState: 0
  };

  var privateInit = function privateInit(callBack) {
    Game.Reversi.init(configMap.apiUrl);

    _getCurrentGameState();

    callBack();
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    Game.Model.getGameState().then(function (result) {
      stateMap.gameState = result;
    }); //return stateMap.gameState;
  };

  return {
    init: privateInit
  };
}("https://localhost:44339/api/");

var FeedbackWidget = /*#__PURE__*/function () {
  function FeedbackWidget(elementId) {
    _classCallCheck(this, FeedbackWidget);

    this._elementId = elementId;
    this._key = 'feedback_widget';
    var id = document.getElementById(elementId);
  }

  _createClass(FeedbackWidget, [{
    key: "show",
    value: function show(message, type) {
      var id = document.getElementById(this._elementId); // $(id).removeClass((type === 'success') ? 'alert-danger' : 'alert-success');
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
  }, {
    key: "hide",
    value: function hide() {
      var id = document.getElementById(this._elementId);
      $(id).removeClass('fade--in');
      $(id).addClass('fade--out');
      id.addEventListener('webkitAnimationEnd', hideWidget);

      function hideWidget() {
        $(id).attr('style', 'display: none;');
        id.removeEventListener('webkitAnimationEnd', hideWidget);
      }
    }
  }, {
    key: "log",
    value: function log(message) {
      // Retrieve
      var jsonString = localStorage.getItem(this._key);

      if (jsonString != null) {
        var obj = JSON.parse(jsonString);
        obj.push(message); // if json object consist of ten items remove the first item.

        if (Object.keys(obj).length > 10) obj.shift();
        obj = JSON.stringify(obj);
        localStorage.setItem(this._key, obj);
      } else {
        var json = JSON.stringify(message);
        localStorage.setItem(this._key, "[" + json + "]");
      }
    }
  }, {
    key: "removeLog",
    value: function removeLog() {
      localStorage.removeItem(this._key);
    }
  }, {
    key: "history",
    value: function history() {
      var jsonString = localStorage.getItem(this._key);
      var jsonObj = JSON.parse(jsonString);
      b;
      var result = "";

      for (var i = 0; i < jsonObj.length; i++) {
        result += "type |" + jsonObj[i].type + "| - " + jsonObj[i].message + "\n";
      }

      this.show(result);
    }
  }]);

  return FeedbackWidget;
}();

var Fiche = /*#__PURE__*/function () {
  function Fiche(item, id) {
    _classCallCheck(this, Fiche);

    this._item = item;
    this._id = id;
    this.x = this._id % 8;
    this.y = Math.floor(this._id / 8);
    console.log(item);
  }

  _createClass(Fiche, [{
    key: "showFiche",
    value: function showFiche(currentPlayer) {
      var fiche = $(this._item).find('div')[0];
      var ficheStyle = fiche.classList;

      if (!ficheStyle.contains('fiche__white') && !ficheStyle.contains('fiche__black')) {
        if (currentPlayer == 1) {
          $(fiche).removeClass('fiche__white-hover');
          $(fiche).addClass('fiche__white fiche__animation-white');
        }

        if (currentPlayer == 2) {
          $(fiche).removeClass('fiche__black-hover');
          $(fiche).addClass('fiche__black fiche__animation-black');
        }
      }
    }
  }, {
    key: "flip",
    value: function flip() {
      var fiche = $(this._item).find('div')[0];
      var ficheStyle = fiche.classList;

      if (ficheStyle.contains('fiche__white')) {
        $(fiche).removeClass('fiche__white');
        $(fiche).addClass('fiche__black fiche__animation-black');
      } else if (ficheStyle.contains('fiche__black')) {
        $(fiche).removeClass('fiche__black');
        $(fiche).addClass('fiche__white fiche__animation-white');
      }
    }
  }, {
    key: "hoverFiche",
    value: function hoverFiche(currentPlayer) {
      var fiche = $(this._item).find('div')[0];
      var ficheStyle = fiche.classList; //console.log("X: " + (this._id % 8) + " Y: " + (Math.floor(this._id / 8)));

      if (!ficheStyle.contains('fiche__white') && !ficheStyle.contains('fiche__black')) {
        if (currentPlayer == 1) {
          $(fiche).removeClass('fiche__white');
          $(fiche).addClass('fiche__white-hover');
        }

        if (currentPlayer == 2) {
          $(fiche).removeClass('fiche__black');
          $(fiche).addClass('fiche__black-hover');
        }
      }
    }
  }, {
    key: "hoverOffFiche",
    value: function hoverOffFiche(currentPlayer) {
      var fiche = $(this._item).find('div')[0];
      var ficheStyle = fiche.classList;

      if (ficheStyle.contains('fiche__white-hover') || ficheStyle.contains('fiche__black-hover')) {
        if (currentPlayer == 2) {
          $(fiche).removeClass('fiche__black-hover');
        }

        if (currentPlayer == 1) {
          $(fiche).removeClass('fiche__white-hover');
        }
      }
    }
  }]);

  return Fiche;
}();

exports.Fiche = Fiche; // Communication with server

Game.Data = function () {
  var configMap = {
    mock: [{
      url: "api/Spel/Beurt/abcdef",
      beurt: 1
    }, {
      url: "api/Spel/Beurt/9ed14313-ad1c-4685-ab22-5df8ae47b8b8",
      beurt: 2
    }],
    apiKey: "c778bc363492651972bdfdb03db2cbda"
  };
  var stateMap = {
    environment: "production"
  };

  var privateInit = function privateInit(environment) {
    stateMap.environment = environment; // Check if environment is legal

    if (stateMap.environment !== "development" && stateMap.environment !== "production") {
      throw new Error("Ongeldig environment!");
    }

    return true;
  };

  var getMockData = function getMockData(url) {
    var mockData = configMap.mock.find(function (item) {
      return item.url === url;
    });
    return new Promise(function (resolve, reject) {
      resolve(mockData);
    });
  };

  var get = function get(url) {
    if (stateMap.environment === "development") {
      return getMockData(url);
    } else if (stateMap.environment === "production") {
      return getAjax(url).then(function (r) {
        return r;
      })["catch"](function (e) {
        console.log(e.message);
      });
    }
  };

  var put = function put(url, data) {
    if (stateMap.environment === "development") {
      console.log("dev-env, nothing to post");
    } else if (stateMap.environment === "production") {
      return putAjax(url, data).then(function (r) {
        return r;
      })["catch"](function (e) {
        console.log(e.message);
      });
    }
  };

  var putAjax = function putAjax(url, data) {
    return $.ajax({
      method: "PUT",
      contentType: 'application/json',
      url: url,
      data: JSON.stringify(data),
      dataType: 'json',
      success: function success(response) {
        return response;
      },
      error: function error(response) {
        console.log("error");
      }
    });
  };

  var getAjax = function getAjax(url) {
    return $.ajax({
      method: "GET",
      url: url,
      headers: {
        "accept": "application/json"
      },
      success: function success(response) {
        return response;
      },
      error: function error(response) {
        console.log("error");
      }
    });
  };

  return {
    init: privateInit,
    get: get,
    put: put
  };
}();

Game.Model = function () {
  var configMap = {
    baseUrl: null,
    token: "0a232769-af48-455e-a208-242456287d69"
  };

  var privateInit = function privateInit(baseUrl) {
    configMap.baseUrl = baseUrl;

    _getGameReversiViaSpelToken();

    return true;
  };

  var _getGameState = function _getGameState() {
    // Aanvraag via Game.Data
    var gameState = Game.Data.get(configMap.baseUrl + "Spel/Beurt/" + configMap.token);
    return gameState.then(function (result) {
      if (result.beurt > 2 || result.beurt < 0) {
        throw new Error("De gameState waarde ligt buiten bereik");
      } else {
        return result.beurt;
      }
    });
  };

  var _getGameReversiViaSpelToken = function _getGameReversiViaSpelToken() {
    var result = Game.Data.get(configMap.baseUrl + "Spel/" + configMap.token);
    return result.then(function (result) {
      return result;
    });
  };

  var _putNewMove = function _putNewMove(data) {
    data.Token = configMap.token;
    var result = Game.Data.put(configMap.baseUrl + "Spel/Zet", data);
    return result.then(function (r) {
      return r;
    });
  };

  return {
    init: privateInit,
    getGameState: _getGameState,
    getGameReversiViaSpelToken: _getGameReversiViaSpelToken,
    putNewMove: _putNewMove
  };
}();

Game.Reversi = function () {
  var configMap = {
    currentPlayer: '1',
    fiches: []
  };

  var privateInit = function privateInit(baseUrl) {
    Game.Model.init(baseUrl); // Setup Board

    Game.Model.getGameReversiViaSpelToken().then(function (result) {
      // set starting player
      configMap.currentPlayer = result.beurt; //game_info_current_turn = 

      for (var i = 0; i < result.bord.length; i++) {
        $("#game_table_body").append('<tr>');
        var row = $("#game_table_body").children().eq(i);

        for (var j = 0; j < result.bord[i].length; j++) {
          // Empty cell
          if (result.bord[i][j] == 0) row.append('<td><div class="fiche"></div></td>'); // White Fiche

          if (result.bord[i][j] === 1) $("#game_table_body").children().eq(i).append('<td><div class="fiche fiche__white"></div></td>'); // Black Fiche

          if (result.bord[i][j] === 2) $("#game_table_body").children().eq(i).append('<td><div class="fiche fiche__black"></div></td>');
        }

        $("#game_table_body").append('</tr>');
      }

      var cells = $('#game_table_body').find('td'); // Set cell listeners

      cells.each(function (index, item) {
        var fiche = new Fiche(item, index);
        configMap.fiches.push(fiche);
        $(item).on('mouseover', function () {
          fiche.hoverFiche(configMap.currentPlayer);
        });
        $(item).on('mouseout', function () {
          fiche.hoverOffFiche(configMap.currentPlayer);
        });
        $(item).on('mousedown', function () {
          sendFiche(fiche);
          /*fiche.showFiche(configMap.currentPlayer);*/
        });
      });
    });
    return true;
  };

  var sendFiche = function sendFiche(fiche, currentPlayerToken) {
    var data = {
      HasPassed: false,
      X: fiche.x,
      Y: fiche.y,
      Token: null,
      SpelerToken: "currentPlayerToken"
    };
    Game.Model.putNewMove(data).then(function (result) {
      if (result.executed === true) {
        fiche.showFiche(configMap.currentPlayer); //console.log(result.cells[0]);

        var _loop = function _loop(i) {
          var tempFiche = configMap.fiches.find(function (f) {
            return f.x == result.cells[i].x && f.y == result.cells[i].y;
          });
          tempFiche.flip();
          console.log(tempFiche);
        };

        for (var i = 0; i < result.cells.length; i++) {
          _loop(i);
        } //console.log(fichesToTurn);

      }
    });
  };

  return {
    init: privateInit
  };
}();