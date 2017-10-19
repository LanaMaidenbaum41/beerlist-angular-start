/**
 * It should have an array of beers on it's $scope (so the view can display them)
There should be a function for adding a beer (via a form on the view)
There should be a function for removing a beer (via a button on the view)
When the app is loaded it should fetch all the beers (via the beer factory)
 */

app.controller('mainCtrl', ['$scope', 'beersService', function ($scope, beersService) {
    $scope.beers = [];

    //automatically fetch the data from the server via the service and populate the beers array with the data
    beersService.getBeers()
        .then(function (beers) {
            $scope.beers = beers;
        })
        .catch(function (error) {
            console.log(error);
        });

    //functions from the service to manipulate the beer data 
    $scope.addBeer = function () {
        var newBeer = {
            name: $scope.name,
            style: $scope.style,
            image_url: $scope.image,
            abv: $scope.abv,
            ratings: []
        };
        //reset values
        $scope.name = "";
        $scope.style = "";
        $scope.image = "";
        $scope.abv = "";

        beersService.addBeer(newBeer)
            .then(function (newBeer) {
                $scope.beers.push(newBeer);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    $scope.removeBeer = function (beer) {
        var param = beer.name;
        beersService.removeBeer(param)
            .then(function (removeBeer) {
                for (var i = 0; i < $scope.beers.length; i++) {
                    if ($scope.beers[i]._id == removeBeer._id) {
                        $scope.beers.splice(i, 1);
                    }
                }
            })
    }
}]);

var deb;

app.controller('beersCtrl', ['$scope', '$stateParams', 'beersService', function ($scope, $stateParams, beersService) {
    $scope.reviews = [];
   deb = $stateParams

    if (!$stateParams.beerParam) {
        beersService.getSingleBeer($stateParams.id)
            .then(function (singleBeer) {
                $scope.beer = singleBeer;
                $scope.reviews = singleBeer.reviews
            })
    }
    else {
        $scope.beer = $stateParams.beerParam
        $scope.reviews = $stateParams.beerParam.reviews
    }

    $scope.addReview = function () {
        var newReview = {
            user:$scope.reviewUser,
            text:$scope.reviewText
        };
        $scope.reviewUser = ""
        $scope.reviewText = ""
        beersService.addReview(newReview, $stateParams.id)
            .then(function (newReview) {
                $scope.reviews.push(newReview);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    $scope.removeReview = function (review) {
        var beerId = $stateParams.id;
        var reviewId = review._id

        beersService.removeReview(beerId,reviewId)
            .then(function (removeReview) {
                for (var i = 0; i < $scope.reviews.length; i++) {
                    if($scope.reviews[i]._id == removeReview._id){
                        $scope.reviews.splice(i,1);
                    }
                }
            })
    }
}])
