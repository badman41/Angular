var app = angular.module("myApp", ['ui.bootstrap']);
app.controller("myController", ['$scope', '$modal', '$log',

    function($scope, $modal) {
        //$scope.user = {};
        $scope.users = [];

        $scope.removeUser = function(user) {
            var removedUser = $scope.users.indexOf(user);
            $scope.users.splice(removedUser, 1);
        };

        $scope.editUser = function(user) {
        /*    $scope.user.firstname = user.firstname;
            $scope.user.lastname = user.lastname;
            $scope.user.pno = user.pno;
            $scope.user.emailid = user.emailid;*/
            var modalInstance = $modal.open({
                templateUrl: 'edit-form.html',
                controller: editModalInstance,
                scope: $scope,
                //user: $scope.user,
                resolve: {
                    editForm: function() {
                        return user;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                user.firstname = selectedItem.firstname;
                user.lastname = selectedItem.lastname;
                user.pno = selectedItem.pno;
                user.emailid = selectedItem.emailid;
                $scope.selected = 'closed';
            });
        };


        $scope.showForm = function() {

            var modalInstance = $modal.open({
                templateUrl: 'form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function() {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
                if (selectedItem === 'error') {
                    alert('There is already a user with the email id.Try with a new one.');
                    }
            });
        };
    }
]);

var ModalInstanceCtrl = function($scope, $modalInstance, userForm) {
    $scope.form = {};
    $scope.submitForm = function() {
        if ($scope.form.userForm.$valid) {
            var push_into = 1;
            for (var index = 0; index < $scope.users.length; index++) {
                if ($scope.users[index].emailid === $scope.form.emailid) {
                    push_into = 0;
                    break;
                }
            }
            if (push_into) {
                $scope.users.push({
                    firstname: $scope.form.firstname,
                    lastname: $scope.form.lastname,
                    pno: $scope.form.pno,
                    emailid: $scope.form.emailid,
                });
                $modalInstance.close('closed');

            } else {
                $modalInstance.close('error');

            }
        }
    };
    $scope.cancel = function() {
        $modalInstance.dismiss();
    };
};

var editModalInstance = function($scope, $modalInstance, editForm) {
    //$scope.form = {};
    //console.log(editForm);
    $scope.form = editForm;
    /*$scope.form.firstname = $scope.user.firstname;
    $scope.form.lastname = $scope.user.lastname;
    $scope.form.pno = $scope.user.pno;
    $scope.form.emailid = $scope.user.emailid;*/
    $scope.submitForm = function() {
        if ($scope.form.editForm.$valid) {
            $modalInstance.close($scope.form);
        }
    };
    $scope.cancel = function() {
        $modalInstance.dismiss();
    };
};
