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
  PRIMARY KEY (`Nik`,`ApiName`,`Id`),
  UNIQUE KEY `AK_RequestLists_ApiName_Id_Nik` (`ApiName`,`Id`,`Nik`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table general_approval.requestlists: ~1 rows (approximately)
/*!40000 ALTER TABLE `requestlists` DISABLE KEYS */;
INSERT INTO `requestlists` (`Nik`, `ApiName`, `Id`, `Category`, `Title`, `Status`, `Detail`, `ProjectName`, `UrlAction`, `UrlProject`, `SubTitle`) VALUES
	('000', 'qweasd', '1', 'qw', 'g sga', 'ggg', NULL, 'QWE AS D', 'localhost', 'localhost', NULL);
/*!40000 ALTER TABLE `requestlists` ENABLE KEYS */;

-- Dumping structure for table general_approval.userdevices
CREATE TABLE IF NOT EXISTS `userdevices` (
  `Id` char(36) NOT NULL,
  `Nik` varchar(255) DEFAULT NULL,
  `DeviceKey` text,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table general_approval.userdevices: ~1 rows (approximately)
/*!40000 ALTER TABLE `userdevices` DISABLE KEYS */;
INSERT INTO `userdevices` (`Id`, `Nik`, `DeviceKey`) VALUES
	('620c24ee-f1bc-4798-9e50-e88836d75c76', '000', '{"endpoint":"https://fcm.googleapis.com/fcm/send/djGhQlRZYmQ:APA91bFslVyj10buSphnGXuuh6OftobbvnPLs3xICjycqBk-e42TV5U8jazMwfKlOnaoFi0hgrzk8fUAhjRm4VPru9A0GwLOk9fUQtZ1F1qcfRRdStBxx7lh7S2i_yRKHr64AN7DECBY","expirationTime":null,"keys":{"p256dh":"BA8YYO4AsWUp5pbJVTNKDcIgtVfLK-fd-YxD7Xn7rtYPU5asaoy5DokCvgWpKQio-bXnlURrye8C5ntM6etvDyA","auth":"AtibhW6dHMjaMDR2Ebrjcw"}}');
/*!40000 ALTER TABLE `userdevices` ENABLE KEYS */;

-- Dumping structure for table general_approval.__efmigrationshistory
CREATE TABLE IF NOT EXISTS `__efmigrationshistory` (
  `MigrationId` varchar(95) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table general_approval.__efmigrationshistory: ~3 rows (approximately)
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
	('20200720085325_InitDb', '2.2.6-servicing-10079'),
	('20200720103620_UpdateProjReqDb', '2.2.6-servicing-10079'),
	('20200725233159_AddSubTitleInList', '2.2.6-servicing-10079');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
