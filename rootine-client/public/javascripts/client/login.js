document.getElementById("showPassword")?.addEventListener("click", function() {
    let field = document.getElementById("passwordField");
    if (field?.type === "password") {
        field.type = "text";
        this.className = "fa fa-eye-slash";
    }
    else if (field?.type === "text") {
        field.type = "password";
        this.className = "fa fa-eye";
    }
});