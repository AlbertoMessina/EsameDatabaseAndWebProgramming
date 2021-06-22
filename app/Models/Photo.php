<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    public function exercise(){
        return $this->belongsTo('app\Models\Exercise');
    }
}
