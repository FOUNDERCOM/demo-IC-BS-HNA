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
 * Description: Simple svg bg.<br>
 * Created by jimmy on 2019/7/2.
 * @author Jimmybly Lee
 */
var getParamsByUrl = function () {
    var href = document.defaultView.location.href;
    var paramArray = {};
    if (-1 != href.indexOf("?")) {
        var paramList = href.split("?")[1].split(/&|;/);
        console.log(paramList);
        for (var p = 0, pLen = paramList.length; pLen > p; p++) {
            var eachParam = paramList[p];
            var valList = eachParam.split("=");
            var name = unescape(valList[0]);
            var value = unescape(valList[1]);

            paramArray[name] = value;
        }
    }
    return paramArray;
};

var cfg = {
    "border_bold": 6,
    "border_offset": 3,
    "border_length": {
        "tl": 95,
        "tr": 125,
        "rt": 45,
        "rb": 85,
        "br": 305,
        "bl": 35,
        "lb": 35,
        "lt": 95,
        "tr_light": 210
    }
};

var layout = function () {
    var params = getParamsByUrl();
    var width = params['width'];
    var height = params['height'];
    var setAttr = function (id, param) {
        Object.keys(param).forEach(function (key) {
            document.getElementById(id).setAttribute(key, param[key]);
        });
        document.getElementById(id).setAttribute("stroke-width", id === 'border-light' ? 2 : 6);
        document.getElementById(id).setAttribute("stroke", "#33ffff");
    };

    <!-- top left to right -->
    setAttr("top-left", {
        x1: 0,
        y1: cfg.border_offset,
        x2: cfg.border_length.tl,
        y2: cfg.border_offset
    });
    <!-- top right to left -->
    setAttr("top-right", {
        x1: width,
        y1: cfg.border_offset,
        x2: width - cfg.border_length.tr,
        y2: cfg.border_offset
    });
    <!-- right top to bottom -->
    setAttr("right-top", {
        x1: width - cfg.border_offset,
        y1: cfg.border_offset,
        x2: width - cfg.border_offset,
        y2: cfg.border_length.rt
    });
    <!-- right bottom to top -->
    setAttr("right-bottom", {
        x1: width - cfg.border_offset,
        y1: height,
        x2: width - cfg.border_offset,
        y2: height - cfg.border_length.rb
    });
    <!-- bottom right to left -->
    setAttr("bottom-right", {
        x1: width,
        y1: height - cfg.border_offset,
        x2: width - cfg.border_length.br,
        y2: height - cfg.border_offset
    });
    <!-- bottom left to right -->
    setAttr("bottom-left", {
        x1: 0,
        y1: height - cfg.border_offset,
        x2: cfg.border_length.bl,
        y2: height - cfg.border_offset
    });
    <!-- left bottom to top -->
    setAttr("left-bottom", {
        x1: cfg.border_offset,
        y1: height,
        x2: cfg.border_offset,
        y2: height - cfg.border_length.lb
    });
    <!-- left top to bottom -->
    setAttr("left-top", {
        x1: cfg.border_offset,
        y1: 0,
        x2: cfg.border_offset,
        y2: cfg.border_length.lt
    });

    <!-- light bolder -->
    setAttr("border-light", {
        x1: width,
        y1: cfg.border_offset,
        x2: width - cfg.border_length.tr_light,
        y2: cfg.border_offset
    });

    <!-- background -->
    document.getElementById("bg").setAttribute("width", width - 20);
    document.getElementById("bg").setAttribute("height", height - 20);
};
layout();
