-- MySQL dump 10.13  Distrib 8.0.15, for Linux (x86_64)
--
-- Host: localhost    Database: asahiGlass2
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
-- Table structure for table `asset_attribute_value_3`
--

DROP TABLE IF EXISTS `asset_attribute_value_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attribute_value_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `keyId` int(32) DEFAULT NULL,
  `value` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attribute_value_3`
--

LOCK TABLES `asset_attribute_value_3` WRITE;
/*!40000 ALTER TABLE `asset_attribute_value_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_attribute_value_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_attribute_value_4`
--

DROP TABLE IF EXISTS `asset_attribute_value_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attribute_value_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `keyId` int(32) DEFAULT NULL,
  `value` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attribute_value_4`
--

LOCK TABLES `asset_attribute_value_4` WRITE;
/*!40000 ALTER TABLE `asset_attribute_value_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_attribute_value_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_attribute_value_5`
--

DROP TABLE IF EXISTS `asset_attribute_value_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attribute_value_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `keyId` int(32) DEFAULT NULL,
  `value` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attribute_value_5`
--

LOCK TABLES `asset_attribute_value_5` WRITE;
/*!40000 ALTER TABLE `asset_attribute_value_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset_attribute_value_5` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attributes_key_1`
--

LOCK TABLES `asset_attributes_key_1` WRITE;
/*!40000 ALTER TABLE `asset_attributes_key_1` DISABLE KEYS */;
INSERT INTO `asset_attributes_key_1` VALUES (1,'[\"name\", \"uniqueId\", \"phNo.\", \"Company_code\"]'),(2,'[\"name\", \"uniqueId\", \"phNo.\", \"Company_code\"]'),(3,'[\"name\", \"uniqueId\"]'),(4,'[\"name\", \"uniqueId\"]'),(5,'[\"name\", \"uniqueId\"]'),(6,'[\"name\", \"uniqueId\", \"fsdf\", \"sdsd\", \"sdsdsdsdsdsd\"]');
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
-- Table structure for table `asset_attributes_key_3`
--

DROP TABLE IF EXISTS `asset_attributes_key_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attributes_key_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `attribute_key` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attributes_key_3`
--

LOCK TABLES `asset_attributes_key_3` WRITE;
/*!40000 ALTER TABLE `asset_attributes_key_3` DISABLE KEYS */;
INSERT INTO `asset_attributes_key_3` VALUES (1,'[\"name\", \"uniqueId\", \"Email\", \"ContactNo\"]');
/*!40000 ALTER TABLE `asset_attributes_key_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_attributes_key_4`
--

DROP TABLE IF EXISTS `asset_attributes_key_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attributes_key_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `attribute_key` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attributes_key_4`
--

LOCK TABLES `asset_attributes_key_4` WRITE;
/*!40000 ALTER TABLE `asset_attributes_key_4` DISABLE KEYS */;
INSERT INTO `asset_attributes_key_4` VALUES (1,'[\"name\", \"uniqueId\", \"Email_id\", \"Contact No\", \"Address\"]'),(2,'[\"name\", \"uniqueId\"]');
/*!40000 ALTER TABLE `asset_attributes_key_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_attributes_key_5`
--

DROP TABLE IF EXISTS `asset_attributes_key_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_attributes_key_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `attribute_key` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attributes_key_5`
--

LOCK TABLES `asset_attributes_key_5` WRITE;
/*!40000 ALTER TABLE `asset_attributes_key_5` DISABLE KEYS */;
INSERT INTO `asset_attributes_key_5` VALUES (1,'[\"name\", \"uniqueId\", \"email\", \"contact_no\", \"Address\"]'),(2,'[\"name\", \"uniqueId\", \"contact_no\", \"Address\"]'),(3,'[\"name\", \"uniqueId\", \"brand\", \"model\", \"type\"]');
/*!40000 ALTER TABLE `asset_attributes_key_5` ENABLE KEYS */;
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
  `allowedTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_1`
--

LOCK TABLES `asset_detail_1` WRITE;
/*!40000 ALTER TABLE `asset_detail_1` DISABLE KEYS */;
INSERT INTO `asset_detail_1` VALUES (1,1,1,'Harindar','E23',1559204344085,NULL,1,'{\"name\": \"Harindar\", \"uniqueId\": \"E23\"}','1.jpg',NULL),(2,1,2,'ajay','E2',1559204502136,NULL,1,'{\"name\": \"ajay\", \"uniqueId\": \"2\"}','2.jpg',NULL),(3,1,2,'sonu','E3',1559204550342,NULL,1,'{\"name\": \"sonu\", \"uniqueId\": \"3\"}','3.jpg',NULL),(4,1,NULL,'soni','E4',1559204578852,NULL,1,'{\"name\": \"soni\", \"uniqueId\": \"4\"}','4.jpg',NULL),(5,1,NULL,'murgan','E5',1559204598648,NULL,1,'{\"name\": \"murgan\", \"uniqueId\": \"5\"}','5.jpg',NULL),(6,1,4,'anil','11',1559625479707,NULL,1,'{\"name\": \"anil\", \"uniqueId\": \"11\"}','6.jpg',NULL),(7,1,3,'amit','12',1559628258335,NULL,1,'{\"name\": \"amit\", \"uniqueId\": \"12\"}','7.jpg',NULL),(8,1,3,'vaibhav','13',1559628509315,NULL,1,'{\"name\": \"vaibhav\", \"uniqueId\": \"13\"}','8.jpg',NULL),(9,1,3,'anand','14',1559628805903,NULL,1,'{\"name\": \"anand\", \"uniqueId\": \"14\"}','9.jpg',NULL),(10,1,4,'abhi','15',1559628823668,NULL,1,'{\"name\": \"abhi\", \"phNo.\": \"8826644268\", \"uniqueId\": \"15\", \"Company_code\": \"3243\"}','10.png',NULL),(11,1,4,'alim','16',1559628836112,NULL,1,'{\"name\": \"alim\", \"uniqueId\": \"16\"}','11.jpg',NULL),(12,1,7,'Rahul','17',1559628881562,NULL,1,'{\"name\": \"Rahul\", \"uniqueId\": \"17\"}','12.jpg',NULL),(13,1,6,'dorjee','18',1559628891035,NULL,1,'{\"name\": \"dorjee\", \"uniqueId\": \"18\"}','13.jpg',NULL),(14,1,8,'Shilpa','19',1559628901360,NULL,1,'{\"name\": \"Shilpa\", \"uniqueId\": \"19\"}','14.jpg',NULL),(15,3,9,'user20','20',1559628916484,NULL,1,'{\"name\": \"user20\", \"uniqueId\": \"20\"}','15.jpg',NULL),(16,3,10,'user21','21',1559628940299,NULL,1,'{\"name\": \"user21\", \"uniqueId\": \"21\"}','16.jpg',NULL),(17,3,11,'user22','22',1559628953541,NULL,1,'{\"name\": \"user22\", \"uniqueId\": \"22\"}','17.jpg',NULL),(18,1,NULL,'user23','23',1559628964406,NULL,1,'{\"name\": \"user23\", \"uniqueId\": \"23\"}','18.jpg',NULL),(19,1,NULL,'user24','24',1559628975705,NULL,1,'{\"name\": \"user24\", \"uniqueId\": \"24\"}','19.jpg',NULL),(20,3,9,'Dell_inspiron','25',1559628985740,NULL,1,'{\"name\": \"Dell_inspiron\", \"uniqueId\": \"25\"}','20.jpg',NULL),(21,5,15,'Samsung_S7','26',1559629000847,NULL,1,'{\"name\": \"Samsung_S7\", \"uniqueId\": \"26\"}','21.jpg',NULL),(22,4,12,'LTE_Board','27',1559629082560,NULL,1,'{\"name\": \"LTE_Board\", \"uniqueId\": \"27\"}','22.jpg',NULL),(23,1,NULL,'user28','28',1559629092727,NULL,1,'{\"name\": \"user28\", \"uniqueId\": \"28\"}','23.jpg',NULL),(24,1,NULL,'user29','29',1559629102354,NULL,1,'{\"name\": \"user29\", \"uniqueId\": \"29\"}','24.jpg',NULL),(25,1,NULL,'user30','30',1559629115337,NULL,1,'{\"name\": \"user30\", \"uniqueId\": \"30\"}','25.jpg',NULL),(26,1,NULL,'user31','31',1561638143903,NULL,1,'{\"name\": \"user31\", \"uniqueId\": \"31\"}','26.jpg',NULL),(27,1,NULL,'user32','32',1561638156315,NULL,1,'{\"name\": \"user32\", \"uniqueId\": \"32\"}','27.jpg',NULL),(28,1,NULL,'user33','33',1561638166274,NULL,1,'{\"name\": \"user33\", \"uniqueId\": \"33\"}','28.jpg',NULL),(29,1,NULL,'user34','34',1561638180743,NULL,1,'{\"name\": \"user34\", \"uniqueId\": \"34\"}','29.jpg',NULL),(30,1,NULL,'user35','35',1561638190174,NULL,1,'{\"name\": \"user35\", \"uniqueId\": \"35\"}','30.jpg',NULL),(31,1,NULL,'user36','36',1561638204881,NULL,1,'{\"name\": \"user36\", \"uniqueId\": \"36\"}','31.jpg',NULL),(32,1,NULL,'user37','37',1561638214734,NULL,1,'{\"name\": \"user37\", \"uniqueId\": \"37\"}','32.jpg',NULL),(33,1,NULL,'user38','38',1561638226434,NULL,1,'{\"name\": \"user38\", \"uniqueId\": \"38\"}','33.jpg',NULL),(34,1,NULL,'user39','39',1561638237165,NULL,1,'{\"name\": \"user39\", \"uniqueId\": \"39\"}','34.jpg',NULL),(35,1,NULL,'user40``','40',1561638249986,NULL,1,'{\"name\": \"user40``\", \"uniqueId\": \"40\"}','35.jpg',NULL),(36,1,NULL,'user41','41',1561638259005,NULL,1,'{\"name\": \"user41\", \"uniqueId\": \"41\"}','36.jpg',NULL),(37,1,NULL,'user42','42',1561638271627,NULL,1,'{\"name\": \"user42\", \"uniqueId\": \"42\"}','37.jpg',NULL),(38,1,NULL,'user43','43',1561638282000,NULL,1,'{\"name\": \"user43\", \"uniqueId\": \"43\"}','38.jpg',NULL),(39,1,NULL,'user44','44',1561638292853,NULL,1,'{\"name\": \"user44\", \"uniqueId\": \"44\"}','39.jpg',NULL),(40,1,NULL,'user45','45',1561638299953,NULL,1,'{\"name\": \"user45\", \"uniqueId\": \"45\"}','40.jpg',NULL),(41,1,NULL,'user46','46',1561638310962,NULL,1,'{\"name\": \"user46\", \"uniqueId\": \"46\"}','41.jpg',NULL),(42,1,NULL,'user47','47',1561638318799,NULL,1,'{\"name\": \"user47\", \"uniqueId\": \"47\"}','42.jpg',NULL),(43,1,NULL,'user48','48',1561638328409,NULL,1,'{\"name\": \"user48\", \"uniqueId\": \"48\"}','43.jpg',NULL),(44,1,NULL,'user49','49',1561638338698,NULL,1,'{\"name\": \"user49\", \"uniqueId\": \"49\"}','44.jpg',NULL),(45,1,NULL,'user50','50',1561638348025,NULL,1,'{\"name\": \"user50\", \"uniqueId\": \"50\"}','45.jpg',NULL),(46,1,NULL,'user51','51',1561638355885,NULL,1,'{\"name\": \"user51\", \"uniqueId\": \"51\"}','46.jpg',NULL),(47,1,NULL,'user52','52',1561638365044,NULL,1,'{\"name\": \"user52\", \"uniqueId\": \"52\"}','47.jpg',NULL),(48,1,NULL,'user53','53',1561638375525,NULL,1,'{\"name\": \"user53\", \"uniqueId\": \"53\"}','48.jpg',NULL),(49,1,NULL,'user54','54',1561638389313,NULL,1,'{\"name\": \"user54\", \"uniqueId\": \"54\"}','49.jpg',NULL),(50,1,NULL,'user55','55',1561638394019,NULL,1,'{\"name\": \"user55\", \"uniqueId\": \"55\"}','50.jpg',NULL),(51,1,NULL,'Tag_Beacon_1','56',1561725602867,NULL,1,'{\"name\": \"Tag_Beacon_1\", \"uniqueId\": \"56\"}','51.jpg',NULL),(53,1,NULL,'Tag_Beacon_2','57',1561725991894,NULL,1,'{\"name\": \"Tag_Beacon_2\", \"uniqueId\": \"57\"}','53.jpg',NULL),(54,1,NULL,'Tag_Beacon_3','58',1561726042405,NULL,1,'{\"name\": \"Tag_Beacon_3\", \"uniqueId\": \"58\"}','54.jpg',NULL),(55,1,NULL,'Tag_Beacon_4','59',1561726086179,NULL,1,'{\"name\": \"Tag_Beacon_4\", \"uniqueId\": \"59\"}','55.jpg',NULL),(56,1,NULL,'Tag_Beacon_5','60',1561970281604,NULL,1,'{\"name\": \"Tag_Beacon_5\", \"uniqueId\": \"60\"}','56.jpg',NULL),(57,1,NULL,'Tag_Beacon_6','61',1561970344066,NULL,1,'{\"name\": \"Tag_Beacon_6\", \"uniqueId\": \"61\"}','57.jpg',NULL),(58,1,NULL,'Tag_Beacon_7','62',1561970391182,NULL,1,'{\"name\": \"Tag_Beacon_7\", \"uniqueId\": \"62\"}','58.jpg',NULL),(59,1,NULL,'Tag_Beacon_8','63',1561970413095,NULL,1,'{\"name\": \"Tag_Beacon_8\", \"uniqueId\": \"63\"}','59.jpg',NULL),(60,1,NULL,'Tag_Beacon_9','64',1561970463647,NULL,1,'{\"name\": \"Tag_Beacon_9\", \"uniqueId\": \"64\"}','60.jpg',NULL),(61,1,NULL,'Tag_Beacon_10','65',1561970498872,NULL,1,'{\"name\": \"Tag_Beacon_10\", \"uniqueId\": \"65\"}','61.jpg',NULL),(62,1,NULL,'Tag_Beacon_11','66',1561970546164,NULL,1,'{\"name\": \"Tag_Beacon_11\", \"uniqueId\": \"66\"}','62.jpg',NULL),(63,1,NULL,'Tag_Beacon_12','67',1561970631690,NULL,1,'{\"name\": \"Tag_Beacon_12\", \"uniqueId\": \"67\"}','63.jpg',NULL),(64,1,NULL,'Tag_Beacon_13','68',1561970694970,NULL,1,'{\"name\": \"Tag_Beacon_13\", \"uniqueId\": \"68\"}','64.jpg',NULL),(65,1,NULL,'Tag_Beacon_14','69',1561970725215,NULL,1,'{\"name\": \"Tag_Beacon_14\", \"uniqueId\": \"69\"}','65.jpg',NULL),(66,1,NULL,'Tag_Beacon_15','70',1561970782971,NULL,1,'{\"name\": \"Tag_Beacon_15\", \"uniqueId\": \"70\"}','66.jpg',NULL),(67,1,NULL,'XYZ','123',1563276518129,NULL,1,'{\"name\": \"XYZ\", \"phNo.\": \"8826644268\", \"uniqueId\": \"123\", \"Company_code\": \"12\"}','67.jpg',NULL);
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
  `allowedTime` bigint(16) DEFAULT NULL,
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
-- Table structure for table `asset_detail_3`
--

