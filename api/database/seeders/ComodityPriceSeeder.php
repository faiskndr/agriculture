<?php

namespace Database\Seeders;

use App\Models\ComodityPrice;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComodityPriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 66; $i++) {
            ComodityPrice::create([
                'comodity_type_id' => 2,
                'price' => rand(8000, 12000),
                'created_at' => Carbon::parse('2023-11-03')->addDay($i),
                'updated_at' => Carbon::parse('2023-11-03')->addDay($i),
            ]);
        }
    }
}
