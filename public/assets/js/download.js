
import { initializeApp } from "firebase/app";
import { getDatabase, ref, transaction, onValue } from "firebase/database";


const firebaseConfig = {
	apiKey: "AIzaSyDd7v1tGWjxQ07pZxu6s_D6Rsi22N3_beA",
	authDomain: "portfolio-site-73209.firebaseapp.com",
	databaseURL: "https://portfolio-site-73209-default-rtdb.firebaseio.com",
	projectId: "portfolio-site-73209",
	storageBucket: "portfolio-site-73209.appspot.com",
	messagingSenderId: "144876923007",
	appId: "1:144876923007:web:a8e90b4e51fd946f8f374a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
	// Reference to the download count in the database
	const database = getDatabase(firebaseApp);
	const downloadCountRef = ref(database, 'downloads');

	// Increment download count when button is clicked
	document.getElementById('downloadButton').addEventListener('click', () => {
		transaction(downloadCountRef, (count) => {
			// Increment the count by 1
			return (count || 0) + 1;
		}).then(() => {
			// Transaction was successful
			console.log("Transaction was successful!");
		}).catch((error) => {
			// Log the error
			console.error("Transaction failed abnormally!", error);
		});
	});

	// Update download count on the page when it changes in the database
	onValue(downloadCountRef, (snapshot) => {
		const count = snapshot.val();
		document.getElementById('downloadCount').textContent = count;
	});
});