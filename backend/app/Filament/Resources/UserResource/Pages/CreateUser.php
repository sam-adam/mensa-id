<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('avatar')
                    ->avatar(),
                TextInput::make('name')
                    ->required()
                    ->live(),
                TextInput::make('email')
                    ->required()
                    ->live(),
                TextInput::make('password')
                    ->required()
                    ->password()
                    ->live(),
                Toggle::make('is_admin'),
                Toggle::make('is_member'),
                TextInput::make('membership_code')
                    ->live(),
                DatePicker::make('membership_from'),
                DatePicker::make('membership_until'),
            ]);
    }
}
