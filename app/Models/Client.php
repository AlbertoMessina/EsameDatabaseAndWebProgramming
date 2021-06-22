<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','name', 'surname', 'birth','description','weight'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function workouts(){
        return $this->hasMany(Workout::class);
    }

    public function followers(){
        return $this->belongsToMany(Client::class,'followers','user_id','follower_id');
    }
}
