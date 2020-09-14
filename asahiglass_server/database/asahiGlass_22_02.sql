-- MySQL dump 10.13  Distrib 5.6.16, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: asahiGlass
-- ------------------------------------------------------
-- Server version	5.6.16-1~exp1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device_detail`
--

DROP TABLE IF EXISTS `device_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_detail` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `deviceType` int(8) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `serial` varchar(50) DEFAULT NULL,
  `empId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  KEY `device_detail_fk0` (`empId`),
  CONSTRAINT `device_detail_fk0` FOREIGN KEY (`empId`) REFERENCES `employee_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail`
--

LOCK TABLES `device_detail` WRITE;
/*!40000 ALTER TABLE `device_detail` DISABLE KEYS */;
INSERT INTO `device_detail` VALUES (1,1,'Mushir Beacon','AC233FA14521',1),(3,1,'Ajay Beacon','AC233FA10234',2),(4,2,'Reciver1','AC233FB20001',NULL),(5,2,'Reciver2','AC233FB24147',NULL),(6,2,'Reciver3','AC233FB24123',NULL),(8,2,'Reciver4','AC233FB14123',NULL),(9,2,'Reciver5','AC233FB24105',NULL),(10,3,'Gateway1','AC233FB24523',NULL),(11,1,'Rohit Beacon','AC233FA102546',3),(12,3,'Gateway2','AC233FB20967',NULL),(13,1,'Sanjay Device','AC233FA27834',4),(14,2,'Reciver 6','AC233FB20007',NULL),(15,2,'Reciver 7','AC233FB24107',NULL),(16,2,'Reciver 8','AC233FB24197',NULL),(17,2,'Reciver 9','AC233FB24102',NULL),(18,2,'Reciver 10','AC233FB24223',NULL),(19,2,'Reciver 11','AC233FB24201',NULL),(20,2,'Reciver 12','AC233FB24111',NULL),(21,2,'Reciver 13','AC233FB24113',NULL),(22,2,'Reciver 14','AC233FB28924',NULL),(23,2,'Reciver 15','AC233FB28954',NULL),(24,2,'Reciver 16','AC233FB24216',NULL),(25,2,'Reciver 17','AC233FB24117',NULL),(26,2,'ReciverZ1-1','AC233FB25123',NULL),(27,2,'ReciverZ1-2','AC233FB15122',NULL),(28,2,'ReciverZ1-3','AC233FB24023',NULL),(29,2,'ReciverZ1-4','AC233FB22123',NULL),(30,2,'ReciverZ1-5','AC233FB24045',NULL),(31,1,'Vijay Beacon','AC233FB12957',5),(32,1,'Randhir Beacon','AC233FA11898',6),(33,1,'Sonu Beacon','AC233FA10467',7),(34,1,'Gaurav Beacon','AC233FA19786',8),(35,1,'Amrit Beacon','AC233FA10112',9),(36,1,'Abhishek Beacon','AC233FA19090',10),(37,1,'Amit Beacon','AC233FA17689',11),(38,1,'Harindar Beacon','AC233FA17842',12),(39,1,'Anil Beacon','AC233FA10258',13),(40,1,'Anand Beacon','AC233FA16735',14),(41,2,'ReciverZ1-6','AC233FB22015',NULL),(42,2,'ReciverZ1-7','AC233FA18734',NULL),(43,2,'ReciverZ3-8','AC233FA28734',NULL),(44,2,'Reciver Z39','AC233FA10626',NULL),(45,2,'Reciver A3-20','AC233FA28410',NULL),(46,2,'Reciver 21','AC233FA18080',NULL),(47,2,'Revicer 20','AC233FA48678',NULL),(48,2,'Revicer 32','AC233FA26732',NULL),(49,2,'Reciver 29','AC233FA19029',NULL),(50,2,'Reciver 56','AC233FA18082',NULL),(51,2,'Reciver 86','AC233FA36722',NULL);
/*!40000 ALTER TABLE `device_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_detail`
--

DROP TABLE IF EXISTS `employee_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_detail` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) DEFAULT NULL,
  `empId` varchar(50) DEFAULT NULL,
  `creatorId` int(32) DEFAULT NULL,
  `usertype` int(8) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `contactNo` bigint(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_detail_fk0` (`creatorId`),
  CONSTRAINT `employee_detail_fk0` FOREIGN KEY (`creatorId`) REFERENCES `userInfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_detail`
--

LOCK TABLES `employee_detail` WRITE;
/*!40000 ALTER TABLE `employee_detail` DISABLE KEYS */;
INSERT INTO `employee_detail` VALUES (1,'Mushir Ahmed Siddiqui','E61',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'mushir@wavenetcorp.com'),(2,'Ajay Sharma','E62',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'ajay@wavenetcorp.com'),(3,'Rohit Soni','E63',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'rohit@wavenetcorp.com'),(4,'Sanjay','E01',1,2,'Sec 50 Gurgaon',8826644268,'sanjay@wavenetcorp.com'),(5,'Vijay Chand','E45',1,2,'Sec-44',8826644268,'vijay.chand@wavenetcorp.com'),(6,'Randhir Kumar','E54',1,2,'Badshahpur',9876753678,'randhir.kumar@wavenetcorp.com'),(7,'Sonu Kumar','E52',1,2,'Badshahpur',7823970267,'sonu.kumar@wavenetcorp.com'),(8,'Gurav Shukla','E32',1,2,'Dlf Gurgaon',9846257821,'gurav.shukla@wavenetcorp.com'),(9,'Amrit Preet Singh','E24',1,2,'Dlf',9857262813,'amrit@wavenetcorp.com'),(10,'Abhishek','E46',1,2,'Sec-46 Gurgaon',8683678356,'abhishek@wavenetcorp.com'),(11,'Amit Kumar','E05',1,2,'Sec 39 Gurgaon',8956389000,'amit@wavenetcorp.com'),(12,'Harindar Kumar','E31',1,2,'Sector 50 Gurgaon',9909967542,'harindar.kumar@wavenetcorp.com'),(13,'Anil Singh','E55',1,2,'Sector 46 Gurgaon',7835624562,'anil@wavenetcorp.com'),(14,'Anand Srivastav','E23',1,2,'Sector 49 Gurgaon',7866534561,'anand@wavenetcorp.com'),(15,'Anand Kumar','E71',1,2,'Sector 29 Gurgaon',8893556731,'anand.kumar@wavenetcorp.com');
/*!40000 ALTER TABLE `employee_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gwFtpDetails`
--

DROP TABLE IF EXISTS `gwFtpDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gwFtpDetails` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `gatewayId` int(32) NOT NULL,
  `ftpUrl` varchar(50) DEFAULT NULL,
  `ftpUsername` varchar(50) DEFAULT NULL,
  `ftpPassword` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gwFtpDetails_fk0` (`gatewayId`),
  CONSTRAINT `gwFtpDetails_fk0` FOREIGN KEY (`gatewayId`) REFERENCES `device_detail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gwFtpDetails`
--

LOCK TABLES `gwFtpDetails` WRITE;
/*!40000 ALTER TABLE `gwFtpDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `gwFtpDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_user_zone`
--

DROP TABLE IF EXISTS `map_user_zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_user_zone` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `empId` int(32) DEFAULT NULL,
  `zId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `map_user_zone_fk0` (`empId`),
  KEY `map_user_zone_fk1` (`zId`),
  CONSTRAINT `map_user_zone_fk0` FOREIGN KEY (`empId`) REFERENCES `employee_detail` (`id`),
  CONSTRAINT `map_user_zone_fk1` FOREIGN KEY (`zId`) REFERENCES `zone_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_zone`
--

LOCK TABLES `map_user_zone` WRITE;
/*!40000 ALTER TABLE `map_user_zone` DISABLE KEYS */;
INSERT INTO `map_user_zone` VALUES (9,1,7),(10,2,7),(11,3,7),(12,8,7),(13,9,7),(14,5,6),(15,6,6),(16,7,6),(17,14,6),(18,10,6),(19,11,1),(20,13,1),(21,15,1),(22,12,1),(23,4,1),(24,4,6),(25,4,7),(26,4,8),(27,1,8),(28,2,8),(29,3,8),(30,5,8),(31,6,8),(32,7,8),(33,8,8),(34,9,8),(35,10,8),(36,11,8),(37,12,8),(38,13,8),(39,14,8),(40,15,8);
/*!40000 ALTER TABLE `map_user_zone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `node_neighbour`
--

DROP TABLE IF EXISTS `node_neighbour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `node_neighbour` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `nodeId` int(32) NOT NULL,
  `neighbourNodeId` int(32) NOT NULL,
  `neighbourRssi` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `node_neighbour_fk0` (`nodeId`),
  KEY `node_neighbour_fk1` (`neighbourNodeId`),
  KEY `node_neighbour_fk2` (`zoneId`),
  CONSTRAINT `node_neighbour_fk0` FOREIGN KEY (`nodeId`) REFERENCES `device_detail` (`id`),
  CONSTRAINT `node_neighbour_fk1` FOREIGN KEY (`neighbourNodeId`) REFERENCES `device_detail` (`id`),
  CONSTRAINT `node_neighbour_fk2` FOREIGN KEY (`zoneId`) REFERENCES `zone_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour`
--

LOCK TABLES `node_neighbour` WRITE;
/*!40000 ALTER TABLE `node_neighbour` DISABLE KEYS */;
INSERT INTO `node_neighbour` VALUES (1,9,4,-60,6),(2,9,5,-60,6),(3,9,6,-60,6),(4,9,8,-60,6),(17,26,27,-60,1),(18,26,28,-60,1),(19,26,29,-60,1),(20,26,30,-60,1),(21,41,42,-60,7),(22,41,43,-60,7),(23,41,44,-60,7),(24,41,45,-60,7),(25,14,15,-60,8),(26,14,16,-60,8),(27,14,17,-60,8),(28,14,18,-60,8);
/*!40000 ALTER TABLE `node_neighbour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userInfo`
--

DROP TABLE IF EXISTS `userInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userInfo` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) DEFAULT NULL,
  `contactno` bigint(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `userType` int(8) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `fcmtokenKey` varchar(256) DEFAULT NULL,
  `loginTime` int(100) DEFAULT NULL,
  `creatorid` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userInfo`
--

LOCK TABLES `userInfo` WRITE;
/*!40000 ALTER TABLE `userInfo` DISABLE KEYS */;
INSERT INTO `userInfo` VALUES (1,'Admin Wavenet',8826644268,'Sec 46 Gurgaon',0,'admin@wavenetcorp.com','$2a$10$cRtctTqisSiz75tAPOEqquV/VMDaXL/.jhGcSwGi8gL7roCwq8Uyy',NULL,NULL,NULL),(2,'Wavenet',8826644268,'Sec 46 Gurgaon',1,'info@wavenetcorp.com','$2a$10$WLEZfL1WQvuThcMwSLIW7.Lv1xKw6vmOWcKTWYC8ZGrnj85BfB1bC',NULL,NULL,NULL);
/*!40000 ALTER TABLE `userInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone_detail`
--

DROP TABLE IF EXISTS `zone_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zone_detail` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `zoneName` varchar(50) DEFAULT NULL,
  `maxUsers` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail`
--

LOCK TABLES `zone_detail` WRITE;
/*!40000 ALTER TABLE `zone_detail` DISABLE KEYS */;
INSERT INTO `zone_detail` VALUES (1,'Zone 1',1),(6,'Zone 2',10),(7,'Zone 3',10),(8,'Zone 4',10);
/*!40000 ALTER TABLE `zone_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-22 11:55:09
