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
app.controller("RegisterController", function ($scope, ApiService) {

    ApiService.getQuestions().then(res => $scope.questions = res.data);

    $scope.checkStrength = function () {

        var p = $scope.user.password || "";

        $scope.strength = Math.min(100, p.length * 10);
    };

    $scope.generatePassword = function () {

        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
        var pass = "";

        for (var i = 0; i < 12; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        $scope.user.password = pass;
        $scope.checkStrength();
    };

    $scope.register = function () {

        var selected = $scope.questions.filter(q => q.selected);

        if (selected.length !== 3) {
            Swal.fire("Error", "Select exactly 3 questions", "error");
            return;
        }

        var securityAnswers = selected.map(q => ({
            questionId: q.id,
            answer: q.answer
        }));

        var req = {
            username: $scope.user.username,
            email: $scope.user.email,
            phone: $scope.user.phone,
            password: $scope.user.password,
            securityAnswers: securityAnswers
        };

        ApiService.register(req)
            .then(() => Swal.fire("Success", "Registered!", "success"));

    };

});
app.controller("OtpController", function ($scope, ApiService, $location) {

    $scope.verify = function () {

        var req = {
            username: localStorage.getItem("tempUser"),
            code: $scope.otp.code
        };

        ApiService.verifyOtp(req)
            .then(res => {

                localStorage.setItem("token", res.data.token);

                Swal.fire("Success", "Login Complete", "success");

                $location.path("/dashboard");
            });

    };

});
app.controller("VaultController", function ($scope, ApiService) {

    function load() {
        ApiService.getVault().then(res => $scope.vault = res.data);
    }

    load();

    $scope.delete = function (id) {

        ApiService.deleteEntry(id)
            .then(() => {
                Swal.fire("Deleted", "Removed", "success");
                load();
            });

    };

});