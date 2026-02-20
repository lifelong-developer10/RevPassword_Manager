app.factory("ApiService", function ($http) {

    var base = "http://localhost:8080/api";

    function authHeader() {
        return {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
    }

    return {

        register: data => $http.post(base + "/auth/register", data),

        login: data => $http.post(base + "/auth/login", data),

        verifyOtp: data => $http.post(base + "/auth/verify-otp", data),

        getQuestions: () => $http.get(base + "/forgot/security-questions"),

        verifyAnswers: data => $http.post(base + "/forgot/verify", data),

        resetPassword: data => $http.post(base + "/forgot/reset", data),

        getVault: () => $http.get(base + "/vault", { headers: authHeader() }),

        addVault: data => $http.post(base + "/vault", data, { headers: authHeader() }),

        generatePassword: data => $http.post(base + "/password/generate", data),

        strength: password => $http.get(base + "/password/strength?password=" + password)

    };

});
app.controller("LoginController", function ($scope, ApiService, $location) {

    $scope.login = function () {

        ApiService.login($scope.user)
            .then(function (res) {

                if (res.data.message === "OTP_REQUIRED") {

                    localStorage.setItem("tempUser", $scope.user.username);
                    $location.path("/otp");

                } else {

                    localStorage.setItem("token", res.data.token);
                    $location.path("/dashboard");

                }

            });
    };

});
app.controller("OtpController", function ($scope, ApiService, $location) {

    $scope.verify = function () {

        var req = {
            username: localStorage.getItem("tempUser"),
            code: $scope.otp.code
        };

        ApiService.verifyOtp(req)
            .then(function (res) {

                localStorage.setItem("token", res.data.token);

                $location.path("/dashboard");

            });

    };

});
app.controller("RegisterController", function ($scope, ApiService) {

    ApiService.getQuestions().then(res => $scope.questions = res.data);

    $scope.answers = {};

    $scope.register = function () {

        var securityAnswers = [];

        angular.forEach($scope.answers, function (value, key) {

            securityAnswers.push({
                questionId: key,
                answer: value
            });

        });

        var req = {
            username: $scope.user.username,
            email: $scope.user.email,
            phone: $scope.user.phone,
            password: $scope.user.password,
            securityAnswers: securityAnswers
        };

        ApiService.register(req)
            .then(() => alert("Registered Successfully"));

    };

});
app.controller("VaultController", function ($scope, ApiService) {

    $scope.load = function () {

        ApiService.getVault()
            .then(res => $scope.vault = res.data);

    };

});
app.controller("GeneratorController", function ($scope, ApiService) {

    $scope.generate = function () {

        var req = { length: $scope.length || 12 };

        ApiService.generatePassword(req)
            .then(res => $scope.passwords = res.data.passwords);

    };

});