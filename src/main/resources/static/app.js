var app = angular.module("secureApp", ["ngRoute"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/login", {
            templateUrl: "Webpages/login.html",
            controller: "LoginController"
        })
        .when("/otp", {
            templateUrl: "Webpages/otp.html",
            controller: "OtpController"
        })
        .when("/register", {
            templateUrl: "Webpages/register.html",
            controller: "RegisterController"
        })
        .when("/dashboard", {
            templateUrl: "Webpages/dashboard.html"
        })
        .when("/vault", {
            templateUrl: "Webpages/vault.html",
            controller: "VaultController"
        })
        .when("/generator", {
            templateUrl: "Webpages/generator.html",
            controller: "GeneratorController"
        })
        .when("/forgot", {
            templateUrl: "Webpages/forgot.html",
            controller: "ForgotController"
        })
        .otherwise({
            redirectTo: "/login"
        });

});