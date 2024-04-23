<?php

namespace Database\Seeders;

use App\Models\ComodityType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComodityTypeSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comodity = ['Gabah', 'Beras', 'Kakao', 'Rumput Laut', 'Kopi'];

        foreach ($comodity as $com) {
            ComodityType::create([
                'name' => $com
            ]);
        }
    }
}
