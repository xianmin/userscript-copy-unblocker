// ==UserScript==
// @name         解除复制限制 - 开关版
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  通过菜单按钮控制的解除复制限制脚本
// @author       Pro-Coder
// @match        *://*/*
// @run-at       document-start
// @grant        GM.registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  let isEnabled = false;
  let styleElement = null;
  let observer = null;

  // 核心功能模块
  const enableCopy = () => {
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

    console.log('复制限制已解除');
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

  // 注册菜单按钮
  GM.registerMenuCommand('🔄 切换复制限制解除', () => {
    isEnabled = !isEnabled;
    if (isEnabled) {
      enableCopy();
    } else {
      disableCopy();
    }
    alert(`复制限制解除功能已 ${isEnabled ? '启用' : '禁用'}`);
  });
})();
