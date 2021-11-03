# 组件文档说明

本项目用于在开发过程中的组件积累，日拱一卒，慢慢迭代

## 安装

```bash
npm install cloudv
```

在 main.js 中写入以下内容：

```js
import cloudv from 'cloudv';
import 'cloudv/lib/index.css';

Vue.use(cloudv); // 一定要在挂载 #app 之前
```

以上操作将所有组件全局引入了项目中，在需要位置直接引用对应的 `component.name` 即可