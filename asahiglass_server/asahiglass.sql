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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail`
--

LOCK TABLES `device_detail` WRITE;
/*!40000 ALTER TABLE `device_detail` DISABLE KEYS */;
INSERT INTO `device_detail` VALUES (1,1,'beacon1','2332u2g34u23428',1),(3,1,'beacon2','2332u2g34u23423',2),(4,2,'Reciver1','2332u2g34u23424',NULL),(5,2,'Reciver2','2332u2g34u23426',NULL),(6,2,'Reciver3','2332u2g34u23421',NULL),(8,2,'Reciver4','2332u2g34u23422',NULL),(9,2,'Reciver5','2332u2g34u23427',NULL),(10,3,'Gateway1','2332u2g34u23417',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_detail`
--

LOCK TABLES `employee_detail` WRITE;
/*!40000 ALTER TABLE `employee_detail` DISABLE KEYS */;
INSERT INTO `employee_detail` VALUES (1,'Mushir Ahmed Siddiqui','E61',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'mushir@wavenetcorp.com'),(2,'Ajay Sharma','E62',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'ajay@wavenetcorp.com'),(3,'Rohit Soni','E63',2,2,'plot no. 105 ground floor, Sector 46 gurgaon',8826644268,'rohit@wavenetcorp.com');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_zone`
--

LOCK TABLES `map_user_zone` WRITE;
/*!40000 ALTER TABLE `map_user_zone` DISABLE KEYS */;
INSERT INTO `map_user_zone` VALUES (1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour`
--

LOCK TABLES `node_neighbour` WRITE;
/*!40000 ALTER TABLE `node_neighbour` DISABLE KEYS */;
INSERT INTO `node_neighbour` VALUES (1,9,4,-60,6),(2,9,5,-60,6),(3,9,6,-60,6),(4,9,8,-60,6);
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

-- Dump completed on 2019-01-31 14:11:54
