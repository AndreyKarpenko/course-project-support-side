(function() {
  if (!window.jQuery) {
    const script = document.createElement('script');

    script.src = resolveDepsPath('chat-script/jquery-3.2.1.min.js');
    document.body.appendChild(script);

    script.onload = () => {
      jQuery.noConflict();
      console.log('jQuery is loaded and ready');
      runChatScript();
    };
  } else {
    $(() => {
      console.log('jQuery is ready');
      runChatScript();
    });
  }

  function resolveDepsPath(path) {
    const pathname = window.location.pathname;
    const currentDirDepth = pathname.match(/\//g).length - 1;

    if (!currentDirDepth) {  // root dir
      return path;
    } else {
      let resolvedDir = '';

      for (let i = 0; i < currentDirDepth; i++) {
        resolvedDir += '../';
      }

      return resolvedDir + path;
    }
  }

  function runChatScript() {
		const stylesFile = document.createElement('link');

		stylesFile.rel = 'stylesheet';
    stylesFile.href = resolveDepsPath('chat-script/chat-script.css');
    document.head.appendChild(stylesFile);

    stylesFile.onload = () => {
      const $openChatButton = jQuery(`
        <div class="chat-window-open-chat-container">
          <div class="chat-window-open-chat">
        </div>`);

      $openChatButton.on('click', () => {
        showChatWindow();
        // alert('Chat opened');
      });
      $openChatButton.appendTo(document.body);
    };
  }

  function showChatWindow() {
    const $chatWindow = jQuery(`
      <div class="chat-window chat-window-2">
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
      </div>

      <div class="chat-window">
        <div class="chat-window-header">
          <div class="chat-title">
            Support Chat
          </div>
          <div class="chat-window-buttons chat-window-close"></div>
          <div class="chat-window-buttons chat-window-minimize"></div>
        </div>
        <div class="chat-operator">
          <div class="chat-operator-avatar">
            <img src="../img/client-chat/operator-avatar.jpg"/>
          </div>
          <div class="chat-operator-info">
            <div class="chat-operator-name">Operator name</div>
            <div class="chat-operator-status">online</div>
          </div>
        </div>
        <div class="chat-messages">
          <div class="chat-message chat-message-type-operator">
            <div class="chat-message-text">
              Hi! Can i help you?
              <span class="chat-message-date">12:43</span>
            </div>
          </div>
          <div class="chat-message chat-message-type-client">
            <div class="chat-message-text">
              Yes. Just leave me alone.
              <span class="chat-message-date">12:44</span>
            </div>
          </div>
          <div class="chat-message chat-message-type-operator">
            <div class="chat-message-text">
              Maybe you want to ask me something? Just ask me!
              <span class="chat-message-date">12:46</span>
            </div>
          </div>
          <div class="chat-message chat-message-type-client">
            <div class="chat-message-text">
              Nope.
              <span class="chat-message-date">12:47</span>
            </div>
          </div>
          <div class="chat-message chat-message-type-operator">
            <div class="chat-message-text">
              Ok :(
              <span class="chat-message-date">12:49</span>
            </div>
          </div>
          <div class="chat-message chat-message-type-client">
            <div class="chat-message-text">
              Bye
              <span class="chat-message-date">12:51</span>
            </div>
          </div>
        </div>
        <div class="chat-footer">
          <div class="chat-message-input">
            <input class="chat-window-input-text" type="text"
                    placeholder="Input your message here"/>
          </div>
          <div class="chat-message-submit">
            <button class="chat-footer-btn">Send</button>
          </div>
        </div>
      </div>`);
    $chatWindow.appendTo(document.body);
  }
})();
