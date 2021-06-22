<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExerciseUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'update_id' => 'required|numeric|exists:exercises,id',
            'update_name' => 'required|unique:exercises,name',
            'update_difficulty' => 'required|between:0,5'
        ];
    }
}
