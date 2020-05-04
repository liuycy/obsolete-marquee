# modern \<marquee\> - 现代浏览器中的 \<marquee\> 的实现分析

## 实现过程

- 使用 [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components) 实现
- 涉及 [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
  - 使用 [Reflect.construct()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct) 实现 `extends`
  - 使用 [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 替换 `prototype`
  - 使用 [Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 替换 `__proto__`
