-- MySQL dump 10.13  Distrib 8.0.15, for Linux (x86_64)
--
-- Host: localhost    Database: asahiGlass
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asset_attribute_value_1`
--

DROP TABLE IF EXISTS `asset_attribute_value_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attribute_value_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `keyId` int(32) DEFAULT NULL,
  `value` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attribute_value_1`
--

LOCK TABLES `asset_attribute_value_1` WRITE;
/*!40000 ALTER TABLE `asset_attribute_value_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_attribute_value_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_attributes_key_1`
--

DROP TABLE IF EXISTS `asset_attributes_key_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attributes_key_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `attribute_key` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attributes_key_1`
--

LOCK TABLES `asset_attributes_key_1` WRITE;
/*!40000 ALTER TABLE `asset_attributes_key_1` DISABLE KEYS */;
INSERT INTO `asset_attributes_key_1` VALUES (1,'[\"name\", \"uniqueId\", \"Email\", \"Contact\", \"Address\"]');
/*!40000 ALTER TABLE `asset_attributes_key_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_detail_1`
--

DROP TABLE IF EXISTS `asset_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(32) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `createDate` bigint(16) DEFAULT NULL,
  `asset_rule_id` int(32) DEFAULT NULL,
  `creatorId` int(32) DEFAULT NULL,
  `attribute_value` json DEFAULT NULL,
  `asset_image` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_1`
--

LOCK TABLES `asset_detail_1` WRITE;
/*!40000 ALTER TABLE `asset_detail_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_subType_detail_1`
--

DROP TABLE IF EXISTS `asset_subType_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_subType_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `assetTypeId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_subType_detail_1`
--

