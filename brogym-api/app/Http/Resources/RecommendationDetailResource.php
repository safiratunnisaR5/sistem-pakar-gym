<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecommendationDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'meal_plan' => $this->mealPlan ? [
                'code' => $this->mealPlan->code,
                'name' => $this->mealPlan->meal_name,
                'description' => $this->mealPlan->description,
                'calories' => $this->mealPlan->calories,
            ] : null,
            'training_program' => $this->trainingProgram ? [
                'code' => $this->trainingProgram->code,
                'name' => $this->trainingProgram->training_name,
                'description' => $this->trainingProgram->description,
            ] : null,
        ];
    }
}