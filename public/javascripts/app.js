var app = angular.module('CSHub',[]);
app.controller('internshipData', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 20;
    $scope.datas = [];
    $scope.q = '';
    $scope.class = "";
    var request = $http.get('/internship');    
    request.success(function(data) {
        $scope.datas = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.datas, $scope.q) 
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    $scope.changeClass = function(){
        if ($scope.currentPage < $scope.getData().length/$scope.pageSize - 1) {
            $scope.class = "pagewidth1";
            return $scope.class;
        }
        else{
            $scope.class = "pagewidth2";
            return $scope.class;
        }
    }
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

/*app.controller('pager', function($scope){
    $scope.pageNumber = 0;
    $scope.pages = [];
    for (var i = 1; i < 8; i++) {
        $scope.pages.push(i);
    }
    $scope.numberinc = function(){
        return pageNumber = pageNumber+1;
    }
});*/

app.controller('test', function($scope){
    $scope.data = [
      {
        name : 'aman',
        class : 'cs'    
      },
      {
        name : 'adarsh',
        class : 'mech'
      }
    ];
});

app.controller('onlineCourses', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.courses = [];
    $scope.q = '';
    $scope.class = "";
    var request = $http.get('/onlinecourses');    
    request.success(function(data) {
        $scope.courses = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.courses, $scope.q) 
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    $scope.changeClass = function(){
        if ($scope.currentPage < $scope.getData().length/$scope.pageSize - 1) {
            $scope.class = "pagewidth1";
            return $scope.class;
        }
        else{
            $scope.class = "pagewidth2";
            return $scope.class;
        }
    }

    $scope.checkNumber = function(n){
        if(n % 2 == 0){
            return true;
        }
        else{
            return false;
        }
    }
}]); 

app.controller('skillArena', ['$scope', '$http', function($scope, $http){
    $scope.q = 0;
    $scope.questions = [];
    var request = $http.get('/skillarena');    
    request.success(function(data) {
        $scope.questions = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.checkQ = function(n){
        if(n == 0){
            return true;
        }
        else{
            return false;
        }
    }

}]);

app.controller('skillArenaEasy', ['$scope', '$http', function($scope, $http){
    $scope.q = 0;
    $scope.questions = [];
    var request = $http.get('/skillarenaeasy');    
    request.success(function(data) {
        $scope.questions = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
}]);

app.controller('loginCheck', ['$scope', '$http', function($scope, $http){
    $scope.userlog = [];
    var request = $http.get('/users/main');    
    request.success(function(data) {
        $scope.userlog.push(data);
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

}]);

app.controller('logoutCheck', ['$scope', '$http', function($scope, $http){
    $scope.userlog = [];
    var request = $http.get('/users/mainlogout');    
    request.success(function(data) {
        $scope.userlog.push(data);
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

}]);

app.controller('forumQuestion', ['$scope', '$http', function($scope, $http){
    $scope.questions = [];
    var request = $http.get('/users/forumquestion');    
    request.success(function(data) {
        $scope.questions = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

}]);

app.controller('forumComment', ['$scope', '$http', function($scope, $http){
    $scope.answers = [];
    var request = $http.get('/users/forumanswers');    
    request.success(function(data) {
        $scope.answers = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

}]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.controller('loginForum', ['$scope', '$http', function($scope, $http){
    $scope.log = [];
    var request = $http.get('/users/loginforum');    
    request.success(function(data) {
        $scope.log = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

}]);

app.controller('techJobs', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 20;
    $scope.jobs = [];
    $scope.q = '';
    $scope.class = "";
    var request = $http.get('/technewsjobs');    
    request.success(function(data) {
        $scope.jobs = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.jobs, $scope.q) 
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    $scope.changeClass = function(){
        if ($scope.currentPage < $scope.getData().length/$scope.pageSize - 1) {
            $scope.class = "pagewidth1";
            return $scope.class;
        }
        else{
            $scope.class = "pagewidth2";
            return $scope.class;
        }
    }
}]);

app.controller('techComputers', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 20;
    $scope.jobs = [];
    $scope.q = '';
    $scope.class = "";
    var request = $http.get('/technewscomputers');    
    request.success(function(data) {
        $scope.jobs = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.jobs, $scope.q) 
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    $scope.changeClass = function(){
        if ($scope.currentPage < $scope.getData().length/$scope.pageSize - 1) {
            $scope.class = "pagewidth1";
            return $scope.class;
        }
        else{
            $scope.class = "pagewidth2";
            return $scope.class;
        }
    }
}]);

app.controller('techServices', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 20;
    $scope.jobs = [];
    $scope.q = '';
    $scope.class = "";
    var request = $http.get('/technewsitservices');    
    request.success(function(data) {
        $scope.jobs = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.jobs, $scope.q) 
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    $scope.changeClass = function(){
        if ($scope.currentPage < $scope.getData().length/$scope.pageSize - 1) {
            $scope.class = "pagewidth1";
            return $scope.class;
        }
        else{
            $scope.class = "pagewidth2";
            return $scope.class;
        }
    }
}]);
