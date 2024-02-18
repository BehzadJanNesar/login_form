// Import html tags
const capchaInput = document.querySelector("#capcha_input"),
   passwordInput = document.querySelector("#password_input"),
   emaliInput = document.querySelector("#email_input"),
   firstInput = document.querySelector("#first_input"),
   inputs = document.querySelectorAll("input"),
   capchaBox = document.querySelector("#capcha_code_box"),
   submitBtn = document.querySelector("#submit_btn"),
   togglePassword = document.querySelector("#toggle_password"),
   refreshBtn = document.querySelector("#refresh_btn"),
   capchaError = document.querySelector(".capcha--error_text"),
   passError = document.querySelector(".password--error_text"),
   nameError = document.querySelector(".name--error_text"),
   textError = document.querySelector(".email--error_text");
let CpachaText = null;

// Capcha code generator function
function capchaGenerator() {
   let capchaCode = Math.random().toString(36).substring(3, 8),
      newCpachaArr = capchaCode
         .split("")
         .map((el) => (Math.random() > 0.5 ? el.toUpperCase() : el));
   CpachaText = newCpachaArr.join("");
   let html = newCpachaArr
      .map((char) => {
         const rotate = -20 + Math.trunc(Math.random() * 30);
         return `<span style="transform: rotate(${rotate}deg)">${char}</span>`;
      })
      .join("   ");
   capchaBox.innerHTML = html;
}

//check the login form validate
let input;
function formChecker() {
   inputs.forEach((element) => {
      input = element;
      const errorEl = document.querySelector(`#${element.dataset.error}`);
      const nameAtt = element.getAttribute("name");
      if (!element.value) {
         errorEl.textContent = `* ${nameAtt} can't be blanck`;
         errorEl.classList.remove("hidden");
         element.classList.add("shake", "error");

         element.addEventListener("animationend", () =>
            element.classList.remove("shake")
         );
      }
   });
   if (input.classList.contains("successful")) {
      firstInput.value = "";
      emaliInput.value = "";
      passwordInput.value = "";
      capchaInput.value = "";
      inputs.forEach((e) => e.classList.remove("successful"));
      capchaGenerator();
      firstInput.focus();
   }
}

// validate the name input field
function validateName() {
   if (firstInput.value) {
      firstInput.classList.add("successful");
      nameError.classList.add("hidden");
   } else{
      firstInput.classList.remove("successful");
      firstInput.classList.add("error");
      nameError.classList.remove("hidden");
   } 
}

// validate the email input field
function validateEmail() {
   const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
   if (!emaliInput.value.match(pattern)) {
      emaliInput.classList.add("error");
      emaliInput.classList.remove("successful");
      textError.classList.remove("hidden");
      emaliInput.value
         ? (textError.textContent = "* Enter a valid email!")
         : (textError.textContent = "* Email can't be blanck");
   } else {
      textError.classList.add("hidden");
      emaliInput.classList.remove("error");
      emaliInput.classList.add("successful");
   }
}

// validate the password input field
function validatePassword() {
   if (passwordInput.value && passwordInput.value.length >= 8) {
      passError.classList.add("hidden");
      passwordInput.classList.remove("error");
      passwordInput.classList.add("successful");
   } else if (passwordInput.value && passwordInput.value.length < 8) {
      passError.classList.remove("hidden");
      passwordInput.classList.add("error");
      passwordInput.classList.remove("successful");
      passError.textContent = "* Password must be more than 8 characters!";
   } else if (!passwordInput.value) {
      passwordInput.classList.remove("successful");
      passError.textContent = "* Password can't be blanck";
   }
}

// validate the capcha code input field
function validateCapcha() {
   CpachaText = CpachaText.split(" ")
      .filter((e) => e !== "")
      .join("");
   if (CpachaText === capchaInput.value) {
      capchaError.classList.add("hidden");
      capchaInput.classList.remove("error");
      capchaInput.classList.add("successful");
   } else {
      capchaInput.classList.add("error");
      capchaError.classList.remove("hidden");
      capchaInput.classList.remove("successful");
   }
}

// show/hide password value
togglePassword.addEventListener("click", function () {
   const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
   passwordInput.setAttribute("type", type);
   passwordInput.focus();
   if (this.classList.contains("fa-eye-slash")) {
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
   } else {
      this.classList.add("fa-eye-slash");
      this.classList.remove("fa-eye");
   }
});

// All of the event function
refreshBtn.addEventListener("click", () => capchaGenerator());
submitBtn.addEventListener("click", () => formChecker());
firstInput.addEventListener("keyup", () => validateName());
emaliInput.addEventListener("keyup", () => validateEmail());
passwordInput.addEventListener("keyup", () => validatePassword());
capchaInput.addEventListener("keyup", () => validateCapcha());
window.onload = firstInput.focus();
window.onload = capchaGenerator();
