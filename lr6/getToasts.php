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

// Select data from the database
$sql = "SELECT * FROM toasts";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch data and store in an array
    $toasts = array();
    while ($row = $result->fetch_assoc()) {
        $toasts[] = array('id' => $row['id'], 'title' => $row['title'], 'message' => $row['message']);
    }

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($toasts);
} else {
    // If no data found, send an empty array
    echo json_encode(array());
}

// Close the database connection
$conn->close();
?>
