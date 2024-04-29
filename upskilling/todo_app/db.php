<?php
$host = "webdev.aut.ac.nz";
$user = "ngd3273"; // your user name
$pswd = "cfqbbhbgvkpeckohuojkdmttagoqumqfh"; // your password
$dbnm = "ngd3273"; // your database

try {
   $dbh = new PDO($host, $user, $pswd);
} catch (PDOException $e) {
   die("Error: " . $e->getMessage());
}
?>
