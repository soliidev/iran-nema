<?php

namespace Database\Seeders;

use App\Models\Province;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = $this->getData();

        Province::query()->insert($data);
    }

    private function getData(): array
    {
        $now = Carbon::now();

        return [
            [
                'id' => 1,
                'code' => 'az-east',
                'name' => 'آذربایجان شرقی',
                'latitude' => '37.90357330',
                'longitude' => '46.26821090',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 2,
                'code' => 'az-west',
                'name' => 'آذربایجان غربی',
                'latitude' => '37.45500620',
                'longitude' => '45.00000000',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 3,
                'code' => 'ardabil',
                'name' => 'اردبیل',
                'latitude' => '38.48532760',
                'longitude' => '47.89112090',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 4,
                'code' => 'isfahan',
                'name' => 'اصفهان',
                'latitude' => '32.65462750',
                'longitude' => '51.66798260',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 5,
                'code' => 'alborz',
                'name' => 'البرز',
                'latitude' => '35.99604670',
                'longitude' => '50.92892460',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 6,
                'code' => 'ilam',
                'name' => 'ایلام',
                'latitude' => '33.29576180',
                'longitude' => '46.67053400',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 7,
                'code' => 'bushehr',
                'name' => 'بوشهر',
                'latitude' => '28.92338370',
                'longitude' => '50.82031400',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 8,
                'code' => 'tehran',
                'name' => 'تهران',
                'latitude' => '35.69611100',
                'longitude' => '51.42305600',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 9,
                'code' => 'chahar-mahal',
                'name' => 'چهارمحال و بختیاری',
                'latitude' => '31.96143480',
                'longitude' => '50.84563230',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 10,
                'code' => 'khorasan-south',
                'name' => 'خراسان جنوبی',
                'latitude' => '32.51756430',
                'longitude' => '59.10417580',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 11,
                'code' => 'khorasan-razavi',
                'name' => 'خراسان رضوی',
                'latitude' => '35.10202530',
                'longitude' => '59.10417580',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 12,
                'code' => 'khorasan-north',
                'name' => 'خراسان شمالی',
                'latitude' => '37.47103530',
                'longitude' => '57.10131880',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 13,
                'code' => 'khuzestan',
                'name' => 'خوزستان',
                'latitude' => '31.43601490',
                'longitude' => '49.04131200',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 14,
                'code' => 'zanjan',
                'name' => 'زنجان',
                'latitude' => '36.50181850',
                'longitude' => '48.39881860',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 15,
                'code' => 'semnan',
                'name' => 'سمنان',
                'latitude' => '35.22555850',
                'longitude' => '54.43421380',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 16,
                'code' => 'sistan',
                'name' => 'سیستان و بلوچستان',
                'latitude' => '27.52999060',
                'longitude' => '60.58206760',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 17,
                'code' => 'fars',
                'name' => 'فارس',
                'latitude' => '29.10438130',
                'longitude' => '53.04589300',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 18,
                'code' => 'qazvin',
                'name' => 'قزوین',
                'latitude' => '36.08813170',
                'longitude' => '49.85472660',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 19,
                'code' => 'qom',
                'name' => 'قم',
                'latitude' => '34.63994430',
                'longitude' => '50.87594190',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 20,
                'code' => 'kurdistan',
                'name' => 'كردستان',
                'latitude' => '35.95535790',
                'longitude' => '47.13621250',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 21,
                'code' => 'kerman',
                'name' => 'كرمان',
                'latitude' => '30.28393790',
                'longitude' => '57.08336280',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 22,
                'code' => 'kermanshah',
                'name' => 'كرمانشاه',
                'latitude' => '34.31416700',
                'longitude' => '47.06500000',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 23,
                'code' => 'kohgiluyeh',
                'name' => 'کهگیلویه و بویراحمد',
                'latitude' => '30.65094790',
                'longitude' => '51.60525000',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 24,
                'code' => 'golestan',
                'name' => 'گلستان',
                'latitude' => '37.28981230',
                'longitude' => '55.13758340',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 25,
                'code' => 'gilan',
                'name' => 'گیلان',
                'latitude' => '37.11716170',
                'longitude' => '49.52799960',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 26,
                'code' => 'lorestan',
                'name' => 'لرستان',
                'latitude' => '33.58183940',
                'longitude' => '48.39881860',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 27,
                'code' => 'mazandaran',
                'name' => 'مازندران',
                'latitude' => '36.22623930',
                'longitude' => '52.53186040',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 28,
                'code' => 'markazi',
                'name' => 'مركزی',
                'latitude' => '33.50932940',
                'longitude' => '-92.39611900',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 29,
                'code' => 'hormozgan',
                'name' => 'هرمزگان',
                'latitude' => '27.13872300',
                'longitude' => '55.13758340',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 30,
                'code' => 'hamadan',
                'name' => 'همدان',
                'latitude' => '34.76079990',
                'longitude' => '48.39881860',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 31,
                'code' => 'yazd',
                'name' => 'یزد',
                'latitude' => '32.10063870',
                'longitude' => '54.43421380',
                'created_at' => $now,
                'updated_at' => $now
            ],
        ];
    }
}
