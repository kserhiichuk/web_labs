<?php
// Connection parameters
$servername = "localhost";
$username = "id21600762_user_kateserh";
$password = "hgjTY-js5";
$dbname = "id21600762_toastsbd";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Decode JSON data sent from the client
$data = json_decode(file_get_contents("php://input"), true);

// Extract data from the decoded JSON
$title = $data['title'];
$message = $data['message'];

// Insert data into the database
$sql = "INSERT INTO toasts (title, message) VALUES ('$title', '$message')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('status' => 'success', 'message' => 'Toast data saved successfully'));
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Error saving Toast data: ' . $conn->error));
}

// Close the database connection
$conn->close();
?>
