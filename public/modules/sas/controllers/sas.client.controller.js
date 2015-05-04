'use strict';

// Sas controller
angular.module('sas').controller('SasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sas',
	function($scope, $stateParams, $location, Authentication, Sas) {
		$scope.authentication = Authentication;

		// Create new Sa
		$scope.create = function() {
			// Create new Sa object
			var sa = new Sas ({
				name: this.name
			});

			// Redirect after save
			sa.$save(function(response) {
				$location.path('sas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Sa
		$scope.remove = function(sa) {
			if ( sa ) { 
				sa.$remove();

				for (var i in $scope.sas) {
					if ($scope.sas [i] === sa) {
						$scope.sas.splice(i, 1);
					}
				}
			} else {
				$scope.sa.$remove(function() {
					$location.path('sas');
				});
			}
		};

		// Update existing Sa
		$scope.update = function() {
			var sa = $scope.sa;

			sa.$update(function() {
				$location.path('sas/' + sa._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sas
		$scope.find = function() {
			$scope.sas = Sas.query();
		};

		// Find existing Sa
		$scope.findOne = function() {
			$scope.sa = Sas.get({ 
				saId: $stateParams.saId
			});
		};
	}
]);