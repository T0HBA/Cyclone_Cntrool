<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = file_get_contents('php://input');
  $visitorInfo = json_decode($data, true);
  
  $file = fopen("info.txt", "a");
  
  fwrite($file, "IP: " . $visitorInfo['ip'] . "\n");
  fwrite($file, "Country Code: " . $visitorInfo['country_code'] . "\n");
  fwrite($file, "Country Name: " . $visitorInfo['country_name'] . "\n");
  fwrite($file, "Region Code: " . $visitorInfo['region_code'] . "\n");
  fwrite($file, "Region Name: " . $visitorInfo['region_name'] . "\n");
  fwrite($file, "City: " . $visitorInfo['city'] . "\n");
  fwrite($file, "Zip Code: " . $visitorInfo['zip_code'] . "\n");
  fwrite($file, "Time Zone: " . $visitorInfo['time_zone'] . "\n");
  fwrite($file, "Latitude: " . $visitorInfo['latitude'] . "\n");
  fwrite($file, "Longitude: " . $visitorInfo['longitude'] . "\n");
  fwrite($file, "Metro Code: " . $visitorInfo['metro_code'] . "\n");
  fwrite($file, "Screen Width: " . $visitorInfo['screen_width'] . "\n");
  fwrite($file, "Screen Height: " . $visitorInfo['screen_height'] . "\n");
  
  fwrite($file, "Operating System: " . $_SERVER['HTTP_USER_AGENT'] . "\n");

  fclose($file);

  echo "Visitor information received and saved.";
} else {
	
  header('HTTP/1.1 400 Bad Request');
  echo "Error: Invalid request.";
}
?>
