<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecommendationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'code' => $this->code,
            'recommendation_name' => $this->recommendation_name,
            'description' => $this->description,
            'details' => RecommendationDetailResource::collection($this->whenLoaded('details')),
            'meal_plans' => $this->whenLoaded('mealPlans', function () {
                return $this->mealPlans->map(fn($m) => [
                    'code' => $m->code,
                    'name' => $m->meal_name,
                    'description' => $m->description,
                    'calories' => $m->calories,
                ]);
            }),
            'training_programs' => $this->whenLoaded('trainingPrograms', function () {
                return $this->trainingPrograms->map(fn($t) => [
                    'code' => $t->code,
                    'name' => $t->training_name,
                    'description' => $t->description,
                ]);
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}