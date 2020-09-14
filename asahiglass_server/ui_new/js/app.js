/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

'use strict';

angular.module('app', [
    'ui.router',
    'ui.router.state.events',
    'ngResource',
    'ui.utils',
    'oc.lazyLoad',
    //'angular-md5',
    'amChartsDirective',
    // 'angular.morris-chart',
    'naif.base64',
    'toaster',
    'angularjs-datetime-picker'
]);