DROP TABLE IF EXISTS `asset_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_detail_3` (
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
  `allowedTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_3`
--

LOCK TABLES `asset_detail_3` WRITE;
/*!40000 ALTER TABLE `asset_detail_3` DISABLE KEYS */;
INSERT INTO `asset_detail_3` VALUES (1,1,NULL,'Shilpa','E23',1564141042052,NULL,7,'{\"name\": \"Shilpa\", \"Email\": \"shilpa@wavenetcorp.com\", \"uniqueId\": \"E23\", \"ContactNo\": \"8826644268\"}','1.png',NULL),(2,1,2,'Harinder','E63',1564141083010,NULL,7,'{\"name\": \"Harinder\", \"Email\": \"harindar@wavenetcorp.com\", \"uniqueId\": \"E63\", \"ContactNo\": \"8826644268\"}','2.jpg',NULL);
/*!40000 ALTER TABLE `asset_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_detail_4`
--

DROP TABLE IF EXISTS `asset_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_detail_4` (
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
  `allowedTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_4`
--

LOCK TABLES `asset_detail_4` WRITE;
/*!40000 ALTER TABLE `asset_detail_4` DISABLE KEYS */;
INSERT INTO `asset_detail_4` VALUES (1,2,1,'Maharaj Singh','1',1564408122926,NULL,8,'{\"name\": \"Maharaj Singh\", \"uniqueId\": \"1\"}','1.jpg',NULL),(2,2,1,'Inderjeet Mandal','2',1564408150930,NULL,8,'{\"name\": \"Inderjeet Mandal\", \"uniqueId\": \"2\"}','2.jpg',NULL),(3,2,1,'Mansoor Ali','3',1564408170949,NULL,8,'{\"name\": \"Mansoor Ali\", \"uniqueId\": \"3\"}','3.jpg',NULL),(4,2,1,'Kurban Ali','4',1564408187388,NULL,8,'{\"name\": \"Kurban Ali\", \"uniqueId\": \"4\"}','4.jpg',NULL),(5,2,1,'Safir Ali','5',1564408201811,NULL,8,'{\"name\": \"Safir Ali\", \"uniqueId\": \"5\"}','5.jpg',NULL),(6,2,1,'Kashimue Hoi','6',1564408235457,NULL,8,'{\"name\": \"Kashimue Hoi\", \"uniqueId\": \"6\"}','6.jpg',NULL),(7,2,1,'Sukanto Bairagi','7',1564408262405,NULL,8,'{\"name\": \"Sukanto Bairagi\", \"uniqueId\": \"7\"}','7.jpg',NULL),(8,2,1,'Ram Jan Ali','8',1564408280593,NULL,8,'{\"name\": \"Ram Jan Ali\", \"uniqueId\": \"8\"}','8.jpg',NULL),(9,2,1,'Lakhender Roy','9',1564408298710,NULL,8,'{\"name\": \"Lakhender Roy\", \"uniqueId\": \"9\"}','9.jpg',NULL),(10,2,1,'Pratir Sarkar','10',1564408313589,NULL,8,'{\"name\": \"Pratir Sarkar\", \"uniqueId\": \"10\"}','10.jpg',NULL),(11,2,1,'Khoken Bera','11',1564408333152,NULL,8,'{\"name\": \"Khoken Bera\", \"uniqueId\": \"11\"}','11.jpg',NULL),(12,2,2,'Jitender','12',1564408365274,NULL,8,'{\"name\": \"Jitender\", \"uniqueId\": \"12\"}','12.jpg',NULL),(13,2,2,'Prahalad Kr. Singh','13',1564408386724,NULL,8,'{\"name\": \"Prahalad Kr. Singh\", \"uniqueId\": \"13\"}','13.jpg',NULL),(14,2,2,'Naresh Kr. Roy','14',1564408404750,NULL,8,'{\"name\": \"Naresh Kr. Roy\", \"uniqueId\": \"14\"}','14.jpg',NULL),(15,2,2,'Nitesh Kumar','15',1564408418774,NULL,8,'{\"name\": \"Nitesh Kumar\", \"uniqueId\": \"15\"}','15.jpg',NULL);
/*!40000 ALTER TABLE `asset_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_detail_5`
--

DROP TABLE IF EXISTS `asset_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_detail_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(32) DEFAULT NULL,
  `subType` int(32) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `uniqueId` varchar(64) NOT NULL,
  `createDate` bigint(16) DEFAULT NULL,
  `asset_rule_id` int(32) DEFAULT NULL,
  `creatorId` int(32) DEFAULT NULL,
  `attribute_value` json DEFAULT NULL,
  `asset_image` varchar(64) DEFAULT NULL,
  `allowedTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_5`
--

LOCK TABLES `asset_detail_5` WRITE;
/*!40000 ALTER TABLE `asset_detail_5` DISABLE KEYS */;
INSERT INTO `asset_detail_5` VALUES (1,2,1,'Rahul Rana','E01',1564662810001,NULL,10,'{\"name\": \"Rahul Rana\", \"Address\": \"Sec 50 Gurgaon\", \"uniqueId\": \"E01\", \"contact_no\": \"7827656278\"}','1.jpg',NULL),(2,2,1,'Arjun','E02',1564662870594,NULL,10,'{\"name\": \"Arjun\", \"Address\": \"Sec 50, Gurgaon\", \"uniqueId\": \"E02\", \"contact_no\": \"8789876567\"}','2.jpg',NULL),(3,1,NULL,'Alim Khan','E03',1564662953294,NULL,10,'{\"name\": \"Alim Khan\", \"email\": \"alim@wavenetcorp.com\", \"Address\": \"Sec 46 Gurgaon\", \"uniqueId\": \"E03\", \"contact_no\": \"8826644256\"}','3.jpg',NULL),(4,1,NULL,'Tejusav khurana','E04',1564663041998,NULL,10,'{\"name\": \"Tejusav khurana\", \"email\": \"tejusav.khurana@wavenetcorp.com\", \"Address\": \"Sec 50\", \"uniqueId\": \"E04\", \"contact_no\": \"8825544256\"}','4.jpg',NULL),(5,3,2,'Audio Analyzer A_1','A1',1564663289615,NULL,10,'{\"name\": \"Audio Analyzer A_1\", \"type\": \"AA\", \"brand\": \"Panasonic\", \"model\": \"AA-123\", \"uniqueId\": \"A1\"}','5.png',NULL),(6,3,2,'Audio Analyzer A_2','A2',1564663393195,NULL,10,'{\"name\": \"Audio Analyzer A_2\", \"type\": \"AA_2\", \"brand\": \"Panasonic\", \"model\": \"AA_2\", \"uniqueId\": \"A2\"}','6.png',NULL);
/*!40000 ALTER TABLE `asset_detail_5` ENABLE KEYS */;
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
  `uniqueId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_subType_detail_1`
--

LOCK TABLES `asset_subType_detail_1` WRITE;
/*!40000 ALTER TABLE `asset_subType_detail_1` DISABLE KEYS */;
INSERT INTO `asset_subType_detail_1` VALUES (1,'Manager','1','afc1'),(2,'Senior_Software_Eng','1','af21'),(3,'Lead Team','1','af2f'),(4,'Software_Eng','1','af1f'),(5,'Senior_Manager','1','af5f'),(6,'Office_boy','2','af6f'),(7,'Cleaning_boy','2','af7f'),(8,'HR','1','af8f'),(9,'Laptops','3','af9f'),(10,'Desktops','3','af9a'),(11,'Boards','3','af9b'),(12,'Radio_Boards','4','af9c'),(13,'Microprocessorsdd','4','af9d'),(14,'2G','4','af9e'),(15,'Samsung','5','af1e'),(16,'Nokia','5','af2e'),(17,'Apple','5','af3e'),(18,'dsdsd','2','70a7'),(19,'mushir','1','3ae5'),(20,'wavenet','1','3fcd');
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
  `uniqueId` varchar(50) DEFAULT NULL,
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
-- Table structure for table `asset_subType_detail_3`
--

DROP TABLE IF EXISTS `asset_subType_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_subType_detail_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `assetTypeId` varchar(64) DEFAULT NULL,
  `uniqueId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_subType_detail_3`
--

LOCK TABLES `asset_subType_detail_3` WRITE;
/*!40000 ALTER TABLE `asset_subType_detail_3` DISABLE KEYS */;
INSERT INTO `asset_subType_detail_3` VALUES (1,'Team Lead','1','af3e'),(2,'Manager','1','af1e');
/*!40000 ALTER TABLE `asset_subType_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_subType_detail_4`
--

DROP TABLE IF EXISTS `asset_subType_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_subType_detail_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `assetTypeId` varchar(64) DEFAULT NULL,
  `uniqueId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_subType_detail_4`
--

LOCK TABLES `asset_subType_detail_4` WRITE;
/*!40000 ALTER TABLE `asset_subType_detail_4` DISABLE KEYS */;
INSERT INTO `asset_subType_detail_4` VALUES (1,'House_Keeping','2','acf0'),(2,'Guard','2','b3a4');
/*!40000 ALTER TABLE `asset_subType_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_subType_detail_5`
--

DROP TABLE IF EXISTS `asset_subType_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_subType_detail_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `assetTypeId` varchar(64) DEFAULT NULL,
  `uniqueId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_subType_detail_5`
--

LOCK TABLES `asset_subType_detail_5` WRITE;
/*!40000 ALTER TABLE `asset_subType_detail_5` DISABLE KEYS */;
INSERT INTO `asset_subType_detail_5` VALUES (1,'Security Guard','2','96b8'),(2,'Audio Analyzer','3','cc3e');
/*!40000 ALTER TABLE `asset_subType_detail_5` ENABLE KEYS */;
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
  `uniqueId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_type_list_1`
--

LOCK TABLES `asset_type_list_1` WRITE;
/*!40000 ALTER TABLE `asset_type_list_1` DISABLE KEYS */;
INSERT INTO `asset_type_list_1` VALUES (1,'Employee',1,'fas fa-user','af1e'),(2,'Contractor',2,'fas fa-adjust','af2e'),(3,'Computers',3,'fas fa-desktop','af3e'),(4,'Boards',4,'fas fa-cogs','af4e'),(5,'Phones',5,'fas fa-phone','af5e'),(6,'sdsdddsds',6,'fas fa-beer','1770');
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
  `uniqueId` varchar(50) DEFAULT NULL,
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
-- Table structure for table `asset_type_list_3`
--

DROP TABLE IF EXISTS `asset_type_list_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_type_list_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetTypeName` varchar(128) DEFAULT NULL,
  `attributes_id` int(32) DEFAULT NULL,
  `icon` varchar(128) DEFAULT NULL,
  `uniqueId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_type_list_3`
--

LOCK TABLES `asset_type_list_3` WRITE;
/*!40000 ALTER TABLE `asset_type_list_3` DISABLE KEYS */;
INSERT INTO `asset_type_list_3` VALUES (1,'Employee',1,'fas fa-user','af5e');
/*!40000 ALTER TABLE `asset_type_list_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_type_list_4`
--

DROP TABLE IF EXISTS `asset_type_list_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_type_list_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetTypeName` varchar(128) DEFAULT NULL,
  `attributes_id` int(32) DEFAULT NULL,
  `icon` varchar(128) DEFAULT NULL,
  `uniqueId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_type_list_4`
--

LOCK TABLES `asset_type_list_4` WRITE;
/*!40000 ALTER TABLE `asset_type_list_4` DISABLE KEYS */;
INSERT INTO `asset_type_list_4` VALUES (1,'Employee',1,'fas fa-user',NULL),(2,'Contractor',2,'fas fa-users',NULL);
/*!40000 ALTER TABLE `asset_type_list_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_type_list_5`
--

DROP TABLE IF EXISTS `asset_type_list_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_type_list_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetTypeName` varchar(128) DEFAULT NULL,
  `attributes_id` int(32) DEFAULT NULL,
  `icon` varchar(128) DEFAULT NULL,
  `uniqueId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_type_list_5`
--

LOCK TABLES `asset_type_list_5` WRITE;
/*!40000 ALTER TABLE `asset_type_list_5` DISABLE KEYS */;
INSERT INTO `asset_type_list_5` VALUES (1,'Employee',1,'fas fa-male','532a'),(2,'Contractor',2,'fas fa-street-view','98ca'),(3,'Electronic',3,'fas fa-television','f5a4');
/*!40000 ALTER TABLE `asset_type_list_5` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_zone_mapping_1`
--

LOCK TABLES `asset_zone_mapping_1` WRITE;
/*!40000 ALTER TABLE `asset_zone_mapping_1` DISABLE KEYS */;
INSERT INTO `asset_zone_mapping_1` VALUES (1,1,19),(2,2,20);
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
-- Table structure for table `asset_zone_mapping_3`
--

DROP TABLE IF EXISTS `asset_zone_mapping_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_zone_mapping_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_zone_mapping_3`
--

LOCK TABLES `asset_zone_mapping_3` WRITE;
/*!40000 ALTER TABLE `asset_zone_mapping_3` DISABLE KEYS */;
INSERT INTO `asset_zone_mapping_3` VALUES (1,1,1),(2,2,2);
/*!40000 ALTER TABLE `asset_zone_mapping_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_zone_mapping_4`
--

DROP TABLE IF EXISTS `asset_zone_mapping_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_zone_mapping_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_zone_mapping_4`
--

LOCK TABLES `asset_zone_mapping_4` WRITE;
/*!40000 ALTER TABLE `asset_zone_mapping_4` DISABLE KEYS */;
INSERT INTO `asset_zone_mapping_4` VALUES (1,2,1),(2,2,2),(3,2,3),(4,2,4),(5,2,5),(6,2,7),(8,2,9),(9,2,10),(10,2,12),(11,11,1),(12,11,2),(13,11,3),(14,11,4),(15,11,7),(17,11,9),(18,11,10),(19,11,12),(20,12,1),(21,12,2),(22,12,3),(23,12,4),(24,12,5),(25,12,7),(26,12,9),(27,12,10),(28,12,12),(29,13,1),(30,13,2),(31,13,3),(32,13,4),(33,13,5),(34,13,7),(35,13,9),(36,13,10),(37,13,12),(38,14,2),(39,14,3),(40,14,5),(41,14,7),(42,14,10),(43,15,2),(44,15,3),(45,15,5),(46,15,7),(47,15,10),(48,1,1),(49,1,2),(50,1,3),(51,1,4),(52,1,5),(53,1,7),(54,1,10),(55,3,1),(56,3,2),(57,3,3),(58,3,4),(59,3,5),(60,3,7),(61,3,10),(62,4,1),(63,4,2),(64,4,3),(65,4,4),(66,4,5),(67,4,7),(68,4,10),(69,5,1),(70,5,2),(71,5,3),(72,5,4),(73,5,5),(74,5,7),(75,5,10),(76,6,1),(77,6,2),(78,6,3),(79,6,4),(80,6,5),(81,6,7),(82,6,10),(83,7,1),(84,7,2),(85,7,3),(86,7,4),(87,7,5),(88,7,7),(89,7,10),(90,8,1),(91,8,2),(92,8,3),(93,8,4),(94,8,5),(95,8,7),(96,8,10),(97,9,1),(98,9,2),(99,9,3),(100,9,4),(101,9,5),(102,9,7),(103,9,10),(104,10,1),(105,10,2),(106,10,3),(107,10,4),(108,10,5),(109,10,7),(110,10,10),(111,11,5);
/*!40000 ALTER TABLE `asset_zone_mapping_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset_zone_mapping_5`
--

DROP TABLE IF EXISTS `asset_zone_mapping_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset_zone_mapping_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `assetId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_zone_mapping_5`
--

LOCK TABLES `asset_zone_mapping_5` WRITE;
/*!40000 ALTER TABLE `asset_zone_mapping_5` DISABLE KEYS */;
INSERT INTO `asset_zone_mapping_5` VALUES (1,2,1),(2,1,1),(3,5,2),(4,6,2),(5,3,4),(6,4,4),(7,4,3),(8,3,3),(9,2,3),(10,1,3),(11,3,2);
/*!40000 ALTER TABLE `asset_zone_mapping_5` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_detail_1`
--

LOCK TABLES `bus_detail_1` WRITE;
/*!40000 ALTER TABLE `bus_detail_1` DISABLE KEYS */;
INSERT INTO `bus_detail_1` VALUES (1,'nnhgjh','ee1700','hfgfgh',95);
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
-- Table structure for table `bus_detail_3`
--

DROP TABLE IF EXISTS `bus_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bus_detail_3` (
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
-- Dumping data for table `bus_detail_3`
--

LOCK TABLES `bus_detail_3` WRITE;
/*!40000 ALTER TABLE `bus_detail_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_detail_4`
--

DROP TABLE IF EXISTS `bus_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bus_detail_4` (
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
-- Dumping data for table `bus_detail_4`
--

LOCK TABLES `bus_detail_4` WRITE;
/*!40000 ALTER TABLE `bus_detail_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_detail_5`
--

DROP TABLE IF EXISTS `bus_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bus_detail_5` (
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
-- Dumping data for table `bus_detail_5`
--

LOCK TABLES `bus_detail_5` WRITE;
/*!40000 ALTER TABLE `bus_detail_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus_detail_5` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_detail`
--

LOCK TABLES `company_detail` WRITE;
/*!40000 ALTER TABLE `company_detail` DISABLE KEYS */;
INSERT INTO `company_detail` VALUES (1,'Wavenet Solution','Sec 44','www.wavenetcorp.com',1,'logo.png'),(2,'Wavenet App','Sec 44','www.wavenetcorp.com',6,'logo.png'),(3,'Wavenet_travel_demo','Sector 44','www.wavenetcorp.com',7,'logo.png'),(4,'ASAHI India Glass Limited','Unit no. 203 to 208, 13, Tribhuwan Complex, Ishwar Nagar, Mathura Road, New Delhi - 110065','https://www.aisglass.com',8,'logo.jpg'),(5,'Panasonic india pvt ltd','12th Floor, Ambience Tower, NH-8, Ambience Island, DLF Phase 3, Sector 24, Gurugram, Haryana 122002','https://www.panasonic.com/in/',10,'logo.png');
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
  `batteryStatus` int(128) DEFAULT NULL,
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
  `batteryStatusTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  UNIQUE KEY `genericId` (`genericId`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_1`
--

LOCK TABLES `device_detail_1` WRITE;
/*!40000 ALTER TABLE `device_detail_1` DISABLE KEYS */;
INSERT INTO `device_detail_1` VALUES (96,1,'Beacon 1','c2011d0001b2',0,1,NULL,1567609096572,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(97,3,'Zone Gw','840d8e369021',0,1,NULL,1567609121418,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(98,1,'Beacon 2','c2011d0001b1',0,2,NULL,1567673970421,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
  `batteryStatus` int(128) DEFAULT NULL,
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
  `batteryStatusTime` bigint(16) DEFAULT NULL,
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
INSERT INTO `device_detail_2` VALUES (1,3,'Zone Gateway 1','7BAA900B',NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,'CAFA','CAFE','CAFB',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,3,'Zone Gateway 2','7BAA900D',NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,'CAFA','CAFE','CAFB',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `device_detail_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_detail_3`
--

DROP TABLE IF EXISTS `device_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `device_detail_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `deviceType` int(8) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `serial` varchar(64) DEFAULT NULL,
  `isBuzz` int(8) DEFAULT NULL,
  `assetId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  `createDate` bigint(16) DEFAULT NULL,
  `gwSerial` varchar(64) DEFAULT NULL,
  `batteryStatus` int(128) DEFAULT NULL,
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
  `batteryStatusTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  UNIQUE KEY `genericId` (`genericId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_3`
--

LOCK TABLES `device_detail_3` WRITE;
/*!40000 ALTER TABLE `device_detail_3` DISABLE KEYS */;
INSERT INTO `device_detail_3` VALUES (1,3,'Zone Gw','840d8e368e6d',0,NULL,NULL,1564140480399,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564151799592,NULL),(2,9,'Prov Gw','807D3AA5E4B4',0,NULL,NULL,1564140798408,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,1,'Beacon Harindar','c2011d0001c1',0,2,NULL,1564141114213,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,1,'Shilpa Beacon','ac233fa145b3',0,1,NULL,1564141138363,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `device_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_detail_4`
--

DROP TABLE IF EXISTS `device_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `device_detail_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `deviceType` int(8) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `serial` varchar(64) DEFAULT NULL,
  `isBuzz` int(8) DEFAULT NULL,
  `assetId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  `createDate` bigint(16) DEFAULT NULL,
  `gwSerial` varchar(64) DEFAULT NULL,
  `batteryStatus` int(8) DEFAULT '1',
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
  `batteryStatusTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  UNIQUE KEY `genericId` (`genericId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_4`
--

LOCK TABLES `device_detail_4` WRITE;
/*!40000 ALTER TABLE `device_detail_4` DISABLE KEYS */;
INSERT INTO `device_detail_4` VALUES (1,9,'Asahi Prov Device','807D3AA5E4B4',0,NULL,NULL,1564409018230,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,1,'Beacon Jitender','ac233fa1f0dd',0,12,NULL,1564409774225,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564715801856),(3,1,'Prahalad Beacon','ac233fa1f110',0,13,NULL,1564409898325,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564728102927),(4,1,'Naresh Beacon','ac233fa1f0a4',0,14,NULL,1564409940780,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564710341458),(5,1,'Nitesh Beacon','ac233fa1f0b9',0,15,NULL,1564410062861,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564628658628),(6,1,'Maharaj Beacon','ac233fa1f114',0,1,NULL,1564410100006,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564662939230),(7,1,'Inderjeet Beacon','ac233fa1f109',0,2,NULL,1564410219618,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564710283602),(8,1,'Mansoor Beacon','ac233fa1f088',0,3,NULL,1564410262998,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564753516256),(9,1,'Kurbaan Beacon','ac233fa1f0fe',0,4,NULL,1564410372834,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564727069539),(10,1,'Safir Beacon','ac233fa1f0aa',0,5,NULL,1564410448678,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564715673451),(11,1,'Kashimue Beacon','ac233fa1f0bc',0,6,NULL,1564410531177,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564671978325),(12,1,'Sukanto Beacon','ac233fa1f11a',0,7,NULL,1564410562915,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564742125926),(13,1,'RamJan Beacon','ac233fa1f101',0,8,NULL,1564410591982,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564748242296),(14,1,'Lakhender Beacon','ac233fa1f115',0,9,NULL,1564410614481,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564727319598),(15,1,'Pratir Beacon','ac233fa1f11b',0,10,NULL,1564410636899,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564737443396),(16,1,'Khoken Beacon','ac233fa1f085',0,11,NULL,1564410661143,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564733821230),(17,3,'Zone_Gw_5th_Floor_HO','840d8e368eb9',0,NULL,NULL,1564411094185,NULL,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564794681350,NULL);
/*!40000 ALTER TABLE `device_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_detail_5`
--

DROP TABLE IF EXISTS `device_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `device_detail_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `deviceType` int(8) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `serial` varchar(64) DEFAULT NULL,
  `isBuzz` int(8) DEFAULT NULL,
  `assetId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  `createDate` bigint(16) DEFAULT NULL,
  `gwSerial` varchar(64) DEFAULT NULL,
  `batteryStatus` int(8) DEFAULT '1',
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
  `batteryStatusTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  UNIQUE KEY `genericId` (`genericId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_5`
--

LOCK TABLES `device_detail_5` WRITE;
/*!40000 ALTER TABLE `device_detail_5` DISABLE KEYS */;
INSERT INTO `device_detail_5` VALUES (1,2,'Node 18','ccebdaf4af31',0,NULL,NULL,1564663893986,NULL,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564985667005,1564727554988),(2,2,'Node 52','04322304f2e9',0,NULL,NULL,1564663946802,NULL,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,2,'Node 20','d895d7849050',0,NULL,NULL,1564663999785,NULL,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564985547681,1564721440750),(4,2,'Node 21','d3ec16e25918',0,NULL,NULL,1564664044627,NULL,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564985491676,1564739949576),(5,2,'Node 57','c48a08a1a874',0,NULL,NULL,1564664107504,NULL,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,2,'Node 56','f901567c1bd4',0,NULL,NULL,1564664146059,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564985456096,1564722210004),(7,2,'Node 19','f35c47d4e75f',0,NULL,NULL,1564664606688,NULL,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564985607305,1564721440922),(8,3,'Zone Gw1','840d8e369021',0,NULL,NULL,1564664842741,NULL,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564985671895,NULL),(9,9,'Pro Gw 1','807D3AA5E4B4',0,NULL,NULL,1564665190671,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,1,'Card Beacon 1','c2011d0001b1',0,5,NULL,1564665248710,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,1,'Card Beacon 2','c2011d0000f4',0,6,NULL,1564665273650,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,1,'Tag Beacon 1','ac233fa145b2',0,3,NULL,1564665436912,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564675675492),(13,1,'Tag Beacon 9','ac233fa145ae',0,4,NULL,1564665468098,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564675679061),(14,1,'Tag Beacon 11','ac233fa1451d',0,1,NULL,1564665509792,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564739047135),(15,1,'Tag Beacon 8','ac233fa145be',0,2,NULL,1564665539528,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1564739125995),(16,8,'sdfsd','34trtret',0,NULL,NULL,1564997594538,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `device_detail_5` ENABLE KEYS */;
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
  `plantId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floor_plan_1`
--

LOCK TABLES `floor_plan_1` WRITE;
/*!40000 ALTER TABLE `floor_plan_1` DISABLE KEYS */;
INSERT INTO `floor_plan_1` VALUES (6,'Wavenet Ground',0,'Wavenet Ground.png',NULL,NULL,1,6),(7,'dad',23,'dad.png',NULL,NULL,1,11);
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
INSERT INTO `floor_plan_2` VALUES (1,'Ground',0,'Ground.jpg',NULL,NULL,6);
/*!40000 ALTER TABLE `floor_plan_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floor_plan_3`
--

DROP TABLE IF EXISTS `floor_plan_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `floor_plan_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `floorNo` int(128) DEFAULT NULL,
  `floor_image` varchar(64) DEFAULT NULL,
  `object` varchar(64) DEFAULT NULL,
  `entity` varchar(64) DEFAULT NULL,
  `creatorId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floor_plan_3`
--

LOCK TABLES `floor_plan_3` WRITE;
/*!40000 ALTER TABLE `floor_plan_3` DISABLE KEYS */;
INSERT INTO `floor_plan_3` VALUES (1,'Wavenet Ground Floor',0,'Wavenet Ground Floor.jpg',NULL,NULL,7),(2,'Ground Floor',0,'Ground Floor.jpg',NULL,NULL,7);
/*!40000 ALTER TABLE `floor_plan_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floor_plan_4`
--

DROP TABLE IF EXISTS `floor_plan_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `floor_plan_4` (
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
-- Dumping data for table `floor_plan_4`
--

LOCK TABLES `floor_plan_4` WRITE;
/*!40000 ALTER TABLE `floor_plan_4` DISABLE KEYS */;
INSERT INTO `floor_plan_4` VALUES (1,'Fifth Floor',5,'Fifth Floor.jpg',NULL,NULL,8);
/*!40000 ALTER TABLE `floor_plan_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floor_plan_5`
--

DROP TABLE IF EXISTS `floor_plan_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `floor_plan_5` (
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
-- Dumping data for table `floor_plan_5`
--

LOCK TABLES `floor_plan_5` WRITE;
/*!40000 ALTER TABLE `floor_plan_5` DISABLE KEYS */;
INSERT INTO `floor_plan_5` VALUES (1,'11th Floor',11,'11th Floor.jpg',NULL,NULL,10);
/*!40000 ALTER TABLE `floor_plan_5` ENABLE KEYS */;
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
-- Table structure for table `food_cart_detail_3`
--

DROP TABLE IF EXISTS `food_cart_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_cart_detail_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `foodCartNo` varchar(64) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `venderName` varchar(64) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`),
  UNIQUE KEY `foodCartNo` (`foodCartNo`),
  UNIQUE KEY `gatewayId` (`gatewayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_cart_detail_3`
--

LOCK TABLES `food_cart_detail_3` WRITE;
/*!40000 ALTER TABLE `food_cart_detail_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_cart_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_cart_detail_4`
--

DROP TABLE IF EXISTS `food_cart_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_cart_detail_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `foodCartNo` varchar(64) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `venderName` varchar(64) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`),
  UNIQUE KEY `foodCartNo` (`foodCartNo`),
  UNIQUE KEY `gatewayId` (`gatewayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_cart_detail_4`
--

LOCK TABLES `food_cart_detail_4` WRITE;
/*!40000 ALTER TABLE `food_cart_detail_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_cart_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_cart_detail_5`
--

DROP TABLE IF EXISTS `food_cart_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_cart_detail_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `foodCartNo` varchar(64) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `venderName` varchar(64) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`),
  UNIQUE KEY `foodCartNo` (`foodCartNo`),
  UNIQUE KEY `gatewayId` (`gatewayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_cart_detail_5`
--

LOCK TABLES `food_cart_detail_5` WRITE;
/*!40000 ALTER TABLE `food_cart_detail_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_cart_detail_5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpi_detail_1`
--

DROP TABLE IF EXISTS `kpi_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kpi_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `kpiId` varchar(64) DEFAULT NULL,
  `kpiName` varchar(64) DEFAULT NULL,
  `query` json DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kpiId` (`kpiId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpi_detail_1`
--

LOCK TABLES `kpi_detail_1` WRITE;
/*!40000 ALTER TABLE `kpi_detail_1` DISABLE KEYS */;
INSERT INTO `kpi_detail_1` VALUES (10,'KC001','No. of Infiltrations','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',1),(11,'KC002','Productive Time','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',1),(12,'KC003','Non-Productive Time','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',1),(13,'KC004','Unauthorised Count','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',1),(14,'KC005','Max Count Voilations','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"isMax\": 1, \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',1),(15,'KC006','No. of Entry','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": true, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',1),(16,'KC007','No. of Exit','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": false, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',1),(17,'KS001','Performance stats','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',1),(18,'KA001','Productive Time','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',2),(19,'KA002','Allowed Zones Visited','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',2),(20,'KA003','Longest Productive Hours','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',2),(21,'KA004','Shortest Productive Hours','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',2),(22,'KA005','Non-Productive Time','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',2),(23,'KA006','Longest Non-Productive Hours','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',2),(24,'KA007','Not-Allowed Zones Visited','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}',2);
/*!40000 ALTER TABLE `kpi_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpi_detail_2`
--

DROP TABLE IF EXISTS `kpi_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kpi_detail_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `kpiId` varchar(64) DEFAULT NULL,
  `kpiName` varchar(64) DEFAULT NULL,
  `query` json DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kpiId` (`kpiId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpi_detail_2`
--

LOCK TABLES `kpi_detail_2` WRITE;
/*!40000 ALTER TABLE `kpi_detail_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `kpi_detail_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpi_detail_3`
--

DROP TABLE IF EXISTS `kpi_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kpi_detail_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `kpiId` varchar(64) DEFAULT NULL,
  `kpiName` varchar(64) DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  `query` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kpiId` (`kpiId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpi_detail_3`
--

LOCK TABLES `kpi_detail_3` WRITE;
/*!40000 ALTER TABLE `kpi_detail_3` DISABLE KEYS */;
INSERT INTO `kpi_detail_3` VALUES (1,'KC001','No. of Infiltrations',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(2,'KC002','Productive Time',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(3,'KC003','Non-Productive Time',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(4,'KC004','Unauthorised Count',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(5,'KC005','Max Count Voilations',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"isMax\": 1, \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(6,'KC006','No. of Entry',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": true, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(7,'KC007','No. of Exit',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": false, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(8,'KS001','Performance stats',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(9,'KA001','Productive Time',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(10,'KA002','Allowed Zones Visited',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(11,'KA003','Longest Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(12,'KA004','Shortest Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(13,'KA005','Non-Productive Time',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(14,'KA006','Longest Non-Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(15,'KA007','Not-Allowed Zones Visited',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}');
/*!40000 ALTER TABLE `kpi_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpi_detail_4`
--

DROP TABLE IF EXISTS `kpi_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kpi_detail_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `kpiId` varchar(64) DEFAULT NULL,
  `kpiName` varchar(64) DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  `query` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kpiId` (`kpiId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpi_detail_4`
--

LOCK TABLES `kpi_detail_4` WRITE;
/*!40000 ALTER TABLE `kpi_detail_4` DISABLE KEYS */;
INSERT INTO `kpi_detail_4` VALUES (1,'KC001','No. of Infiltrations',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(2,'KC002','Productive Time',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(3,'KC003','Non-Productive Time',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(4,'KC004','Unauthorised Count',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(5,'KC005','Max Count Voilations',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"isMax\": 1, \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(6,'KC006','No. of Entry',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": true, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(7,'KC007','No. of Exit',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": false, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(8,'KS001','Performance stats',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(9,'KA001','Productive Time',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(10,'KA002','Allowed Zones Visited',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(11,'KA003','Longest Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(12,'KA004','Shortest Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(13,'KA005','Non-Productive Time',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(14,'KA006','Longest Non-Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(15,'KA007','Not-Allowed Zones Visited',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}');
/*!40000 ALTER TABLE `kpi_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpi_detail_5`
--

DROP TABLE IF EXISTS `kpi_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kpi_detail_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `kpiId` varchar(64) DEFAULT NULL,
  `kpiName` varchar(64) DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  `query` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kpiId` (`kpiId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpi_detail_5`
--

LOCK TABLES `kpi_detail_5` WRITE;
/*!40000 ALTER TABLE `kpi_detail_5` DISABLE KEYS */;
INSERT INTO `kpi_detail_5` VALUES (1,'KC001','No. of Infiltrations',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(2,'KC002','Productive Time',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(3,'KC003','Non-Productive Time',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(4,'KC004','Unauthorised Count',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(5,'KC005','Max Count Voilations',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"isMax\": 1, \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(6,'KC006','No. of Entry',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": true, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(7,'KC007','No. of Exit',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": false, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(8,'KS001','Performance stats',1,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(9,'KA001','Productive Time',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(10,'KA002','Allowed Zones Visited',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(11,'KA003','Longest Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(12,'KA004','Shortest Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(13,'KA005','Non-Productive Time',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(14,'KA006','Longest Non-Productive Hours',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(15,'KA007','Not-Allowed Zones Visited',2,'{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}');
/*!40000 ALTER TABLE `kpi_detail_5` ENABLE KEYS */;
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
-- Table structure for table `map_controlroomgw_zone_3`
--

DROP TABLE IF EXISTS `map_controlroomgw_zone_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_controlroomgw_zone_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `controllroomId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_controlroomgw_zone_3`
--

LOCK TABLES `map_controlroomgw_zone_3` WRITE;
/*!40000 ALTER TABLE `map_controlroomgw_zone_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_controlroomgw_zone_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_controlroomgw_zone_4`
--

DROP TABLE IF EXISTS `map_controlroomgw_zone_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_controlroomgw_zone_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `controllroomId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_controlroomgw_zone_4`
--

LOCK TABLES `map_controlroomgw_zone_4` WRITE;
/*!40000 ALTER TABLE `map_controlroomgw_zone_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_controlroomgw_zone_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_controlroomgw_zone_5`
--

DROP TABLE IF EXISTS `map_controlroomgw_zone_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_controlroomgw_zone_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `controllroomId` int(32) DEFAULT NULL,
  `zoneId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_controlroomgw_zone_5`
--

LOCK TABLES `map_controlroomgw_zone_5` WRITE;
/*!40000 ALTER TABLE `map_controlroomgw_zone_5` DISABLE KEYS */;
INSERT INTO `map_controlroomgw_zone_5` VALUES (1,16,1),(2,16,2),(3,16,3),(4,16,4);
/*!40000 ALTER TABLE `map_controlroomgw_zone_5` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `map_testBeacon_receiver_3`
--

DROP TABLE IF EXISTS `map_testBeacon_receiver_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_testBeacon_receiver_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `testBeaconId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_testBeacon_receiver_3`
--

LOCK TABLES `map_testBeacon_receiver_3` WRITE;
/*!40000 ALTER TABLE `map_testBeacon_receiver_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_testBeacon_receiver_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_testBeacon_receiver_4`
--

DROP TABLE IF EXISTS `map_testBeacon_receiver_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_testBeacon_receiver_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `testBeaconId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_testBeacon_receiver_4`
--

LOCK TABLES `map_testBeacon_receiver_4` WRITE;
/*!40000 ALTER TABLE `map_testBeacon_receiver_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_testBeacon_receiver_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_testBeacon_receiver_5`
--

DROP TABLE IF EXISTS `map_testBeacon_receiver_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_testBeacon_receiver_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `testBeaconId` int(32) DEFAULT NULL,
  `nodeId` int(32) DEFAULT NULL,
  `gatewayId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_testBeacon_receiver_5`
--

LOCK TABLES `map_testBeacon_receiver_5` WRITE;
/*!40000 ALTER TABLE `map_testBeacon_receiver_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_testBeacon_receiver_5` ENABLE KEYS */;
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
-- Table structure for table `map_user_floor_3`
--

DROP TABLE IF EXISTS `map_user_floor_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_user_floor_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_floor_3`
--

LOCK TABLES `map_user_floor_3` WRITE;
/*!40000 ALTER TABLE `map_user_floor_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_user_floor_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_user_floor_4`
--

DROP TABLE IF EXISTS `map_user_floor_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_user_floor_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_floor_4`
--

LOCK TABLES `map_user_floor_4` WRITE;
/*!40000 ALTER TABLE `map_user_floor_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_user_floor_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_user_floor_5`
--

DROP TABLE IF EXISTS `map_user_floor_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_user_floor_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_user_floor_5`
--

LOCK TABLES `map_user_floor_5` WRITE;
/*!40000 ALTER TABLE `map_user_floor_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_user_floor_5` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_neighbour_detail_1`
--

LOCK TABLES `node_neighbour_detail_1` WRITE;
/*!40000 ALTER TABLE `node_neighbour_detail_1` DISABLE KEYS */;
INSERT INTO `node_neighbour_detail_1` VALUES (53,17,17,-66,1,41),(54,18,18,-54,1,41),(55,19,19,-54,1,41),(56,20,20,-61,1,41),(57,22,22,-71,2,41),(58,23,23,-58,2,41),(59,24,24,-57,2,41),(60,25,25,-55,2,41);
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
-- Table structure for table `node_neighbour_detail_3`
--

DROP TABLE IF EXISTS `node_neighbour_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `node_neighbour_detail_3` (
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
-- Dumping data for table `node_neighbour_detail_3`
--

LOCK TABLES `node_neighbour_detail_3` WRITE;
/*!40000 ALTER TABLE `node_neighbour_detail_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `node_neighbour_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `node_neighbour_detail_4`
--

DROP TABLE IF EXISTS `node_neighbour_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `node_neighbour_detail_4` (
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
-- Dumping data for table `node_neighbour_detail_4`
--

LOCK TABLES `node_neighbour_detail_4` WRITE;
/*!40000 ALTER TABLE `node_neighbour_detail_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `node_neighbour_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `node_neighbour_detail_5`
--

DROP TABLE IF EXISTS `node_neighbour_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `node_neighbour_detail_5` (
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
-- Dumping data for table `node_neighbour_detail_5`
--

LOCK TABLES `node_neighbour_detail_5` WRITE;
/*!40000 ALTER TABLE `node_neighbour_detail_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `node_neighbour_detail_5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_detail_1`
--

DROP TABLE IF EXISTS `plant_detail_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `plant_detail_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `latitude` double(11,8) DEFAULT NULL,
  `longitude` double(11,8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_detail_1`
--

LOCK TABLES `plant_detail_1` WRITE;
/*!40000 ALTER TABLE `plant_detail_1` DISABLE KEYS */;
INSERT INTO `plant_detail_1` VALUES (5,'Plant2','asddd dddd, ddddd',28.56780000,77.23440000),(6,'Plant1','asddd dddd, ddddd',28.56780000,77.23440000),(8,'Plant 3','asdas',43.34340000,23.42342300),(9,'dasjkdhask','asdasd',23.42342300,33.23232000),(11,'dasjkdhasks','asdasd',23.42342300,33.23232000);
/*!40000 ALTER TABLE `plant_detail_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_detail_2`
--

DROP TABLE IF EXISTS `plant_detail_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `plant_detail_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `latitude` double(11,8) DEFAULT NULL,
  `longitude` double(11,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_detail_2`
--

LOCK TABLES `plant_detail_2` WRITE;
/*!40000 ALTER TABLE `plant_detail_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant_detail_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_detail_3`
--

DROP TABLE IF EXISTS `plant_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `plant_detail_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `latitude` double(11,8) DEFAULT NULL,
  `longitude` double(11,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_detail_3`
--

LOCK TABLES `plant_detail_3` WRITE;
/*!40000 ALTER TABLE `plant_detail_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_detail_4`
--

DROP TABLE IF EXISTS `plant_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `plant_detail_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `latitude` double(11,8) DEFAULT NULL,
  `longitude` double(11,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_detail_4`
--

LOCK TABLES `plant_detail_4` WRITE;
/*!40000 ALTER TABLE `plant_detail_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_detail_5`
--

DROP TABLE IF EXISTS `plant_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `plant_detail_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `latitude` double(11,8) DEFAULT NULL,
  `longitude` double(11,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_detail_5`
--

LOCK TABLES `plant_detail_5` WRITE;
/*!40000 ALTER TABLE `plant_detail_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant_detail_5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_list_1`
--

DROP TABLE IF EXISTS `policy_list_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_list_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `rule_id` int(32) DEFAULT NULL,
  `identifier` varchar(128) DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_list_1`
--

LOCK TABLES `policy_list_1` WRITE;
/*!40000 ALTER TABLE `policy_list_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy_list_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_list_2`
--

DROP TABLE IF EXISTS `policy_list_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_list_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `rule_id` int(32) DEFAULT NULL,
  `identifier` varchar(128) DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_list_2`
--

LOCK TABLES `policy_list_2` WRITE;
/*!40000 ALTER TABLE `policy_list_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy_list_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_list_3`
--

DROP TABLE IF EXISTS `policy_list_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_list_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `rule_id` int(32) DEFAULT NULL,
  `identifier` varchar(128) DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_list_3`
--

LOCK TABLES `policy_list_3` WRITE;
/*!40000 ALTER TABLE `policy_list_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy_list_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_list_4`
--

DROP TABLE IF EXISTS `policy_list_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_list_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `rule_id` int(32) DEFAULT NULL,
  `identifier` varchar(128) DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_list_4`
--

LOCK TABLES `policy_list_4` WRITE;
/*!40000 ALTER TABLE `policy_list_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy_list_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_list_5`
--

DROP TABLE IF EXISTS `policy_list_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policy_list_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `rule_id` int(32) DEFAULT NULL,
  `identifier` varchar(128) DEFAULT NULL,
  `type` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_list_5`
--

LOCK TABLES `policy_list_5` WRITE;
/*!40000 ALTER TABLE `policy_list_5` DISABLE KEYS */;
INSERT INTO `policy_list_5` VALUES (1,5,'A1',1),(2,5,'A2',1);
/*!40000 ALTER TABLE `policy_list_5` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegeUser`
--

LOCK TABLES `privilegeUser` WRITE;
/*!40000 ALTER TABLE `privilegeUser` DISABLE KEYS */;
INSERT INTO `privilegeUser` VALUES (1,'Super Admin',0,'superadmin@wavenetcorp.com','$2a$10$JMgimKFHpN9CdpxMyVz8J.dr8RBm9Me1pHknqqBTrzFkhoTS7f/A6',NULL),(2,'Super Admin',0,'admin@wavenetcorp.com','$2a$10$28T3WYSOc3TJneH9uEtjq.t27kC4tqA49128/zteMkZJMOiH32UU.',NULL);
/*!40000 ALTER TABLE `privilegeUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prov_scan_1`
--

DROP TABLE IF EXISTS `prov_scan_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `prov_scan_1` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `deviceSerial` varchar(64) DEFAULT NULL,
  `isScanning` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prov_scan_1`
--

LOCK TABLES `prov_scan_1` WRITE;
/*!40000 ALTER TABLE `prov_scan_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `prov_scan_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prov_scan_2`
--

DROP TABLE IF EXISTS `prov_scan_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `prov_scan_2` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `deviceSerial` varchar(64) DEFAULT NULL,
  `isScanning` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prov_scan_2`
--

LOCK TABLES `prov_scan_2` WRITE;
/*!40000 ALTER TABLE `prov_scan_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `prov_scan_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prov_scan_3`
--

DROP TABLE IF EXISTS `prov_scan_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `prov_scan_3` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `deviceSerial` varchar(64) DEFAULT NULL,
  `isScanning` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prov_scan_3`
--

LOCK TABLES `prov_scan_3` WRITE;
/*!40000 ALTER TABLE `prov_scan_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `prov_scan_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prov_scan_4`
--

DROP TABLE IF EXISTS `prov_scan_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `prov_scan_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `deviceSerial` varchar(64) DEFAULT NULL,
  `isScanning` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prov_scan_4`
--

LOCK TABLES `prov_scan_4` WRITE;
/*!40000 ALTER TABLE `prov_scan_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `prov_scan_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prov_scan_5`
--

DROP TABLE IF EXISTS `prov_scan_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `prov_scan_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `deviceSerial` varchar(64) DEFAULT NULL,
  `isScanning` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prov_scan_5`
--

LOCK TABLES `prov_scan_5` WRITE;
/*!40000 ALTER TABLE `prov_scan_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `prov_scan_5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rule`
--

DROP TABLE IF EXISTS `rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rule` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `opretor` varchar(64) DEFAULT NULL,
  `violationMsg` varchar(124) DEFAULT NULL,
  `nonViolationMessage` varchar(124) DEFAULT NULL,
  `isarrgument` int(8) DEFAULT NULL,
  `ruleDesc` varchar(128) DEFAULT NULL,
  `arrgumentColumn` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rule`
--

LOCK TABLES `rule` WRITE;
/*!40000 ALTER TABLE `rule` DISABLE KEYS */;
INSERT INTO `rule` VALUES (1,1,'Access violation','in','Access violation','Authorised Access',NULL,'Authorised access to mapped zones','NULL'),(2,2,'Max count in zone','>','Zone Max Count Reached',NULL,1,'Max no. of user allowed in zone','maxUsers'),(3,3,'Min count in zone','<','Zone Min Count Reached',NULL,1,'Min no. of user allowed in zone','minUsers'),(4,4,'Max time in zone','>','Max Time Reached In Zone',NULL,1,'Max time(mins) of user in zone','allowed_time'),(5,6,'Exit Restricted From Allowed Zones','in','Zone Exit','Authorised Access',NULL,'Exit Restricted rule form allowed zones',NULL);
/*!40000 ALTER TABLE `rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `software` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `description` varchar(264) DEFAULT NULL,
  `cId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software`
--

LOCK TABLES `software` WRITE;
/*!40000 ALTER TABLE `software` DISABLE KEYS */;
INSERT INTO `software` VALUES (10,'ESP_zone_1.1.0','Sonu bin',1),(11,'ESP_zone_1.0.0','Sonu bin',1);
/*!40000 ALTER TABLE `software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userInfo`
--

DROP TABLE IF EXISTS `userInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userInfo` (
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
  `companyId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userInfo`
--

LOCK TABLES `userInfo` WRITE;
/*!40000 ALTER TABLE `userInfo` DISABLE KEYS */;
INSERT INTO `userInfo` VALUES (1,'Admin',1,'test@wavenetcorp.com',8826644268,'$2a$10$r9V9bPgxbgZ91rAO4OAo4eM2fP1P8f0UGJkqVrnw9AXWqg3GMuTQG','Sec 46',NULL,NULL,NULL,NULL,1),(2,'Plant Admin',2,'planadmin@wavenetcorp.com',NULL,'$2a$10$r9V9bPgxbgZ91rAO4OAo4eM2fP1P8f0UGJkqVrnw9AXWqg3GMuTQG',NULL,NULL,NULL,NULL,NULL,1),(3,'Hr',3,'hr@wavenetcorp.com',NULL,'$2a$10$r9V9bPgxbgZ91rAO4OAo4eM2fP1P8f0UGJkqVrnw9AXWqg3GMuTQG',NULL,NULL,NULL,NULL,NULL,1),(4,'Security',4,'security@wavenetcorp.com',NULL,'$2a$10$r9V9bPgxbgZ91rAO4OAo4eM2fP1P8f0UGJkqVrnw9AXWqg3GMuTQG',NULL,NULL,NULL,NULL,NULL,1),(5,'Control Room',5,'controlroom@wavenetcorp.com',NULL,'$2a$10$r9V9bPgxbgZ91rAO4OAo4eM2fP1P8f0UGJkqVrnw9AXWqg3GMuTQG',NULL,NULL,NULL,NULL,NULL,1),(6,'Rohit Kumar',1,'rohit.kumar@wavenetcorp.com',8826644268,'$2a$10$ShtIVpDX76CZ6uFXYwbMfuUJ18PQMtMKPxICrxae2ySXFAgfJFAsG','sec 44',NULL,NULL,NULL,NULL,2),(7,'Sanjay Bisen',1,'sanjay@wavenetcorp.com',8826644268,'$2a$10$xlMXMQfwWM4pT.XF9WIhze1P7NV1IPoPTZN9gGlshABGsDum/kpZy','sec 50',NULL,NULL,NULL,NULL,3),(8,'Rajdeep Bose',1,'rajdeep.bose@aisglass.com',8826644268,'$2a$10$NCoYuvCBb6HRex3rCrV4uuRJ.LYvlnxVwpo3OjEzRiNqZ5m.dVyJK','sec 44',NULL,NULL,NULL,NULL,4),(9,'Control Room',5,'controlroom@aisglass.com',8826644268,'$2a$10$g.ijmFU2CaldT/MLlui9NeaDeH1Q4pcHPBYwdw6TPVwq9LUs4Ceqe','sec 44',NULL,NULL,NULL,NULL,4),(10,'Divyanshu Sethi',1,'divyanshu.sethi@in.panasonic.com',8826644268,'$2a$10$.wqZ7kKExy9qQkFhvk37w.uLV6RX.edcKkST9MYjs/p.pYdgOZrv.','Sector 24, Gurugram',NULL,NULL,NULL,NULL,5);
/*!40000 ALTER TABLE `userInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `version_detail`
--

DROP TABLE IF EXISTS `version_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `version_detail` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `deviceId` int(32) DEFAULT NULL,
  `currentVersion` varchar(128) DEFAULT NULL,
  `newVersion` varchar(128) DEFAULT NULL,
  `companyId` int(32) DEFAULT NULL,
  `isProcess` int(8) DEFAULT NULL,
  `errorCode` int(12) DEFAULT NULL,
  `newVersionId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `version_detail`
--

LOCK TABLES `version_detail` WRITE;
/*!40000 ALTER TABLE `version_detail` DISABLE KEYS */;
INSERT INTO `version_detail` VALUES (6,50,'1.1.0','1.1.0',1,1,3,10);
/*!40000 ALTER TABLE `version_detail` ENABLE KEYS */;
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
  `minUsers` int(8) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `allowed_time` bigint(16) DEFAULT NULL,
  `networkId` varchar(64) DEFAULT NULL,
  `plantId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `led` (`led`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_1`
--

LOCK TABLES `zone_detail_1` WRITE;
/*!40000 ALTER TABLE `zone_detail_1` DISABLE KEYS */;
INSERT INTO `zone_detail_1` VALUES (19,NULL,NULL,'Cafeteria',NULL,'Cafeteria.png',6,'[{\"x\": 1086.5, \"y\": 48.149993896484375}, {\"x\": 1250.5, \"y\": 47.149993896484375}, {\"x\": 1250.5, \"y\": 188.1499938964844}, {\"x\": 1085.5, \"y\": 188.1499938964844}]',1310,773,NULL,1,NULL,'9c37',NULL,'5d567c87877904439ac3ae20',6),(20,NULL,NULL,'ddsdfs',NULL,'ddsdfs.jpg',6,'[{\"x\": 355.5, \"y\": 51.149993896484375}, {\"x\": 560.5, \"y\": 49.149993896484375}, {\"x\": 561.5, \"y\": 186.1499938964844}, {\"x\": 353.5, \"y\": 186.1499938964844}]',1310,773,NULL,4,NULL,'f839',NULL,'5d567c87877904439ac3ae20',6);
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
  `minUsers` int(8) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `allowed_time` bigint(16) DEFAULT NULL,
  `networkId` varchar(64) DEFAULT NULL,
  `plantId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `led` (`led`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_2`
--

LOCK TABLES `zone_detail_2` WRITE;
/*!40000 ALTER TABLE `zone_detail_2` DISABLE KEYS */;
INSERT INTO `zone_detail_2` VALUES (1,NULL,NULL,1,'Lab',12,'Lab.jpg',1,'[{\"x\": 610, \"y\": 267.5}, {\"x\": 876, \"y\": 268.5}, {\"x\": 916, \"y\": 547.5}, {\"x\": 610, \"y\": 551.5}]',1201,1010,NULL,NULL,NULL,NULL,'5d403655dfb800758c35decc',NULL),(2,NULL,NULL,2,'Cafeteria',12,'Cafeteria.jpg',1,'[{\"x\": 863, \"y\": 120.5}, {\"x\": 1038, \"y\": 120.5}, {\"x\": 1091, \"y\": 360.5}, {\"x\": 888, \"y\": 363.5}]',1201,1010,NULL,NULL,NULL,NULL,'5d403655dfb800758c35decc',NULL),(4,NULL,NULL,3,'Meeting Room',NULL,'Meeting Room.png',1,'[{\"x\": 233, \"y\": 445.5}, {\"x\": 316, \"y\": 440.5}, {\"x\": 306, \"y\": 541.5}, {\"x\": 223, \"y\": 541.5}]',967,1010,NULL,NULL,'e7c1',NULL,'5d40365edfb800758c35decd',NULL),(5,NULL,NULL,4,'Hardware Lab',NULL,'Hardware Lab.png',1,'[{\"x\": 254, \"y\": 244.5}, {\"x\": 333, \"y\": 245.5}, {\"x\": 240, \"y\": 361.5}, {\"x\": 325, \"y\": 363.5}]',967,1010,NULL,NULL,'e0d2',NULL,'5d40365edfb800758c35decd',NULL);
/*!40000 ALTER TABLE `zone_detail_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone_detail_3`
--

DROP TABLE IF EXISTS `zone_detail_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `zone_detail_3` (
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
  `minUsers` int(8) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `allowed_time` bigint(16) DEFAULT NULL,
  `networkId` varchar(64) DEFAULT NULL,
  `plantId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `led` (`led`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_3`
--

LOCK TABLES `zone_detail_3` WRITE;
/*!40000 ALTER TABLE `zone_detail_3` DISABLE KEYS */;
INSERT INTO `zone_detail_3` VALUES (1,NULL,NULL,1,'Reception',NULL,'Reception.jpg',1,'[{\"x\": 610, \"y\": 263.5}, {\"x\": 875, \"y\": 269.5}, {\"x\": 915, \"y\": 548.5}, {\"x\": 607, \"y\": 547.5}]',1201,1010,NULL,NULL,'bbd6',NULL,NULL,NULL),(2,NULL,NULL,2,'OT Room',NULL,'OT Room.png',1,'[{\"x\": 859, \"y\": 123.5}, {\"x\": 1040, \"y\": 122.5}, {\"x\": 1092, \"y\": 361.5}, {\"x\": 894, \"y\": 363.5}]',1201,1010,NULL,NULL,'bbd7',NULL,NULL,NULL);
/*!40000 ALTER TABLE `zone_detail_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone_detail_4`
--

DROP TABLE IF EXISTS `zone_detail_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `zone_detail_4` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `isCritical` int(8) DEFAULT NULL,
  `led` int(32) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `maxUsers` int(8) DEFAULT NULL,
  `minUsers` int(8) DEFAULT NULL,
  `zone_image` varchar(64) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  `zone_crood` json DEFAULT NULL,
  `zone_width` int(32) DEFAULT NULL,
  `zone_height` int(32) DEFAULT NULL,
  `zone_rule_id` int(32) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `allowed_time` bigint(16) DEFAULT NULL,
  `networkId` varchar(64) DEFAULT NULL,
  `plantId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `led` (`led`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_4`
--

LOCK TABLES `zone_detail_4` WRITE;
/*!40000 ALTER TABLE `zone_detail_4` DISABLE KEYS */;
INSERT INTO `zone_detail_4` VALUES (1,NULL,NULL,1,'Cafeteria',NULL,NULL,'Cafeteria.jpg',1,'[{\"x\": 13, \"y\": 311.5}, {\"x\": 50, \"y\": 420.5}, {\"x\": 63, \"y\": 457.5}, {\"x\": 191, \"y\": 457.5}, {\"x\": 196, \"y\": 482.5}, {\"x\": 295, \"y\": 484.5}, {\"x\": 294, \"y\": 424.5}, {\"x\": 235, \"y\": 424.5}, {\"x\": 180, \"y\": 398.5}, {\"x\": 150, \"y\": 349.5}, {\"x\": 145, \"y\": 297.5}, {\"x\": 156, \"y\": 261.5}]',1201,1010,NULL,'ac7f',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(2,NULL,NULL,2,'Reception',NULL,NULL,'Reception.jpg',1,'[{\"x\": 747, \"y\": 306.5}, {\"x\": 768, \"y\": 379.5}, {\"x\": 803, \"y\": 438.5}, {\"x\": 819, \"y\": 448.5}, {\"x\": 797, \"y\": 468.5}, {\"x\": 761, \"y\": 501.5}, {\"x\": 749, \"y\": 540.5}, {\"x\": 781, \"y\": 582.5}, {\"x\": 828, \"y\": 570.5}, {\"x\": 832, \"y\": 524.5}, {\"x\": 870, \"y\": 506.5}, {\"x\": 873, \"y\": 300.5}]',1201,1010,NULL,'7a8e',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(3,NULL,NULL,3,'Finance',NULL,NULL,'Finance.jpg',1,'[{\"x\": 484, \"y\": 220.5}, {\"x\": 489, \"y\": 375.5}, {\"x\": 487, \"y\": 399.5}, {\"x\": 566, \"y\": 402.5}, {\"x\": 570, \"y\": 453.5}, {\"x\": 775, \"y\": 457.5}, {\"x\": 729, \"y\": 300.5}, {\"x\": 775, \"y\": 300.5}, {\"x\": 781, \"y\": 266.5}, {\"x\": 636, \"y\": 232.5}]',1201,1010,NULL,'5ac6',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(4,NULL,NULL,4,'HR',NULL,NULL,'HR.jpg',1,'[{\"x\": 171, \"y\": 261.5}, {\"x\": 160, \"y\": 339.5}, {\"x\": 234, \"y\": 416.5}, {\"x\": 305, \"y\": 408.5}, {\"x\": 308, \"y\": 469.5}, {\"x\": 477, \"y\": 464.5}, {\"x\": 476, \"y\": 222.5}, {\"x\": 381, \"y\": 222.5}, {\"x\": 273, \"y\": 236.5}]',1201,1010,NULL,'bd04',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(5,NULL,NULL,5,'IT_Deptt.',NULL,NULL,'IT_Deptt..jpg',1,'[{\"x\": 328, \"y\": 490.5}, {\"x\": 327, \"y\": 645.5}, {\"x\": 473, \"y\": 645.5}, {\"x\": 476, \"y\": 574.5}, {\"x\": 473, \"y\": 491.5}]',1201,1010,NULL,'c5b1',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(7,NULL,NULL,6,'Legal',NULL,NULL,'Legal.jpg',1,'[{\"x\": 483, \"y\": 492.5}, {\"x\": 488, \"y\": 643.5}, {\"x\": 748, \"y\": 637.5}, {\"x\": 744, \"y\": 489.5}, {\"x\": 483, \"y\": 492.5}, {\"x\": 485, \"y\": 645.5}, {\"x\": 745, \"y\": 636.5}, {\"x\": 738, \"y\": 490.5}]',1201,1010,NULL,'893e',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(8,NULL,NULL,7,'Washroom',NULL,NULL,'Washroom.jpg',1,'[{\"x\": 919, \"y\": 509.5}, {\"x\": 919, \"y\": 470.5}, {\"x\": 989, \"y\": 469.5}, {\"x\": 990, \"y\": 274.5}, {\"x\": 1181, \"y\": 230.5}, {\"x\": 1185, \"y\": 505.5}, {\"x\": 1156, \"y\": 503.5}, {\"x\": 1156, \"y\": 520.5}, {\"x\": 1091, \"y\": 524.5}, {\"x\": 1094, \"y\": 505.5}, {\"x\": 1053, \"y\": 505.5}, {\"x\": 1000, \"y\": 505.5}]',1201,1010,NULL,'3af6',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(9,NULL,NULL,8,'Board_Room',NULL,NULL,'Board_Room.jpg',1,'[{\"x\": 824, \"y\": 694.5}, {\"x\": 818, \"y\": 790.5}, {\"x\": 992, \"y\": 800.5}, {\"x\": 986, \"y\": 687.5}]',1201,1010,NULL,'9995',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(10,NULL,NULL,9,'Conference_Room',NULL,NULL,'Conference_Room.jpg',1,'[{\"x\": 184, \"y\": 669.5}, {\"x\": 222, \"y\": 760.5}, {\"x\": 503, \"y\": 762.5}, {\"x\": 499, \"y\": 676.5}]',1201,1010,NULL,'7ec5',NULL,'5d3ed3978cefd2724c31c3c2',NULL),(12,NULL,NULL,10,'SR_Room',NULL,NULL,'SR_Room.png',1,'[{\"x\": 505, \"y\": 676.5}, {\"x\": 507, \"y\": 763.5}, {\"x\": 674, \"y\": 754.5}, {\"x\": 772, \"y\": 776.5}, {\"x\": 770, \"y\": 675.5}, {\"x\": 506, \"y\": 675.5}, {\"x\": 509, \"y\": 763.5}, {\"x\": 675, \"y\": 758.5}, {\"x\": 771, \"y\": 778.5}, {\"x\": 769, \"y\": 675.5}]',1201,1010,NULL,'3d90',NULL,'5d3ed3978cefd2724c31c3c2',NULL);
/*!40000 ALTER TABLE `zone_detail_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone_detail_5`
--

DROP TABLE IF EXISTS `zone_detail_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `zone_detail_5` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `isCritical` int(8) DEFAULT NULL,
  `led` int(32) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `maxUsers` int(8) DEFAULT NULL,
  `minUsers` int(8) DEFAULT NULL,
  `zone_image` varchar(64) DEFAULT NULL,
  `floorId` int(32) DEFAULT NULL,
  `zone_crood` json DEFAULT NULL,
  `zone_width` int(32) DEFAULT NULL,
  `zone_height` int(32) DEFAULT NULL,
  `zone_rule_id` int(32) DEFAULT NULL,
  `uniqueId` varchar(64) DEFAULT NULL,
  `allowed_time` bigint(16) DEFAULT NULL,
  `networkId` varchar(64) DEFAULT NULL,
  `plantId` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `led` (`led`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_5`
--

LOCK TABLES `zone_detail_5` WRITE;
/*!40000 ALTER TABLE `zone_detail_5` DISABLE KEYS */;
INSERT INTO `zone_detail_5` VALUES (1,NULL,NULL,1,'Security_Room9',NULL,NULL,'Security_Room9.jpg',1,'[{\"x\": 403, \"y\": 318.5}, {\"x\": 849, \"y\": 213.5}, {\"x\": 831, \"y\": 475.5}, {\"x\": 260, \"y\": 482.5}]',1201,1010,NULL,'85bc',NULL,'5d47f49a3712fa50c99f4918',NULL),(2,NULL,NULL,2,'Reliability room',NULL,NULL,'Reliability room.jpg',1,'[{\"x\": 347, \"y\": 702.5}, {\"x\": 464, \"y\": 701.5}, {\"x\": 462, \"y\": 783.5}, {\"x\": 346, \"y\": 783.5}]',1201,1010,NULL,'1d97',NULL,'5d42ed7500ea08396984bbeb',NULL),(3,NULL,NULL,3,'Conference Room',NULL,NULL,'Conference Room.jpg',1,'[{\"x\": 273, \"y\": 570.5}, {\"x\": 537, \"y\": 568.5}, {\"x\": 539, \"y\": 673.5}, {\"x\": 274, \"y\": 674.5}]',1201,1010,NULL,'75cb',NULL,'5d42ed7500ea08396984bbeb',NULL),(4,NULL,NULL,4,'Sitting Room',NULL,NULL,'Sitting Room.jpg',1,'[{\"x\": 690, \"y\": 814.5}, {\"x\": 986, \"y\": 813.5}, {\"x\": 985, \"y\": 1001.5}, {\"x\": 690, \"y\": 1000.5}]',1201,1010,NULL,'c5c9',NULL,'5d42ed7500ea08396984bbeb',NULL),(5,NULL,NULL,NULL,'dfgdfg',NULL,NULL,'dfgdfg.jpg',1,'[{\"x\": 564, \"y\": 78.5}, {\"x\": 853, \"y\": 5.5}, {\"x\": 860, \"y\": 64.5}]',1201,1010,NULL,'9f44',NULL,'5d47f49a3712fa50c99f4918',NULL);
/*!40000 ALTER TABLE `zone_detail_5` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-05 16:20:41
