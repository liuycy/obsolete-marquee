(function () {
  /** ObsoleteMarqueeElement 的自身属性 */
  const Properties = ['behavior', 'bgColor', 'direction', 'height', 'hspace', 'loop', 'scrollAmount', 'scrollDelay', 'trueSpeed', 'vspace', 'width'];

  /** ObsoleteMarqueeElement 的监听函数 */
  const EventHandlers = ['onbounce', 'onfinish', 'onstart'];

  /**
   * 继承
   * @param {Object} source 原始对象
   * @param {Object} target 被继承对象
   */
  function _extends(source, target) {
    // 设置 source.prototype => target.prototype + source.prototype
    source.prototype = Object.create(target.prototype, Object.getOwnPropertyDescriptors(source.prototype));

    // 设置 source.__proto__ => target
    Object.setPrototypeOf(source, target);
  }

  /**
   * 监听 attributes 变化, 通知监听函数及改变行为
   */
  function _observeAttributes(node, descendant) {
    new MutationObserver(function (mutationList) {
      for (const { target, attributeName, oldValue } of mutationList) {
        node[attributeName] = target.getAttribute(attributeName) || '';
      }
    }).observe(node, {
      attributes: true,
      attributeOldValue: true,
    });
  }

  function _initAttributes(node) {
    Object.defineProperties(
      node,
      Properties.reduce((props, key) => {
        props[key] = {
          value: node.getAttribute(key) || '',
          writable: true,
          enumerable: true,
        };

        return props;
      }, {})
    );
  }

  _extends(ObsoleteMarqueeElement, HTMLElement);

  /**
   * 构造函数
   */
  function ObsoleteMarqueeElement() {
    // super()
    const _this = Reflect.construct(HTMLElement, arguments, new.target);

    const shadow = _this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent += ':host { display: inline-block; overflow: hidden;text-align: initial; white-space: nowrap; }';
    style.textContent += ':host([direction="up"]), :host([direction="down"]) { overflow: initial; overflow-y: hidden; white-space: initial; }';
    style.textContent += ':host > div { will-change: transform; }';

    const div = document.createElement('div');
    const slot = document.createElement('slot');
    div.appendChild(slot);

    shadow.appendChild(style);
    shadow.appendChild(div);

    // 初始化 DOM 绑定的 attributes
    _initAttributes(_this);

    // 监听 DOM attributes 变化
    _observeAttributes(_this, new.target);

    return _this;
  }

  // 定义 ObsoleteMarqueeElement 原型
  Object.defineProperties(
    ObsoleteMarqueeElement.prototype,
    Object.assign(
      {
        [Symbol.toStringTag]: {
          value: 'ObsoleteMarqueeElement',
          writable: false,
          enumerable: false,
          configurable: false,
        },
      },
      Properties.reduce((proto, key) => {
        proto[key] = {
          enumerable: true,
          get: Object.defineProperties(Function(`return function ${key}() { this.getAttribute(${key}) }`)(), {
            name: {
              enumerable: false,
              value: `get ${key}`,
            },
          }),
          set: Object.defineProperties(Function(`return function ${key}() { this.setAttribute(${key}, arguments[0] || ''); }`)(), {
            name: {
              enumerable: false,
              value: `set ${key}`,
            },
            length: {
              enumerable: false,
              value: 1,
            },
          }),
        };

        return proto;
      }, {})
    )
  );

  // 定义 <obsolete-markquee>
  customElements.define('obsolete-markquee', ObsoleteMarqueeElement);
})();
