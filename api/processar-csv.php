<?php
header('content-type:applcation/json');
function csvToJson($tmp_file_name)
{
    $csv = array_map('str_getcsv', file($tmp_file_name));
    array_walk($csv, function (&$a) use ($csv) {
        $a = array_combine($csv[0], $a);
    });
    return json_encode($csv);
}
$tmp_file_name = $_FILES['file']['tmp_name'];
echo csvToJson($tmp_file_name);
