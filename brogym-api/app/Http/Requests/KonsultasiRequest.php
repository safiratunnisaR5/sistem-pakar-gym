<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KonsultasiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tinggi_badan' => 'required|numeric|min:50|max:250',
            'berat_badan' => 'required|numeric|min:20|max:300',
            'aktivitas_olahraga' => 'required|in:jarang,sering',
            'pola_makan_harian' => 'required|in:tidak_teratur,sehat',
            'level_latihan' => 'required|in:pemula,menengah,lanjutan',
            'tujuan_id' => 'required|exists:tujuan,id',
            'penyakit_ids' => 'nullable|array',
            'penyakit_ids.*' => 'exists:penyakit,id',
            'penyakit_custom' => 'nullable|array',
            'penyakit_custom.*' => 'nullable|string|max:255',
            'user_cf' => 'nullable|numeric|min:0|max:1',
        ];
    }

    public function messages(): array
    {
        return [
            'tujuan_id.required' => 'Tujuan harus dipilih',
            'tujuan_id.exists' => 'Tujuan tidak valid',
            'tinggi_badan.required' => 'Tinggi badan harus diisi',
            'tinggi_badan.min' => 'Tinggi badan minimal 50 cm',
            'tinggi_badan.max' => 'Tinggi badan maksimal 250 cm',
            'berat_badan.required' => 'Berat badan harus diisi',
            'berat_badan.min' => 'Berat badan minimal 20 kg',
            'berat_badan.max' => 'Berat badan maksimal 300 kg',
            'aktivitas_olahraga.required' => 'Aktivitas olahraga harus dipilih',
            'aktivitas_olahraga.in' => 'Aktivitas olahraga tidak valid',
            'pola_makan_harian.required' => 'Pola makan harus dipilih',
            'pola_makan_harian.in' => 'Pola makan tidak valid',
            'level_latihan.required' => 'Level latihan harus dipilih',
            'level_latihan.in' => 'Level latihan tidak valid',
            'user_cf.min' => 'CF User minimal 0',
            'user_cf.max' => 'CF User maksimal 1',
        ];
    }
}