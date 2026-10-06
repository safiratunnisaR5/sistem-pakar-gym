-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 13, 2026 at 04:54 AM
-- Server version: 10.11.14-MariaDB-0ubuntu0.24.04.1
-- PHP Version: 8.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brogym_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `activity` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consultations_details`
--

CREATE TABLE `consultations_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `consultations_id` bigint(20) UNSIGNED NOT NULL,
  `condition_code` varchar(20) NOT NULL,
  `user_cf` decimal(5,4) NOT NULL DEFAULT 1.0000,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `consultations_details`
--

INSERT INTO `consultations_details` (`id`, `consultations_id`, `condition_code`, `user_cf`, `created_at`, `updated_at`) VALUES
(97, 25, 'K1', 0.9000, '2026-07-12 21:35:36', '2026-07-12 21:35:36'),
(98, 25, 'K4', 0.9000, '2026-07-12 21:35:36', '2026-07-12 21:35:36'),
(99, 25, 'K6', 0.9000, '2026-07-12 21:35:36', '2026-07-12 21:35:36'),
(100, 25, 'K8', 0.9000, '2026-07-12 21:35:36', '2026-07-12 21:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `facts`
--

CREATE TABLE `facts` (
  `code` varchar(20) NOT NULL,
  `fact_name` varchar(100) NOT NULL,
  `condition_codes` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `facts`
--

INSERT INTO `facts` (`code`, `fact_name`, `condition_codes`, `description`, `created_at`, `updated_at`) VALUES
('F1', 'Risiko Obesitas Tinggi Pemula', 'K1,K4,K6,K8', 'BMI berlebih, jarang olahraga, pola makan tidak teratur, level pemula', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F10', 'Kondisi Fisik Prima Pemula', 'K2,K5,K7,K8', 'BMI normal, sering olahraga, pola makan sehat, level pemula', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F11', 'Kondisi Fisik Prima Menengah', 'K2,K5,K7,K9', 'BMI normal, sering olahraga, pola makan sehat, level menengah', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F12', 'Kondisi Fisik Prima Lanjutan', 'K2,K5,K7,K10', 'BMI normal, sering olahraga, pola makan sehat, level lanjutan', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F13', 'Kondisi Normal Pasif Pemula', 'K2,K4,K7,K8', 'BMI normal, jarang olahraga, pola makan sehat, level pemula', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F14', 'Kondisi Normal Pasif Menengah', 'K2,K4,K7,K9', 'BMI normal, jarang olahraga, pola makan sehat, level menengah', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F15', 'Kondisi Normal Pasif Lanjutan', 'K2,K4,K7,K10', 'BMI normal, jarang olahraga, pola makan sehat, level lanjutan', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F16', 'Massa Otot Rendah Pemula', 'K3,K4,K6,K8', 'BMI kurang, jarang olahraga, pola makan tidak teratur, level pemula', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F17', 'Massa Otot Rendah Menengah', 'K3,K4,K6,K9', 'BMI kurang, jarang olahraga, pola makan tidak teratur, level menengah', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F18', 'Massa Otot Rendah Lanjutan', 'K3,K4,K6,K10', 'BMI kurang, jarang olahraga, pola makan tidak teratur, level lanjutan', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F19', 'Defisit Nutrisi Aktif Pemula', 'K3,K5,K6,K8', 'BMI kurang, sering olahraga, pola makan tidak teratur, level pemula', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F2', 'Risiko Obesitas Tinggi Menengah', 'K1,K4,K6,K9', 'BMI berlebih, jarang olahraga, pola makan tidak teratur, level menengah', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F20', 'Defisit Nutrisi Aktif Menengah', 'K3,K5,K6,K9', 'BMI kurang, sering olahraga, pola makan tidak teratur, level menengah', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F21', 'Defisit Nutrisi Aktif Lanjutan', 'K3,K5,K6,K10', 'BMI kurang, sering olahraga, pola makan tidak teratur, level lanjutan', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F22', 'Massa Tubuh Stabil Pemula', 'K3,K5,K7,K8', 'BMI kurang, sering olahraga, pola makan sehat, level pemula', '2026-07-02 18:10:17', '2026-07-02 18:10:17'),
('F23', 'Massa Tubuh Stabil Menengah', 'K3,K5,K7,K9', 'BMI kurang, sering olahraga, pola makan sehat, level menengah', '2026-07-02 18:10:21', '2026-07-02 18:10:21'),
('F24', 'Massa Tubuh Stabil Lanjutan', 'K3,K5,K7,K10', 'BMI kurang, sering olahraga, pola makan sehat, level lanjutan', '2026-07-02 18:10:21', '2026-07-02 18:10:21'),
('F25', 'Pola Hidup Tidak Sehat Pemula', 'K2,K4,K6,K8', 'BMI normal, jarang olahraga, pola makan tidak teratur, level pemula', '2026-07-02 18:10:21', '2026-07-02 18:10:21'),
('F26', 'Pola Hidup Tidak Sehat Menengah', 'K2,K4,K6,K9', 'BMI normal, jarang olahraga, pola makan tidak teratur, level menengah', '2026-07-02 18:10:21', '2026-07-02 18:10:21'),
('F27', 'Pola Hidup Tidak Sehat Lanjutan', 'K2,K4,K6,K10', 'BMI normal, jarang olahraga, pola makan tidak teratur, level lanjutan', '2026-07-02 18:10:21', '2026-07-02 18:10:21'),
('F3', 'Risiko Obesitas Tinggi Lanjutan', 'K1,K4,K6,K10', 'BMI berlebih, jarang olahraga, pola makan tidak teratur, level lanjutan', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F4', 'Overweight Aktif Pemula', 'K1,K5,K6,K8', 'BMI berlebih, sering olahraga, pola makan tidak teratur, level pemula', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F5', 'Overweight Aktif Menengah', 'K1,K5,K6,K9', 'BMI berlebih, sering olahraga, pola makan tidak teratur, level menengah', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F6', 'Overweight Aktif Lanjutan', 'K1,K5,K6,K10', 'BMI berlebih, sering olahraga, pola makan tidak teratur, level lanjutan', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F7', 'Overweight Terkontrol Pemula', 'K1,K5,K7,K8', 'BMI berlebih, sering olahraga, pola makan sehat, level pemula', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F8', 'Overweight Terkontrol Menengah', 'K1,K5,K7,K9', 'BMI berlebih, sering olahraga, pola makan sehat, level menengah', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
('F9', 'Overweight Terkontrol Lanjutan', 'K1,K5,K7,K10', 'BMI berlebih, sering olahraga, pola makan sehat, level lanjutan', '2026-07-02 18:10:16', '2026-07-02 18:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `fact_cf`
--

CREATE TABLE `fact_cf` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fact_code` varchar(20) NOT NULL,
  `cf_value` decimal(5,4) NOT NULL DEFAULT 0.0000,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fact_cf`
--

INSERT INTO `fact_cf` (`id`, `fact_code`, `cf_value`, `created_at`, `updated_at`) VALUES
(1, 'F1', 0.9000, '2026-07-02 18:10:21', '2026-07-02 18:10:21'),
(2, 'F2', 0.9000, '2026-07-02 18:10:21', '2026-07-02 18:10:21'),
(3, 'F3', 0.9000, '2026-07-02 18:10:21', '2026-07-02 18:10:21'),
(4, 'F4', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(5, 'F5', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(6, 'F6', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(7, 'F7', 0.8000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(8, 'F8', 0.8000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(9, 'F9', 0.8000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(10, 'F10', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(11, 'F11', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(12, 'F12', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(13, 'F13', 0.8000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(14, 'F14', 0.8000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(15, 'F15', 0.8000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(16, 'F16', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(17, 'F17', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(18, 'F18', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(19, 'F19', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(20, 'F20', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(21, 'F21', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(22, 'F22', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(23, 'F23', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(24, 'F24', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(25, 'F25', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(26, 'F26', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
(27, 'F27', 0.9000, '2026-07-02 18:10:22', '2026-07-02 18:10:22');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gym_profiles`
--

CREATE TABLE `gym_profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `address` text NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `operational_hours` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hasil_rekomendasi`
--

CREATE TABLE `hasil_rekomendasi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `konsultasi_id` bigint(20) UNSIGNED NOT NULL,
  `rule_id` bigint(20) UNSIGNED NOT NULL,
  `training_code` varchar(20) DEFAULT NULL,
  `meal_code` varchar(20) DEFAULT NULL,
  `cf_value` decimal(5,4) NOT NULL,
  `persentase` decimal(5,2) NOT NULL,
  `catatan_penyakit` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hasil_rekomendasi`
--

INSERT INTO `hasil_rekomendasi` (`id`, `konsultasi_id`, `rule_id`, `training_code`, `meal_code`, `cf_value`, `persentase`, `catatan_penyakit`, `created_at`, `updated_at`) VALUES
(20, 25, 28, 'RL1', 'M1', 0.9945, 99.45, NULL, '2026-07-12 21:35:36', '2026-07-12 21:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kondisi`
--

CREATE TABLE `kondisi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kondisi`
--

INSERT INTO `kondisi` (`id`, `kode`, `nama`, `created_at`, `updated_at`) VALUES
(1, 'K1', 'Berat Badan Berlebih', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(2, 'K2', 'Berat Badan Normal', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(3, 'K3', 'Berat Badan Kurang', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(4, 'K4', 'Jarang Berolahraga', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(5, 'K5', 'Sering Berolahraga', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(6, 'K6', 'Pola Makan Tidak Teratur', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(7, 'K7', 'Pola Makan Sehat', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(8, 'K8', 'Pemula', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(9, 'K9', 'Menengah', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(10, 'K10', 'Lanjutan', '2026-07-02 18:10:11', '2026-07-02 18:10:11');

-- --------------------------------------------------------

--
-- Table structure for table `konsultasi`
--

CREATE TABLE `konsultasi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal` timestamp NOT NULL,
  `tinggi_badan` decimal(5,2) NOT NULL,
  `berat_badan` decimal(5,2) NOT NULL,
  `bmi` decimal(5,2) NOT NULL,
  `aktivitas_olahraga` enum('jarang','sering') NOT NULL,
  `pola_makan_harian` enum('tidak_teratur','sehat') NOT NULL,
  `level_latihan` enum('pemula','menengah','lanjutan') NOT NULL,
  `tujuan_id` bigint(20) UNSIGNED DEFAULT NULL,
  `cf_result` decimal(5,4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `konsultasi`
--

INSERT INTO `konsultasi` (`id`, `member_id`, `tanggal`, `tinggi_badan`, `berat_badan`, `bmi`, `aktivitas_olahraga`, `pola_makan_harian`, `level_latihan`, `tujuan_id`, `cf_result`, `created_at`, `updated_at`) VALUES
(25, 1, '2026-07-12 21:35:35', 170.00, 80.00, 27.68, 'jarang', 'tidak_teratur', 'pemula', 1, 0.9945, '2026-07-12 21:35:35', '2026-07-12 21:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `konsultasi_kondisi`
--

CREATE TABLE `konsultasi_kondisi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `konsultasi_id` bigint(20) UNSIGNED NOT NULL,
  `kondisi_id` bigint(20) UNSIGNED NOT NULL,
  `user_cf` decimal(5,4) NOT NULL DEFAULT 1.0000,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `konsultasi_penyakit`
--

CREATE TABLE `konsultasi_penyakit` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `konsultasi_id` bigint(20) UNSIGNED NOT NULL,
  `penyakit_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meal_plans`
--

CREATE TABLE `meal_plans` (
  `code` varchar(20) NOT NULL,
  `meal_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `meal_plans`
--

INSERT INTO `meal_plans` (`code`, `meal_name`, `description`, `calories`, `created_at`, `updated_at`) VALUES
('M1', 'Pola Makan Defisit Kalori', 'Mengurangi asupan kalori untuk menurunkan berat badan', 1500, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('M2', 'Pola Makan Surplus Kalori', 'Menambah asupan kalori untuk menambah massa otot', 2500, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('M3', 'Pola Makan Seimbang', 'Nutrisi seimbang untuk menjaga kebugaran', 2000, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('M4', 'Pola Makan Tinggi Protein', 'Asupan protein tinggi untuk pembentukan otot', 2200, '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('M5', 'Pola Makan Teratur', 'Pola makan teratur dengan porsi kecil dan sering', 1800, '2026-07-02 18:10:27', '2026-07-02 18:10:27');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` enum('L','P') NOT NULL,
  `birth_date` date NOT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `bmi` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `user_id`, `phone`, `gender`, `birth_date`, `height`, `weight`, `bmi`, `created_at`, `updated_at`) VALUES
(1, 2, '087623723478', 'P', '2004-07-09', NULL, NULL, NULL, '2026-07-02 18:14:36', '2026-07-09 07:44:47');

-- --------------------------------------------------------

--
-- Table structure for table `membership_packages`
--

CREATE TABLE `membership_packages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `membership_packages`
--

INSERT INTO `membership_packages` (`id`, `name`, `price`, `duration_days`, `created_at`, `updated_at`) VALUES
(1, 'Harian', 20000.00, 1, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(2, 'Mingguan', 100000.00, 7, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(3, 'Bulanan', 300000.00, 30, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(4, 'Tahunan', 3000000.00, 365, '2026-07-02 18:10:49', '2026-07-02 18:10:49');

-- --------------------------------------------------------

--
-- Table structure for table `member_memberships`
--

CREATE TABLE `member_memberships` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `package_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('aktif','kadaluarsa') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2026_06_16_112146_create_roles_table', 1),
(4, '2026_06_16_112146_create_users_table', 1),
(5, '2026_06_16_112147_create_members_table', 1),
(6, '2026_06_16_112148_create_gym_profiles_table', 1),
(7, '2026_06_16_112149_create_membership_packages_table', 1),
(8, '2026_06_16_112150_create_member_memberships_table', 1),
(9, '2026_06_16_112151_create_kondisi_table', 1),
(10, '2026_06_16_112152_create_penyakit_table', 1),
(11, '2026_06_16_112152_create_tujuan_table', 1),
(12, '2026_06_16_112158_create_konsultasi_table', 1),
(13, '2026_06_16_112159_create_konsultasi_kondisi_table', 1),
(14, '2026_06_16_112200_create_konsultasi_penyakit_table', 1),
(15, '2026_06_16_112223_create_activity_logs_table', 1),
(16, '2026_06_16_115948_create_personal_access_tokens_table', 1),
(17, '2026_06_16_152043_create_sessions_table', 1),
(18, '2026_06_26_161434_add_default_catatan_penyesuaian_to_penyakit', 1),
(19, '2026_06_26_161649_lengthen_kode_column_in_penyakit', 1),
(20, '2026_06_30_082818_create_facts_table', 1),
(21, '2026_06_30_082835_create_recommendations_table', 1),
(22, '2026_06_30_082852_create_consultations_details_table', 1),
(23, '2026_07_02_161003_create_fact_cf_table', 1),
(24, '2026_07_02_161004_create_meal_plans_table', 1),
(25, '2026_07_02_161004_create_training_programs_table', 1),
(26, '2026_07_02_161005_create_recommendation_details_table', 1),
(27, '2026_07_02_165759_create_rules_table', 1),
(28, '2026_07_02_165800_create_rule_details_table', 1),
(29, '2026_07_02_192841_create_hasil_rekomendasi_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `penyakit`
--

CREATE TABLE `penyakit` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode` varchar(50) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `catatan_penyesuaian` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penyakit`
--

INSERT INTO `penyakit` (`id`, `kode`, `nama`, `catatan_penyesuaian`, `created_at`, `updated_at`) VALUES
(1, 'P1', 'Hipertensi', 'Hindari latihan intensitas tinggi', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(2, 'P2', 'Diabetes', 'Gunakan pola makan rendah gula', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(3, 'P3', 'Asam Lambung', 'Hindari puasa ekstrem', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(4, 'P4', 'Cedera Lutut', 'Hindari jumping dan squat berat', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(5, 'P5', 'Asma', 'Lakukan cardio bertahap', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(6, 'P6', 'Kolesterol Tinggi', 'Kurangi lemak jenuh', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(7, 'P7', 'Penyakit Jantung', 'Hindari latihan ekstrem', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(8, 'P8', 'Osteoporosis', 'Latihan beban ringan', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(9, 'P9', 'Low Back Pain', 'Hindari deadlift berat', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(10, 'P10', 'Arthritis', 'Gunakan latihan low impact', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(11, 'P11', 'Cedera Bahu', 'Batasi overhead press', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(12, 'P12', 'Insomnia', 'Tambahkan edukasi sleep hygiene', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(13, 'P13', 'Anemia', 'Perbanyak makanan kaya zat besi', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(14, 'P14', 'Tidak Ada Penyakit', 'Tidak memerlukan penyesuaian', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(18, 'P15', 'Min', NULL, '2026-07-07 16:08:23', '2026-07-07 16:08:23'),
(19, 'P16', 'Plus', NULL, '2026-07-07 17:26:07', '2026-07-07 17:26:07'),
(21, 'P17', 'Silinder', NULL, '2026-07-07 17:37:06', '2026-07-07 17:37:06');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'member-token', 'c766ff07f6d5522a68e063aaf00bc9fdbd9dcbc1bc48c05e89e8a9f6bf1d868b', '[\"*\"]', '2026-07-02 18:23:49', NULL, '2026-07-02 18:14:36', '2026-07-02 18:23:49'),
(13, 'App\\Models\\User', 1, 'auth-token', '4eae5ac7b3ec99f7593296084421efd877c40431af1046aeab2395a373583c82', '[\"*\"]', NULL, NULL, '2026-07-09 07:52:04', '2026-07-09 07:52:04'),
(14, 'App\\Models\\User', 1, 'auth-token', 'b2d8f1bd55238b110a0a608edb6473e16f78a74a473297190a280f70afd581c8', '[\"*\"]', NULL, NULL, '2026-07-09 07:52:14', '2026-07-09 07:52:14'),
(15, 'App\\Models\\User', 1, 'auth-token', 'd1e76e8c6c0197c0c0f9fd00e919b19e46e1832137c16555a5025dfc03b9c40c', '[\"*\"]', NULL, NULL, '2026-07-09 07:52:31', '2026-07-09 07:52:31'),
(29, 'App\\Models\\User', 1, 'auth-token', '83523dcc20779c9a17df994941289bc0c6b4b3a0073b062df19b2ec544b4379a', '[\"*\"]', '2026-07-10 20:49:39', NULL, '2026-07-10 20:49:35', '2026-07-10 20:49:39'),
(31, 'App\\Models\\User', 2, 'auth-token', '695c829702a1e433acf77f0a1d4cda8fb3caff5144263570a4db799b0a7ae3d5', '[\"*\"]', '2026-07-10 21:34:39', NULL, '2026-07-10 21:28:28', '2026-07-10 21:34:39'),
(32, 'App\\Models\\User', 2, 'auth-token', '80a55c9eb8b328cff9313c7a161a4f7b6081a47977fd308d3f9cedfafb5120bd', '[\"*\"]', '2026-07-12 21:03:53', NULL, '2026-07-12 20:49:18', '2026-07-12 21:03:53'),
(34, 'App\\Models\\User', 2, 'auth-token', '7ad421a5c4b0b82d65c638fe083912f15d548147c392b2db780fe66ee525c5bc', '[\"*\"]', '2026-07-12 21:47:05', NULL, '2026-07-12 21:20:45', '2026-07-12 21:47:05');

-- --------------------------------------------------------

--
-- Table structure for table `recommendations`
--

CREATE TABLE `recommendations` (
  `code` varchar(20) NOT NULL,
  `recommendation_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `recommendations`
--

INSERT INTO `recommendations` (`code`, `recommendation_name`, `description`, `created_at`, `updated_at`) VALUES
('R1', 'Program Fat Loss', 'Program penurunan berat badan dengan kombinasi cardio dan defisit kalori', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
('R2', 'Program Muscle Gain', 'Program penambahan massa otot dengan strength training dan surplus kalori', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
('R3', 'Program Maintenance', 'Program menjaga kebugaran dengan latihan moderat dan nutrisi seimbang', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
('R4', 'Program Body Shaping', 'Program pembentukan tubuh dengan latihan intensif dan nutrisi tinggi protein', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
('R5', 'Endurance Training', 'Program latihan ketahanan dan daya tahan tubuh', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
('R6', 'Strength Training', 'Program latihan kekuatan dengan beban progresif', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
('R7', 'Perbaikan Pola Makan', 'Program perbaikan pola makan dan kebiasaan hidup sehat', '2026-07-02 18:10:27', '2026-07-02 18:10:27');

-- --------------------------------------------------------

--
-- Table structure for table `recommendation_details`
--

CREATE TABLE `recommendation_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `recommendation_code` varchar(20) NOT NULL,
  `meal_code` varchar(20) DEFAULT NULL,
  `training_code` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `recommendation_details`
--

INSERT INTO `recommendation_details` (`id`, `recommendation_code`, `meal_code`, `training_code`, `created_at`, `updated_at`) VALUES
(1, 'R1', 'M1', 'RL1', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(2, 'R2', 'M2', 'RL2', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(3, 'R2', 'M4', 'RL2', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(4, 'R3', 'M3', 'RL3', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(5, 'R4', 'M3', 'RL4', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(6, 'R4', 'M4', 'RL4', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(7, 'R5', 'M3', 'RL5', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(8, 'R6', 'M4', 'RL6', '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(9, 'R7', 'M5', 'RL1', '2026-07-02 18:10:27', '2026-07-02 18:10:27');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2026-07-02 18:10:02', '2026-07-02 18:10:02'),
(2, 'Member', '2026-07-02 18:10:02', '2026-07-02 18:10:02');

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE `rules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_rule` varchar(20) NOT NULL,
  `nama_rule` varchar(100) NOT NULL,
  `fact_code` varchar(20) DEFAULT NULL,
  `tujuan_id` bigint(20) UNSIGNED DEFAULT NULL,
  `recommendation_code` varchar(20) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rules`
--

INSERT INTO `rules` (`id`, `kode_rule`, `nama_rule`, `fact_code`, `tujuan_id`, `recommendation_code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'R1', 'Risiko Obesitas Pemula', 'F1', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(2, 'R2', 'Risiko Obesitas Menengah', 'F2', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(3, 'R3', 'Risiko Obesitas Lanjutan', 'F3', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(4, 'R4', 'Overweight Aktif Pemula', 'F4', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(5, 'R5', 'Overweight Aktif Menengah', 'F5', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(6, 'R6', 'Overweight Aktif Lanjutan', 'F6', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(7, 'R7', 'Overweight Terkontrol Pemula', 'F7', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(8, 'R8', 'Overweight Terkontrol Menengah', 'F8', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(9, 'R9', 'Overweight Terkontrol Lanjutan', 'F9', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(10, 'R10', 'Kondisi Fisik Prima Pemula', 'F10', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(11, 'R11', 'Kondisi Fisik Prima Menengah', 'F11', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(12, 'R12', 'Kondisi Fisik Prima Lanjutan', 'F12', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(13, 'R13', 'Kondisi Normal Pasif Pemula', 'F13', NULL, NULL, 1, '2026-07-02 18:10:27', '2026-07-02 18:10:27'),
(14, 'R14', 'Kondisi Normal Pasif Menengah', 'F14', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(15, 'R15', 'Kondisi Normal Pasif Lanjutan', 'F15', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(16, 'R16', 'Massa Otot Rendah Pemula', 'F16', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(17, 'R17', 'Massa Otot Rendah Menengah', 'F17', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(18, 'R18', 'Massa Otot Rendah Lanjutan', 'F18', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(19, 'R19', 'Defisit Nutrisi Aktif Pemula', 'F19', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(20, 'R20', 'Defisit Nutrisi Aktif Menengah', 'F20', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(21, 'R21', 'Defisit Nutrisi Aktif Lanjutan', 'F21', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(22, 'R22', 'Massa Tubuh Stabil Pemula', 'F22', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(23, 'R23', 'Massa Tubuh Stabil Menengah', 'F23', NULL, NULL, 1, '2026-07-02 18:10:28', '2026-07-02 18:10:28'),
(24, 'R24', 'Massa Tubuh Stabil Lanjutan', 'F24', NULL, NULL, 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(25, 'R25', 'Pola Hidup Tidak Sehat Pemula', 'F25', NULL, NULL, 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(26, 'R26', 'Pola Hidup Tidak Sehat Menengah', 'F26', NULL, NULL, 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(27, 'R27', 'Pola Hidup Tidak Sehat Lanjutan', 'F27', NULL, NULL, 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(28, 'R28', 'F1 + T1 → R1', 'F1', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(29, 'R29', 'F2 + T1 → R1', 'F2', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(30, 'R30', 'F3 + T1 → R1', 'F3', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(31, 'R31', 'F4 + T1 → R1', 'F4', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(32, 'R32', 'F4 + T4 → R4', 'F4', 4, 'R4', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(33, 'R33', 'F5 + T1 → R1', 'F5', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(34, 'R34', 'F5 + T4 → R4', 'F5', 4, 'R4', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(35, 'R35', 'F6 + T1 → R1', 'F6', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(36, 'R36', 'F6 + T4 → R4', 'F6', 4, 'R4', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(37, 'R37', 'F7 + T1 → R1', 'F7', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(38, 'R38', 'F7 + T3 → R3', 'F7', 3, 'R3', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(39, 'R39', 'F7 + T4 → R4', 'F7', 4, 'R4', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(40, 'R40', 'F8 + T1 → R1', 'F8', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(41, 'R41', 'F8 + T3 → R3', 'F8', 3, 'R3', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(42, 'R42', 'F8 + T4 → R4', 'F8', 4, 'R4', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(43, 'R43', 'F9 + T1 → R1', 'F9', 1, 'R1', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(44, 'R44', 'F9 + T3 → R3', 'F9', 3, 'R3', 1, '2026-07-02 18:10:32', '2026-07-02 18:10:32'),
(45, 'R45', 'F9 + T4 → R4', 'F9', 4, 'R4', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(46, 'R46', 'F10 + T2 → R6', 'F10', 2, 'R6', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(47, 'R47', 'F10 + T3 → R3', 'F10', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(48, 'R48', 'F10 + T4 → R4', 'F10', 4, 'R4', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(49, 'R49', 'F11 + T2 → R6', 'F11', 2, 'R6', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(50, 'R50', 'F11 + T3 → R3', 'F11', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(51, 'R51', 'F11 + T4 → R4', 'F11', 4, 'R4', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(52, 'R52', 'F12 + T2 → R6', 'F12', 2, 'R6', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(53, 'R53', 'F12 + T3 → R3', 'F12', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(54, 'R54', 'F12 + T4 → R4', 'F12', 4, 'R4', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(55, 'R55', 'F13 + T3 → R3', 'F13', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(56, 'R56', 'F14 + T3 → R3', 'F14', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(57, 'R57', 'F15 + T3 → R3', 'F15', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(58, 'R58', 'F16 + T2 → R2', 'F16', 2, 'R2', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(59, 'R59', 'F17 + T2 → R2', 'F17', 2, 'R2', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(60, 'R60', 'F18 + T2 → R6', 'F18', 2, 'R6', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(61, 'R61', 'F19 + T1 → R7', 'F19', 1, 'R7', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(62, 'R62', 'F19 + T2 → R2', 'F19', 2, 'R2', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(63, 'R63', 'F20 + T1 → R7', 'F20', 1, 'R7', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(64, 'R64', 'F20 + T2 → R2', 'F20', 2, 'R2', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(65, 'R65', 'F21 + T1 → R7', 'F21', 1, 'R7', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(66, 'R66', 'F21 + T2 → R6', 'F21', 2, 'R6', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(67, 'R67', 'F22 + T2 → R2', 'F22', 2, 'R2', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(68, 'R68', 'F22 + T3 → R3', 'F22', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(69, 'R69', 'F22 + T4 → R4', 'F22', 4, 'R4', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(70, 'R70', 'F23 + T2 → R6', 'F23', 2, 'R6', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(71, 'R71', 'F23 + T3 → R3', 'F23', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(72, 'R72', 'F23 + T4 → R4', 'F23', 4, 'R4', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(73, 'R73', 'F24 + T2 → R6', 'F24', 2, 'R6', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(74, 'R74', 'F24 + T3 → R3', 'F24', 3, 'R3', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(75, 'R75', 'F24 + T4 → R4', 'F24', 4, 'R4', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(76, 'R76', 'F25 → R7', 'F25', NULL, 'R7', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(77, 'R77', 'F26 → R7', 'F26', NULL, 'R7', 1, '2026-07-02 18:10:33', '2026-07-02 18:10:33'),
(78, 'R78', 'F27 → R7', 'F27', NULL, 'R7', 1, '2026-07-02 18:10:38', '2026-07-02 18:10:38');

-- --------------------------------------------------------

--
-- Table structure for table `rule_details`
--

CREATE TABLE `rule_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rule_code` varchar(20) NOT NULL,
  `condition_code` varchar(20) NOT NULL,
  `cf_expert` decimal(5,4) NOT NULL DEFAULT 0.8000,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rule_details`
--

INSERT INTO `rule_details` (`id`, `rule_code`, `condition_code`, `cf_expert`, `created_at`, `updated_at`) VALUES
(1, 'R1', 'K1', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(2, 'R1', 'K4', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(3, 'R1', 'K6', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(4, 'R1', 'K8', 0.7000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(5, 'R2', 'K1', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(6, 'R2', 'K4', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(7, 'R2', 'K6', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(8, 'R2', 'K9', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(9, 'R3', 'K1', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(10, 'R3', 'K4', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(11, 'R3', 'K6', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(12, 'R3', 'K10', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(13, 'R4', 'K1', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(14, 'R4', 'K5', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(15, 'R4', 'K6', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(16, 'R4', 'K8', 0.7000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(17, 'R5', 'K1', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(18, 'R5', 'K5', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(19, 'R5', 'K6', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(20, 'R5', 'K9', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(21, 'R6', 'K1', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(22, 'R6', 'K5', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(23, 'R6', 'K6', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(24, 'R6', 'K10', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(25, 'R7', 'K1', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(26, 'R7', 'K5', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(27, 'R7', 'K7', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(28, 'R7', 'K8', 0.7000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(29, 'R8', 'K1', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(30, 'R8', 'K5', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(31, 'R8', 'K7', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(32, 'R8', 'K9', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(33, 'R9', 'K1', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(34, 'R9', 'K5', 0.8000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(35, 'R9', 'K7', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(36, 'R9', 'K10', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(37, 'R10', 'K2', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(38, 'R10', 'K5', 0.9000, '2026-07-02 18:10:38', '2026-07-02 18:10:38'),
(39, 'R10', 'K7', 0.8000, '2026-07-02 18:10:39', '2026-07-02 18:10:39'),
(40, 'R10', 'K8', 0.7000, '2026-07-02 18:10:39', '2026-07-02 18:10:39'),
(41, 'R11', 'K2', 0.9000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(42, 'R11', 'K5', 0.9000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(43, 'R11', 'K7', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(44, 'R11', 'K9', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(45, 'R12', 'K2', 0.9000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(46, 'R12', 'K5', 0.9000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(47, 'R12', 'K7', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(48, 'R12', 'K10', 0.9000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(49, 'R13', 'K2', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(50, 'R13', 'K4', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(51, 'R13', 'K7', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(52, 'R13', 'K8', 0.7000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(53, 'R14', 'K2', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(54, 'R14', 'K4', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(55, 'R14', 'K7', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(56, 'R14', 'K9', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(57, 'R15', 'K2', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(58, 'R15', 'K4', 0.8000, '2026-07-02 18:10:43', '2026-07-02 18:10:43'),
(59, 'R15', 'K7', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(60, 'R15', 'K10', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(61, 'R16', 'K3', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(62, 'R16', 'K4', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(63, 'R16', 'K6', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(64, 'R16', 'K8', 0.7000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(65, 'R17', 'K3', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(66, 'R17', 'K4', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(67, 'R17', 'K6', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(68, 'R17', 'K9', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(69, 'R18', 'K3', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(70, 'R18', 'K4', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(71, 'R18', 'K6', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(72, 'R18', 'K10', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(73, 'R19', 'K3', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(74, 'R19', 'K5', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(75, 'R19', 'K6', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(76, 'R19', 'K8', 0.7000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(77, 'R20', 'K3', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(78, 'R20', 'K5', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(79, 'R20', 'K6', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(80, 'R20', 'K9', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(81, 'R21', 'K3', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(82, 'R21', 'K5', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(83, 'R21', 'K6', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(84, 'R21', 'K10', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(85, 'R22', 'K3', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(86, 'R22', 'K5', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(87, 'R22', 'K7', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(88, 'R22', 'K8', 0.7000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(89, 'R23', 'K3', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(90, 'R23', 'K5', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(91, 'R23', 'K7', 0.9000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(92, 'R23', 'K9', 0.8000, '2026-07-02 18:10:44', '2026-07-02 18:10:44'),
(93, 'R24', 'K3', 0.8000, '2026-07-02 18:10:48', '2026-07-02 18:10:48'),
(94, 'R24', 'K5', 0.8000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(95, 'R24', 'K7', 0.9000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(96, 'R24', 'K10', 0.9000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(97, 'R25', 'K2', 0.9000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(98, 'R25', 'K4', 0.8000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(99, 'R25', 'K6', 0.9000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(100, 'R25', 'K8', 0.7000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(101, 'R26', 'K2', 0.8000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(102, 'R26', 'K4', 0.8000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(103, 'R26', 'K6', 0.9000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(104, 'R26', 'K9', 0.8000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(105, 'R27', 'K2', 0.8000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(106, 'R27', 'K4', 0.8000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(107, 'R27', 'K6', 0.9000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(108, 'R27', 'K10', 0.9000, '2026-07-02 18:10:49', '2026-07-02 18:10:49'),
(112, 'R28', 'K1', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(113, 'R28', 'K4', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(114, 'R28', 'K6', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(115, 'R28', 'K8', 0.7000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(116, 'R29', 'K1', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(117, 'R29', 'K4', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(118, 'R29', 'K6', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(119, 'R29', 'K9', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(120, 'R30', 'K1', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(121, 'R30', 'K4', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(122, 'R30', 'K6', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(123, 'R30', 'K10', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(124, 'R31', 'K1', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(125, 'R31', 'K5', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(126, 'R31', 'K6', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(127, 'R31', 'K8', 0.7000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(128, 'R32', 'K1', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(129, 'R32', 'K5', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(130, 'R32', 'K6', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(131, 'R32', 'K8', 0.7000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(132, 'R33', 'K1', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(133, 'R33', 'K5', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(134, 'R33', 'K6', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(135, 'R33', 'K9', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(136, 'R34', 'K1', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(137, 'R34', 'K5', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(138, 'R34', 'K6', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(139, 'R34', 'K9', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(140, 'R35', 'K1', 0.9000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(141, 'R35', 'K5', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(142, 'R35', 'K6', 0.8000, '2026-07-12 21:33:44', '2026-07-12 21:33:44'),
(143, 'R35', 'K10', 0.9000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(144, 'R36', 'K1', 0.9000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(145, 'R36', 'K5', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(146, 'R36', 'K6', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(147, 'R36', 'K10', 0.9000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(148, 'R37', 'K1', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(149, 'R37', 'K5', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(150, 'R37', 'K7', 0.9000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(151, 'R37', 'K8', 0.7000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(152, 'R38', 'K1', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(153, 'R38', 'K5', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(154, 'R38', 'K7', 0.9000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(155, 'R38', 'K8', 0.7000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(156, 'R39', 'K1', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(157, 'R39', 'K5', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(158, 'R39', 'K7', 0.9000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(159, 'R39', 'K8', 0.7000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(160, 'R40', 'K1', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(161, 'R40', 'K5', 0.8000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(162, 'R40', 'K7', 0.9000, '2026-07-12 21:33:49', '2026-07-12 21:33:49'),
(163, 'R40', 'K9', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(164, 'R41', 'K1', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(165, 'R41', 'K5', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(166, 'R41', 'K7', 0.9000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(167, 'R41', 'K9', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(168, 'R42', 'K1', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(169, 'R42', 'K5', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(170, 'R42', 'K7', 0.9000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(171, 'R42', 'K9', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(172, 'R43', 'K1', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(173, 'R43', 'K5', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(174, 'R43', 'K7', 0.9000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(175, 'R43', 'K10', 0.9000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(176, 'R44', 'K1', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(177, 'R44', 'K5', 0.8000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(178, 'R44', 'K7', 0.9000, '2026-07-12 21:33:50', '2026-07-12 21:33:50'),
(179, 'R44', 'K10', 0.9000, '2026-07-12 21:33:54', '2026-07-12 21:33:54'),
(180, 'R45', 'K1', 0.8000, '2026-07-12 21:33:54', '2026-07-12 21:33:54'),
(181, 'R45', 'K5', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(182, 'R45', 'K7', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(183, 'R45', 'K10', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(184, 'R46', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(185, 'R46', 'K5', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(186, 'R46', 'K7', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(187, 'R46', 'K8', 0.7000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(188, 'R47', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(189, 'R47', 'K5', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(190, 'R47', 'K7', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(191, 'R47', 'K8', 0.7000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(192, 'R48', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(193, 'R48', 'K5', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(194, 'R48', 'K7', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(195, 'R48', 'K8', 0.7000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(196, 'R49', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(197, 'R49', 'K5', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(198, 'R49', 'K7', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(199, 'R49', 'K9', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(200, 'R50', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(201, 'R50', 'K5', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(202, 'R50', 'K7', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(203, 'R50', 'K9', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(204, 'R51', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(205, 'R51', 'K5', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(206, 'R51', 'K7', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(207, 'R51', 'K9', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(208, 'R52', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(209, 'R52', 'K5', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(210, 'R52', 'K7', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(211, 'R52', 'K10', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(212, 'R53', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(213, 'R53', 'K5', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(214, 'R53', 'K7', 0.8000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(215, 'R53', 'K10', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(216, 'R54', 'K2', 0.9000, '2026-07-12 21:33:55', '2026-07-12 21:33:55'),
(217, 'R54', 'K5', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(218, 'R54', 'K7', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(219, 'R54', 'K10', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(220, 'R55', 'K2', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(221, 'R55', 'K4', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(222, 'R55', 'K7', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(223, 'R55', 'K8', 0.7000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(224, 'R56', 'K2', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(225, 'R56', 'K4', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(226, 'R56', 'K7', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(227, 'R56', 'K9', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(228, 'R57', 'K2', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(229, 'R57', 'K4', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(230, 'R57', 'K7', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(231, 'R57', 'K10', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(232, 'R58', 'K3', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(233, 'R58', 'K4', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(234, 'R58', 'K6', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(235, 'R58', 'K8', 0.7000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(236, 'R59', 'K3', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(237, 'R59', 'K4', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(238, 'R59', 'K6', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(239, 'R59', 'K9', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(240, 'R60', 'K3', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(241, 'R60', 'K4', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(242, 'R60', 'K6', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(243, 'R60', 'K10', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(244, 'R61', 'K3', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(245, 'R61', 'K5', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(246, 'R61', 'K6', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(247, 'R61', 'K8', 0.7000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(248, 'R62', 'K3', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(249, 'R62', 'K5', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(250, 'R62', 'K6', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(251, 'R62', 'K8', 0.7000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(252, 'R63', 'K3', 0.9000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(253, 'R63', 'K5', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(254, 'R63', 'K6', 0.8000, '2026-07-12 21:34:00', '2026-07-12 21:34:00'),
(255, 'R63', 'K9', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(256, 'R64', 'K3', 0.9000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(257, 'R64', 'K5', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(258, 'R64', 'K6', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(259, 'R64', 'K9', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(260, 'R65', 'K3', 0.9000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(261, 'R65', 'K5', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(262, 'R65', 'K6', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(263, 'R65', 'K10', 0.9000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(264, 'R66', 'K3', 0.9000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(265, 'R66', 'K5', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(266, 'R66', 'K6', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(267, 'R66', 'K10', 0.9000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(268, 'R67', 'K3', 0.8000, '2026-07-12 21:34:01', '2026-07-12 21:34:01'),
(269, 'R67', 'K5', 0.8000, '2026-07-12 21:34:05', '2026-07-12 21:34:05'),
(270, 'R67', 'K7', 0.9000, '2026-07-12 21:34:05', '2026-07-12 21:34:05'),
(271, 'R67', 'K8', 0.7000, '2026-07-12 21:34:05', '2026-07-12 21:34:05'),
(272, 'R68', 'K3', 0.8000, '2026-07-12 21:34:05', '2026-07-12 21:34:05'),
(273, 'R68', 'K5', 0.8000, '2026-07-12 21:34:05', '2026-07-12 21:34:05'),
(274, 'R68', 'K7', 0.9000, '2026-07-12 21:34:05', '2026-07-12 21:34:05'),
(275, 'R68', 'K8', 0.7000, '2026-07-12 21:34:05', '2026-07-12 21:34:05'),
(276, 'R69', 'K3', 0.8000, '2026-07-12 21:34:05', '2026-07-12 21:34:05'),
(277, 'R69', 'K5', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(278, 'R69', 'K7', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(279, 'R69', 'K8', 0.7000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(280, 'R70', 'K3', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(281, 'R70', 'K5', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(282, 'R70', 'K7', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(283, 'R70', 'K9', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(284, 'R71', 'K3', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(285, 'R71', 'K5', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(286, 'R71', 'K7', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(287, 'R71', 'K9', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(288, 'R72', 'K3', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(289, 'R72', 'K5', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(290, 'R72', 'K7', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(291, 'R72', 'K9', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(292, 'R73', 'K3', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(293, 'R73', 'K5', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(294, 'R73', 'K7', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(295, 'R73', 'K10', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(296, 'R74', 'K3', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(297, 'R74', 'K5', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(298, 'R74', 'K7', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(299, 'R74', 'K10', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(300, 'R75', 'K3', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(301, 'R75', 'K5', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(302, 'R75', 'K7', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(303, 'R75', 'K10', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(304, 'R76', 'K2', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(305, 'R76', 'K4', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(306, 'R76', 'K6', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(307, 'R76', 'K8', 0.7000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(308, 'R77', 'K2', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(309, 'R77', 'K4', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(310, 'R77', 'K6', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(311, 'R77', 'K9', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(312, 'R78', 'K2', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(313, 'R78', 'K4', 0.8000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(314, 'R78', 'K6', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06'),
(315, 'R78', 'K10', 0.9000, '2026-07-12 21:34:06', '2026-07-12 21:34:06');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `training_programs`
--

CREATE TABLE `training_programs` (
  `code` varchar(20) NOT NULL,
  `training_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `training_programs`
--

INSERT INTO `training_programs` (`code`, `training_name`, `description`, `created_at`, `updated_at`) VALUES
('RL1', 'Fat Loss Training', 'Latihan kardio dan pembakaran lemak untuk menurunkan berat badan', '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('RL2', 'Muscle Gain Training', 'Latihan kekuatan dan hipertrofi untuk menambah massa otot', '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('RL3', 'Maintenance Training', 'Latihan menjaga kebugaran dengan intensitas moderat', '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('RL4', 'Body Shaping', 'Latihan pembentukan tubuh dan definisi otot', '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('RL5', 'Endurance Training', 'Latihan ketahanan dan daya tahan tubuh', '2026-07-02 18:10:22', '2026-07-02 18:10:22'),
('RL6', 'Strength Training', 'Latihan kekuatan dengan beban progresif', '2026-07-02 18:10:22', '2026-07-02 18:10:22');

-- --------------------------------------------------------

--
-- Table structure for table `tujuan`
--

CREATE TABLE `tujuan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tujuan`
--

INSERT INTO `tujuan` (`id`, `kode`, `nama`, `created_at`, `updated_at`) VALUES
(1, 'T1', 'Menurunkan Berat Badan', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(2, 'T2', 'Menambah Massa Otot', '2026-07-02 18:10:11', '2026-07-02 18:10:11'),
(3, 'T3', 'Menjaga Kebugaran', '2026-07-02 18:10:16', '2026-07-02 18:10:16'),
(4, 'T4', 'Membentuk Tubuh', '2026-07-02 18:10:16', '2026-07-02 18:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 1, 'Administrator', 'admin@brogym.com', '$2y$12$3DAMhWg5Y/OdtA6KJCDAhuHqZFd0lRqQ.xPFBIxrDMAf0NwrXPSJW', NULL, '2026-07-02 18:10:03', '2026-07-02 18:10:03'),
(2, 2, 'Safiratun Nisa', 'safira@brogym.com', '$2y$12$6q2cdNoNvbWy.FHioMlzIOIFKRbzQdYsh2.SHRbexF1nGfdp7HL8C', NULL, '2026-07-02 18:14:32', '2026-07-09 07:44:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_logs_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `consultations_details`
--
ALTER TABLE `consultations_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `consultations_details_consultations_id_foreign` (`consultations_id`),
  ADD KEY `consultations_details_condition_code_foreign` (`condition_code`);

--
-- Indexes for table `facts`
--
ALTER TABLE `facts`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `fact_cf`
--
ALTER TABLE `fact_cf`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fact_cf_fact_code_foreign` (`fact_code`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gym_profiles`
--
ALTER TABLE `gym_profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hasil_rekomendasi`
--
ALTER TABLE `hasil_rekomendasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hasil_rekomendasi_konsultasi_id_foreign` (`konsultasi_id`),
  ADD KEY `hasil_rekomendasi_rule_id_foreign` (`rule_id`),
  ADD KEY `hasil_rekomendasi_training_code_foreign` (`training_code`),
  ADD KEY `hasil_rekomendasi_meal_code_foreign` (`meal_code`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kondisi`
--
ALTER TABLE `kondisi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kondisi_kode_unique` (`kode`);

--
-- Indexes for table `konsultasi`
--
ALTER TABLE `konsultasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `konsultasi_member_id_foreign` (`member_id`),
  ADD KEY `konsultasi_tujuan_id_foreign` (`tujuan_id`);

--
-- Indexes for table `konsultasi_kondisi`
--
ALTER TABLE `konsultasi_kondisi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `konsultasi_kondisi_konsultasi_id_kondisi_id_unique` (`konsultasi_id`,`kondisi_id`),
  ADD KEY `konsultasi_kondisi_kondisi_id_foreign` (`kondisi_id`);

--
-- Indexes for table `konsultasi_penyakit`
--
ALTER TABLE `konsultasi_penyakit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `konsultasi_penyakit_konsultasi_id_penyakit_id_unique` (`konsultasi_id`,`penyakit_id`),
  ADD KEY `konsultasi_penyakit_penyakit_id_foreign` (`penyakit_id`);

--
-- Indexes for table `meal_plans`
--
ALTER TABLE `meal_plans`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `members_user_id_unique` (`user_id`);

--
-- Indexes for table `membership_packages`
--
ALTER TABLE `membership_packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member_memberships`
--
ALTER TABLE `member_memberships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_memberships_member_id_foreign` (`member_id`),
  ADD KEY `member_memberships_package_id_foreign` (`package_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penyakit`
--
ALTER TABLE `penyakit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `penyakit_kode_unique` (`kode`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `recommendation_details`
--
ALTER TABLE `recommendation_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recommendation_details_recommendation_code_foreign` (`recommendation_code`),
  ADD KEY `recommendation_details_meal_code_foreign` (`meal_code`),
  ADD KEY `recommendation_details_training_code_foreign` (`training_code`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rules_kode_rule_unique` (`kode_rule`),
  ADD KEY `rules_fact_code_foreign` (`fact_code`),
  ADD KEY `rules_tujuan_id_foreign` (`tujuan_id`),
  ADD KEY `rules_recommendation_code_foreign` (`recommendation_code`);

--
-- Indexes for table `rule_details`
--
ALTER TABLE `rule_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rule_details_rule_code_condition_code_unique` (`rule_code`,`condition_code`),
  ADD KEY `rule_details_condition_code_foreign` (`condition_code`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `training_programs`
--
ALTER TABLE `training_programs`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `tujuan`
--
ALTER TABLE `tujuan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tujuan_kode_unique` (`kode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consultations_details`
--
ALTER TABLE `consultations_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `fact_cf`
--
ALTER TABLE `fact_cf`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gym_profiles`
--
ALTER TABLE `gym_profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hasil_rekomendasi`
--
ALTER TABLE `hasil_rekomendasi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kondisi`
--
ALTER TABLE `kondisi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `konsultasi`
--
ALTER TABLE `konsultasi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `konsultasi_kondisi`
--
ALTER TABLE `konsultasi_kondisi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konsultasi_penyakit`
--
ALTER TABLE `konsultasi_penyakit`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `membership_packages`
--
ALTER TABLE `membership_packages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `member_memberships`
--
ALTER TABLE `member_memberships`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `penyakit`
--
ALTER TABLE `penyakit`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `recommendation_details`
--
ALTER TABLE `recommendation_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rules`
--
ALTER TABLE `rules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `rule_details`
--
ALTER TABLE `rule_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=316;

--
-- AUTO_INCREMENT for table `tujuan`
--
ALTER TABLE `tujuan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `consultations_details`
--
ALTER TABLE `consultations_details`
  ADD CONSTRAINT `consultations_details_condition_code_foreign` FOREIGN KEY (`condition_code`) REFERENCES `kondisi` (`kode`) ON DELETE CASCADE,
  ADD CONSTRAINT `consultations_details_consultations_id_foreign` FOREIGN KEY (`consultations_id`) REFERENCES `konsultasi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fact_cf`
--
ALTER TABLE `fact_cf`
  ADD CONSTRAINT `fact_cf_fact_code_foreign` FOREIGN KEY (`fact_code`) REFERENCES `facts` (`code`) ON DELETE CASCADE;

--
-- Constraints for table `hasil_rekomendasi`
--
ALTER TABLE `hasil_rekomendasi`
  ADD CONSTRAINT `hasil_rekomendasi_konsultasi_id_foreign` FOREIGN KEY (`konsultasi_id`) REFERENCES `konsultasi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hasil_rekomendasi_meal_code_foreign` FOREIGN KEY (`meal_code`) REFERENCES `meal_plans` (`code`) ON DELETE SET NULL,
  ADD CONSTRAINT `hasil_rekomendasi_rule_id_foreign` FOREIGN KEY (`rule_id`) REFERENCES `rules` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hasil_rekomendasi_training_code_foreign` FOREIGN KEY (`training_code`) REFERENCES `training_programs` (`code`) ON DELETE SET NULL;

--
-- Constraints for table `konsultasi`
--
ALTER TABLE `konsultasi`
  ADD CONSTRAINT `konsultasi_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `konsultasi_tujuan_id_foreign` FOREIGN KEY (`tujuan_id`) REFERENCES `tujuan` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `konsultasi_kondisi`
--
ALTER TABLE `konsultasi_kondisi`
  ADD CONSTRAINT `konsultasi_kondisi_kondisi_id_foreign` FOREIGN KEY (`kondisi_id`) REFERENCES `kondisi` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `konsultasi_kondisi_konsultasi_id_foreign` FOREIGN KEY (`konsultasi_id`) REFERENCES `konsultasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `konsultasi_penyakit`
--
ALTER TABLE `konsultasi_penyakit`
  ADD CONSTRAINT `konsultasi_penyakit_konsultasi_id_foreign` FOREIGN KEY (`konsultasi_id`) REFERENCES `konsultasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `konsultasi_penyakit_penyakit_id_foreign` FOREIGN KEY (`penyakit_id`) REFERENCES `penyakit` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `member_memberships`
--
ALTER TABLE `member_memberships`
  ADD CONSTRAINT `member_memberships_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `member_memberships_package_id_foreign` FOREIGN KEY (`package_id`) REFERENCES `membership_packages` (`id`);

--
-- Constraints for table `recommendation_details`
--
ALTER TABLE `recommendation_details`
  ADD CONSTRAINT `recommendation_details_meal_code_foreign` FOREIGN KEY (`meal_code`) REFERENCES `meal_plans` (`code`) ON DELETE SET NULL,
  ADD CONSTRAINT `recommendation_details_recommendation_code_foreign` FOREIGN KEY (`recommendation_code`) REFERENCES `recommendations` (`code`) ON DELETE CASCADE,
  ADD CONSTRAINT `recommendation_details_training_code_foreign` FOREIGN KEY (`training_code`) REFERENCES `training_programs` (`code`) ON DELETE SET NULL;

--
-- Constraints for table `rules`
--
ALTER TABLE `rules`
  ADD CONSTRAINT `rules_fact_code_foreign` FOREIGN KEY (`fact_code`) REFERENCES `facts` (`code`) ON DELETE SET NULL,
  ADD CONSTRAINT `rules_recommendation_code_foreign` FOREIGN KEY (`recommendation_code`) REFERENCES `recommendations` (`code`) ON DELETE SET NULL,
  ADD CONSTRAINT `rules_tujuan_id_foreign` FOREIGN KEY (`tujuan_id`) REFERENCES `tujuan` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `rule_details`
--
ALTER TABLE `rule_details`
  ADD CONSTRAINT `rule_details_condition_code_foreign` FOREIGN KEY (`condition_code`) REFERENCES `kondisi` (`kode`) ON DELETE CASCADE,
  ADD CONSTRAINT `rule_details_rule_code_foreign` FOREIGN KEY (`rule_code`) REFERENCES `rules` (`kode_rule`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
