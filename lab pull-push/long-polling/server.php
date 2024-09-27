<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');


$data_recievd = json_encode($_GET);



$client_time = $_GET['lastModified'];

$file_time = filemtime('mycv.txt');


while ($client_time >= $file_time) {
    sleep(1);
    clearstatcache();
    $file_time =filemtime('mycv.txt');

}


$file_content = file_get_contents('mycv.txt');
$message = [
    'data'=>$file_content,
    'client_time'=>$client_time,
    'server_time'=>$file_time
];

echo json_encode($message);
