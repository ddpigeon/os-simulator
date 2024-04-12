<?php

$content = $_POST['content'];

$filename = 'file.txt';

if (isset($content)) {
  $handle = fopen($filename, 'a'); // Open for writing, overwriting existing content
  if ($handle) {
    fwrite($handle, $content);
    fclose($handle);
    echo "Data written successfully!";
  } else {
    echo "Error opening file for writing.";
  }
} else {
  echo "No data received.";
}
?>