<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
// require 'vendor/autoload.php';
// require './php/phpmailer/src/Exception.php';
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                     
    $mail->isSMTP();                                           
    $mail->Host       = 'smtp.gmail.com';                    
    $mail->SMTPAuth   = true;                                  
    $mail->Username   = 'sramanayaka222';                    
    $mail->Password   = 'Suresh1999';                              
    $mail->SMTPSecure = 'tls';           
    $mail->Port       = 587;                                    

    //Recipients
    $mail->setFrom('foodcentric@example.com', 'Food Centric');
    $mail->addAddress($_POST['email'], '');     

    //Content
    $mail->isHTML(true);                                  
    $mail->Subject = 'Your Favorite list from food centric ';
    $mail->Body    = $_POST['data'];

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}