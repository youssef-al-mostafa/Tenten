<?php

return [
    'stripe' => [
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'routes' => [
        'account' => [
            'refresh' => 'stripe-connect.refresh',
            'return' => 'stripe-connect.return',
            'complete' => 'home',
        ],
    ],

    'payable' => [
        'account_id_column' => 'stripe_account_id',
        'account_status_column' => 'stripe_account_active',
    ],
];
