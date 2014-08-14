<?php
  $name = strip_tags($_POST['name']);
  $email = strip_tags($_POST['email']);
  $message = strip_tags($_POST['message']);

  $to = 'vadim@owl-design.net';
  $subject = 'Website Contact Form';

  $body = '<html><body>';
  $body .= '<table rules="all" style="border-color: #fff;" cellpadding="10">';
  $body .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . $name . "</td></tr>";
  $body .= "<tr style='background: #eee;'><td><strong>Email:</strong> </td><td>" . $email . "</td></tr>";
  $body .= "<tr style='background: #eee;'><td><strong>Message:</strong> </td><td>" . $message . "</td></tr>";
  $body .= "</table>";
  $body .= '</body></html>';

  $headers = "From: " . $email . "\r\n";
  $headers .= "Reply-To: ". $email . "\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

  if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
    print "error";
  } else {
    $success = mail($to, $subject, $body, $headers);
    print "success";
    
  }