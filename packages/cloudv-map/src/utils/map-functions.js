const mapFunctions = {
    /**
     * 添加 XYZ 栅格金字塔
     * @param {*} map  mapbox 实例对象
     * @param {*} layer 图层对象
     * @returns 
     */
    addXyzLayer(map, layer) {
        // 图层存在时 return
        if (map.getLayer(layer.id)) {
            return
        }

        const layerOption = {
            id: layer.id,
            type: "raster",
            source: {
                type: "raster",
                tiles: [layer.url],
                tileSize: 256,
            },
        };
        if (layer.minZoom === undefined) layerOption.minZoom = 1;
        else layerOption.minZoom = layer.minZoom;
        if (layer.maxZoom === undefined) layerOption.maxZoom = 20;
        else layerOption.maxZoom = layer.maxZoom;
        map.addLayer(layerOption, layer.beforeLayerId);
        return layer.id;
    },


    /**
     * 添加瓦片图层
     * @param {Object} layer -- 图层信息
     * @param {string} layer.id --图层编码
     * @param {string} layer.url --图层地址
     * @param {string} layer.layerName --图层名带命名空间（命名空间:图层名)
     * @param {string} layer.epsg --图层加载坐标系
     * @param {string} layer.minZoom -- 显示最小级别
     * @param {string} layer.maxZoom --显示最大级别
     * @param {string} layer.beforeLayerId --在哪个图层上面
     * */
    addWmtsLayer(map, layer) {
        // 图层存在时 return
        if (map.getLayer(layer.id)) {
            return
        }
        let epsg = "EPSG:3857";
        if (layer.epsg !== undefined && layer.epsg !== "") {
            epsg = layer.epsg;
        }
        let wmtsurl = `${layer.url}/gwc/service/wmts?`;
        wmtsurl = `${wmtsurl}REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=${layer.layerName}&STYLE=&`;
        wmtsurl = `${wmtsurl}TILEMATRIX=${epsg}:{z}&TILEMATRIXSET=${epsg}&FORMAT=image/png&TILECOL={x}&TILEROW={y}`;
        console.log(wmtsurl);
        const layerOption = {
            id: layer.id,
            type: "raster",
            source: {
                type: "raster",
                tiles: [wmtsurl],
                tileSize: 256, // mapbox zoom 是无极缩放，默认会缩放原子级别的图像数据，所以图像会有点糊，将 此参数设置为256会克服这个问题
            },
            minzoom: layer.minZoom ? layer.minZoom : 1,
            maxzoom: layer.maxZoom ? layer.maxZoom : 20,
        };
        map.addLayer(layerOption, layer.beforeLayerId);
        return layer.id;
    },

    /**
     * 添加 baseLayers 属性传入的基础图层
     * @param {Array} baseLayers 
     */
    addLayers(map, baseLayers) {
        if (Array.isArray(baseLayers) && baseLayers.length) {
            baseLayers.forEach((layer) => {
                switch (layer.type) {
                    case "XYZ":
                        this.addXyzLayer(map, layer);
                        break;
                    case "WMTS":
                        this.addWmtsLayer(map, layer);
                        break;
                    default:
                        // doNothing
                        break;
                }
            });
        }
    },

    /**
     * 设置地图的显示范围
     * @param {*} map - mapbox 实例对象
     * @param {*} bounds - [[lat,lon],[lat,lon]] -  [西南角经纬度数组，东北角经纬度数组] / [minX, minY, maxX, maxY] - [西南角经度，西南角纬度，东北角经度，东北角维度]
     * @param {*} options - 详见官方文档 https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitbounds
     */
    fitBounds(map, bounds, options = {}) {
        options.padding = {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
        };
        map.fitBounds(bounds, options);
    },
}
export default mapFunctions;