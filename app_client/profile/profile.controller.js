(function() {
    angular.module('meanApp');
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location','$routeParams', 'meanData', '$scope', '$http', 'Upload','$window'];
  function profileCtrl($location, $routeParams, meanData, $scope, $http, Upload, $window) {
    var vm = this;

    vm.user = {};
    vm.jsondata = {};

    if($window.localStorage['sso'] && $window.localStorage['sig']){
	var local_sso=$window.localStorage['sso'];
	var local_sig=$window.localStorage['sig'];
	$window.localStorage.removeItem('sso');
	$window.localStorage.removeItem('sig');

	window.location='/auth/forum?sso='+local_sso+'&sig='+local_sig;
    }	

    meanData.getProfile($routeParams)
      .success(function(data) {
        vm.jsondata = data;
	//var json_res=data;
	//alert();
	//var redirect_to=data.redirect_to;
	//alert(JSON.stringify(data));	
	//window.location = redirect_to;
      })
      .error(function (e) {
        console.log(e);
      });

    meanData.isEmailVerified($routeParams)
      .success(function(data) {
        $scope.isVerified = data.is_verified;
      })
      .error(function (e) {
        console.log(e);
      });

	    $scope.getCommitData = function() {
		IN.API.Profile("me").fields(
		        [ "id", "firstName", "lastName", "pictureUrl",
		                "publicProfileUrl", "headline", "summary", "location", "positions" ]).result(function(result) {
		    //set the model
		    $scope.$apply(function() {
		        $scope.jsondata = result.values[0];
		    });
		}).error(function(err) {
		    $scope.$apply(function() {
		        $scope.error = err;
		    });
		});
	    };

	    $scope.profileNameUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"name":vm.jsondata.name} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileHeadlineUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"headline":vm.jsondata.headline} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileBioUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"bio":vm.jsondata.bio} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileLocationUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"location":$scope.jsondata.location.name} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileExperienceUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"experience":vm.jsondata.experience} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileEducationUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"education":vm.jsondata.education} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileSkillUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"skill":vm.jsondata.skill} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileAddlInfoUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"additional_info":vm.jsondata.additional_info} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	  $scope.addNewExperience = function() {
	    var newItemNo = vm.jsondata.experience.length+1;
	    vm.jsondata.experience.push({'id':newItemNo});
	//alert(newItemNo);
	  };

	  $scope.removeExperience = function(index) {
	    var lastItem = vm.jsondata.experience.length-1;
	    vm.jsondata.experience.splice(index,1);
	  };

	  $scope.addNewEducation = function() {
	    var newItemNo = vm.jsondata.education.length+1;
	    vm.jsondata.education.push({'id':newItemNo});
	//alert(newItemNo);
	  };

	  $scope.removeEducation = function(index) {
	    var lastItem = vm.jsondata.education.length-1;
	    vm.jsondata.education.splice(index,1);
	  };
	  $scope.addNewSkill = function() {
	    var newItemNo = vm.jsondata.skill.length+1;
	    vm.jsondata.skill.push({'id':newItemNo});
	//alert(newItemNo);
	  };

	  $scope.removeSkill = function(index) {
	    var lastItem = vm.jsondata.skill.length-1;
	    vm.jsondata.skill.splice(index,1);
	  };

    $scope.uploadPic = function(file) {
	    meanData.uploadImage(file)
	      .success(function(data) {
		alert(JSON.stringify(data));	
		//window.location = redirect_to;
	      })
	      .error(function (e) {
		console.log(e);
	      });

    };


  }

})();
