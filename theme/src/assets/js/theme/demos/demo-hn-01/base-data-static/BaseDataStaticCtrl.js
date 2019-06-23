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
 * Description: Base data static controller.<br>
 * Created by jimmy on 2019/6/16.
 * @author Jimmybly Lee
 */
angular.module('WebAppICBS').controller('BaseDataStaticCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.list = [
        {
            "title": "娱乐场所",
            "value": "4234"
        },
        {
            "title": "交通站点",
            "value": "8283"
        },
        {
            "title": "服务场所",
            "value": "123"
        },
        {
            "title": "集贸市场",
            "value": "122"
        },
        {
            "title": "九小场所",
            "value": "2342"
        },
        {
            "title": "ATM",
            "value": "4322"
        },
        {
            "title": "小区门禁",
            "value": "323"
        },
        {
            "title": "人脸识别",
            "value": "1233"
        },
        {
            "title": "电子围栏",
            "value": "345"
        },
        {
            "title": "单元门禁",
            "value": "4232"
        },
        {
            "title": "智能车位",
            "value": "42342"
        },
        {
            "title": "车辆闸门",
            "value": "432"
        }
    ]
}]);
