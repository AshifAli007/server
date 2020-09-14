-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: localhost    Database: asahiGlassdev
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
-- Table structure for table `asset_attribute_value_2`
--

DROP TABLE IF EXISTS `asset_attribute_value_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attribute_value_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `keyId` int(32) DEFAULT NULL,
  `value` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attribute_value_2`
--

LOCK TABLES `asset_attribute_value_2` WRITE;
/*!40000 ALTER TABLE `asset_attribute_value_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_attribute_value_2` ENABLE KEYS */;
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
-- Table structure for table `asset_attributes_key_2`
--

DROP TABLE IF EXISTS `asset_attributes_key_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attributes_key_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `attribute_key` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attributes_key_2`
--

LOCK TABLES `asset_attributes_key_2` WRITE;
/*!40000 ALTER TABLE `asset_attributes_key_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_attributes_key_2` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_1`
--

LOCK TABLES `asset_detail_1` WRITE;
/*!40000 ALTER TABLE `asset_detail_1` DISABLE KEYS */;
INSERT INTO `asset_detail_1` VALUES (1,1,NULL,'Harindar','E23',1559204344085,NULL,1,'{\"name\": \"Harindar\", \"uniqueId\": \"E23\"}','1.jpg'),(2,1,NULL,'ajay','E2',1559204502136,NULL,1,'{\"name\": \"ajay\", \"uniqueId\": \"2\"}','2.jpg'),(3,1,NULL,'sonu','E3',1559204550342,NULL,1,'{\"name\": \"sonu\", \"uniqueId\": \"3\"}','3.jpg'),(4,1,NULL,'soni','E4',1559204578852,NULL,1,'{\"name\": \"soni\", \"uniqueId\": \"4\"}','4.jpg'),(5,1,NULL,'murgan','E5',1559204598648,NULL,1,'{\"name\": \"murgan\", \"uniqueId\": \"5\"}','5.jpg'),(6,1,NULL,'user11','11',1559625479707,NULL,1,'{\"name\": \"user11\", \"uniqueId\": \"11\"}','6.jpg'),(7,1,NULL,'user12','12',1559628258335,NULL,1,'{\"name\": \"user12\", \"uniqueId\": \"12\"}','7.jpg'),(8,1,NULL,'user13','13',1559628509315,NULL,1,'{\"name\": \"user13\", \"uniqueId\": \"13\"}','8.jpg'),(9,1,NULL,'user14','14',1559628805903,NULL,1,'{\"name\": \"user14\", \"uniqueId\": \"14\"}','9.jpg'),(10,1,NULL,'user15','15',1559628823668,NULL,1,'{\"name\": \"user15\", \"uniqueId\": \"15\"}','10.jpg'),(11,1,NULL,'user16','16',1559628836112,NULL,1,'{\"name\": \"user16\", \"uniqueId\": \"16\"}','11.jpg'),(12,1,NULL,'user17','17',1559628881562,NULL,1,'{\"name\": \"user17\", \"uniqueId\": \"17\"}','12.jpg'),(13,1,NULL,'user18','18',1559628891035,NULL,1,'{\"name\": \"user18\", \"uniqueId\": \"18\"}','13.jpg'),(14,1,NULL,'user19','19',1559628901360,NULL,1,'{\"name\": \"user19\", \"uniqueId\": \"19\"}','14.jpg'),(15,1,NULL,'user20','20',1559628916484,NULL,1,'{\"name\": \"user20\", \"uniqueId\": \"20\"}','15.jpg'),(16,1,NULL,'user21','21',1559628940299,NULL,1,'{\"name\": \"user21\", \"uniqueId\": \"21\"}','16.jpg'),(17,1,NULL,'user22','22',1559628953541,NULL,1,'{\"name\": \"user22\", \"uniqueId\": \"22\"}','17.jpg'),(18,1,NULL,'user23','23',1559628964406,NULL,1,'{\"name\": \"user23\", \"uniqueId\": \"23\"}','18.jpg'),(19,1,NULL,'user24','24',1559628975705,NULL,1,'{\"name\": \"user24\", \"uniqueId\": \"24\"}','19.jpg'),(20,1,NULL,'user25','25',1559628985740,NULL,1,'{\"name\": \"user25\", \"uniqueId\": \"25\"}','20.jpg'),(21,1,NULL,'user26','26',1559629000847,NULL,1,'{\"name\": \"user26\", \"uniqueId\": \"26\"}','21.jpg'),(22,1,NULL,'user27','27',1559629082560,NULL,1,'{\"name\": \"user27\", \"uniqueId\": \"27\"}','22.jpg'),(23,1,NULL,'user28','28',1559629092727,NULL,1,'{\"name\": \"user28\", \"uniqueId\": \"28\"}','23.jpg'),(24,1,NULL,'user29','29',1559629102354,NULL,1,'{\"name\": \"user29\", \"uniqueId\": \"29\"}','24.jpg'),(25,1,NULL,'user30','30',1559629115337,NULL,1,'{\"name\": \"user30\", \"uniqueId\": \"30\"}','25.jpg');
/*!40000 ALTER TABLE `asset_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_detail_2`
--

DROP TABLE IF EXISTS `asset_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_detail_2` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_2`
--

LOCK TABLES `asset_detail_2` WRITE;
/*!40000 ALTER TABLE `asset_detail_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_detail_2` ENABLE KEYS */;
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
-- Table structure for table `asset_subType_detail_2`
--

