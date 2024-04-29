<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   $data = json_decode(file_get_contents('php://input'), true);
   $username = $data['username'];
   $password = password_hash($data['password'], PASSWORD_DEFAULT);

   $stmt = $dbh->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
   $stmt->execute([$username, $password]);

   echo json_encode(['status' => 'success']);
}
?>
