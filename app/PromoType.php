<?php

namespace App;

enum PromoType: string
{
    case Percentage = 'percentage';
    case Nominal = 'nominal';
    public function label(): string
    {
        return match ($this) {
            self::Percentage => 'Percentage',
            self::Nominal => 'Nominal',
        };
    }
}
