<template>
    <div class="cloudv-map-container">
        <div class="cloudv-map" :id="mapId">
        </div>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
/**
 * TODO: 在引用此组件的 vue 项目中引用；传入 mapbox accessToken
 */
import "mapbox-gl/dist/mapbox-gl.css";

import tools from "./utils/other-tools";
import mapFunctions from "./utils/map-functions";

export default {
    name: "cloudv-map",
    props: {
        /**
         * mapbox 需要的 token
         */
        accessToken: {
            type: String,
            default:
                "pk.eyJ1IjoiY2Fvd2VuamluZyIsImEiOiJjazN5MW00YmwxZmhqM2xzMXFiNXp1bmZnIn0.GuDAcmt_8zhcpsqOzs8Nng",
        },

        /**
         * 基础图层列表
         */
        baseLayers: {
            type: Array,
            default() {
                return [];
            },
        },

        /**
         * 俯仰旋转 pitch: 投
         */
        pitchWithRotate: {
            type: Boolean,
            default: false,
        },

        /**
         * 拖拽旋转
         */
        dragRotate: {
            type: Boolean,
            default: false,
        },

        /**
         * 地图中心
         */
        center: {
            type: Array,
            default: () => [104.2948265075684, 29.94216084480287], // 中国四川
        },

        /**
         * 地图默认的 zoom 级别
         */
        zoom: {
            type: Number,
            default: 3,
        },
    },

    data() {
        return {
            mapId: tools.getGuid(),
        };
    },

    mounted() {
        mapboxgl.accessToken = this.accessToken;
        // options 官方文档 https://docs.mapbox.com/mapbox-gl-js/api/map/
        const options = {
            container: this.mapId,
            pitchWithRotate: this.pitchWithRotate,
            dragRotate: this.dragRotate,
            style: {
                version: 8,
                name: "BlankMap",
                sources: {},
                glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
                layers: [
                    {
                        id: "background",
                        type: "background",
                        paint: {
                            "background-color": "rgba(0,0,0,0)",
                        } /* 背景颜色 */,
                    },
                ],
            }, // 地图背景的黑色底图
            zoom: this.zoom,
            maxZoom: 20,
            minZoom: 1,
            center: this.center,
        };
        this.map = new mapboxgl.Map(options);
        this.map.on("load", () => {
            this.addLayers(this.baseLayers);
            this.$emit("mapLoadCompleted");
        });
    },

    /**
     * 组件对象的通用方法，可用 refs 访问
     */
    methods: {
        addLayers(...args) {
            mapFunctions.addLayers(this.map, ...args);
        },
        addXyzLayer(...args) {
            mapFunctions.addXyzLayer(this.map, ...args);
        },
        addWmtsLayer(...args) {
            mapFunctions.addWmtsLayer(this.map, ...args);
        },
        fitBounds(...args) {
            mapFunctions.fitBounds(this.map, ...args);
        },
    },
};
</script>

<style lang="scss" scoped>
.cloudv-map-container {
    width: 100%;
    height: 100%;
    .cloudv-map {
        width: 100%;
        height: 100%;
    }
}
</style>
