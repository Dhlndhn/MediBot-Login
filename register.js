// Import the necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDU5SQfBW7hLvX2EMdZ9lFfBUuFWSbfvPc",
    authDomain: "medibot-login.firebaseapp.com",
    projectId: "medibot-login",
    storageBucket: "medibot-login.firebasestorage.app",
    messagingSenderId: "296331395992",
    appId: "1:296331395992:web:94c765cbe2cf6eb080a1ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Signup button
const submit = document.getElementById('regbtn');
submit.addEventListener("click", async function (event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value.trim();
    const cpass = document.getElementById('confirm-password').value.trim();
    const firstn = document.getElementById('first-name').value.trim();
    const lastn = document.getElementById('last-name').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const bloodt = document.getElementById('blood-type').value.trim();
    const birthm = document.getElementById('dob-month').value.trim();
    const birthd = document.getElementById('dob-day').value.trim();
    const birthy = document.getElementById('dob-year').value.trim();
    const terms = document.getElementById('terms').checked;

    // Validate inputs
    if (!terms) {
        alert("You must accept the terms and conditions.");
        return;
    }

    if (pass !== cpass) {
        alert("Passwords do not match.");
        return;
    }

    try {
        console.log("Starting Firebase user creation...");

        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        console.log("User successfully created in Firebase Auth:", user);

        // Save additional user data in Firestore
        await setDoc(doc(db, "Users", user.uid), {
            firstName: firstn,
            lastName: lastn,
            gender: gender,
            Password: pass,
            bloodType: bloodt,
            birthDate: {
                day: birthd,
                month: birthm,
                year: birthy
            },
            email: email
            
        });

        console.log("User data saved in Firestore.");
        
        // Show success alert
        alert("Account created successfully!");

        // Reload the page
        location.reload();

    } catch (error) {
        console.error("Error during sign-up:", error);
        alert(`Error: ${error.message}`);
    }
});
