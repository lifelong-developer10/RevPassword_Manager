var app = angular.module("secureApp", ["ngRoute"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/login", {
            templateUrl: "pages/login.html",
            controller: "LoginController"
        })
        .when("/otp", {
            templateUrl: "pages/otp.html",
            controller: "OtpController"
        })
        .when("/register", {
            templateUrl: "pages/register.html",
            controller: "RegisterController"
        })
        .when("/dashboard", {
            templateUrl: "pages/dashboard.html"
        })
        .when("/vault", {
            templateUrl: "pages/vault.html",
            controller: "VaultController"
        })
        .when("/generator", {
            templateUrl: "pages/generator.html",
            controller: "GeneratorController"
        })
        .when("/forgot", {
            templateUrl: "pages/forgot.html",
            controller: "ForgotController"
        })
        .otherwise({
            redirectTo: "/login"
        });

});