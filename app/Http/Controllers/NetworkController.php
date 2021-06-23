<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Workout;
use App\Models\Follower;
use App\Models\Client;

class NetworkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $id = Auth::user()->id;
        $queryBuilder = Workout::join('clients', 'clients.user_id', '=', 'workouts.client_id')->select('clients.user_id', 'clients.name', 'clients.surname', 'clients.url');
        $queryBuilder->where('workouts.public', '1')->where('workouts.client_id', '!=', $id)->groupBy('clients.user_id');
        $queryBuilder->whereNotIn('workouts.client_id', function ($query) {
            $id = Auth::user()->id;
            $query->select('follower_id')
                ->from('followers')
                ->where('user_id', $id);
        });
        $publicUsers = $queryBuilder->get();
        
        $queryBuilder = CLIENT::join('followers', 'followers.follower_id', '=', 'clients.user_id')->join('workouts', 'workouts.client_id', '=' , 'followers.follower_id');
        $queryBuilder->select('clients.user_id', 'clients.name', 'clients.surname', 'clients.url');
        $queryBuilder->where('workouts.public', '1')->where('followers.user_id', $id);
        $queryBuilder->groupBy('clients.user_id');
  
        $follwerUsers = $queryBuilder->get();
        return view('network')->with('publicUsers', $publicUsers)->with('follwerUsers' , $follwerUsers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getPublicResource($id)
    {
        $queryBuilder = WORKOUT::WHERE('client_id', $id)->WHERE('public', '1');
        $workouts = $queryBuilder->get();
        return response()->json(array('success' => true, 'workouts' => $workouts), 200);
    }
    public function newFollower($id)
    {
        $user_id =  Auth::user()->id;
        $follower_id = $id;

        $follower = new follower();
        $follower->follower_id = $follower_id;
        $follower->user_id = $user_id;
        $res = $follower->save();
        return response()->json(array('success' => true, 'res' => $res), 200);
    }

    public function unfollow($id){
        $user = Auth::user();
        $client = $user->client;

        // $queryBuilder = FOLLOWER::where('user_id', AUTH::user()->id)->where('follower_id', $id);
         $res = $client->followers()->detach($id);

       return response()->json(array('success' => true, 'res' => $res) , 200);
    }
}
