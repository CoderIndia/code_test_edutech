(function () {

  angular
    .module('meanApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    login_external = function(user) {
      return $http.get('/api/login_external', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var googleCallback = function (routeParams) {
      return $http.get('/api/auth/google?code='+routeParams.code).success(function(data) {
        saveToken(data.token);
      });
    };

    var facebookCallback = function (routeParams) {
      return $http.get('/api/auth/facebook?code='+routeParams.code).success(function(data) {
        saveToken(data.token);
      });
    };

    var twitterCallback = function (routeParams) {
      return $http.get('/api/auth/twitter?oauth_token='+routeParams.oauth_token+'&oauth_verifier='+routeParams.oauth_verifier).success(function(data) {
        saveToken(data.token);
      });
    };

    var linkedinCallback = function (routeParams) {
      return $http.get('/api/auth/linkedin?oauth_token='+routeParams.oauth_token+'&oauth_verifier='+routeParams.oauth_verifier).success(function(data) {
        saveToken(data.token);
      });
    };

    var logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    applyCampuschamp = function(campuschamp) {
      return $http.post('/api/campuschamp/apply', campuschamp).success(function(data) {

      });
    };

    applyTheorexPilot = function(pilot) {
      return $http.post('/api/pilot/apply', pilot).success(function(data) {

      });
    };

    applyOrganization = function(organization) {
      return $http.post('/api/organization/apply', organization).success(function(data) {

      });
    };

    applyWorkshopreq = function(workshopreq) {
      return $http.post('/api/workshopreq/apply', workshopreq).success(function(data) {

      });
    };

    sendContactMessage = function(contactdata) {	
      return $http.post('/api/sendcontact/message',contactdata).success(function(data) {

      });
    };

    verifyEmail = function(emailHash) {
	var config = {
	 params: {emailHash : emailHash},
	};
      return $http.post('/api/verifyemail', config, {
      });
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout,
      login_external : login_external,
      googleCallback : googleCallback,
      facebookCallback : facebookCallback,
      twitterCallback : twitterCallback,
      linkedinCallback : linkedinCallback,
      applyCampuschamp : applyCampuschamp,
      sendContactMessage : sendContactMessage,
      applyTheorexPilot : applyTheorexPilot,
      applyOrganization : applyOrganization,
      applyWorkshopreq : applyWorkshopreq,
      verifyEmail : verifyEmail
    };
  }


})();
