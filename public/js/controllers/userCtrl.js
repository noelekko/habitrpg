"use strict";

habitrpg.controller("UserCtrl", ['$scope', '$location', 'User',
  function($scope, $location, User) {
  $scope.profile = User.user;
  $scope.hideUserAvatar = function() {
    $(".userAvatar").hide();
  };
  $scope.toggleHelm = function(val){
    User.log({op:'set', data:{'preferences.showHelm':val}});
  }

  $scope.$watch('_editing.profile', function(value){
    if(value === true) $scope.editingProfile = angular.copy(User.user.profile);
  });  

  $scope.save = function(){
    var values = {};
    _.each($scope.editingProfile, function(value, key){
      // Using toString because we need to compare two arrays (websites)
      if($scope.editingProfile[key].toString() !== $scope.profile.profile[key].toString()) values['profile.' + key] = value;
    });
    User.setMultiple(values);
    $scope._editing.profile = false;
  }

  $scope.addWebsite = function(){
    if (!$scope.editingProfile.websites) $scope.editingProfile.websites = [];
    $scope.editingProfile.websites.push($scope._newWebsite);
    $scope._newWebsite = '';
  }
  $scope.removeWebsite = function($index){
    $scope.editingProfile.websites.splice($index,1);
  }
}]);
