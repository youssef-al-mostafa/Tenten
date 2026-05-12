<?php

namespace App\Providers;

use App\Services\CartService;
use App\StripeConnect\Interfaces\StripeConnect;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Stripe\StripeClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(CartService::class, function () {
            return new CartService();
        });

        $this->app->singleton(StripeConnect::class, function () {
            return new StripeClient(Config::get('stripe_connect.stripe.secret'));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schedule::command('payout:vendors')
                  ->monthlyOn(1,'00:00')
                  ->withoutOverlapping();
        Vite::prefetch(concurrency: 3);
    }
}
