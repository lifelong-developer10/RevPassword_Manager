app.factory("ApiService", function ($http) {

    var base = "/api";

    function authHeader() {
        return {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
    }

    return {

        login: data => $http.post(base + "/auth/login", data),

        register: data => $http.post(base + "/auth/register", data),

        verifyOtp: data => $http.post(base + "/auth/verify-otp", data),

        getQuestions: () => $http.get(base + "/forgot/security-questions"),

        verifyAnswers: data => $http.post(base + "/forgot/verify", data),

        resetPassword: data => $http.post(base + "/forgot/reset", data),

        getVault: () => $http.get(base + "/vault", { headers: authHeader() }),

        addEntry: data => $http.post(base + "/vault", data, { headers: authHeader() }),

        deleteEntry: id => $http.delete(base + "/vault/" + id, { headers: authHeader() })

    };

});