const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});
function nextStep(currentStep) {
  const emailInput = document.getElementById('email');

  // Trigger native HTML5 validation
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity(); // Display browser-native validation message
    return;
  }

  // Proceed to next step if validation passes
  document.getElementById(`step-${currentStep}`).style.display = 'none';
  const nextStep = currentStep + 1;
  document.getElementById(`step-${nextStep}`).style.display = 'block';
  document.querySelectorAll('.step-indicator')[currentStep - 1].classList.remove('active');
  document.querySelectorAll('.step-indicator')[currentStep].classList.add('active');
  document.getElementById('progress-bar').style.width = `${(nextStep - 1) * 50}%`;
}

function prevStep(currentStep) {
  document.getElementById(`step-${currentStep}`).style.display = 'none';
  const prevStep = currentStep - 1;
  document.getElementById(`step-${prevStep}`).style.display = 'block';
  document.querySelectorAll('.step-indicator')[currentStep - 1].classList.remove('active');
  document.querySelectorAll('.step-indicator')[prevStep - 1].classList.add('active');
  document.getElementById('progress-bar').style.width = `${(prevStep - 1) * 50}%`;
}
const daySelect = document.getElementById('dob-day');
for (let i = 1; i <= 31; i++) {
const option = document.createElement('option');
option.value = i;
option.textContent = i;
daySelect.appendChild(option);
}
const yearselect = document.getElementById('dob-year');
for (let i = 1900; i <= 2024; i++) {
const option = document.createElement('option');
option.value = i;
option.textContent = i;
yearselect.appendChild(option);
}
function validatePasswords(event) {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match. Please try again.");
    confirmPassword.reportValidity(); // Show the browser-native validation message
    return false; // Prevent form submission
  } else {
    confirmPassword.setCustomValidity(""); // Clear the custom error
  }

  // If all validations pass, display a success message
  alert("Sign-up successful!");
  return true; // Allow form submission
}

function clearPasswordError() {
  const confirmPassword = document.getElementById('confirm-password');
  // Clear custom error when the user starts typing again
  confirmPassword.setCustomValidity("");
}

