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
 * Description: Alarm statistics Controller.<br>
 * Created by jimmy on 2019/6/13.
 * @author Jimmybly Lee
 */
angular.module('WebAppICBS').controller('AlarmListCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

    var cfg = {
        colWidth: 15,
        height: 20,
        align: 'right'
    };

    $("#feelingTotalNum").runNum(23424322, cfg);
    $("#alarmTotalNum").runNum(24322, cfg);
    $("#taskTotalNum").runNum(4322, cfg);
    $("#dealingTotalNum").runNum(3322, cfg);

    $scope.tongbiNum = 8;
    $scope.huanbiNum = 7;
}]);
