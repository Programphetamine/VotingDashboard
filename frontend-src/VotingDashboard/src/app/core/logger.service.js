(function() {
    'use strict';
    
    angular
        .module('app.core')
        .factory('Logger', Logger);
    
    Logger.$inject = ['$log'];
    
    function Logger($log) {
        var service = {
            info: info,
            warn: warn,
            error: error,
            debug: debug,
            success: success
        };
        
        return service;
        
        function info(message, data) {
            $log.info('ℹ️ [INFO] ' + message, data || '');
        }
        
        function warn(message, data) {
            $log.warn('⚠️ [WARN] ' + message, data || '');
        }
        
        function error(message, data) {
            $log.error('❌ [ERROR] ' + message, data || '');
        }
        
        function debug(message, data) {
            $log.debug('🐛 [DEBUG] ' + message, data || '');
        }
        
        function success(message, data) {
            $log.info('✅ [SUCCESS] ' + message, data || '');
        }
    }
})();
