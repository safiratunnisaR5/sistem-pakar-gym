<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RuleDetail;

class RuleDetailSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // ================================================================
            // TAHAP 1: Kondisi → Fakta (R1-R27)
            // ================================================================
            // R1: K1,K4,K6,K8 → F1
            ['rule_code' => 'R1', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R1', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R1', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R1', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R2: K1,K4,K6,K9 → F2
            ['rule_code' => 'R2', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R2', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R2', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R2', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R3: K1,K4,K6,K10 → F3
            ['rule_code' => 'R3', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R3', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R3', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R3', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R4: K1,K5,K6,K8 → F4
            ['rule_code' => 'R4', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R4', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R4', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R4', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R5: K1,K5,K6,K9 → F5
            ['rule_code' => 'R5', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R5', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R5', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R5', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R6: K1,K5,K6,K10 → F6
            ['rule_code' => 'R6', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R6', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R6', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R6', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R7: K1,K5,K7,K8 → F7
            ['rule_code' => 'R7', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R7', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R7', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R7', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R8: K1,K5,K7,K9 → F8
            ['rule_code' => 'R8', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R8', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R8', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R8', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R9: K1,K5,K7,K10 → F9
            ['rule_code' => 'R9', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R9', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R9', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R9', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R10: K2,K5,K7,K8 → F10
            ['rule_code' => 'R10', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R10', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R10', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R10', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R11: K2,K5,K7,K9 → F11
            ['rule_code' => 'R11', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R11', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R11', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R11', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R12: K2,K5,K7,K10 → F12
            ['rule_code' => 'R12', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R12', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R12', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R12', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R13: K2,K4,K7,K8 → F13
            ['rule_code' => 'R13', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R13', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R13', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R13', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R14: K2,K4,K7,K9 → F14
            ['rule_code' => 'R14', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R14', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R14', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R14', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R15: K2,K4,K7,K10 → F15
            ['rule_code' => 'R15', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R15', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R15', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R15', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R16: K3,K4,K6,K8 → F16
            ['rule_code' => 'R16', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R16', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R16', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R16', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R17: K3,K4,K6,K9 → F17
            ['rule_code' => 'R17', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R17', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R17', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R17', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R18: K3,K4,K6,K10 → F18
            ['rule_code' => 'R18', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R18', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R18', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R18', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R19: K3,K5,K6,K8 → F19
            ['rule_code' => 'R19', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R19', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R19', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R19', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R20: K3,K5,K6,K9 → F20
            ['rule_code' => 'R20', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R20', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R20', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R20', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R21: K3,K5,K6,K10 → F21
            ['rule_code' => 'R21', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R21', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R21', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R21', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R22: K3,K5,K7,K8 → F22
            ['rule_code' => 'R22', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R22', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R22', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R22', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R23: K3,K5,K7,K9 → F23
            ['rule_code' => 'R23', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R23', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R23', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R23', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R24: K3,K5,K7,K10 → F24
            ['rule_code' => 'R24', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R24', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R24', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R24', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R25: K2,K4,K6,K8 → F25
            ['rule_code' => 'R25', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R25', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R25', 'condition_code' => 'K6', 'cf_expert' => 0.9],
            ['rule_code' => 'R25', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R26: K2,K4,K6,K9 → F26
            ['rule_code' => 'R26', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R26', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R26', 'condition_code' => 'K6', 'cf_expert' => 0.9],
            ['rule_code' => 'R26', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R27: K2,K4,K6,K10 → F27
            ['rule_code' => 'R27', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R27', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R27', 'condition_code' => 'K6', 'cf_expert' => 0.9],
            ['rule_code' => 'R27', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // ================================================================
            // TAHAP 2: RuleDetail untuk R28 - R78 (Mengikuti kondisi dari Fact)
            // ================================================================
            // R28: F1 + T1 → R1 (K1,K4,K6,K8)
            ['rule_code' => 'R28', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R28', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R28', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R28', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R29: F2 + T1 → R1 (K1,K4,K6,K9)
            ['rule_code' => 'R29', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R29', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R29', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R29', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R30: F3 + T1 → R1 (K1,K4,K6,K10)
            ['rule_code' => 'R30', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R30', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R30', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R30', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R31: F4 + T1 → R1 (K1,K5,K6,K8)
            ['rule_code' => 'R31', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R31', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R31', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R31', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R32: F4 + T4 → R4 (K1,K5,K6,K8)
            ['rule_code' => 'R32', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R32', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R32', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R32', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R33: F5 + T1 → R1 (K1,K5,K6,K9)
            ['rule_code' => 'R33', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R33', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R33', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R33', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R34: F5 + T4 → R4 (K1,K5,K6,K9)
            ['rule_code' => 'R34', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R34', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R34', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R34', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R35: F6 + T1 → R1 (K1,K5,K6,K10)
            ['rule_code' => 'R35', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R35', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R35', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R35', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R36: F6 + T4 → R4 (K1,K5,K6,K10)
            ['rule_code' => 'R36', 'condition_code' => 'K1', 'cf_expert' => 0.9],
            ['rule_code' => 'R36', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R36', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R36', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R37: F7 + T1 → R1 (K1,K5,K7,K8)
            ['rule_code' => 'R37', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R37', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R37', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R37', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R38: F7 + T3 → R3 (K1,K5,K7,K8)
            ['rule_code' => 'R38', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R38', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R38', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R38', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R39: F7 + T4 → R4 (K1,K5,K7,K8)
            ['rule_code' => 'R39', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R39', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R39', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R39', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R40: F8 + T1 → R1 (K1,K5,K7,K9)
            ['rule_code' => 'R40', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R40', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R40', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R40', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R41: F8 + T3 → R3 (K1,K5,K7,K9)
            ['rule_code' => 'R41', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R41', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R41', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R41', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R42: F8 + T4 → R4 (K1,K5,K7,K9)
            ['rule_code' => 'R42', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R42', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R42', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R42', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R43: F9 + T1 → R1 (K1,K5,K7,K10)
            ['rule_code' => 'R43', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R43', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R43', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R43', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R44: F9 + T3 → R3 (K1,K5,K7,K10)
            ['rule_code' => 'R44', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R44', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R44', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R44', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R45: F9 + T4 → R4 (K1,K5,K7,K10)
            ['rule_code' => 'R45', 'condition_code' => 'K1', 'cf_expert' => 0.8],
            ['rule_code' => 'R45', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R45', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R45', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R46: F10 + T2 → R6 (K2,K5,K7,K8)
            ['rule_code' => 'R46', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R46', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R46', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R46', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R47: F10 + T3 → R3 (K2,K5,K7,K8)
            ['rule_code' => 'R47', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R47', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R47', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R47', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R48: F10 + T4 → R4 (K2,K5,K7,K8)
            ['rule_code' => 'R48', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R48', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R48', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R48', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R49: F11 + T2 → R6 (K2,K5,K7,K9)
            ['rule_code' => 'R49', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R49', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R49', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R49', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R50: F11 + T3 → R3 (K2,K5,K7,K9)
            ['rule_code' => 'R50', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R50', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R50', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R50', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R51: F11 + T4 → R4 (K2,K5,K7,K9)
            ['rule_code' => 'R51', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R51', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R51', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R51', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R52: F12 + T2 → R6 (K2,K5,K7,K10)
            ['rule_code' => 'R52', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R52', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R52', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R52', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R53: F12 + T3 → R3 (K2,K5,K7,K10)
            ['rule_code' => 'R53', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R53', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R53', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R53', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R54: F12 + T4 → R4 (K2,K5,K7,K10)
            ['rule_code' => 'R54', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R54', 'condition_code' => 'K5', 'cf_expert' => 0.9],
            ['rule_code' => 'R54', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R54', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R55: F13 + T3 → R3 (K2,K4,K7,K8)
            ['rule_code' => 'R55', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R55', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R55', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R55', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R56: F14 + T3 → R3 (K2,K4,K7,K9)
            ['rule_code' => 'R56', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R56', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R56', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R56', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R57: F15 + T3 → R3 (K2,K4,K7,K10)
            ['rule_code' => 'R57', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R57', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R57', 'condition_code' => 'K7', 'cf_expert' => 0.8],
            ['rule_code' => 'R57', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R58: F16 + T2 → R2 (K3,K4,K6,K8)
            ['rule_code' => 'R58', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R58', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R58', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R58', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R59: F17 + T2 → R2 (K3,K4,K6,K9)
            ['rule_code' => 'R59', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R59', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R59', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R59', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R60: F18 + T2 → R6 (K3,K4,K6,K10)
            ['rule_code' => 'R60', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R60', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R60', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R60', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R61: F19 + T1 → R7 (K3,K5,K6,K8)
            ['rule_code' => 'R61', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R61', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R61', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R61', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R62: F19 + T2 → R2 (K3,K5,K6,K8)
            ['rule_code' => 'R62', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R62', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R62', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R62', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R63: F20 + T1 → R7 (K3,K5,K6,K9)
            ['rule_code' => 'R63', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R63', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R63', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R63', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R64: F20 + T2 → R2 (K3,K5,K6,K9)
            ['rule_code' => 'R64', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R64', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R64', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R64', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R65: F21 + T1 → R7 (K3,K5,K6,K10)
            ['rule_code' => 'R65', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R65', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R65', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R65', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R66: F21 + T2 → R6 (K3,K5,K6,K10)
            ['rule_code' => 'R66', 'condition_code' => 'K3', 'cf_expert' => 0.9],
            ['rule_code' => 'R66', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R66', 'condition_code' => 'K6', 'cf_expert' => 0.8],
            ['rule_code' => 'R66', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R67: F22 + T2 → R2 (K3,K5,K7,K8)
            ['rule_code' => 'R67', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R67', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R67', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R67', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R68: F22 + T3 → R3 (K3,K5,K7,K8)
            ['rule_code' => 'R68', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R68', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R68', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R68', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R69: F22 + T4 → R4 (K3,K5,K7,K8)
            ['rule_code' => 'R69', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R69', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R69', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R69', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R70: F23 + T2 → R6 (K3,K5,K7,K9)
            ['rule_code' => 'R70', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R70', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R70', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R70', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R71: F23 + T3 → R3 (K3,K5,K7,K9)
            ['rule_code' => 'R71', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R71', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R71', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R71', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R72: F23 + T4 → R4 (K3,K5,K7,K9)
            ['rule_code' => 'R72', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R72', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R72', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R72', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R73: F24 + T2 → R6 (K3,K5,K7,K10)
            ['rule_code' => 'R73', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R73', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R73', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R73', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R74: F24 + T3 → R3 (K3,K5,K7,K10)
            ['rule_code' => 'R74', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R74', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R74', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R74', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R75: F24 + T4 → R4 (K3,K5,K7,K10)
            ['rule_code' => 'R75', 'condition_code' => 'K3', 'cf_expert' => 0.8],
            ['rule_code' => 'R75', 'condition_code' => 'K5', 'cf_expert' => 0.8],
            ['rule_code' => 'R75', 'condition_code' => 'K7', 'cf_expert' => 0.9],
            ['rule_code' => 'R75', 'condition_code' => 'K10', 'cf_expert' => 0.9],

            // R76: F25 → R7 (K2,K4,K6,K8)
            ['rule_code' => 'R76', 'condition_code' => 'K2', 'cf_expert' => 0.9],
            ['rule_code' => 'R76', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R76', 'condition_code' => 'K6', 'cf_expert' => 0.9],
            ['rule_code' => 'R76', 'condition_code' => 'K8', 'cf_expert' => 0.7],

            // R77: F26 → R7 (K2,K4,K6,K9)
            ['rule_code' => 'R77', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R77', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R77', 'condition_code' => 'K6', 'cf_expert' => 0.9],
            ['rule_code' => 'R77', 'condition_code' => 'K9', 'cf_expert' => 0.8],

            // R78: F27 → R7 (K2,K4,K6,K10)
            ['rule_code' => 'R78', 'condition_code' => 'K2', 'cf_expert' => 0.8],
            ['rule_code' => 'R78', 'condition_code' => 'K4', 'cf_expert' => 0.8],
            ['rule_code' => 'R78', 'condition_code' => 'K6', 'cf_expert' => 0.9],
            ['rule_code' => 'R78', 'condition_code' => 'K10', 'cf_expert' => 0.9],
        ];

        foreach ($data as $item) {
            RuleDetail::updateOrCreate(
                [
                    'rule_code' => $item['rule_code'],
                    'condition_code' => $item['condition_code'],
                ],
                $item
            );
        }
    }
}