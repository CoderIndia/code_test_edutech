(function() {

  angular
    .module('meanApp')
    .controller('campuschampCtrl', campuschampCtrl);

  campuschampCtrl.$inject = ['$location','$routeParams', 'meanData','$scope', 'authentication'];
  function campuschampCtrl($location, $routeParams, meanData, $scope, authentication) {
    var vm = this;

    vm.campuschampdata = {};

    console.log("Inside campuschamp controller");

    $scope.campuschamps_apply = function(){
	//alert(vm.campuschampdata);
	authentication.applyCampuschamp({"campuschampdata":vm.campuschampdata})
	.success(function(data) {
	//alert(JSON.stringify(data));	
		if(data.error==1){
			campuschampForm.email.$setValidity("required", false);
			 $("#champ_error_div").show();
		}else{
			//vm.campuschampdata={};
			 $("#champ_success_div").show();
		}
	})
	.error(function (e) {
	console.log(e);
	});
    }
  }

})();
