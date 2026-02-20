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