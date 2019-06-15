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
 * Description: add runNum function for JQuery.<br>
 * Created by jimmy on 2019/6/13.
 * @author Jimmybly Lee
 */
$.fn.extend({
    /**
     * Description: roll the number.<br>
     * Created by jimmy on 2019/6/13.
     * @param val target value of the number, int format
     * @param cfg configuration {
     * colWidth : int format default 40(px) for every single number field <li> width
     * height : itn format default 50(px) height
     * interval : int format default 3000(ms) for refresh time by ms
     * speed : int format default 1000(ms) for refresh speed by ms
     * align : str format enum for { left, right } default 'left'
     * }
     * @author Jimmybly Lee
     */
    runNum: function (val, cfg) {
        /*初始化动画参数*/
        var valString = val || '9999';
        var param = cfg || {};
        var config = {
            el: $(this),
            value: valString,
            valueStr: valString.toString(),
            colWidth: param.colWidth || 40,
            height: param.height || 50,
            interval: param.interval || 3000,
            speed: param.speed || 1000,
            bitLength: valString.toString().length,
            align: param.align === 'right' ? 'right' : 'left'
        };
        $._runNum._list(config.el, config);
        $._runNum._interval(config.el.children("li"), config);
    }
});
/*jQuery对象添加  _runNum  属性*/
$._runNum = {
    /**
     * Description: init the el list for number by <li>.<br>
     * Created by jimmy on 2019/6/13.
     * @param el the element
     * @param cfg configuration object
     * @author Jimmybly Lee
     */
    _list: function (el, cfg) {
        var str = '';
        for (var i = 0; i < cfg.bitLength; i++) {
            var w = cfg.align === 'left' ? cfg.colWidth * i : (cfg.bitLength - i) * cfg.colWidth;
            var t = cfg.height * parseInt(cfg.valueStr[i]);
            var h = cfg.height * 10;
            str += '<li style="width:' + cfg.colWidth + 'px;' + cfg.align + ':' + w + 'px;top: ' + -t + 'px;height:' + h + 'px;">';
            for (var j = 0; j < 10; j++) {
                str += '<div style="height:' + cfg.height + 'px;line-height:' + cfg.height + 'px;">' + j + '</div>';
            }
            str += '</li>';
        }
        el.html(str);
    },
    /**
     * Description: generate random number from 1 to 10.<br>
     * Created by jimmy on 2019/6/13.
     * @param cfg configuration object
     * @author Jimmybly Lee
     */
    _random: function (cfg) {
        return Math.floor(Math.random() * 10 + 1);
    },

    /**
     * Description: do animate.<br>
     * Created by jimmy on 2019/6/13.
     * @param el the element
     * @param value the number data value by array
     * @param cfg configuration object
     * @author Jimmybly Lee
     */
    _animate: function (el, value, cfg) {
        var x;
        for (x = 0; x < cfg.bitLength; x++) {
            var topPx = value[x] * cfg.height;
            el.eq(x).animate({top: -topPx + 'px'}, cfg.speed);
        }
    },
    /**
     * Description: do animate by period.<br>
     * Created by jimmy on 2019/6/13.
     * @param el the element
     * @param cfg configuration object
     * @author Jimmybly Lee
     */
    _interval: function (el, cfg) {
        var val = cfg.value;
        setInterval(function () {
            val += $._runNum._random(cfg);
            $._runNum._animate(el, val.toString(), cfg);
        }, cfg.interval);
    }
};
