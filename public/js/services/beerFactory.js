/**communicate with our server
 * addBeer
 * removeBeer
 * getBeers
 */

app.service('beersService', function ($http) {
    //ajax functions to connect with mongo database
    //POST routes  
    function addBeer(newBeer) {
        return $http.post('/beers', newBeer)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };
    function addReview(newReview,beerId) {
        console.log(newReview)
        return $http.post('/beer/'+beerId+'/reviews', newReview)
            .then(function (response) {
                return angular.copy(response.data);
            })
    }
    //DELETE routes
    function removeBeer(param) {
        return $http.delete('/beers/' + param)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };
    function removeReview(beerId,reviewId){
        return $http.delete('/beers/'+beerId+'/reviews/'+reviewId)
            .then(function(response){
                return angular.copy(response.data);
            });
        
    }
    //GET routes
    function getBeers() {
        return $http.get('/beers')
            .then(function (response) {
                //The function angular.copy makes a copy of the data received.
                //It's good practice as it prevents any weird and unwanted object reference stuff.
                return angular.copy(response.data);
            });
    };

    //get a single beer
    function getSingleBeer(beerId) {
        return $http.get('/beer/' + beerId)
            .then(function (response) {
                return angular.copy(response.data);
            })
    }

    return {
        addBeer: addBeer,
        removeBeer: removeBeer,
        getBeers: getBeers,
        getSingleBeer: getSingleBeer,
        addReview:addReview,
        removeReview:removeReview
    }

});

