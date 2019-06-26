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
 * Description: tasks list.<br>
 * Created by jimmy on 2019/6/16.
 * @author Jimmybly Lee
 */

angular.module('WebAppICBS').controller('TaskCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

    $scope.typeList = [
        {
            "name": "疑似群租",
            "color": "dark",
            "filterColor": "light"
        },
        {
            "name": "流管失控",
            "color": "danger"
        },
        {
            "name": "疑似危险",
            "color": "warning"
        },
        {
            "name": "空置房屋",
            "color": "success"
        },
        {
            "name": "生活安全",
            "color": "info"
        },
        {
            "name": "旅馆异常",
            "color": "tech"
        },
        {
            "name": "娼赌防范",
            "color": "brand"
        }
    ];
    $scope.colors = {};
    $.each($scope.typeList, function (key, item) {
        $scope.colors[item['name']] = item['color'];
    });

    $scope.filterSettings = {
        "res": {
            "all": true,
            "task": false,
            "alarm": false
        },
        "status": {
            "all": true,
            "accept": false,
            "response": false
        },
        "type": {
            "all": true
        }
    };
    $.each($scope.typeList, function (key, item) {
        $scope.filterSettings.type[item['name']] = false;
    });

    $scope.taskFilter = function (data) {
        var sets = $scope.filterSettings;
        var result = true;
        // 过滤任务来源
        if (!sets.res.all) {
            result = result && (sets.res.task && data.task_res === '任务') || (sets.res.alarm && data.task_res === '预警');
        }
        // 任务状态过滤
        if (!sets.status.all) {
            if (sets.status.accept) {
                result = result && data.task_accept.startsWith("已");
            }
            if (sets.status.response) {
                result = result && data.task_response.startsWith("已");
            }
        }
        // 任务类型过滤
        if (!sets.type.all) {
            $.each($scope.typeList, function (key, item) {
                if (sets.type[item['name']]) {
                    result = result && data.task_type === item['name'];
                }
            });
        }
        return result;
    };

    $scope.uncheckOthers = function (field) {
        $.each($scope.typeList, function (key, item) {
            if (field !== item['name']) {
                $scope.filterSettings.type[item['name']] = false;
            }
        });
    };

    $.getJSON("./../../../demo-hn-01/data/tasks.json", function (res) {
        $scope.list = res.data;
    });

    $scope.perfect = function () {
        new PerfectScrollbar('.bs-tasks-list', {
            minScrollbarLength: 100
        });
    };
}]);