DROP TABLE IF EXISTS `asset_subType_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_subType_detail_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `assetTypeId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_subType_detail_2`
--

LOCK TABLES `asset_subType_detail_2` WRITE;
/*!40000 ALTER TABLE `asset_subType_detail_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_subType_detail_2` ENABLE KEYS */;
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
-- Table structure for table `asset_type_list_2`
--

DROP TABLE IF EXISTS `asset_type_list_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_type_list_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetTypeName` varchar(128) DEFAULT NULL,
  `attributes_id` int(32) DEFAULT NULL,
  `icon` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_type_list_2`
--

LOCK TABLES `asset_type_list_2` WRITE;
/*!40000 ALTER TABLE `asset_type_list_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_type_list_2` ENABLE KEYS */;
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
-- Table structure for table `asset_zone_mapping_2`
--

DROP TABLE IF EXISTS `asset_zone_mapping_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_zone_mapping_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_zone_mapping_2`
--

LOCK TABLES `asset_zone_mapping_2` WRITE;
/*!40000 ALTER TABLE `asset_zone_mapping_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_zone_mapping_2` ENABLE KEYS */;
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
-- Table structure for table `bus_detail_2`
--

DROP TABLE IF EXISTS `bus_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bus_detail_2` (
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
-- Dumping data for table `bus_detail_2`
--

LOCK TABLES `bus_detail_2` WRITE;
/*!40000 ALTER TABLE `bus_detail_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus_detail_2` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_detail`
--

LOCK TABLES `company_detail` WRITE;
/*!40000 ALTER TABLE `company_detail` DISABLE KEYS */;
INSERT INTO `company_detail` VALUES (1,'Wavenet Solution','Sec 44','www.wavenetcorp.com',1,'logo.png'),(2,'Wavenet App','Sec 44','www.wavenetcorp.com',1,'logo.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_1`
--

LOCK TABLES `device_detail_1` WRITE;
/*!40000 ALTER TABLE `device_detail_1` DISABLE KEYS */;
INSERT INTO `device_detail_1` VALUES (1,3,'Device_1','30aea41efadd',0,NULL,NULL,1559196627270,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1560437462477),(2,2,'Node9','f77bbb7e0c22',0,NULL,17,1559197394865,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,2,3,1560936805901),(3,2,'Node10','ee4f9164b274',0,NULL,18,1559199341223,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,2,3,1560936805896),(4,2,'Node11','ec1fce58bb4',0,NULL,19,1559199375414,'cff51c2a6cb3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,2,3,NULL),(5,2,'Node12','d0c8d87a933e',0,NULL,20,1559199408576,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,2,3,1560936805890),(6,2,'Node13','f6636f8cc7e1',0,NULL,21,1559199452738,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,2,3,1560936506110),(7,2,'node14','e9a419fcd555',0,NULL,22,1559200842577,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,2,3,1560936805902),(8,2,'node15','fedcfdc42d80',0,NULL,23,1559200887273,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,2,3,1560936805898),(9,2,'node16','c2bc84d3d34fcb',0,NULL,24,1559200935236,'cff51c2a6cb3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,2,3,NULL),(10,2,'node17','de2d8c3ee545',0,NULL,25,1559201015647,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,2,3,1560936805900),(11,2,'node18','f0c8a4daa8ad',0,NULL,30,1559201050413,'cff51c2a6cb3',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,2,1,2,3,1560936805894),(12,9,'prov_gateway','30AEA41EF9A4',0,NULL,NULL,1559205500768,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,1,'sdsds','c2011d0000f0',0,1,NULL,1559215360131,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,1,'kjh','c2011d0000e8',0,2,NULL,1559215425541,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,1,'yugjg','c2011d0000dd',0,3,NULL,1559215473334,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,1,'ghfjh','c2011d0000fa',0,4,NULL,1559215503801,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,4,'test1','c2011d0000ea',0,NULL,NULL,1559218973925,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,1,'user30','c2011d0001b6',0,25,NULL,1559629473760,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,1,'user29','c2011d0001c2',0,24,NULL,1559629496717,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,1,'user28','c2011d0000f6',0,23,NULL,1559629532655,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,1,'user27','c2011d0000f5',0,22,NULL,1559629566729,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,1,'user26','c2011d0001bf',0,21,NULL,1559629594252,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,1,'user25','c2011d0001b3',0,20,NULL,1559629690994,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,1,'user24','c2011d0001bd',0,19,NULL,1559629717162,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,1,'user23','c2011d0001be',0,18,NULL,1559629791694,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,1,'user22','c2011d0001b9',0,17,NULL,1559629820338,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,1,'user21','c2011d0000f4',0,16,NULL,1559629901889,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,1,'user20','c2011d0001c1',0,15,NULL,1559629974936,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,1,'user19','c2011d0001c0',0,14,NULL,1559630005508,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,1,'user18','c2011d0001bb',0,13,NULL,1559630032160,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,1,'user17','c2011d0001b8',0,12,NULL,1559630120147,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,1,'user16','c2011d0001b4',0,11,NULL,1559630168986,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,1,'user15','c2011d0001b2',0,10,NULL,1559630191068,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,1,'user14','c2011d0001bc',0,9,NULL,1559630213915,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,1,'user13','c2011d0001b1',0,8,NULL,1559630239266,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(37,1,'user12','c2011d0001b0',0,7,NULL,1559631237562,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,1,'user11','c2011d0000f2',0,6,NULL,1559631290612,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(39,9,'Test 1','807D3AA5E46C',0,NULL,NULL,1560341418812,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(40,9,'rohit-test','807D3AA5E4B4',0,NULL,NULL,1560401450148,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(41,3,'new_zone_gateway','807d3aa5e4a1',0,NULL,NULL,1560498598382,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1560938225530);
/*!40000 ALTER TABLE `device_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_detail_2`
--

DROP TABLE IF EXISTS `device_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `device_detail_2` (
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_2`
--

LOCK TABLES `device_detail_2` WRITE;
/*!40000 ALTER TABLE `device_detail_2` DISABLE KEYS */;
INSERT INTO `device_detail_2` VALUES (1,3,'Zone Gateway 1','7BAA900B',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CAFA','CAFE','CAFB',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,3,'Zone Gateway 2','7BAA900D',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CAFA','CAFE','CAFB',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `device_detail_2` ENABLE KEYS */;
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
-- Table structure for table `floor_plan_2`
--

DROP TABLE IF EXISTS `floor_plan_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `floor_plan_2` (
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
-- Dumping data for table `floor_plan_2`
--

LOCK TABLES `floor_plan_2` WRITE;
/*!40000 ALTER TABLE `floor_plan_2` DISABLE KEYS */;
INSERT INTO `floor_plan_2` VALUES (1,'Ground',0,'Ground.jpg',NULL,NULL,1);
/*!40000 ALTER TABLE `floor_plan_2` ENABLE KEYS */;
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
-- Table structure for table `food_cart_detail_2`
--

DROP TABLE IF EXISTS `food_cart_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_cart_detail_2` (
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
-- Dumping data for table `food_cart_detail_2`
--

LOCK TABLES `food_cart_detail_2` WRITE;
/*!40000 ALTER TABLE `food_cart_detail_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_cart_detail_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_controlroomgw_zone_1`
--

DROP TABLE IF EXISTS `map_controlroomgw_zone_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_controlroomgw_zone_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `controllroomId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_controlroomgw_zone_1`
--

LOCK TABLES `map_controlroomgw_zone_1` WRITE;
/*!40000 ALTER TABLE `map_controlroomgw_zone_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_controlroomgw_zone_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_controlroomgw_zone_2`
--

DROP TABLE IF EXISTS `map_controlroomgw_zone_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_controlroomgw_zone_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `controllroomId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_controlroomgw_zone_2`
--

LOCK TABLES `map_controlroomgw_zone_2` WRITE;
/*!40000 ALTER TABLE `map_controlroomgw_zone_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_controlroomgw_zone_2` ENABLE KEYS */;
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
-- Table structure for table `map_testBeacon_receiver_2`
--

DROP TABLE IF EXISTS `map_testBeacon_receiver_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_testBeacon_receiver_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `testBeaconId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_testBeacon_receiver_2`
--

LOCK TABLES `map_testBeacon_receiver_2` WRITE;
/*!40000 ALTER TABLE `map_testBeacon_receiver_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_testBeacon_receiver_2` ENABLE KEYS */;
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
-- Table structure for table `map_user_floor_2`
--

DROP TABLE IF EXISTS `map_user_floor_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_user_floor_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_floor_2`
--

LOCK TABLES `map_user_floor_2` WRITE;
/*!40000 ALTER TABLE `map_user_floor_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_user_floor_2` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour_detail_1`
--

LOCK TABLES `node_neighbour_detail_1` WRITE;
/*!40000 ALTER TABLE `node_neighbour_detail_1` DISABLE KEYS */;
INSERT INTO `node_neighbour_detail_1` VALUES (17,30,23,-57,2,41),(18,30,22,-66,2,41),(19,30,24,-53,2,41),(20,30,25,-62,2,41),(29,21,20,-65,1,41),(30,21,19,-71,1,41),(31,21,18,-60,1,41),(32,21,17,-70,1,41),(45,33,22,-63,2,41),(46,33,23,-54,2,41),(47,33,24,-52,2,41),(48,33,25,-53,2,41);
/*!40000 ALTER TABLE `node_neighbour_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `node_neighbour_detail_2`
--

DROP TABLE IF EXISTS `node_neighbour_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `node_neighbour_detail_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `nodeId` int(32) DEFAULT NULL,
  `neighbourNodeId` int(32) DEFAULT NULL,
  `neighbourRssi` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour_detail_2`
--

LOCK TABLES `node_neighbour_detail_2` WRITE;
/*!40000 ALTER TABLE `node_neighbour_detail_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `node_neighbour_detail_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_argument_list_1`
--

DROP TABLE IF EXISTS `policy_argument_list_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_argument_list_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `policy_list_id` int(32) DEFAULT NULL,
  `argument` json DEFAULT NULL,
  `identifier` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_argument_list_1`
--

LOCK TABLES `policy_argument_list_1` WRITE;
/*!40000 ALTER TABLE `policy_argument_list_1` DISABLE KEYS */;
INSERT INTO `policy_argument_list_1` VALUES (15,2,'{\"1\": \"Back_Zone\", \"2\": \"Front_Zone\"}','11'),(23,2,'{\"1\": \"Back_Zone\"}','12'),(24,2,'{\"2\": \"Front_Zone\"}','13'),(25,2,'{\"1\": \"Back_Zone\", \"2\": \"Front_Zone\"}','14'),(26,2,'{\"2\": \"Front_Zone\"}','15'),(27,2,'{\"1\": \"Back_Zone\"}','16'),(28,2,'{\"2\": \"Front_Zone\"}','17'),(29,2,'{\"1\": \"Back_Zone\", \"2\": \"Front_Zone\"}','18'),(30,2,'{\"1\": \"Back_Zone\", \"2\": \"Front_Zone\"}','19'),(31,2,'{\"1\": \"Back_Zone\", \"2\": \"Front_Zone\"}','20'),(32,2,'{\"2\": \"Front_Zone\"}','21'),(33,2,'{\"2\": \"Front_Zone\"}','22'),(34,2,'{\"1\": \"Back_Zone\"}','23'),(35,2,'{\"2\": \"Front_Zone\"}','24'),(36,2,'{\"1\": \"Back_Zone\"}','25'),(37,2,'{\"1\": \"Back_Zone\"}','26'),(38,2,'{\"2\": \"Front_Zone\"}','27'),(39,2,'{\"1\": \"Back_Zone\"}','28'),(40,2,'{\"1\": \"Back_Zone\"}','30'),(41,2,'{\"1\": \"Back_Zone\", \"2\": \"Front_Zone\"}','E23'),(42,2,'{\"1\": \"Back_Zone\", \"2\": \"Front_Zone\"}','E2'),(43,2,'{\"1\": \"Back_Zone\"}','E3'),(44,2,'{\"2\": \"Front_Zone\"}','E4'),(45,2,'{\"1\": \"Back_Zone\"}','E5'),(46,1,'1000000','1'),(47,1,'10000000','2');
/*!40000 ALTER TABLE `policy_argument_list_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_argument_list_2`
--

DROP TABLE IF EXISTS `policy_argument_list_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_argument_list_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `policy_list_id` int(32) DEFAULT NULL,
  `argument` json DEFAULT NULL,
  `identifier` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_argument_list_2`
--

LOCK TABLES `policy_argument_list_2` WRITE;
/*!40000 ALTER TABLE `policy_argument_list_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy_argument_list_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_list`
--

DROP TABLE IF EXISTS `policy_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_list` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `opretor` varchar(64) DEFAULT NULL,
  `message` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_list`
--

LOCK TABLES `policy_list` WRITE;
/*!40000 ALTER TABLE `policy_list` DISABLE KEYS */;
INSERT INTO `policy_list` VALUES (1,1,'Zone Max Count','>','Zone Max Count Reached'),(2,2,'Allowed Zone For Asset','in','Restricted Area');
/*!40000 ALTER TABLE `policy_list` ENABLE KEYS */;
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
INSERT INTO `privilegeUser` VALUES (1,'Super Admin',0,'superadmin@wavenetcorp.com','$2a$10$JMgimKFHpN9CdpxMyVz8J.dr8RBm9Me1pHknqqBTrzFkhoTS7f/A6',NULL);
/*!40000 ALTER TABLE `privilegeUser` ENABLE KEYS */;
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
INSERT INTO `userInfo_1` VALUES (1,'Test Wavenet',1,'test@wavenetcorp.com',8826644268,'$2a$10$r9V9bPgxbgZ91rAO4OAo4eM2fP1P8f0UGJkqVrnw9AXWqg3GMuTQG','Sec 46',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `userInfo_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userInfo_2`
--

DROP TABLE IF EXISTS `userInfo_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userInfo_2` (
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
-- Dumping data for table `userInfo_2`
--

LOCK TABLES `userInfo_2` WRITE;
/*!40000 ALTER TABLE `userInfo_2` DISABLE KEYS */;
INSERT INTO `userInfo_2` VALUES (1,'Rohit Kumar',1,'rohit.kumar@wavenetcorp.com',8826644268,'$2a$10$ShtIVpDX76CZ6uFXYwbMfuUJ18PQMtMKPxICrxae2ySXFAgfJFAsG','sec 44',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `userInfo_2` ENABLE KEYS */;
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
  `led` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `led` (`led`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_1`
--

LOCK TABLES `zone_detail_1` WRITE;
/*!40000 ALTER TABLE `zone_detail_1` DISABLE KEYS */;
INSERT INTO `zone_detail_1` VALUES (1,NULL,NULL,'Back_Zone',23,'Back_Zone.png',1,'[{\"x\": 947, \"y\": 36}, {\"x\": 1016, \"y\": 38}, {\"x\": 1027, \"y\": 91}, {\"x\": 993, \"y\": 95}, {\"x\": 997, \"y\": 119}, {\"x\": 1042, \"y\": 125}, {\"x\": 1097, \"y\": 365}, {\"x\": 892, \"y\": 358}, {\"x\": 862, \"y\": 119}, {\"x\": 966, \"y\": 119}]',1201,1010,NULL,NULL),(2,NULL,NULL,'Front_Zone',10,'Front_Zone.jpg',1,'[{\"x\": 608, \"y\": 263}, {\"x\": 877, \"y\": 267}, {\"x\": 890, \"y\": 359}, {\"x\": 1095, \"y\": 366}, {\"x\": 1113, \"y\": 444}, {\"x\": 905, \"y\": 443}, {\"x\": 914, \"y\": 548}, {\"x\": 611, \"y\": 550}]',1201,1010,NULL,NULL),(3,NULL,NULL,'Independent_Zone',NULL,'Independent_Zone.jpg',1,'[{\"x\": 332, \"y\": 123.5}, {\"x\": 424, \"y\": 121.5}, {\"x\": 415, \"y\": 174.5}, {\"x\": 325, \"y\": 175.5}]',1201,1010,NULL,6);
/*!40000 ALTER TABLE `zone_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone_detail_2`
--

DROP TABLE IF EXISTS `zone_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `zone_detail_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `isCritical` int(8) DEFAULT NULL,
  `led` int(32) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `maxUsers` int(8) DEFAULT NULL,
  `zone_image` varchar(64) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  `zone_crood` json DEFAULT NULL,
  `zone_width` int(32) DEFAULT NULL,
  `zone_height` int(32) DEFAULT NULL,
  `zone_rule_id` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `led` (`led`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_2`
--

LOCK TABLES `zone_detail_2` WRITE;
/*!40000 ALTER TABLE `zone_detail_2` DISABLE KEYS */;
INSERT INTO `zone_detail_2` VALUES (1,NULL,NULL,1,'Lab',12,'Lab.jpg',1,'[{\"x\": 606, \"y\": 264.1999969482422}, {\"x\": 875, \"y\": 263.1999969482422}, {\"x\": 890, \"y\": 358.1999969482422}, {\"x\": 1096, \"y\": 359.1999969482422}, {\"x\": 1112, \"y\": 443.1999969482422}, {\"x\": 903, \"y\": 444.1999969482422}, {\"x\": 917, \"y\": 551.1999969482422}, {\"x\": 608, \"y\": 547.1999969482422}]',1201,1010,NULL),(2,NULL,NULL,2,'Cafeteria',12,'Cafeteria.png',1,'[{\"x\": 861, \"y\": 123.1999969482422}, {\"x\": 1039, \"y\": 122.1999969482422}, {\"x\": 1093, \"y\": 363.1999969482422}, {\"x\": 893, \"y\": 361.1999969482422}]',1201,1010,NULL);
/*!40000 ALTER TABLE `zone_detail_2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 10:23:28
