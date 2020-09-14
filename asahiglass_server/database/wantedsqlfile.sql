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
  `nodeId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  KEY `device_detail_fk0` (`empId`),
  CONSTRAINT `device_detail_fk0` FOREIGN KEY (`empId`) REFERENCES `employee_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail`
--

LOCK TABLES `device_detail` WRITE;
/*!40000 ALTER TABLE `device_detail` DISABLE KEYS */;
INSERT INTO `device_detail` VALUES (1,1,'Mushir Beacon','AC233FA14522',1,NULL),(3,1,'Ajay Beacon','ac233fa14526',2,NULL),(4,2,'Reciver1','D0D8135289BC',NULL,0),(5,2,'Reciver2','C364B81DFB78',NULL,4),(6,2,'Reciver3','E5C6C9ECD303',NULL,6),(8,2,'Reciver4','FC86CF511B9D',NULL,7),(9,2,'Reciver5','DA97636A2BF8',NULL,3),(10,3,'Gateway1','AC233FB24523',NULL,NULL),(11,1,'Rohit Beacon','ac233fa145ad',3,NULL),(12,3,'Gateway2','AC233FB20967',NULL,NULL),(13,1,'Sanjay Device','ac233fa145b2',4,NULL),(14,2,'Reciver 6','DB5CAF76EDA3',NULL,2),(15,2,'Reciver 7','E5DF04790A1D',NULL,1),(16,2,'Reciver 8','D7C43307AE79',NULL,5),(17,2,'Reciver 9','AC233FB24102',NULL,NULL),(18,2,'Reciver 10','AC233FB24223',NULL,NULL),(19,2,'Reciver 11','AC233FB24201',NULL,NULL),(20,2,'Reciver 12','AC233FB24111',NULL,NULL),(21,2,'Reciver 13','AC233FB24113',NULL,NULL),(22,2,'Reciver 14','AC233FB28924',NULL,NULL),(23,2,'Reciver 15','AC233FB28954',NULL,NULL),(24,2,'Reciver 16','AC233FB24216',NULL,NULL),(25,2,'Reciver 17','AC233FB24117',NULL,NULL),(26,2,'ReciverZ1-1','AC233FB25123',NULL,NULL),(27,2,'ReciverZ1-2','AC233FB15122',NULL,NULL),(28,2,'ReciverZ1-3','AC233FB24023',NULL,NULL),(29,2,'ReciverZ1-4','AC233FB22123',NULL,NULL),(30,2,'ReciverZ1-5','AC233FB24045',NULL,NULL),(31,1,'Vijay Beacon','AC233FB12957',5,NULL),(32,1,'Randhir Beacon','AC233FA11898',6,NULL),(33,1,'Sonu Beacon','ac233fa1451f',7,NULL),(34,1,'Gaurav Beacon','AC233FA19786',8,NULL),(35,1,'Amrit Beacon','AC233FA10112',9,NULL),(36,1,'Abhishek Beacon','ac233fa145b3',10,NULL),(37,1,'Amit Beacon','ac233fa145b4',11,NULL),(38,1,'Harindar Beacon','ac233fa14520',12,NULL),(39,1,'Anil Beacon','ac233fa145be',13,NULL),(40,1,'Anand Beacon','ac233fa145ab',14,NULL),(41,2,'ReciverZ1-6','AC233FB22015',NULL,NULL),(42,2,'ReciverZ1-7','AC233FA18734',NULL,NULL),(43,2,'ReciverZ3-8','AC233FA28734',NULL,NULL),(44,2,'Reciver Z39','AC233FA10626',NULL,NULL),(45,2,'Reciver A3-20','AC233FA28410',NULL,NULL),(46,2,'Reciver 21','AC233FA18080',NULL,NULL),(47,2,'Revicer 20','AC233FA48678',NULL,NULL),(48,2,'Revicer 32','AC233FA26732',NULL,NULL),(49,2,'Reciver 29','AC233FA19029',NULL,NULL),(50,2,'Reciver 56','AC233FA18082',NULL,NULL),(51,2,'Reciver 86','AC233FA36722',NULL,NULL),(52,4,'Test Beacon','ac233fa14521',NULL,NULL),(53,1,'Shilpa Beacon','ac233fa14525',16,NULL),(54,1,'Prakash Beacon','ac233fa145ac',17,NULL),(55,1,'Arjun Beacon','ac233fa1451e',21,NULL),(56,1,'Sumir Beacon','ac233fa1451d',18,NULL),(57,1,'Ravi Beacon','ac233fa14531',19,NULL),(58,1,'Puneet Beacon','ac233fa145ae',20,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_detail`
--

