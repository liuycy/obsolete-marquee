# 现代浏览器中的 \<marquee\> 的实现分析

> 目的是为了学习和了解 Web Component 相关技术和 JavaScript 原型的知识.

## 实现目标
使用 `Web Component` 实现 \<marquee\>, 尽量与原生实现在结构和功能上保持一致, 即在 devTools 上能观察到 DOM 结构、实现类结构和功能以及相关对象都能和原生的差不多一致.

## 实现技术

- 使用 [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components) 实现
- 涉及 [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
  - 使用 [Reflect.construct()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct) 实现 `extends`
  - 使用 [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 替换 `prototype`
  - 使用 [Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 替换 `__proto__`
- 使用 [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 监听 `attributes` 的变化