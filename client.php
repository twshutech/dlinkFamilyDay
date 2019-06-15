<?php
	mysql_connect("sql105.byethost18.com","b18_19151360","8bcfb9e7");
	mysql_select_db("b18_19151360_connect1");
	mysql_query("set names utf8");
 date_default_timezone_set("Asia/Taipei");//set timezone


 $guestid=$_POST['guestid'];
 $guestname=$_POST['name'];
 $guestemail=$_POST['email'];
 $guesttype=$_POST['type'];
 $guestcontent=$_POST['budget'];
 $time=date("Y:m:d H:i:s ", time()+28800);




if(isset($_POST['guestname'])){  //if guestname isn't null , then updata to database

mysql_query("INSERT INTO guest (guestid, guestname, guestemail,guesttype,guesttime , guestcontent)
VALUES ('', '$guestname', '$guestemail','$guesttype','$time','$guestcontent')");
}
 ?>