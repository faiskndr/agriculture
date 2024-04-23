<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegionSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $regions = [['01', 'CILACAP'], ['02', 'BANYUMAS'], ['03', 'PURBALINGGA'], ['04', 'BANJARNEGARA'], ['05', 'KEBUMEN'], ['06', 'PURWOREJO'], ['07', 'WONOSOBO'], ['08', 'MAGELANG'], ['09', 'BOYOLALI'], ['10', 'KLATEN'], ['11', 'SUKOHARJO'], ['12', 'WONOGIRI'], ['13', 'KARANGANYAR'], ['14', 'SRAGEN'], ['15', 'GROBOGAN'], ['16', 'BLORA'], ['17', 'REMBANG'], ['18', 'PATI'], ['19', 'KUDUS'], ['20', 'JEPARA'], ['21', 'DEMAK'], ['22', 'SEMARANG'], ['23', 'TEMANGGUNG'], ['24', 'KENDAL'], ['25', 'BATANG'], ['26', 'PEKALONGAN'], ['27', 'PEMALANG'], ['28', 'TEGAL'], ['29', 'BREBES']];

        foreach ($regions as $region) {

            Region::create([
                'id' => $region[0],
                'name' => $region[1],
            ]);
        }
    }
}
