<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ActivityLogMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }

    public function terminate($request, $response): void
    {
        try {
            $user = Auth::user();
            if ($user) {
                ActivityLog::create([
                    'user_id' => $user->id,
                    'activity' => $request->route()?->getActionName() ?? $request->method() . ' ' . $request->path(),
                ]);
            }
        } catch (\Exception $e) {
            Log::error('ActivityLogMiddleware error: ' . $e->getMessage());
        }
    }
}