(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _this = undefined;

var ChatApplication = {};

ChatApplication.window = {
  isOpen: false,
  isMinimized: false,
  $chatWindow: jQuery('\n  <div class="chat-window">\n    <div class="chat-window-header">\n      <div class="chat-title">\n        Support Chat\n      </div>\n      <div class="chat-window-buttons chat-window-close"></div>\n      <div class="chat-window-buttons chat-window-minimize"></div>\n    </div>\n    <div class="chat-window-start-dialog-form">\n      <h2>Welcome to support chat!</h2>\n      <label for="chat-window-name-input">Input your name:</label>\n      <input class="chat-window-input-text" type="text" placeholder="Your name"/>\n      <label for="chat-window-email-input">Input you email:</label>\n      <input class="chat-window-input-text" type="text" placeholder="Your email"/>\n    </div>\n    <div class="chat-footer">\n      <div class="chat-start-dialog">\n        <button class="chat-footer-btn">Start dialog</button>\n      </div>\n    </div>\n  </div>')
};

ChatApplication.window.open = function () {};

ChatApplication.window.minimize = function () {};

ChatApplication.window.maximize = function () {};

ChatApplication.window.close = function () {};

ChatApplication.window.render = function () {

  // <div class="chat-window">
  //   <div class="chat-window-header">
  //   <div class="chat-title">
  //   Support Chat
  // </div>
  // <div class="chat-window-buttons chat-window-close"></div>
  //   <div class="chat-window-buttons chat-window-minimize"></div>
  //   </div>
  //   <div class="chat-operator">
  //   <div class="chat-operator-avatar">
  //   <img src="../img/client-chat/operator-avatar.jpg"/>
  //   </div>
  //   <div class="chat-operator-info">
  //   <div class="chat-operator-name">Operator name</div>
  // <div class="chat-operator-status">online</div>
  //   </div>
  //   </div>
  //   <div class="chat-messages">
  //   <div class="chat-message chat-message-type-operator">
  //   <div class="chat-message-text">
  //   Hi! Can i help you?
  // <span class="chat-message-date">12:43</span>
  // </div>
  // </div>
  // <div class="chat-message chat-message-type-client">
  //   <div class="chat-message-text">
  //   Yes. Just leave me alone.
  // <span class="chat-message-date">12:44</span>
  // </div>
  // </div>
  // <div class="chat-message chat-message-type-operator">
  //   <div class="chat-message-text">
  //   Maybe you want to ask me something? Just ask me!
  // <span class="chat-message-date">12:46</span>
  // </div>
  // </div>
  // <div class="chat-message chat-message-type-client">
  //   <div class="chat-message-text">
  //   Nope.
  //   <span class="chat-message-date">12:47</span>
  // </div>
  // </div>
  // <div class="chat-message chat-message-type-operator">
  //   <div class="chat-message-text">
  //   Ok :(
  // <span class="chat-message-date">12:49</span>
  // </div>
  // </div>
  // <div class="chat-message chat-message-type-client">
  //   <div class="chat-message-text">
  //   Bye
  //   <span class="chat-message-date">12:51</span>
  // </div>
  // </div>
  // </div>
  // <div class="chat-footer">
  //   <div class="chat-message-input">
  //   <input class="chat-window-input-text" type="text"
  // placeholder="Input your message here"/>
  //   </div>
  //   <div class="chat-message-submit">
  //   <button class="chat-footer-btn">Send</button>
  //   </div>
  //   </div>
  //   </div>

  ChatApplication.window.$chatWindow.appendTo(document.body);
};

ChatApplication.openChatButton = {};

ChatApplication.openChatButton.init = function () {
  ChatApplication.openChatButton.$openChatButton = jQuery('\n        <div class="chat-window-open-chat-container">\n          <div class="chat-window-open-chat"></div>\n        </div>');
  ChatApplication.openChatButton.$openChatButton.on('click', function () {
    ChatApplication.openChatButton.$openChatButton.hide();
    ChatApplication.window.render();
  });
  ChatApplication.openChatButton.$openChatButton.appendTo(document.body);
};

ChatApplication.openChatButton.show = function () {
  _this.$openChatButton.removeClass('hidden');
};

ChatApplication.openChatButton.hide = function () {
  _this.$openChatButton.addClass('hidden');
};

ChatApplication.init = function () {
  ChatApplication.pageDomain = window.location.hostname;
  ChatApplication.clientLocation = navigator.geolocation.getCurrentPosition(function () {}, function () {});
  ChatApplication.resolveStylesDeps(function () {
    ChatApplication.openChatButton.init();
  });
};

ChatApplication.resolveStylesDeps = function (cb) {
  var stylesFile = document.createElement('link');

  stylesFile.rel = 'stylesheet';
  // stylesFile.href = resolveDepsPath('./client-chat.css');
  stylesFile.href = _config2.default.serverUrl + '/client-chat/client-chat.css';
  document.head.appendChild(stylesFile);

  stylesFile.onload = function () {
    cb();
  };
};

(function () {
  if (!window.jQuery) {

    var script = document.createElement('script');

    script.src = serverUrl + '/client-chat/jquery-3.2.1.min.js';
    document.body.appendChild(script);

    script.onload = function () {
      jQuery.noConflict();
      console.log('jQuery is loaded and ready');
      ChatApplication.init();
    };
  } else {
    $(function () {
      console.log('jQuery is ready');
      ChatApplication.init();
    });
  }
})();

},{"./config":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by Дмитрий on 13.07.2017.
 */

var config = {
  serverUrl: 'http://localhost:8000'
};

exports.default = config;

},{}]},{},[1]);
