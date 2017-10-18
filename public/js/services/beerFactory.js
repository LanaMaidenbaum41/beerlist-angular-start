/**communicate with our server
 * addBeer
 * removeBeer
 * getBeers
 */

app.service('beersService', function ($http) {
    //ajax functions to connect with mongo database  
    function addBeer(newBeer) {
        return $http.post('/beers', newBeer)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };

    function removeBeer(beer,param) {
        return $http.delete('/beers/' + param)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };

    function getBeers() {
        return $http.get('/beers')
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

