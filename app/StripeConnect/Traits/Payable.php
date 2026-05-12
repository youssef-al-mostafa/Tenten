<?php

namespace App\StripeConnect\Traits;

use App\StripeConnect\Enums\LinkType;
use App\StripeConnect\Interfaces\StripeConnect;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Stripe\Account;
use Stripe\Balance;
use Stripe\StripeClient;
use Stripe\Transfer;

trait Payable
{
    protected static StripeClient $stripe;

    protected Account $stripe_connect_account;

    protected static function bootPayable()
    {
        static::$stripe = App::make(StripeConnect::class);
    }

    public function createStripeAccount(array $details): self
    {
        $this->stripe_connect_account = static::$stripe->accounts->create($details);

        $this->setStripeAccountId($this->stripe_connect_account->id)->save();

        return $this;
    }

    public function retrieveStripeAccount(): Account
    {
        return $this->stripe_connect_account = static::$stripe->accounts->retrieve($this->getStripeAccountId());
    }

    public function getStripeAccountId()
    {
        return $this->{$this->getStripeAccountIdColumn()};
    }

    public function isStripeAccountActive()
    {
        return $this->{$this->getStripeAccountStatusColumn()};
    }

    public function getStripeAccountLink(LinkType $type = LinkType::Onboarding): string
    {
        $link = static::$stripe->accountLinks->create([
            'account' => $this->getStripeAccountId(),
            'refresh_url' => URL::route(Config::get('stripe_connect.routes.account.refresh')),
            'return_url' => URL::route(Config::get('stripe_connect.routes.account.return')),
            'type' => $type->value,
        ]);

        return $link->url;
    }

    public function transfer($amount, $currency): Transfer
    {
        return static::$stripe->transfers->create([
            'amount' => $amount,
            'currency' => $currency,
            'destination' => $this->getStripeAccountId(),
        ]);
    }

    public function getAccountBalance(): Balance
    {
        return static::$stripe->balance->retrieve([], [
            'stripe_account' => $this->getStripeAccountId(),
        ]);
    }

    public function setStripeAccountStatus($status)
    {
        $this->{$this->getStripeAccountStatusColumn()} = $status;

        return $this;
    }

    protected function getStripeAccountIdColumn()
    {
        return Config::get('stripe_connect.payable.account_id_column');
    }

    protected function setStripeAccountId($id)
    {
        $this->{$this->getStripeAccountIdColumn()} = $id;

        return $this;
    }

    protected function getStripeAccountStatusColumn()
    {
        return Config::get('stripe_connect.payable.account_status_column');
    }
}
