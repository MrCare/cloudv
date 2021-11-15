# cloudv-map 组件文档

## 组件实例

::: demo accessToken 一定要换成自己的，这是小妹子的token，用多了她会哭的
```html
<template>
  <div class="container">
      <cloudv-map 
        ref="cloudvMap"
        :accessToken="accessToken" 
        :baseLayers="baseLayers"
        :pitchWithRotate="pitchWithRotate"
        :dragRotate="dragRotate"
        :zoom="5"
        @mapLoadCompleted="mapLoadCompleted"></cloudv-map>
  </div>
</template>
<script>
export default {
    data() {
        return {
            accessToken: "pk.eyJ1IjoiY2Fvd2VuamluZyIsImEiOiJjazN5MW00YmwxZmhqM2xzMXFiNXp1bmZnIn0.GuDAcmt_8zhcpsqOzs8Nng",
            baseLayers: [
                {
                    id: "baselayer",
                    name: "基础底图",
                    url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/WMTS/tile/1.0.0/ChinaOnlineCommunity/default/default028mm/{z}/{y}/{x}.png",
                    minZoom: 1,
                    maxZoom: 20,
                    type: "XYZ",
                },
                {
                    id: "qihe_2019",
                    name: "齐河2019年影像",
                    url: "http://39.101.137.103:11004/geoserver",
                    minZoom: 1,
                    maxZoom: 20,
                    type: "WMTS",
                    layerName: "windows:qihexian2019_clip",
                },
            ],
            pitchWithRotate: true,
            dragRotate: true,
        }
    },
    mounted(){
        this.cloudvMap = this.$refs.cloudvMap
    },
    methods:{
        mapLoadCompleted(){
            this.cloudvMap.fitBounds([116.39002319999994, 36.40806719999999, 116.9602416, 37.0307664])
        }
    }
}
</script>
<style>
.container { 
  width: 100%;
  height: 500px;
}
</style>
```
:::

## 参数

| 参数            | 说明                                            | 类型    | 是否可以省略 | 可选值           | 默认值                                        |
| --------------- | ----------------------------------------------- | ------- | ------------ | ---------------- | --------------------------------------------- |
| accessToken     | 信息                                            | string  | 可省         | 无               | `小妹子的 token`                              |
| baseLayers      | 图层数组 (必需属性)                             | Array   | 否           | 无               | `[]`                                          |
| pitchWithRotate | 俯仰旋转                                        | Boolean | 可省         | `true` / `false` | `false`                                       |
| dragRotate      | 拖动旋转                                        | Boolean | 可省         | `true` / `false` | `false`                                       |
| center          | 初始地图中心，若使用 `fitBounds` 方法后该值无效 | Array   | 可省         | 无               | `[104.2948265075684, 29.94216084480287]` 四川 |
| zoom            | 初始地图缩放级别                                | Number  | 可省         | `1` - `20`       | `3`                                           |

## 方法

### addXyzLayer

参数:

```JavaScript
const layer = {
    id: "qihe_2019", // 图层 id
    name: "齐河2019年影像", // 图层名称
    url: "http://39.101.137.103:11004/geoserver", // 发布地址
    minZoom: 1, // 最小缩放比例
    maxZoom: 20, // 最大缩放比例
    type: "WMTS", // 图层类型 'XYZ' | 'WMTS'
    layerName: "windows:qihexian2019_clip", // 地图数据
};

this.cloudvMap.addXyzLayer(layer);
```


作用：添加图层

### baseLayers

详细说明