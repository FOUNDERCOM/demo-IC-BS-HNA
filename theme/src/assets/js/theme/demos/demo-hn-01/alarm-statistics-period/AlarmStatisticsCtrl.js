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
 * Description: AlarmStatisticsCtrl.<br>
 * Created by jimmy on 2019/6/25.
 * @author Jimmybly Lee
 */
angular.module('WebAppICBS').controller('AlarmStatisticsCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

    var week = 5, day = 3, i = 0, timeLineArray = [];
    for (i; i < 31; i++) {
        timeLineArray.push({"week": week++ % 7, "day": day++ % 31});
    }
    $scope.timeLineList = timeLineArray;

    var cfg = {
        "width": 1385,
        "height": 120,
        "rectWidth": 20,
        "range": {
            "min": 30,
            "max": 100
        },
        "padding": {
            "left": 10,
            "right": 10,
            "top": 10,
            "bottom": 10
        },
        "gridLineCount": 10
    };

    /**
     * 获得画布
     */
    var getSvg = function () {
        return d3.select(".bs-alarm-statistics-bar svg");
    };

    /**
     * 设置画布
     */
    var init = function () {
        getSvg().attr("width", cfg.width).attr("height", cfg.height);
    };

    /**
     * 绘制柱图
     * @param data data
     */
    var draw = function (data) {
        // 求最大值、最小值
        var extent = d3.extent(data, function (d) {
            return d.value;
        });

        // 定义一个线性比例尺
        var scaleLinear = d3.scaleLinear()
            .domain([extent[0], extent[1]])
            .range([cfg.range.min, cfg.range.max]);
        var g = getSvg().append("g")
            .attr("mask", "url(#grid-mask-alarm-statistics)")
            .attr("transform", "translate(0,0)");

        // 画柱
        g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                var singleWidth = cfg.width / data.length;
                return i * singleWidth + singleWidth / 2 - cfg.rectWidth / 2;
            })
            .attr("y", function (d, i) {
                return 120 - scaleLinear(d.value);
            })
            .attr("height", function (d) {
                return scaleLinear(d.value);// 设置高,并在这里使用比例尺
            })
            .attr("width", cfg.rectWidth)
            .attr("fill", "url(#alarm-bar-linear)");
    };

    /**
     * 添加遮挡
     */
    var addMask = function () {

        var svg = getSvg();
        var linearGradient = svg.select('defs')
            .append('linearGradient')
            .attr('id', 'grid-gradient-alarm-statistics')
            .attr('x1', '0%')
            .attr('y1', '100%')
            .attr('x2', '0%')
            .attr('y2', '0%');
        linearGradient
            .append('stop')
            .attr('offset', '0%')
            .style('stop-color', '#002232');
        linearGradient
            .append('stop')
            .attr('offset', '10%')
            .style('stop-color', '#fff');

        // 添加线条蒙版
        var mask = svg.select('defs').append('mask')
            .attr('id', 'grid-mask-alarm-statistics')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 1)
            .attr('height', 1);
        mask.append('rect')
            .attr('fill', 'url(#grid-gradient-alarm-statistics)')
            .attr('x', 0)
            .attr('y', cfg.padding.top)
            .attr('width', cfg.width)
            .attr('height', cfg.height - cfg.padding.top - cfg.padding.bottom);
        var perHeight = (cfg.height - cfg.padding.top - cfg.padding.bottom) / cfg.gridLineCount;
        for (var i = 0; i < cfg.gridLineCount; i++) {
            mask.append('line')
                .attr('x1', cfg.padding.left)
                .attr('y1', cfg.height - cfg.padding.bottom - perHeight * i)
                .attr('x2', cfg.width - cfg.padding.right)
                .attr('y2', cfg.height - cfg.padding.bottom - perHeight * i)
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
        }
    };

    /**
     * 画坐标
     * @param data
     */
    var drawAxis = function (data) {
        var svg = getSvg();
        var xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .rangeRound([0, cfg.width]);
        var xAxis = d3.axisBottom(xScale);
        svg.append("g")
            .attr("class", "bs-axis-alarm")
            .attr("transform", "translate(0, 100)")
            .call(xAxis);
        svg.select(".bs-axis-alarm").selectAll("text").data(data).html(function (d) {
            return d.name;
        })
    };

    /**
     * 画线图
     * @param data
     */
    var drawLine = function (data) {
        var extent = d3.extent(data, function (d) {
            return d.tongbi;
        });
        // 定义一个线性比例尺
        var scale_x = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, cfg.width - 40]);
        var scaleLinear = d3.scaleLinear()
            .domain([-3, 5])
            .range([cfg.range.min, cfg.range.max]);
        // 同比
        var line_generator_tongbi = d3.line()
            .x(function (d, i) {
                return scale_x(i);
            })
            .y(function (d) {
                return scaleLinear(d.tongbi);
            })
            .curve(d3.curveMonotoneX);
        var g = getSvg()
            .append("g")
            .attr("transform", "translate(20,20)");
        g.append("path")
            .attr("d", line_generator_tongbi(data))
            .attr("fill", "none")
            .attr("stroke", "#ffcc33")
            .attr("stroke-dasharray", "3 2")
            .attr("stroke-width", 2);
        // 环比
        var line_generator_huanbi = d3.line()
            .x(function (d, i) {
                return scale_x(i);
            })
            .y(function (d) {
                return scaleLinear(d.huanbi);
            })
            .curve(d3.curveMonotoneX);
        g = getSvg()
            .append("g")
            .attr("transform", "translate(20,20)");
        g.append("path")
            .attr("d", line_generator_huanbi(data))
            .attr("fill", "none")
            .attr("stroke", "#ff6666")
            .attr("stroke-dasharray", "3 2")
            .attr("stroke-width", 2);
    };

    $scope.drawBar = function () {
        $.getJSON("./../../../demo-hn-01/data/alarm-statistics.json", function (res) {
            init();
            draw(res.data);
            addMask();
            drawAxis(res.data);
            drawLine(res.data);
        });
    }
}]);
