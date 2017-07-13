import config from './config';

let ChatApplication = {};

ChatApplication.openChatButton = {};

ChatApplication.openChatButton.init = () => {
  ChatApplication.openChatButton.$openChatButton = jQuery(`
        <div class="chat-window-open-chat-container">
          <div class="chat-window-open-chat"></div>
        </div>`);
  ChatApplication.openChatButton.$openChatButton.on('click', () => {
    ChatApplication.openChatButton.$openChatButton.hide();
    // ChatApplication.window.render();
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
