<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Guard: skip if already seeded (categories have no unique constraint to rely on)
        if (DB::table('categories')->exists()) {
            $this->command->info('Categories already seeded, skipping.');
            return;
        }

        // Resolve IDs dynamically — never hardcode auto-increment IDs
        $deptId = fn(string $slug) => DB::table('departments')->where('slug', $slug)->value('id');

        $men      = $deptId('men');
        $women    = $deptId('women');

        $now = now();

        $categories = [
            // Men
            ['name' => 'Tops',       'department_id' => $men,   'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Shirts',     'department_id' => $men,   'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Bottoms',    'department_id' => $men,   'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Pants',      'department_id' => $men,   'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Shorts',     'department_id' => $men,   'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Suits',      'department_id' => $men,   'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'UnderWear',  'department_id' => $men,   'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Women
            ['name' => 'Dresses',           'department_id' => $women, 'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Tops & Blouses',    'department_id' => $women, 'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Bottoms',           'department_id' => $women, 'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Pants',             'department_id' => $women, 'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Skirts',            'department_id' => $women, 'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Outerwear',         'department_id' => $women, 'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Lingerie & Sleepwear', 'department_id' => $women, 'parent_id' => null, 'Active' => true, 'created_at' => $now, 'updated_at' => $now],
        ];

        DB::table('categories')->insert($categories);
    }
}
