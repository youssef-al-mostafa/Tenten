<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['name' => 'Men',        'slug' => 'men',        'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Women',      'slug' => 'women',      'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Accessories','slug' => 'accessories','active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Children',   'slug' => 'children',   'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Sports Wear','slug' => 'sports-wear','active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Footwear',   'slug' => 'footwear',   'active' => true, 'created_at' => now(), 'updated_at' => now()],
        ];

        // insertOrIgnore is idempotent — skips rows that violate the unique slug constraint
        DB::table('departments')->insertOrIgnore($departments);
    }
}
