/**communicate with our server
 * addBeer
 * removeBeer
 * getBeers
 */
app.service('beersModel', function ($http) {
    function addBeer() {

    };

    function removeBeer() {

    };

    function getBeers() {
        $http.get('/beers')
            .then(function (response) {
                //The function angular.copy makes a copy of the data received.
                //It's good practice as it prevents any weird and unwanted object reference stuff.
                return angular.copy(response.data);
            });  
    };

    return {
        addBeer: addBeer,
        removeBeer: removeBeer,
        getBeers: getBeers
    }

});

