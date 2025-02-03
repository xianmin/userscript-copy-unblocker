// ==UserScript==
// @name         Copy Unblocker
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Automatically removes copy restrictions, supports URL pattern matching
// @author       xianmin
// @namespace    https://www.xianmin.org
// @match        *://*/*
// @run-at       document-end
// @grant        GM.registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         https://raw.githubusercontent.com/xianmin/userscript-copy-unblocker/refs/heads/master/icon.svg
// @homepageURL       https://github.com/xianmin/userscript-copy-unblocker
// @downloadURL       https://raw.githubusercontent.com/xianmin/userscript-copy-unblocker/refs/heads/master/copy-unblocker.user.js
// @license        GPLv3 License
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// ==/UserScript==

(function () {
  'use strict';


  // Initialize GM_config first
  GM_config.init({
    id: 'CopyUnblockerConfig',
    title: 'Copy Unblocker Settings',
    fields: {
      urlPatterns: {
        label: 'URL Pattern List',
        type: 'textarea',
        default: 'https://wx.zsxq.com/'
      }
    },
    events: {
      init: function () {
        // If urlPatterns is empty, set the default value
        if (!GM_config.get('urlPatterns')) {
          GM_config.set('urlPatterns', 'https://wx.zsxq.com/');
          GM_config.save();
        }

        // After config is initialized, check if we should enable copy
        if (shouldEnableCopy()) {
          enableCopy();
        }
      }
    }
  });

  // Modify shouldEnableCopy to handle potential undefined values
  const shouldEnableCopy = () => {
    const patterns = GM_config.get('urlPatterns') || '';
    const currentUrl = window.location.href;

    return patterns.split('\n').some(pattern => {
      pattern = pattern.trim();
      if (!pattern) return false;
      return currentUrl.startsWith(pattern);
    });
  };

  let isEnabled = false;
  let styleElement = null;
  let observer = null;

  // 核心功能模块
  const enableCopy = () => {
    // Wait for DOM to be fully loaded
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => enableCopy());
      return;
    }

    // Add a small delay to ensure all scripts are loaded
    setTimeout(() => {
      // 1. 启用右键菜单
      document.addEventListener('contextmenu', contextmenuHandler, true);

      // 2. 注入CSS样式
      const css = `
          * {
              user-select: auto !important;
              -webkit-user-select: auto !important;
              -moz-user-select: text !important;
              -ms-user-select: auto !important;
          }

          [style*="user-select: none"],
          [style*="user-select:none"] {
              user-select: auto !important;
          }`;

      styleElement = document.createElement('style');
      styleElement.textContent = css;
      document.documentElement.appendChild(styleElement);

      // 3. 阻止复制拦截
      document.addEventListener('copy', copyHandler, true);

      // 4. 初始化覆盖层移除
      initOverlayRemoval();

      // 5. 恢复选择事件
      enableSelectionEvents();

      // 6. 启用快捷键
      document.addEventListener('keydown', keydownHandler, true);

      console.log('复制限制已解除 - DOM fully loaded');
    }, 1000);
  };

  // 禁用功能模块
  const disableCopy = () => {
    // 移除所有监听器
    document.removeEventListener('contextmenu', contextmenuHandler, true);
    document.removeEventListener('copy', copyHandler, true);
    document.removeEventListener('keydown', keydownHandler, true);

    // 移除样式
    if (styleElement) {
      styleElement.remove();
      styleElement = null;
    }

    // 停止观察DOM变化
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    console.log('复制限制已恢复');
  };

  // 事件处理函数
  const contextmenuHandler = (e) => {
    e.stopPropagation();
  };

  const copyHandler = (e) => {
    e.stopImmediatePropagation();
  };

  const keydownHandler = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
      e.stopPropagation();
    }
  };

  // 覆盖层处理
  const initOverlayRemoval = () => {
    const removeOverlays = () => {
      document.querySelectorAll('div, section').forEach(element => {
        const style = window.getComputedStyle(element);
        if (['fixed', 'absolute'].includes(style.position) &&
          element.offsetWidth >= window.innerWidth * 0.9 &&
          element.offsetHeight >= window.innerHeight * 0.9) {
          element.remove();
        }
      });
    };

    observer = new MutationObserver(() => {
      removeOverlays();
      enableSelectionEvents();
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true
    });

    removeOverlays();
  };

  // 恢复选择功能
  const enableSelectionEvents = () => {
    document.onselectstart = null;
    document.ondragstart = null;
    document.onmousedown = null;
    if (window.getSelection().empty) {
      window.getSelection().empty = () => { };
    }
  };

  // Replace the menu command registration
  GM.registerMenuCommand('➕ Add Current Site to Whitelist', () => {
    const currentUrl = window.location.origin + '/';
    const currentPatterns = GM_config.get('urlPatterns');
    if (!currentPatterns.includes(currentUrl)) {
      GM_config.set('urlPatterns', currentPatterns + '\n' + currentUrl);
      GM_config.save();
      enableCopy();
      alert(`Added ${currentUrl} to whitelist`);
    } else {
      alert('Current site is already in the list');
    }
  });

  GM.registerMenuCommand('⚙️ Open Settings', () => {
    GM_config.open();
  });
})();
