/**
 * @author Antoine COMBES
 *
 */
(function () {
    function capitalise(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if(typeof window.Swapi !== 'undefined') return;

    var Swapi = function (baseUrl) {
        var self = this;
        self.baseUrl = baseUrl;
        self.loaded = false;

        /** Get the root description and create the methods from the api's returned schema */
        self.get(baseUrl, function (data) {
            for(var key in data) {
                (function () {
                    var theKey = key,
                        capitalKey = capitalise(theKey);
                    self['getPage' + capitalKey] = function (page, callback, error) {
                        self.get(data[theKey] + '?page=' + page, callback, error);
                    };

                    self['getAll' + capitalKey] = function(callback, error) {
                        var results = [];

                        function recursive(data) {
                            results = results.concat(data.results);

                            if(data.next != null) {
                                self.get(data.next, recursive, error);
                            } else {
                                callback(results);
                            }
                        }

                        self.get(data[theKey], recursive, error);
                    };

                    self['get' + capitalKey] = function (id, callback, error) {
                        self.get(data[theKey] + id, callback, error);
                    }
                })();
            }

            var event = document.createEvent('Event');
            event.initEvent(self.baseUrl, true, true);
            document.dispatchEvent(event);
            self.loaded = true;
        });
    };

    Swapi.prototype = {
        get: function(url, success, error) {
            error = error || function() {console.error(this.error);};
            url = url || this.baseUrl;

            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.setRequestHeader('Accept', 'application/json');
            req.onreadystatechange = function () {
                if(this.readyState != XMLHttpRequest.DONE) return;

                if(this.status != 200) {
                    error(this.error);
                } else {
                    if(success) success(JSON.parse(this.responseText));
                }
            };

            req.send();
        },
        ready: function (callback) {
            var self = this;

            if(this.loaded) {
                callback.call(this);
            } else {
                document.addEventListener(self.baseUrl, function () {
                    callback.call(self);
                })
            }
        }
    };

    window.Swapi = Swapi;
})();