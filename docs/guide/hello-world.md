# hello-world 组件文档

## 组件实例

::: demo 这是一个 HelloWorld demo，大家可以参考这个方式实现
```html
<template>
  <div class="container">
      <hello-world :message="'This is HelloWorld component'"></hello-world>
  </div>
</template>
```
:::

## 参数

| 参数    | 说明 | 类型   | 可选值 | 默认值  |
| ------- | ---- | ------ | ------ | ------- |
| message | 信息 | string | -      | "world" |

