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
 * Created by jimmy on 2019/7/15.
 * @author Jimmybly Lee
 */

angular.module('WebAppICBS').controller('LayoutCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

    var FDLayout = function () {
        var initAsideToggler = function () {
            if (!KTUtil.get('fd-layout-toggler-left') || !KTUtil.get('fd-layout-toggler-right') ) {
                return;
            }
            var togglerLeft = new KTToggle("fd-layout-toggler-left", {
                target: 'body',
                targetState: 'fd-layout-aside-left-minimize',
                togglerState: 'fd-layout-aside-toggler-active'
            });

            setTimeout(function(){
                $(".fd-layout-aside-left .fd-widget-logo").on("click", function(){
                    togglerLeft.toggle();
                });
            }, 2000);

            var togglerRight = new KTToggle("fd-layout-toggler-right", {
                target: 'body',
                targetState: 'fd-layout-aside-right-minimize',
                togglerState: 'fd-layout-aside-toggler-active'
            });

            setTimeout(function(){
                $(".fd-layout-aside-right .fd-widget-logo").on("click", function(){
                    togglerRight.toggle();
                });
            }, 2000);
        };
        return {
            init: function () {
                initAsideToggler();
            }
        }
    }();

        $scope.init = function() {
            FDLayout.init();
        }
}]);
