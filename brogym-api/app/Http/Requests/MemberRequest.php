<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $member = $this->route('member');
        $userId = $member ? $member->user_id : null;

        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $userId,
            'phone' => 'required|string|max:20',
            'gender' => 'required|in:L,P',
            'birth_date' => 'nullable|date',
            'password' => 'nullable|min:6',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama harus diisi',
            'email.required' => 'Email harus diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah digunakan',
            'phone.required' => 'Nomor telepon harus diisi',
            'gender.required' => 'Gender harus dipilih',
            'gender.in' => 'Gender tidak valid',
            'password.min' => 'Password minimal 6 karakter',
        ];
    }
}