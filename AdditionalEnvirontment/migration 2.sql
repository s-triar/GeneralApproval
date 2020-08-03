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

-- Dumping data for table general_approval.requestlists: ~0 rows (approximately)
/*!40000 ALTER TABLE `requestlists` DISABLE KEYS */;
INSERT INTO `requestlists` (`Nik`, `ApiName`, `Id`, `Category`, `Title`, `Status`, `Detail`, `ProjectName`, `UrlAction`, `UrlProject`, `SubTitle`, `CreatedAt`, `Displayed`) VALUES
	('000', 'cb', '002/CBK/NS/VII/2020', NULL, 'MOU Toko Baru telah dibuat', 'Menunggu Approval', '[{"index":0,"title":"Data Mou 2","type":"FORMGROUP"},{"index":0,"type":"INPUT","data":"Mou Toko Baru","label":"Kategori MOU","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"DATE","label":"Tanggal MOU","name":null,"disabled":true,"required":false,"requiredWhen":null,"range":false,"data":["2020-08-01T18:51:30.0256368+07:00"]},{"index":0,"type":"INPUT","data":30000000,"label":"Franchise Fee (Rp.)","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"number"},{"index":0,"type":"INPUT","data":300000000,"label":"Nilai Investasi (Rp.)","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"number"},{"index":0,"type":"TABLE","label":"Detail Termin","data":[{"nama":"Termin 1","tgl":"2020-08-01T18:51:30.0266333+07:00","nominal":100000000},{"nama":"Termin 2","tgl":"2020-08-01T18:51:30.0266333+07:00","nominal":100000000},{"nama":"Termin 3","tgl":"2020-08-01T18:51:30.0266333+07:00","nominal":100000000}],"header":[{"key":"nama","title":"Nama"},{"key":"tgl","title":"Tanggal Jatuh Tempo"},{"key":"nominal","title":"Nominal"}]},{"index":0,"title":"Data Franchise","type":"FORMGROUP"},{"index":0,"type":"INPUT","data":"Sulaiman Triarjo","label":"Nama Franchise","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"INPUT","data":"653599262682606","label":"NIK","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"INPUT","data":"085755519123","label":"No Telp","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"INPUT","data":"Jalan Sesame No 123","label":"Alamat","name":null,"disabled":true,"required":false,"requiredWhen":null,"typeForm":"text"},{"index":0,"type":"IMAGE","label":"Coba menampilkan gambar","link":"https://localhost:44305/Docs/cc.jpg","fileName":"cc.jpg"},{"index":0,"type":"FILE","label":"Required File","data":[{"label":"xel","fileName":"xel.xlsx","link":"https://localhost:44305/Docs/xel.xlsx","typeDoc":"application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet"},{"label":"xel dari method","fileName":"xel.xlsx","link":"https://localhost:44305/Coba/GetFile?filename=xel.xlsx","typeDoc":"application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet"}]},{"index":0,"type":"AUTOCOMPLETE","label":"Ini tuh Auto complete","name":"autoco","required":false,"requiredWhen":null,"disabled":false,"initialValue":null,"data":null,"link":"https://localhost:44305/Coba/DataAutoComplete","provideFilter":false}]', 'Monitoring Dana Investasi Franchise', 'https://localhost:44305/Coba/Approve', 'https://localhost:44305', NULL, '2020-08-01 18:51:30.228139', b'0');
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

-- Dumping data for table general_approval.userdevices: ~1 rows (approximately)
/*!40000 ALTER TABLE `userdevices` DISABLE KEYS */;
INSERT INTO `userdevices` (`Id`, `Nik`, `DeviceKey`, `Browser`, `Device`, `Os`) VALUES
	('b25c56c7-f646-4776-9fe3-eb5724931366', '000', '{"endpoint":"https://sg2p.notify.windows.com/w/?token=BQYAAAAL9klhaEfSm3P2VUaHWmSXuSeo1VTMfPqt0%2bp6yE9I1HrE8xedB1FSVMGWJ46SSqlKsVAlhOxUruyemhhYvVSPTmfa9U%2bqel9r4w9KG9HU6HUFMf5UhdRTS85pRJbAYwjw4l1ExMyGmwwOLXc3QDKsKy%2bnZGE7LmP5cLM7%2fsSMVUtw3VDF1KoSLiKJPayj%2bNVyLEymp%2fRKVMowQfrn9WYhCkHTMUNi8EWNwyVwuTTEUhi1zJE26dh%2bEemsjcFrpj7yq%2fXCWGg3GCuNlvYXIFK10rybrhBS18EZ%2fXfrwJe0qsfyUzvz0RnQRCzB80ujsiU%3d","expirationTime":null,"keys":{"p256dh":"BIykPtElyRdtDYIKML693y374LSdsirfwibNE4lWyN0eObs7IVUg0nTm4qnEwno83v8XN1WSccujCl2YIaKO4HQ","auth":"g9afaDJpGBWEHiK78OuZ6g"}}', 'MS-Edge-Chromium', 'Unknown', 'Windows');
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
