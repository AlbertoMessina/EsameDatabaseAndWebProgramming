<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
   public function workouts(){
       return $this->belongsToMany(Workout::class,'Exercise_lists')->withPivot('repetition', 'series'); 
   }

   public function photos(){
      return $this->hasMany(Photo::class);
   }

}
