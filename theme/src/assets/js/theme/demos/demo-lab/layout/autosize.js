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
 * Description: autoSize for Big-Screen.<br>
 * Created by jimmy on 2019/6/11.
 * @author Jimmybly Lee
 */
/**自适应屏幕*/
(function () {
    var iFrameScale_ = function () {
        var width = $(window).width(),
            height = $(window).height();
        var scaleX = width / 1920,
            scaleY = height / 1080;
        $("body").css("transform", "scale(" + scaleX + ", " + scaleY + ")");
    };

    var windowResizeEvent = function(callback) {
        var firstFire = null;
        window.onresize = function () {
            if (firstFire === null) {
                setTimeout(function () {
                    firstFire = null;
                    callback();
                }, 200);
            }
        }
    };

    window.iFrameScale = function () {
        windowResizeEvent(iFrameScale_);
        iFrameScale_();
    };
    //自适应屏幕
    iFrameScale();
})();