LOCK TABLES `asset_subType_detail_1` WRITE;
/*!40000 ALTER TABLE `asset_subType_detail_1` DISABLE KEYS */;
INSERT INTO `asset_subType_detail_1` VALUES (1,'Manager','1'),(2,'Labor','1'),(3,'HR','1');
/*!40000 ALTER TABLE `asset_subType_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_type_list_1`
--

DROP TABLE IF EXISTS `asset_type_list_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_type_list_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetTypeName` varchar(128) DEFAULT NULL,
  `attributes_id` int(32) DEFAULT NULL,
  `icon` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_type_list_1`
--

LOCK TABLES `asset_type_list_1` WRITE;
/*!40000 ALTER TABLE `asset_type_list_1` DISABLE KEYS */;
INSERT INTO `asset_type_list_1` VALUES (1,'Employee',1,'fas fa-user');
/*!40000 ALTER TABLE `asset_type_list_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_zone_mapping_1`
--

DROP TABLE IF EXISTS `asset_zone_mapping_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_zone_mapping_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_zone_mapping_1`
--

LOCK TABLES `asset_zone_mapping_1` WRITE;
/*!40000 ALTER TABLE `asset_zone_mapping_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_zone_mapping_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_detail_1`
--

DROP TABLE IF EXISTS `bus_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bus_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `busNo` varchar(64) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `venderName` varchar(64) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`),
  UNIQUE KEY `busNo` (`busNo`),
  UNIQUE KEY `gatewayId` (`gatewayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_detail_1`
--

LOCK TABLES `bus_detail_1` WRITE;
/*!40000 ALTER TABLE `bus_detail_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_detail`
--

DROP TABLE IF EXISTS `company_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_detail` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `website` varchar(128) DEFAULT NULL,
  `contactPerson` int(32) DEFAULT NULL,
  `logo` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_detail`
--

LOCK TABLES `company_detail` WRITE;
/*!40000 ALTER TABLE `company_detail` DISABLE KEYS */;
INSERT INTO `company_detail` VALUES (1,'Wavenet Solution','Sec 44','www.wavenetcorp.com',1,'logo.png');
/*!40000 ALTER TABLE `company_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_detail_1`
--

DROP TABLE IF EXISTS `device_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `device_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `deviceType` int(8) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `serial` varchar(64) DEFAULT NULL,
  `isBuzz` int(8) DEFAULT NULL,
  `assetId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  `createDate` bigint(16) DEFAULT NULL,
  `gwSerial` varchar(64) DEFAULT NULL,
  `battery` int(128) DEFAULT NULL,
  `nodeStatus` int(8) DEFAULT NULL,
  `creatorId` int(32) DEFAULT NULL,
  `genericId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  UNIQUE KEY `gwSerial` (`gwSerial`),
  UNIQUE KEY `genericId` (`genericId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_1`
--

LOCK TABLES `device_detail_1` WRITE;
/*!40000 ALTER TABLE `device_detail_1` DISABLE KEYS */;
INSERT INTO `device_detail_1` VALUES (1,3,'Sonu Gatway','30aea41efae5',0,NULL,NULL,1557467638774,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `device_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floor_plan_1`
--

DROP TABLE IF EXISTS `floor_plan_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `floor_plan_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `floorNo` int(128) DEFAULT NULL,
  `floor_image` varchar(64) DEFAULT NULL,
  `object` varchar(64) DEFAULT NULL,
  `entity` varchar(64) DEFAULT NULL,
  `creatorId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floor_plan_1`
--

LOCK TABLES `floor_plan_1` WRITE;
/*!40000 ALTER TABLE `floor_plan_1` DISABLE KEYS */;
INSERT INTO `floor_plan_1` VALUES (1,'Wavenet Plant',0,'Wavenet Plant.jpg',NULL,NULL,1);
/*!40000 ALTER TABLE `floor_plan_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_cart_detail_1`
--

DROP TABLE IF EXISTS `food_cart_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_cart_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `foodCartNo` varchar(64) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `venderName` varchar(64) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`),
  UNIQUE KEY `gatewayId` (`gatewayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_cart_detail_1`
--

LOCK TABLES `food_cart_detail_1` WRITE;
/*!40000 ALTER TABLE `food_cart_detail_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_cart_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_testBeacon_receiver_1`
--

DROP TABLE IF EXISTS `map_testBeacon_receiver_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_testBeacon_receiver_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `testBeaconId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_testBeacon_receiver_1`
--

LOCK TABLES `map_testBeacon_receiver_1` WRITE;
/*!40000 ALTER TABLE `map_testBeacon_receiver_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_testBeacon_receiver_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_user_floor_1`
--

DROP TABLE IF EXISTS `map_user_floor_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_user_floor_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_floor_1`
--

LOCK TABLES `map_user_floor_1` WRITE;
/*!40000 ALTER TABLE `map_user_floor_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_user_floor_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `node_neighbour_detail_1`
--

DROP TABLE IF EXISTS `node_neighbour_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `node_neighbour_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `nodeId` int(32) DEFAULT NULL,
  `neighbourNodeId` int(32) DEFAULT NULL,
  `neighbourRssi` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  `companyId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour_detail_1`
--

LOCK TABLES `node_neighbour_detail_1` WRITE;
/*!40000 ALTER TABLE `node_neighbour_detail_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `node_neighbour_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_rule_list`
--

DROP TABLE IF EXISTS `policy_rule_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_rule_list` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `ruleType` int(8) DEFAULT NULL,
  `rule` varchar(64) DEFAULT NULL,
  `ruleArgument` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_rule_list`
--

LOCK TABLES `policy_rule_list` WRITE;
/*!40000 ALTER TABLE `policy_rule_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy_rule_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegeUser`
--

DROP TABLE IF EXISTS `privilegeUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `privilegeUser` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(128) DEFAULT NULL,
  `userType` int(8) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `lastLogInTime` int(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegeUser`
--

LOCK TABLES `privilegeUser` WRITE;
/*!40000 ALTER TABLE `privilegeUser` DISABLE KEYS */;
INSERT INTO `privilegeUser` VALUES (1,'Super Admin',0,'superadmin@waveetcorp.com','$2a$10$/Ugw.eqT6qEl1fU0HK3Inui.bGLtclwoB1xUQU.PvY/3WPae3Q9mO',NULL);
/*!40000 ALTER TABLE `privilegeUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rule_list_1`
--

DROP TABLE IF EXISTS `rule_list_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rule_list_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `policy_list_id` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rule_list_1`
--

LOCK TABLES `rule_list_1` WRITE;
/*!40000 ALTER TABLE `rule_list_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `rule_list_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userInfo_1`
--

DROP TABLE IF EXISTS `userInfo_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userInfo_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(128) DEFAULT NULL,
  `userType` int(8) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `contactNo` bigint(16) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `lastLogInTime` int(64) DEFAULT NULL,
  `profilPhoto` varchar(128) DEFAULT NULL,
  `fcmtokenKey` varchar(64) DEFAULT NULL,
  `creatorId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userInfo_1`
--

LOCK TABLES `userInfo_1` WRITE;
/*!40000 ALTER TABLE `userInfo_1` DISABLE KEYS */;
INSERT INTO `userInfo_1` VALUES (1,'Mushir Ahmed Siddiqui',1,'mushir@wavenetcorp.com',8826644268,'$2a$10$rVA1tWcEWQHeecnCh.DIRe66qPH17FCZiuQDyExLXw8ma.Nq5FIiy','Sec 46',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `userInfo_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone_detail_1`
--

DROP TABLE IF EXISTS `zone_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `zone_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `isCritical` int(8) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `maxUsers` int(8) DEFAULT NULL,
  `zone_image` varchar(64) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  `zone_crood` json DEFAULT NULL,
  `zone_width` int(32) DEFAULT NULL,
  `zone_height` int(32) DEFAULT NULL,
  `zone_rule_id` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_1`
--

LOCK TABLES `zone_detail_1` WRITE;
/*!40000 ALTER TABLE `zone_detail_1` DISABLE KEYS */;
INSERT INTO `zone_detail_1` VALUES (1,NULL,NULL,'Machine Room',120,'Machine Room.png',1,'[{\"x\": 661, \"y\": 364}, {\"x\": 589, \"y\": 367}, {\"x\": 589, \"y\": 303}, {\"x\": 850, \"y\": 303}, {\"x\": 855, \"y\": 340}, {\"x\": 662, \"y\": 346}]',1201,1010,NULL),(2,NULL,NULL,'Canteen',120,'Canteen.png',1,'[{\"x\": 417, \"y\": 560}, {\"x\": 423, \"y\": 511}, {\"x\": 502, \"y\": 512}, {\"x\": 502, \"y\": 560}]',1201,1010,NULL);
/*!40000 ALTER TABLE `zone_detail_1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-10 13:01:53
