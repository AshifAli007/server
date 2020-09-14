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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail`
--

LOCK TABLES `device_detail` WRITE;
/*!40000 ALTER TABLE `device_detail` DISABLE KEYS */;
INSERT INTO `device_detail` VALUES (1,1,'beacon1','2332u2g34u23428',1),(3,1,'beacon2','2332u2g34u23423',2),(4,2,'Reciver1','2332u2g34u23424',NULL),(5,2,'Reciver2','2332u2g34u23426',NULL),(6,2,'Reciver3','2332u2g34u23421',NULL),(8,2,'Reciver4','2332u2g34u23422',NULL),(9,2,'Reciver5','2332u2g34u23427',NULL),(10,3,'Gateway1','2332u2g34u23417',NULL),(11,1,'daadsd','dasd',3),(12,3,'Gateway2','97889asdas8du',NULL),(13,1,'Sanjay Device','1234567890',4),(14,2,'Reciver 6','m32ji2992j9X',NULL),(15,2,'Reciver 7','kasj678asduuasgd8yd',NULL),(16,2,'Reciver 8','dasjd8oasduas8das',NULL),(17,2,'Reciver 9','23234767823',NULL),(18,2,'Reciver 10','7676577653',NULL),(19,2,'Reciver 11','8789t768765das',NULL),(20,2,'Reciver 12','98789daih89asd',NULL),(21,2,'Reciver 13','8797s9ad87897',NULL),(22,2,'Reciver 14','dasyd8ia7sd8iauh',NULL),(23,2,'Reciver 15','asdi8as7d8a',NULL),(24,2,'Reciver 16','a78sd8asd',NULL),(25,2,'Reciver 17','asdkduy89aysd',NULL),(26,2,'ReciverZ1-1','daysid7a8s9d7',NULL),(27,2,'ReciverZ1-2','daysid7a8s9d8',NULL),(28,2,'ReciverZ1-3','daysid7a8s9d9',NULL),(29,2,'ReciverZ1-4','daysid7a8s9d10',NULL),(30,2,'ReciverZ1-5','daysid7a8s9d11',NULL),(31,1,'vijayBeacon','d87as89d7as',5);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_detail`
--

LOCK TABLES `employee_detail` WRITE;
/*!40000 ALTER TABLE `employee_detail` DISABLE KEYS */;
INSERT INTO `employee_detail` VALUES (1,'Mushir Ahmed Siddiqui','E61',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'mushir@wavenetcorp.com'),(2,'Ajay Sharma','E62',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'ajay@wavenetcorp.com'),(3,'Rohit Soni','E63',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'rohit@wavenetcorp.com'),(4,'Sanjay','E01',1,2,'Sec 50 Gurgaon',8826644268,'sanjay@wavenetcorp.com'),(5,'Vijay Chand','E45',1,2,'Sec-44',8826644268,'vijay.chand@wavenetcorp.com');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_zone`
--

LOCK TABLES `map_user_zone` WRITE;
/*!40000 ALTER TABLE `map_user_zone` DISABLE KEYS */;
INSERT INTO `map_user_zone` VALUES (1,1,1),(2,1,6),(3,4,6),(4,2,1),(5,3,1),(6,5,1);
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
  CONSTRAINT `node_neighbour_fk0` FOREIGN KEY (`nodeId`) REFERENCES `device_detail` (`nodeId`),
  CONSTRAINT `node_neighbour_fk1` FOREIGN KEY (`neighbourNodeId`) REFERENCES `device_detail` (`nodeId`),
  CONSTRAINT `node_neighbour_fk2` FOREIGN KEY (`zoneId`) REFERENCES `zone_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour`
--

LOCK TABLES `node_neighbour` WRITE;
/*!40000 ALTER TABLE `node_neighbour` DISABLE KEYS */;
INSERT INTO `node_neighbour` VALUES (1,9,4,-60,6),(2,9,5,-60,6),(3,9,6,-60,6),(4,9,8,-60,6),(5,9,14,-60,6),(6,9,15,-60,6),(7,9,16,-60,6),(8,9,17,-60,6),(9,9,18,-60,6),(10,9,19,-60,6),(11,9,20,-60,6),(12,9,21,-60,6),(13,9,22,-60,6),(14,9,23,-60,6),(15,9,24,-60,6),(16,9,25,-60,6),(17,26,27,-60,1),(18,26,28,-60,1),(19,26,29,-60,1),(20,26,30,-60,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail`
--

LOCK TABLES `zone_detail` WRITE;
/*!40000 ALTER TABLE `zone_detail` DISABLE KEYS */;
INSERT INTO `zone_detail` VALUES (1,'Zone 1',10),(6,'Zone 2',10),(7,'Zone 3',10);
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

-- Dump completed on 2019-02-04 15:06:30
