(function() {

  angular
    .module('meanApp')
    .controller('theorexpilotCtrl', theorexpilotCtrl);

  theorexpilotCtrl.$inject = ['$location','$routeParams', 'meanData','$scope', 'authentication'];
  function theorexpilotCtrl($location, $routeParams, meanData, $scope, authentication) {
    var vm = this;

    vm.campuschampdata = {};

    console.log("Inside TheorexPilot controller");

    $scope.pilot_apply = function(){
	//alert(vm.campuschampdata);
	authentication.applyTheorexPilot({"pilotdata":vm.pilotdata})
	.success(function(data) {
	//alert(JSON.stringify(data));	
		if(data.error==1){
			pilotForm.email.$setValidity("required", false);
			$("#pilot_error_div").show();
		}else{
			 $("#pilot_success_div").show();
		}
	})
	.error(function (e) {
	console.log(e);
	});
    }
  }

})();
