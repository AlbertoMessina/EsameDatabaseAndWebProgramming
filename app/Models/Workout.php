<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    public function exercises(){
        return $this->belongsToMany(Exercise::class,'Exercise_lists')->withPivot('repetition', 'series'); 
    }
 
    public function client(){
        return $this->belongsTo(Client::class);
    }
}
