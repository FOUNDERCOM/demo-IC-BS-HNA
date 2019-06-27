/* ***************************************************************************
 * Copyright (C) 2018-2019 the original author Jimmybly Lee
 * or authors of NAPTUNE.COM
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of MIT License as published by
 * the Free Software Foundation;
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 *
 * You should have received a copy of the MIT License along
 * with this library; if not, write to the Free Software Foundation.
 * ***************************************************************************/

/**
 * Description: TODO.<br>
 * Created by jimmy on 2019/6/27.
 * @author Jimmybly Lee
 */

var map = new EzMap('bs-map');
map.centerAndZoom(new EzCoord(106.568, 26.364), 6);

//矢量地图
wmtslayer = new Ez.TileLayer.WMTS('test', 'http://172.25.16.102:8080/EzServer7/WMTS?SERVICE=WMTS', {
    type: 'wmts',
    crs: '4326',
    wrapX: false,
    layer:'sltdt',
    matrixSet:'c',
    format:'tile',
    style: 'default'
});
//影像地图
//     wmtslayer = new Ez.TileLayer.WMTS('test', 'http://172.25.16.102:8080/EzServer7/WMTS?SERVICE=WMTS', {
//     type: 'wmts',
//     crs: '4326',
//     wrapX: false,
//     layer:'yxtdt',
//     matrixSet:'c',
//     format:'tile',
//     style: 'default',
// });
map.addLayer(wmtslayer);
var ol3d = new olcs.OLCesium({ map: map });
var scene = ol3d.getCesiumScene();
ol3d.setEnabled(true);
var fixGltf = function(gltf) {
    if (!gltf.extensionsUsed) {
        return;
    }

    var v = gltf.extensionsUsed.indexOf('KHR_technique_webgl');
    var t = gltf.extensionsRequired.indexOf('KHR_technique_webgl');

    if (v !== -1) {
        gltf.extensionsRequired.splice(t, 1, 'KHR_techniques_webgl');
        gltf.extensionsUsed.splice(v, 1, 'KHR_techniques_webgl');
        gltf.extensions = gltf.extensions || {};
        gltf.extensions['KHR_techniques_webgl'] = {};
        gltf.extensions['KHR_techniques_webgl'].programs = gltf.programs;
        gltf.extensions['KHR_techniques_webgl'].shaders = gltf.shaders;
        gltf.extensions['KHR_techniques_webgl'].techniques = gltf.techniques;
        var techniques = gltf.extensions['KHR_techniques_webgl'].techniques;

        gltf.materials.forEach(function (mat, index) {
            gltf.materials[index].extensions['KHR_technique_webgl'].values = gltf.materials[index].values;
            gltf.materials[index].extensions['KHR_techniques_webgl'] = gltf.materials[index].extensions['KHR_technique_webgl'];

            var vtxfMaterialExtension = gltf.materials[index].extensions['KHR_techniques_webgl'];

            for (var value in vtxfMaterialExtension.values) {
                var us = techniques[vtxfMaterialExtension.technique].uniforms;
                for (var key in us) {
                    if (us[key] === value) {
                        vtxfMaterialExtension.values[key] = vtxfMaterialExtension.values[value];
                        delete vtxfMaterialExtension.values[value];
                        break;
                    }
                }
            }
        });

        techniques.forEach(function (t) {
            for (var attribute in t.attributes) {
                var name = t.attributes[attribute];
                t.attributes[attribute] = t.parameters[name];
            }

            for (var uniform in t.uniforms) {
                var name = t.uniforms[uniform];
                t.uniforms[uniform] = t.parameters[name];
            }
        });
    }
};

Object.defineProperties(Cesium.Model.prototype, {
    _cachedGltf: {
        set: function (value) {
            this._vtxf_cachedGltf = value;
            if (this._vtxf_cachedGltf && this._vtxf_cachedGltf._gltf) {
                fixGltf(this._vtxf_cachedGltf._gltf);
            }
        },
        get: function () {
            return this._vtxf_cachedGltf;
        }
    }
});
var tileset = new Cesium.Cesium3DTileset({ uri: "http://172.18.117.97:8080/pgis/data/obq/hn1/tileset.json" });
// var tileset = new Cesium.Cesium3DTileset({ url: "http://192.168.43.81:9002/api/folder/1c0a82b18ec84fe78005728503b4b8cc/tileset.json" });
scene.primitives.add(tileset);
scene.camera.flyTo({
    destination:Cesium.Cartesian3.fromDegrees(111.341764,25.269629, 150),
    // destination:Cesium.Cartesian3.fromDegrees(114.06121924659066,30.30007649989971, 200),
    orientation : {
        heading : Cesium.Math.toRadians(0.0),
        pitch : Cesium.Math.toRadians(-25.0),
        roll : 0.0
    }

});
