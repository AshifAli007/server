-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: localhost    Database: asahiGlass
-- ------------------------------------------------------
-- Server version	8.0.16

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
INSERT INTO `asset_attributes_key_1` VALUES (1,'[\"name\", \"uniqueId\"]');
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
  `subType` int(32) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `createDate` bigint(16) DEFAULT NULL,
  `asset_rule_id` int(32) DEFAULT NULL,
  `creatorId` int(32) DEFAULT NULL,
  `attribute_value` json DEFAULT NULL,
  `asset_image` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_1`
--

LOCK TABLES `asset_detail_1` WRITE;
/*!40000 ALTER TABLE `asset_detail_1` DISABLE KEYS */;
INSERT INTO `asset_detail_1` VALUES (1,1,NULL,'Harindar','E23',1559204344085,NULL,1,'{\"name\": \"Harindar\", \"uniqueId\": \"E23\"}','1.jpg'),(2,1,NULL,'ajay','2',1559204502136,NULL,1,'{\"name\": \"ajay\", \"uniqueId\": \"2\"}','2.jpg'),(3,1,NULL,'sonu','3',1559204550342,NULL,1,'{\"name\": \"sonu\", \"uniqueId\": \"3\"}','3.jpg'),(4,1,NULL,'soni','4',1559204578852,NULL,1,'{\"name\": \"soni\", \"uniqueId\": \"4\"}','4.jpg'),(5,1,NULL,'murgan','5',1559204598648,NULL,1,'{\"name\": \"murgan\", \"uniqueId\": \"5\"}','5.jpg');
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
INSERT INTO `asset_subType_detail_1` VALUES (1,'Manager','1'),(2,'SSE','1'),(3,'TL','1');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_zone_mapping_1`
--

LOCK TABLES `asset_zone_mapping_1` WRITE;
/*!40000 ALTER TABLE `asset_zone_mapping_1` DISABLE KEYS */;
INSERT INTO `asset_zone_mapping_1` VALUES (1,1,1),(2,2,1),(3,3,1),(4,3,2),(5,4,2),(6,5,2);
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
  `pubAddress` varchar(64) DEFAULT NULL,
  `subAddress` varchar(64) DEFAULT NULL,
  `healthAddress` varchar(64) DEFAULT NULL,
  `network_key` varchar(64) DEFAULT NULL,
  `networkId` int(32) DEFAULT NULL,
  `nodeType` int(8) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  `x_axis` int(32) DEFAULT NULL,
  `y_axis` int(32) DEFAULT NULL,
  `z_axis` int(32) DEFAULT NULL,
  `nodeStatusTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  UNIQUE KEY `genericId` (`genericId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_1`
--

LOCK TABLES `device_detail_1` WRITE;
/*!40000 ALTER TABLE `device_detail_1` DISABLE KEYS */;
INSERT INTO `device_detail_1` VALUES (1,3,'Device_1','30aea41efadd',0,NULL,NULL,1559196627270,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1559313536067),(2,2,'Node9','f77bbb7e0c22',0,NULL,17,1559197394865,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,2,3,1559313414469),(3,2,'Node10','ee4f9164b274',0,NULL,18,1559199341223,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,2,3,1559312018789),(4,2,'Node11','ec1fce58bb4',0,NULL,19,1559199375414,'cff51c2a6cb3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,2,3,NULL),(5,2,'Node12','d0c8d87a933e',0,NULL,20,1559199408576,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,2,3,1559313298209),(6,2,'Node13','f6636f8cc7e1',0,NULL,21,1559199452738,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,2,3,1559313315282),(7,2,'node14','e9a419fcd555',0,NULL,22,1559200842577,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,2,3,1559312183786),(8,2,'node15','fedcfdc42d80',0,NULL,23,1559200887273,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,2,3,1559313469979),(9,2,'node16','c2bc84d3d34fcb',0,NULL,24,1559200935236,'cff51c2a6cb3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,2,3,NULL),(10,2,'node17','de2d8c3ee545',0,NULL,25,1559201015647,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,2,3,1559313224673),(11,2,'node18','f0c8a4daa8ad',0,NULL,30,1559201050413,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,2,1,2,3,1559313565668),(12,9,'prov_gateway','30AEA41EF9A4',0,NULL,NULL,1559205500768,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,1,'sdsds','c2011d0000f0',0,1,NULL,1559215360131,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,1,'kjh','c2011d0000e8',0,2,NULL,1559215425541,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,1,'yugjg','c2011d0000dd',0,3,NULL,1559215473334,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,1,'ghfjh','c2011d0000fa',0,4,NULL,1559215503801,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,4,'test1','c2011d0000ea',0,NULL,NULL,1559218973925,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
INSERT INTO `floor_plan_1` VALUES (1,'Wavenet(Ground Floor)',0,'Wavenet(Ground Floor).jpg',NULL,NULL,1);
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
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour_detail_1`
--

LOCK TABLES `node_neighbour_detail_1` WRITE;
/*!40000 ALTER TABLE `node_neighbour_detail_1` DISABLE KEYS */;
INSERT INTO `node_neighbour_detail_1` VALUES (9,21,17,-63,1,1),(10,21,18,-54,1,1),(11,21,19,-60,1,1),(12,21,20,-62,1,1),(13,30,23,-56,2,1),(14,30,22,-62,2,1),(15,30,25,-44,2,1),(16,30,24,-58,2,1);
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
INSERT INTO `privilegeUser` VALUES (1,'Mushir Ahmed Siddiqui',0,'superadmin@wavenetcorp.com','$2a$10$sOyaMl3it324UjPmPM3Qg.dQbHIrTUQXlT34NQBIXnEjfVMkKHOcW',NULL);
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
INSERT INTO `userInfo_1` VALUES (1,'Test Wavenet',1,'test@wavenetcorp.com',8826644268,'$2a$10$gLn.9nvqprJjWGH9ey7qAOVgbk2SenGsUM6FC/EQ94Iu3JoV2mNqG','Sec46',NULL,NULL,NULL,NULL);
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
INSERT INTO `zone_detail_1` VALUES (1,NULL,NULL,'Back_Zone',23,'Back_Zone.png',1,'[{\"x\": 947, \"y\": 36}, {\"x\": 1016, \"y\": 38}, {\"x\": 1027, \"y\": 91}, {\"x\": 993, \"y\": 95}, {\"x\": 997, \"y\": 119}, {\"x\": 1042, \"y\": 125}, {\"x\": 1097, \"y\": 365}, {\"x\": 892, \"y\": 358}, {\"x\": 862, \"y\": 119}, {\"x\": 966, \"y\": 119}]',1201,1010,NULL),(2,NULL,NULL,'Front_Zone',10,'Front_Zone.jpg',1,'[{\"x\": 608, \"y\": 263}, {\"x\": 877, \"y\": 267}, {\"x\": 890, \"y\": 359}, {\"x\": 1095, \"y\": 366}, {\"x\": 1113, \"y\": 444}, {\"x\": 905, \"y\": 443}, {\"x\": 914, \"y\": 548}, {\"x\": 611, \"y\": 550}]',1201,1010,NULL);
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

-- Dump completed on 2019-06-02 17:31:51
