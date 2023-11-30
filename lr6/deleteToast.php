<?php
// Connection parameters
$servername = "localhost";
$username = "id21600762_user_kateserh";
$password = "hgjTY-js5";
$dbname = "id21600762_toastsbd";

// Створення з'єднання з базою даних
$conn = new mysqli($servername, $username, $password, $dbname);

// Перевірка з'єднання
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$toastId = $_GET['id'];

// Запит для видалення тосту з бази даних
$sql = "DELETE FROM toasts WHERE id = $toastId";

if ($conn->query($sql) === TRUE) {
    // Відправлення JSON-відповіді про успішне видалення
    header('Content-Type: application/json');
    echo json_encode(array('status' => 'success', 'message' => 'Toast deleted successfully'));
} else {
    // Відправлення JSON-відповіді про помилку видалення
    header('Content-Type: application/json');
    echo json_encode(array('status' => 'error', 'message' => 'Error deleting toast: ' . $conn->error));
}

$conn->close();
?>
