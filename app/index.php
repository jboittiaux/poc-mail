<?php

phpinfo();
exit;

require __DIR__ . '/vendor/autoload.php';

$queue = 'testMail';
$rabbit = \PhpAmqpLib\Connection\AMQPStreamConnection(
    'docker.gal.local',
    25672,
    'rabbit',
    'R4bbi7MQ',
);
$channel = $rabbit->channel();
$channel->queue_declare($queue, false, true, false, false);

$data = [
    'meta' => [
        'vendor' => 'poc-mail',
        'mailId' => 'test',
        'environment' => 'dev',
    ],
    'payload' => [
        'from' => 'test@poc-mail.com',
        'to' => 'jean@lbcd.fr',
        'attachments' => [
            base64_encode(__FILE__),
        ],
        'vars' => [
            'foo' => 'bar',
        ],
    ],
];

$message = new \PhpAmqpLib\Message\AMQPMessage(json_encode($data));
$channel->basic_publish($message, '', $data);