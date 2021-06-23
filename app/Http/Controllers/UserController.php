<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Client;

class UserController extends Controller
{
   public function index()
   {

      $user = Auth::user();
      $client = $user->client()->get();
      return view('userProfile')->with('client',$client);
   }

   public function findUserEmail(Request $request)
   {
      $request->all();
      $email = $request->mail;
      $queryBuilder = User::where('email', $email);
      $result = $queryBuilder->get()->count();
      $find = false;
      if ($result > 0) {
         //find user
         $find = true;
      }
      return response()->json(['find' => $find], 200);
   }

   public function update(Request $request)
   {
      $request->all();
      $id = $request->user_id;
      $user = Auth::user();
      $client = $user->client;

      $client->name = $request->name;
      $client->surname = $request->surname;
      $client->birth = $request->birth;
      $client->weight = $request->weight;
      $client->description = $request->description;
      $res = $client->save();
      if ($res) {
         //Check if path it's

         $this->processFile($id, $request, $client);
      }
      return response()->json(array('success' => true, 'res' => $res, 'client' => $client));
   }


   public function processFile($id, Request $request, &$client): bool
   {
      if (!$request->hasFile('img_path')) {
         return false;
      }

      $file = $request->file('img_path');

      if (!$file->isValid()) {
         return false;
      }
      $this->removeFile($id);
      $fileName = '/' . $id . '.' . $file->extension();
      $file->storeAs(env('IMG_USER_DIR'), $fileName, 'public');
      $client->url = env('IMG_USER_DIR') . $fileName;
      $client->save();
      return true;
   }



   public function removeFile($id)
   {
      $disk = config('filesystems.default');
      $user = Auth::user();
      $client = $user->client;
      $img = $client->url;
      if ($img && Storage::disk($disk)->exists($img)) {
         Storage::disk($disk)->delete($img);
      }
      Storage::deleteDirectory(env('IMG_USER_DIR') . '/' . $id);
   }
}
