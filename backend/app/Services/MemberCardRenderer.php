<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Barryvdh\Snappy\Facades\SnappyImage as Snappy;

/**
 * Class MemberCardRenderer
 *
 * @package App\Services
 */
class MemberCardRenderer
{
    /**
     * @param User $user
     *
     * @throws \Spatie\Browsershot\Exceptions\CouldNotTakeBrowsershot
     */
    public function render(User $user)
    {
        $cardHtml      = view('member-card', ['user' => $user])->render();
        $cardImagePath = storage_path('app/temp-card-' . $user->id . '.png');

        Snappy::loadHTML($cardHtml)->save($cardImagePath);

        $storagePath = 'public/member_cards';
        $filename    = 'member_card_' . $user->id . '.png';

        Storage::putFileAs($storagePath, $cardImagePath, $filename);

        $url = Storage::url("$storagePath/$filename");

        $user->update(['member_card_path' => $url]);

        unlink($cardImagePath);
    }
}
