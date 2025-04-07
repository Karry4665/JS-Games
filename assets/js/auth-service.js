
const firebaseConfig = {
    apiKey: "AIzaSyCTovGgFBHloOwqkVjxmNzIqhX3kwjVKLw",
    authDomain: "js-games-2eae8.firebaseapp.com",
    projectId: "js-games-2eae8",
    storageBucket: "js-games-2eae8.firebasestorage.app",
    messagingSenderId: "6976625650",
    appId: "1:6976625650:web:29fdf3ac8eff04523f696b",
    measurementId: "G-2G39XF5Y1N"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // DOM Elements
  const authOverlay = document.getElementById("authOverlay");
  const authModalTitle = document.getElementById("authModalTitle");
  const signupFields = document.getElementById("signupFields");
  const confirmPasswordWrapper = document.getElementById("confirmPasswordWrapper");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const openAuthModal = document.getElementById("openAuthModal");
  const authMessage = document.getElementById("auth-message");
  
  let showPassword = false;
  let showConfirm = false;
  
  // Show/Hide Password
  togglePassword.addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    showPassword = !showPassword;
    passwordInput.type = showPassword ? "text" : "password";
    togglePassword.className = showPassword ? "bi bi-eye-slash" : "bi bi-eye";
  });
  
  toggleConfirmPassword.addEventListener("click", () => {
    const confirmInput = document.getElementById("confirmPassword");
    showConfirm = !showConfirm;
    confirmInput.type = showConfirm ? "text" : "password";
    toggleConfirmPassword.className = showConfirm ? "bi bi-eye-slash" : "bi bi-eye";
  });
  
  // Open Modal (Login View)
  openAuthModal.addEventListener("click", () => {
    authOverlay.classList.remove("d-none");
    signupFields.classList.add("d-none");
    confirmPasswordWrapper.classList.add("d-none");
    authModalTitle.textContent = "Login";
    loginBtn.textContent = "Login";
    authMessage.textContent = "";
    loginBtn.onclick = handleLogin;
  });
  
  // Close Modal
  closeAuthModal.addEventListener("click", () => {
    authOverlay.classList.add("d-none");
  });
  
  // Switch to Signup View
  signupBtn.addEventListener("click", () => {
    authModalTitle.textContent = "Sign Up";
    signupFields.classList.remove("d-none");
    confirmPasswordWrapper.classList.remove("d-none");
    loginBtn.textContent = "Sign Up";
    authMessage.textContent = "";
    loginBtn.onclick = handleSignup;
  });
  
  // Login Function
  function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        authMessage.textContent = "Login successful!";
        authOverlay.classList.add("d-none");
        console.log(email, password)
      })
      .catch(error => {
        authMessage.textContent = error.message;
      });
  }
  
  // Signup Function
  function handleSignup() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    if (password !== confirmPassword) {
      authMessage.textContent = "Passwords do not match.";
      return;
    }
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        authMessage.textContent = "Signup successful!";
        authOverlay.classList.add("d-none");
        console.log(email, password, firstName,lastName,confirmPassword)

      })
      .catch(error => {
        authMessage.textContent = error.message;
      });
  }
  
  // Optional: Auth state listener
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log("Logged in as:", user.email);
    } else {
      console.log("User is logged out");
    }
  });
  