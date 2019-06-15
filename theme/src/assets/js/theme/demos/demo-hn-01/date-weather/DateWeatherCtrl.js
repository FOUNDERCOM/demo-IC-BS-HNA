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
 * Description: Date and Weather.<br>
 * Created by jimmy on 2019/6/16.
 * @author Jimmybly Lee
 */
angular.module('WebAppICBS').controller('DateWeatherCtrl', ['$rootScope', '$scope', "$interval", function ($rootScope, $scope, $interval) {

    $scope.area = "汉南";

    $scope.date = "";
    $scope.time = "";
    var timeIt = function () {
        var y = new Date();

        var year = y.getFullYear();
        var month = y.getMonth() + 1;
        var day = y.getDate();
        var week = [ "日", "一", "二", "三", "四", "五", "六" ][y.getDay()];

        var hour = y.getHours() <= 9 ? "0" + y.getHours() : y.getHours();
        var minutes = y.getMinutes() <= 9 ? "0" + y.getMinutes() : y.getMinutes();
        var seconds = y.getSeconds() <= 9 ? "0" + y.getSeconds() : y.getSeconds();

        $scope.date = year + "年" + month + "月" + day + "日" + "  星期" + week;
        $scope.time = hour + " : " + minutes + " : " + seconds;
    };
    timeIt();
    $interval(function () {
        timeIt();
    }, 1000);

}]);
