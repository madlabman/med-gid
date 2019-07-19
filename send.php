<?php

// TODO: Remove!
header("Access-Control-Allow-Origin: *");

require_once "./vendor/PHPMailer.php";
require_once "./vendor/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
try {
    //Recipients
    $mail->setFrom('med-gid.rf@yandex.ru', 'Форма обратной связи');
    $mail->addAddress('med-gid.rf@yandex.ru');     // Add a recipient

    // Content
    $mail->isHTML(false);                                  // Set email format to HTML
    $mail->Subject = 'Контактные данные с сайта';
    $mail->Body    = 'Имя: ' . $_POST['name'] . '; Номер телефона: ' . $_POST['phone'];

    $mail->send();
    echo 1;
} catch (Exception $e) {
    echo 0;
}