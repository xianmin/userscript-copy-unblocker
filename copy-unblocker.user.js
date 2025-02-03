// ==UserScript==
// @name         Copy Unblocker
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Automatically removes copy restrictions, supports URL pattern matching
// @author       xianmin
// @namespace    https://www.xianmin.org
// @match        *://*.zsxq.com/*
// @run-at       document-end
// @icon         https://raw.githubusercontent.com/xianmin/userscript-copy-unblocker/refs/heads/master/icon.svg
// @homepageURL       https://github.com/xianmin/userscript-copy-unblocker
// @downloadURL       https://raw.githubusercontent.com/xianmin/userscript-copy-unblocker/refs/heads/master/copy-unblocker.user.js
// @license        GPLv3 License
// ==/UserScript==

(function () {
  'use strict';

  let styleElement = null;
  let observer = null;

  // Core function module
  const enableCopy = () => {
    // Wait for DOM to be fully loaded
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => enableCopy());
      return;
    }

    // Add a small delay to ensure all scripts are loaded
    setTimeout(() => {
      // 1. Enable right-click menu
      document.addEventListener('contextmenu', contextmenuHandler, true);

      // 2. Inject CSS styles
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

      // 3. Prevent copy blocking
      document.addEventListener('copy', copyHandler, true);

      // 4. Initialize overlay removal
      initOverlayRemoval();

      // 5. Restore selection events
      enableSelectionEvents();

      // 6. Enable keyboard shortcuts
      document.addEventListener('keydown', keydownHandler, true);

      console.log('Copy restrictions removed - DOM fully loaded');
    }, 1000);
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

  // Start the script
  enableCopy();
})();
