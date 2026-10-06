<?php

namespace App\Http\Controllers\Api;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $query = ActivityLog::with('user')->latest();

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }
        if ($request->filled('action')) {
            $query->where('activity', 'like', '%' . $request->action . '%');
        }

        $logs = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data'    => $logs->items(),
            'pagination' => [
                'current_page' => $logs->currentPage(),
                'last_page'    => $logs->lastPage(),
                'per_page'     => $logs->perPage(),
                'total'        => $logs->total(),
            ]
        ]);
    }

    public function show(ActivityLog $activityLog)
    {
        return response()->json([
            'success' => true,
            'data'    => $activityLog->load('user')
        ]);
    }

    public function destroy(ActivityLog $activityLog)
    {
        $activityLog->delete();
        return response()->json(['message' => 'Log berhasil dihapus']);
    }
}