<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Resources\Pages\ViewRecord;

class ViewUser extends ViewRecord
{
    protected static string $resource = UserResource::class;

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\TextEntry::make('name'),
                Infolists\Components\TextEntry::make('email'),
                Infolists\Components\IconEntry::make('is_admin')->boolean(),
                Infolists\Components\IconEntry::make('is_member')->boolean(),
                Infolists\Components\TextEntry::make('membership_code'),
                Infolists\Components\TextEntry::make('membership_from'),
                Infolists\Components\TextEntry::make('membership_until'),
            ]);
    }
}
