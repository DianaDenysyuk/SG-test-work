<?php
$url_value = $_POST['url'];
$meta_tags = get_meta_tags($url_value);
$results = ['title' => get_title($url_value)] + $meta_tags;
echo(json_encode($results));

function get_title($url){
  $str = file_get_contents($url);
  if(strlen($str)>0){
    $str = trim(preg_replace('/\s+/', ' ', $str)); // supports line breaks inside <title>
    preg_match("/\<title\>(.*)\<\/title\>/i",$str,$title); // ignore case
    return $title[1];
  }
}
?>
