var app = angular.module('puzzles', []);

angular.module('puzzles').controller('PuzzleController', function($scope) {

    $scope.puzzles = [];

    $scope.loadPuzzles = function() {
            chrome.storage.sync.get(['savedpuzzles'], function(result) {
                $scope.puzzles = result.savedpuzzles;
                $scope.$apply();
            });
    }

    $scope.removePuzzle = function(id) {
        chrome.storage.sync.get(['savedpuzzles'], function(result) {

            if (result.savedpuzzles !== undefined) {

                var puzzles = result.savedpuzzles;

                for (var i = puzzles.length - 1; i >= 0; i--) {
                    if (puzzles[i].id === id) {
                        puzzles.splice(i, 1);
                        break;
                    }
                }

                chrome.storage.sync.set({'savedpuzzles': puzzles}, function () {
                    $scope.loadPuzzles();
                });

            }


        });

    }

});