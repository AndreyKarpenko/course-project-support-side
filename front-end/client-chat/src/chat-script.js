import config from './config';

let ChatApplication = {};

ChatApplication.window = {
  isOpen: false,
  isMinimized: false,
  $chatWindow: jQuery(`
  <div class="chat-window">
    <div class="chat-window-header">
      <div class="chat-title">
        Support Chat
      </div>
      <div class="chat-window-buttons chat-window-close"></div>
      <div class="chat-window-buttons chat-window-minimize"></div>
    </div>
    <div class="chat-window-start-dialog-form">
      <h2>Welcome to support chat!</h2>
      <label for="chat-window-name-input">Input your name:</label>
      <input class="chat-window-input-text" type="text" placeholder="Your name"/>
      <label for="chat-window-email-input">Input you email:</label>
      <input class="chat-window-input-text" type="text" placeholder="Your email"/>
    </div>
    <div class="chat-footer">
      <div class="chat-start-dialog">
        <button class="chat-footer-btn">Start dialog</button>
      </div>
    </div>
  </div>`),
};

ChatApplication.window.open = () => {

};

ChatApplication.window.minimize = () => {

};

ChatApplication.window.maximize = () => {

};

ChatApplication.window.close = () => {

};

ChatApplication.window.render = () => {

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

ChatApplication.openChatButton.init = () => {
  ChatApplication.openChatButton.$openChatButton = jQuery(`
        <div class="chat-window-open-chat-container">
          <div class="chat-window-open-chat"></div>
        </div>`);
  ChatApplication.openChatButton.$openChatButton.on('click', () => {
    ChatApplication.openChatButton.$openChatButton.hide();
    ChatApplication.window.render();
  });
  ChatApplication.openChatButton.$openChatButton.appendTo(document.body);
};

ChatApplication.openChatButton.show = () => {
  this.$openChatButton.removeClass('hidden');
};

ChatApplication.openChatButton.hide = () => {
  this.$openChatButton.addClass('hidden');
};

ChatApplication.init = () => {
  ChatApplication.pageDomain = window.location.hostname;
  ChatApplication.clientLocation = navigator.geolocation.getCurrentPosition(() => {}, () => {});
  ChatApplication.resolveStylesDeps(() => {
    ChatApplication.openChatButton.init();
  });
};

ChatApplication.resolveStylesDeps = (cb) => {
  const stylesFile = document.createElement('link');

  stylesFile.rel = 'stylesheet';
  // stylesFile.href = resolveDepsPath('./client-chat.css');
  stylesFile.href = config.serverUrl + '/client-chat/client-chat.css';
  document.head.appendChild(stylesFile);

  stylesFile.onload = () => {
    cb();
  };
};

(function() {
  if (!window.jQuery) {

    const script = document.createElement('script');

    script.src = (serverUrl + '/client-chat/jquery-3.2.1.min.js');
    document.body.appendChild(script);

    script.onload = () => {
      jQuery.noConflict();
      console.log('jQuery is loaded and ready');
      ChatApplication.init();
    };
  } else {
    $(() => {
      console.log('jQuery is ready');
      ChatApplication.init();
    });
  }
})();
