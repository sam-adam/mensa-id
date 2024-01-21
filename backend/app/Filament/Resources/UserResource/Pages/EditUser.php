<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('profile_picture_path')
                    ->avatar()
                    ->image()
                    ->imageEditor()
                    ->circleCropper(),
                TextInput::make('name')
                    ->required()
                    ->live(),
                TextInput::make('email')
                    ->required()
                    ->live(),
                TextInput::make('password')
                    ->password()
                    ->dehydrateStateUsing(fn (string $state): string => Hash::make($state))
                    ->dehydrated(fn (?string $state): bool => filled($state)),
                Toggle::make('is_admin'),
                Toggle::make('is_member'),
                TextInput::make('membership_code')
                    ->live(),
                DatePicker::make('membership_from'),
                DatePicker::make('membership_until'),
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
