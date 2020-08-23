-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.21 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for general_approval
CREATE DATABASE IF NOT EXISTS `general_approval` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `general_approval`;

-- Dumping structure for table general_approval.requestlists
CREATE TABLE IF NOT EXISTS `requestlists` (
  `Nik` varchar(255) NOT NULL,
  `ApiName` varchar(255) NOT NULL,
  `Id` varchar(255) NOT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Detail` longtext,
  `ProjectName` varchar(255) DEFAULT NULL,
  `UrlAction` varchar(255) DEFAULT NULL,
  `UrlProject` varchar(255) DEFAULT NULL,
  `SubTitle` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  `Displayed` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Nik`,`ApiName`,`Id`),
  UNIQUE KEY `AK_RequestLists_ApiName_Id_Nik` (`ApiName`,`Id`,`Nik`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table general_approval.requestlists: ~1 rows (approximately)
/*!40000 ALTER TABLE `requestlists` DISABLE KEYS */;
INSERT INTO `requestlists` (`Nik`, `ApiName`, `Id`, `Category`, `Title`, `Status`, `Detail`, `ProjectName`, `UrlAction`, `UrlProject`, `SubTitle`, `CreatedAt`, `Displayed`) VALUES
	('000', 'cb', '002/CBK/NS/VII/2020', 'MOU Baru', 'MOU Toko Baru telah dibuat', 'Menunggu Approval', '[{"index":0,"title":"Data Mou 2","type":"FORMGROUP"},{"index":0,"type":"INPUT","data":"Mou Toko Baru","label":"Kategori MOU","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"DATE","label":"Tanggal MOU","name":null,"disabled":true,"required":false,"requiredWhen":null,"range":false,"data":["2020-08-06T21:24:30.0146423+07:00"]},{"index":0,"type":"INPUT","data":30000000,"label":"Franchise Fee (Rp.)","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"number"},{"index":0,"type":"INPUT","data":300000000,"label":"Nilai Investasi (Rp.)","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"number"},{"index":0,"type":"TABLE","label":"Detail Termin","data":[{"nama":"Termin 1","tgl":"2020-08-06T21:24:30.0146423+07:00","nominal":100000000},{"nama":"Termin 2","tgl":"2020-08-06T21:24:30.0146423+07:00","nominal":100000000},{"nama":"Termin 3","tgl":"2020-08-06T21:24:30.0146423+07:00","nominal":100000000}],"header":[{"key":"nama","title":"Nama"},{"key":"tgl","title":"Tanggal Jatuh Tempo"},{"key":"nominal","title":"Nominal"}]},{"index":0,"title":"Data Franchise","type":"FORMGROUP"},{"index":0,"type":"INPUT","data":"Sulaiman Triarjo","label":"Nama Franchise","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"INPUT","data":"653599262682606","label":"NIK","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"INPUT","data":"085755519123","label":"No Telp","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"INPUT","data":"Jalan Sesame No 123","label":"Alamat","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"IMAGE","label":"Coba menampilkan gambar","link":"http://localhost/cb/Docs/cc.jpg","fileName":"cc.jpg"},{"index":0,"type":"FILE","label":"Required File","data":[{"label":"xel","fileName":"xel.xlsx","link":"http://localhost/cb/Docs/xel.xlsx","typeDoc":"application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet"},{"label":"xel dari method","fileName":"xel.xlsx","link":"http://localhost/cb/Coba/GetFile?filename=xel.xlsx","typeDoc":"application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet"}]},{"index":0,"type":"AUTOCOMPLETE","label":"Ini tuh Auto complete","name":"autoco","required":false,"requiredWhen":null,"disabled":false,"initialValue":null,"data":null,"link":"http://localhost/cb/Coba/DataAutoComplete","provideFilter":false}]', 'Monitoring Dana Investasi Franchise', 'http://localhost/cb/Coba/Approve', 'http://localhost/cb', NULL, '2020-08-06 21:10:46.025504', b'0');
/*!40000 ALTER TABLE `requestlists` ENABLE KEYS */;

-- Dumping structure for table general_approval.userdevices
CREATE TABLE IF NOT EXISTS `userdevices` (
  `Id` char(36) NOT NULL,
  `Nik` varchar(255) DEFAULT NULL,
  `DeviceKey` text,
  `Browser` varchar(255) DEFAULT NULL,
  `Device` varchar(255) DEFAULT NULL,
  `Os` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table general_approval.userdevices: ~5 rows (approximately)
/*!40000 ALTER TABLE `userdevices` DISABLE KEYS */;
INSERT INTO `userdevices` (`Id`, `Nik`, `DeviceKey`, `Browser`, `Device`, `Os`) VALUES
	('53ce632d-eaae-429c-b81e-9927692bca38', '000', '{"endpoint":"https://fcm.googleapis.com/fcm/send/cFj-DvDt2jk:APA91bGnW-q6fgdLz0d0rU7_riXDrc3ugVvmj65OMMCg37ZRt7P0lENo7L9w2N25drriQY59Py2118puBTqYeqVh2jG6P1YXgHrPOyQvRl75xrTMHAmn-MaKtRv8Zs7WMGi61P7MEunw","expirationTime":null,"keys":{"p256dh":"BFlYyrYdIpreCCJft4Md_X0XVlDApi8TQ0n2CG1AKcsa5pUeVMfgJ0-C_rOxru64L6F6-7wxtuMTX6mFQYlb85k","auth":"8JRPwufbhmZnsg7P-yWrYQ"}}', 'MS-Edge', 'Android', 'Android'),
	('b25c56c7-f646-4776-9fe3-eb5724931366', '000', '{"endpoint":"https://sg2p.notify.windows.com/w/?token=BQYAAACsfbVuE4YEyq0wls0N9eqWyKOHSXTh8pMvSuHALccPstJyAIaguOw1wnocq0XfYxE%2b0sK8g0%2bVozcCqyUEf8gZixjyMVEk2dkuWa1mEUf5tnB3QjLEfXwyEYuVrVTecoThUfbkb4QcsAHIxqQphMfgcjdClTXOAqvRjsRErKR8%2b3wkY7RARm51gF4%2b4BOLjIpKgUaLBo04%2fvGCFQi5LvPiT1bziqH%2b6wxCfPqp2ePDXua9ZLfXjikQzf1Igb4J5xxBbLJonbF7Ti%2bgPo9fADUqLSm%2fWmzN15Mw8f6nzk7XbDxS%2bLDa%2fF59wLFr3v%2fU5k4%3d","expirationTime":null,"keys":{"p256dh":"BHybPP9Qq_Ez_uY-BIZYCadkz5Pq5tGXLAvMZntyn8MUkSPwI4UFD8gnx2N-GAjhIAdoUVa51BmLmxP6bEaW_5E","auth":"iJwE1W3gMmFD1bfefLDb3g"}}', 'MS-Edge-Chromium', 'Unknown', 'Windows'),
	('dc367681-f60b-446d-b25b-35ec1e6dc385', '000', '{"endpoint":"https://fcm.googleapis.com/fcm/send/fg9I--gGKJE:APA91bGJfP71YNQA2SUlFnbPaWqWVE-aJnnpMwDuCKV30H8phyVwgw0har45D8LNh1IEQvc8byggBaLD_Gu1GJ4xinfMO6mjM7P38Ic63oq-6dMGts_9BhggnG9r2TIdaKHPTRPhHxXF","expirationTime":null,"keys":{"p256dh":"BAuskmzcY7UKaQzx1YCrdAqtGcxnMCxKcKvPpn1oyOzGQyimJnn2HLerolIj_FQHWlITG8iQktH9jeQStRpZhQQ","auth":"4fLL6s2Qku-R5cfVod4Eew"}}', 'Chrome', 'Unknown', 'Windows'),
	('f48fe3d1-eec1-40a5-ac56-fcfe60fdca2f', '000', '{"endpoint":"https://fcm.googleapis.com/fcm/send/e8vtLIFLU6w:APA91bGmWk4xsUrxOg3TUZYxbT29DdVstYQBt6SCCptYQRAcGvz_9rvMWcC6Fr6yN4P7dkssT-itjfkoO51tmHqX_DUs9oi6sgQ2Rvalo12A1WVh4SmAoL0ufwGO-C_R8_Q9azCcq9wO","expirationTime":null,"keys":{"p256dh":"BLxNaMvcjpM7uDITeCGVdA-edaQ9p3USHj-KKrngU0R5srBg0Rn4BJYtw5Gbb-jidF_2RTLWMWFME0bAQpTtKDk","auth":"5r4BZbBJebnwlgm353sXwg"}}', 'Chrome', 'Android', 'Android'),
	('ffbea1eb-8aeb-487e-aced-998f4a02e485', '000', '{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABfK_h5Ba_vRS3xyLW-w1V1tS6b0OqfBZOgSzmXKNvMgk8dLHp_gyrp1g4GCQvj4K7Ls-Kwv7RWtfnAJ9yr_M5OvVD0L-Usd3YRtcTYRIknQUjXnlRghxYfNN89RC3L7UxdxPbQ2i6y5yTMhT4Mc9HDK1fFLgT1_v74iM_zUE54d6Yc3ok","keys":{"auth":"ccOdE8RZ5R2ckrLIs47Smg","p256dh":"BKrxo0_MobuB63Edza1FV1iGX9vLiUfIszjm4UXGJm_crRNAhg9cDSGCTLla_5MDIvmZ8Pp9qJBR6ne1wH5vGWo"}}', 'Firefox', 'Firefox-OS', 'Android');
/*!40000 ALTER TABLE `userdevices` ENABLE KEYS */;

-- Dumping structure for table general_approval.__efmigrationshistory
CREATE TABLE IF NOT EXISTS `__efmigrationshistory` (
  `MigrationId` varchar(95) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table general_approval.__efmigrationshistory: ~2 rows (approximately)
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
	('20200720085325_InitDb', '2.2.6-servicing-10079'),
	('20200720103620_UpdateProjReqDb', '2.2.6-servicing-10079'),
	('20200725233159_AddSubTitleInList', '2.2.6-servicing-10079'),
	('20200729215618_addbrowserinfo', '2.2.6-servicing-10079'),
	('20200801083841_addmeta', '2.2.6-servicing-10079');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
