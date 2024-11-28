// Import the necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app);

// Signup button
const submit = document.getElementById('loginbtn');
submit.addEventListener("click", function (event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('loginemail').value.trim();
    const password = document.getElementById('loginpassword').value.trim();

    // Validate inputs
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Authenticate with Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            alert("Logging in...");

            // Now that the user is authenticated, get the user data from Firestore using their UID
            const userDocRef = doc(db, "Users", user.uid); // Reference to the user's document by UID
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                // User data is available, proceed with redirection
                console.log("User data:", userDocSnapshot.data());

                // Clear email and password fields after successful login
                document.getElementById('loginemail').value = ''; // Clear email input
                document.getElementById('loginpassword').value = ''; // Clear password input

                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                alert("User not found in Firestore.");
            }
        })
        .catch((error) => {
            console.error("Firebase Authentication Error:", error);
            alert("Error during Firebase Authentication: " + error.message);
        });
});
