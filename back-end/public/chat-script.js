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
        <button class="client-chat open-chat">Open chat</button>`);

      $openChatButton.on('click', () => {
        alert('Chat opened');
      });
      $openChatButton.appendTo(document.body);
    };
  }
})();
