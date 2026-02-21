var app = angular.module("secureApp", ["ngRoute"]);

app.config(function ($routeProvider) {

    $routeProvider

        .when("/login", {
            templateUrl: "pages/login.html",
            controller: "LoginController"
        })

        .when("/register", {
            templateUrl: "pages/register.html",
            controller: "RegisterController"
        })

        .when("/otp", {
            templateUrl: "pages/otp.html",
            controller: "OtpController"
        })

        .when("/forgot", {
            templateUrl: "pages/forgot.html",
            controller: "ForgotController"
        })

        .when("/dashboard", {
            templateUrl: "pages/dashboard.html"
        })

        .when("/vault", {
            templateUrl: "pages/vault.html",
            controller: "VaultController"
        })

        .when("/add-entry", {
            templateUrl: "pages/add-entry.html",
            controller: "AddEntryController"
        })

        .when("/generator", {
            templateUrl: "pages/generator.html",
            controller: "GeneratorController"
        })

        .otherwise({ redirectTo: "/login" });

});

app.run(function ($rootScope, $location) {

    $rootScope.$on("$routeChangeStart", function () {

        var token = localStorage.getItem("token");

        if (!token && $location.path() !== "/login"
            && $location.path() !== "/register"
            && $location.path() !== "/forgot") {

            $location.path("/login");
        }
    });

});
app.controller("LoginController", function ($scope, ApiService, $location) {

    $scope.login = function () {

        ApiService.login($scope.user)
            .then(res => {

                if (res.data.message === "OTP_REQUIRED") {

                    localStorage.setItem("tempUser", $scope.user.username);
                    $location.path("/otp");

                } else {

                    localStorage.setItem("token", res.data.token);

                    Swal.fire("Success", "Login Successful", "success");

                    $location.path("/dashboard");
                }

            });
    };

});