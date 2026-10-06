<?php

namespace App\Http\Controllers\Api\Master;

use App\Models\MealPlan;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MealPlanController extends Controller
{
    public function index()
    {
        return MealPlan::orderBy('code')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:20|unique:meal_plans,code',
            'meal_name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'calories' => 'nullable|integer',
        ]);

        $meal = MealPlan::create($request->all());
        return response()->json($meal, 201);
    }

    public function show($code)
    {
        $meal = MealPlan::where('code', $code)->firstOrFail();
        return response()->json($meal);
    }

    public function update(Request $request, $code)
    {
        $meal = MealPlan::where('code', $code)->firstOrFail();

        $request->validate([
            'meal_name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'calories' => 'nullable|integer',
        ]);

        $meal->update($request->all());
        return response()->json($meal);
    }

    public function destroy($code)
    {
        $meal = MealPlan::where('code', $code)->firstOrFail();
        $meal->delete();
        return response()->json(['message' => 'Meal plan berhasil dihapus']);
    }
}