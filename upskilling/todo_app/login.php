<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   $data = json_decode(file_get_contents('php://input'), true);
   $username = $data['username'];
   $password = $data['password'];

   $stmt = $dbh->prepare("SELECT id, password FROM users WHERE username = ?");
   $stmt->execute([$username]);
   $user = $stmt->fetch();

   if ($user && password_verify($password, $user['password'])) {
       echo json_encode(['status' => 'success', 'user_id' => $user['id']]);
   } else {
       echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
   }
}
?>
