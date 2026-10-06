<?php

namespace App\Http\Controllers\Api\Master;

use App\Models\TrainingProgram;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TrainingProgramController extends Controller
{
    public function index()
    {
        return TrainingProgram::orderBy('code')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:20|unique:training_programs,code',
            'training_name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $training = TrainingProgram::create($request->all());
        return response()->json($training, 201);
    }

    public function show($code)
    {
        $training = TrainingProgram::where('code', $code)->firstOrFail();
        return response()->json($training);
    }

    public function update(Request $request, $code)
    {
        $training = TrainingProgram::where('code', $code)->firstOrFail();

        $request->validate([
            'training_name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $training->update($request->all());
        return response()->json($training);
    }

    public function destroy($code)
    {
        $training = TrainingProgram::where('code', $code)->firstOrFail();
        $training->delete();
        return response()->json(['message' => 'Training program berhasil dihapus']);
    }
}