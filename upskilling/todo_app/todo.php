<?php
require 'db.php';

// Check if the request method is POST and insert the task into the database
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   $data = json_decode(file_get_contents('php://input'), true);
   $user_id = $data['user_id'];
   $task = $data['task'];

// Make a prepared statement to insert the task into the database
    $stmt = $dbh->prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)");
    $stmt->execute([$user_id, $task]);
    // Return a JSON response with the status of the operation
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
   $user_id = $_GET['user_id'];

// Make a prepared statement to select all tasks for the user from the database
   $stmt = $dbh->prepare("SELECT id, task FROM todos WHERE user_id = ?");
   $stmt->execute([$user_id]);

// Fetch all tasks from the database and return them as a JSON response
   $todos = $stmt->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode($todos);
} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
   $id = $_GET['id'];
   $stmt = $dbh->prepare("DELETE FROM todos WHERE id = ?");
   $stmt->execute([$id]);

   echo json_encode(['status' => 'success']);
}
?>
