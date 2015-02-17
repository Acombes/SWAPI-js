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
            function initOneKey(key) {
                var capitalKey = capitalise(key);

                // Define the getAll[Key] method
                self['getAll' + capitalKey] = function(page, callback, error) {
                    /* If page is actually a function, that means we don't want a page, but really all results.
                     * If page is a number or a string , then we only fetch the page */
                    if(typeof page === 'function') {
                        error = callback;
                        callback = page;

                        var results = [],
                            recursive = function(data) {
                                results = results.concat(data.results);

                                if(data.next !== null) {
                                    self.get(data.next, recursive, error);
                                } else {
                                    callback(results);
                                }
                            };

                        self.get(data[key], recursive, error);
                    } else if(page && /[0-9]+/.test(page)) {
                        self.get(data[key] + '?page=' + page, callback, error);
                    }
                };

                // Define the get[Key] method.
                self['get' + capitalKey] = function (id, callback, error) {
                    self.get(data[key] + id, callback, error);
                };
            }

            for(var key in data) {
                initOneKey(key);
            }

            var event = document.createEvent('Event');
            event.initEvent(self.baseUrl, true, true);
            document.dispatchEvent(event);
            self.loaded = true;
        });
    };

    Swapi.prototype = {
        get: function(url, success, error) {
            var self = this;
            error = error || function() {console.error(self.error);};
            url = url || self.baseUrl;

            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.setRequestHeader('Accept', 'application/json');
            req.onreadystatechange = function () {
                if(this.readyState != XMLHttpRequest.DONE) return;

                if(this.status != 200) {
                    error.call(self, url + ' ' + JSON.parse(this.responseText).detail);
                } else if(success) success.call(self, JSON.parse(this.responseText));
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
                });
            }
        }
    };

    window.Swapi = Swapi;
})();