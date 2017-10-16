/**
 * It should have an array of beers on it's $scope (so the view can display them)
There should be a function for adding a beer (via a form on the view)
There should be a function for removing a beer (via a button on the view)
When the app is loaded it should fetch all the beers (via the beer factory)
 */

app.controller('mainCtrl', ['$scope', 'beersModel', function ($scope, beersModel) {
    $scope.beers = [];

    //automatically fetch the data from the server via the service and populate the beers array with the data
    beersModel.getBeers()
        .then(function (beers) {
            $scope.beers = beers;
        })
        .catch(function (error) {
            console.log(error)
        });


    $scope.addBeer = function (beer) {
        beersModel.addBeer(beer);
    };

    $scope.removeBeer = function (beer) {
        beersModel.removeBeer(beer);
    }
}]);