LOCK TABLES `employee_detail` WRITE;
/*!40000 ALTER TABLE `employee_detail` DISABLE KEYS */;
INSERT INTO `employee_detail` VALUES (1,'Mushir Ahmed Siddiqui','E61',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'mushir@wavenetcorp.com'),(2,'Ajay Sharma','E62',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'ajay@wavenetcorp.com'),(3,'Rohit Soni','E63',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'rohit@wavenetcorp.com'),(4,'Sanjay','E01',1,2,'Sec 50 Gurgaon',8826644268,'sanjay@wavenetcorp.com'),(5,'Vijay Chand','E45',1,2,'Sec-44',8826644268,'vijay.chand@wavenetcorp.com'),(6,'Randhir Kumar','E54',1,2,'Badshahpur',9876753678,'randhir.kumar@wavenetcorp.com'),(7,'Sonu Kumar','E52',1,2,'Badshahpur',7823970267,'sonu.kumar@wavenetcorp.com'),(8,'Gurav Shukla','E32',1,2,'Dlf Gurgaon',9846257821,'gurav.shukla@wavenetcorp.com'),(9,'Amrit Preet Singh','E24',1,2,'Dlf',9857262813,'amrit@wavenetcorp.com'),(10,'Abhishek','E46',1,2,'Sec-46 Gurgaon',8683678356,'abhishek@wavenetcorp.com'),(11,'Amit Kumar','E05',1,2,'Sec 39 Gurgaon',8956389000,'amit@wavenetcorp.com'),(12,'Harindar Kumar','E31',1,2,'Sector 50 Gurgaon',9909967542,'harindar.kumar@wavenetcorp.com'),(13,'Anil Singh','E55',1,2,'Sector 46 Gurgaon',7835624562,'anil@wavenetcorp.com'),(14,'Anand Srivastav','E23',1,2,'Sector 49 Gurgaon',7866534561,'anand@wavenetcorp.com'),(15,'Anand Kumar','E71',1,2,'Sector 29 Gurgaon',8893556731,'anand.kumar@wavenetcorp.com'),(16,'Shilpa Dhawan','E56',1,2,'Sec 44 plot no 105',8826644268,'shilpa@wavenetcorp.com'),(17,'Prakash Gautam','E89',1,2,'Gurgaon',8964257728,'parakash@wavenetcorp.com'),(18,'Sumir Jha','E90',1,2,'Sec-44 Gurgaon',867365243,'sumir@wavenetcorp.com'),(19,'Ravi Pardi','E91',1,2,'Sec 50 Gurgaon',9783928873,'ravi@wavenetcorp.com'),(20,'Puneet','E92',1,2,'Sec-44',8746352435,'puneet@wavenetcorp.com'),(21,'Arjun','E93',1,2,'Sec-44 Gurgaon',8878765612,'arjun@wavenetcorp.com');
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
-- Table structure for table `map_testBeacon_receiver`
--

DROP TABLE IF EXISTS `map_testBeacon_receiver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_testBeacon_receiver` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `beaconId` int(32) DEFAULT NULL,
  `receiverId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_testBeacon` (`beaconId`),
  CONSTRAINT `map_testBeacon_receiver_ibfk_1` FOREIGN KEY (`beaconId`) REFERENCES `device_detail` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_testBeacon_receiver`
--

LOCK TABLES `map_testBeacon_receiver` WRITE;
/*!40000 ALTER TABLE `map_testBeacon_receiver` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_testBeacon_receiver` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_zone`
--

LOCK TABLES `map_user_zone` WRITE;
/*!40000 ALTER TABLE `map_user_zone` DISABLE KEYS */;
INSERT INTO `map_user_zone` VALUES (43,1,7),(44,2,7),(45,7,7),(46,16,6),(47,12,6),(48,17,6),(49,13,6),(50,11,6),(51,14,7),(52,3,7),(53,10,7),(54,21,7),(55,21,6),(56,19,6),(57,18,7),(58,20,6);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour`
--

LOCK TABLES `node_neighbour` WRITE;
/*!40000 ALTER TABLE `node_neighbour` DISABLE KEYS */;
INSERT INTO `node_neighbour` VALUES (39,3,1,-58,7),(40,3,5,-54,7),(41,4,2,-66,7),(42,4,6,-62,7),(43,7,5,-53,6),(44,7,9,-58,6),(45,8,10,-55,6),(46,8,6,-61,6);
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
INSERT INTO `userInfo` VALUES (1,'Admin Wavenet',8826644268,'Sec 46 Gurgaon',0,'admin@wavenetcorp.com','$2a$10$cRtctTqisSiz75tAPOEqquV/VMDaXL/.jhGcSwGi8gL7roCwq8Uyy',NULL,NULL,NULL),(2,'Supervisor',8826644268,'Sec 46 Gurgaon',3,'supervisor@wavenetcorp.com','$2a$10$WLEZfL1WQvuThcMwSLIW7.Lv1xKw6vmOWcKTWYC8ZGrnj85BfB1bC',NULL,NULL,NULL);
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
INSERT INTO `zone_detail` VALUES (1,'HAE TEAM',1),(6,'SKILL BOX & APP DEV',10),(7,'SERVER & EMBEDDDED',10),(8,'CAFETERIA',10);
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

-- Dump completed on 2019-03-11 17:46:41
