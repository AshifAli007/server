-- MySQL dump 10.13  Distrib 8.0.15, for Linux (x86_64)
--
-- Host: localhost    Database: asahiGlassDev
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_attributes_key_1`
--

LOCK TABLES `asset_attributes_key_1` WRITE;
/*!40000 ALTER TABLE `asset_attributes_key_1` DISABLE KEYS */;
INSERT INTO `asset_attributes_key_1` VALUES (1,'[\"name\", \"uniqueId\"]'),(2,'[\"name\", \"uniqueId\", \"Model\"]');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_detail_1`
--

LOCK TABLES `asset_detail_1` WRITE;
/*!40000 ALTER TABLE `asset_detail_1` DISABLE KEYS */;
INSERT INTO `asset_detail_1` VALUES (1,1,1,'Mushir','E23',1558591844255,NULL,1,'{\"name\": \"Mushir\", \"uniqueId\": \"E23\"}','1.jpg'),(2,1,1,'Abhishek','E34',1558591865820,NULL,1,'{\"name\": \"Abhishek\", \"uniqueId\": \"E34\"}','2.jpg'),(3,1,NULL,'Alim','E43',1560404462538,NULL,1,'{\"name\": \"Alim\", \"uniqueId\": \"E43\"}','3.jpg'),(4,1,NULL,'Mushir','E32',1561038238730,NULL,1,'{\"name\": \"Mushir\", \"uniqueId\": \"E32\"}','4.jpg'),(5,2,NULL,'Dell','E233',1561039528811,NULL,1,'{\"name\": \"Dell\", \"Model\": \"dasd\", \"uniqueId\": \"E233\"}','5.jpg'),(6,2,NULL,'DEll','E34535',1561039568709,NULL,1,'{\"name\": \"DEll\", \"Model\": \"Fdsf\", \"uniqueId\": \"E34535\"}','6.jpg');
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
INSERT INTO `asset_subType_detail_1` VALUES (1,'Manager','1'),(2,'SSE','1'),(3,'LAPTOP','2');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_type_list_1`
--

LOCK TABLES `asset_type_list_1` WRITE;
/*!40000 ALTER TABLE `asset_type_list_1` DISABLE KEYS */;
INSERT INTO `asset_type_list_1` VALUES (1,'Emp',1,'fas fa-user'),(2,'Machine',2,'fas fa-anchor');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_detail_1`
--

LOCK TABLES `bus_detail_1` WRITE;
/*!40000 ALTER TABLE `bus_detail_1` DISABLE KEYS */;
INSERT INTO `bus_detail_1` VALUES (1,'Wave-1234','0efb2c','Wavenet',15),(2,'Mushir','d33066','Ahmeds',20);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_detail`
--

LOCK TABLES `company_detail` WRITE;
/*!40000 ALTER TABLE `company_detail` DISABLE KEYS */;
INSERT INTO `company_detail` VALUES (1,'Wavenet Corp','Sec 44','www.wavenetcorp.com',1,'logo.png');
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
  `batteryStatus` int(8) DEFAULT '100',
  `nodeStatusTime` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `serial` (`serial`),
  UNIQUE KEY `genericId` (`genericId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_detail_1`
--

LOCK TABLES `device_detail_1` WRITE;
/*!40000 ALTER TABLE `device_detail_1` DISABLE KEYS */;
INSERT INTO `device_detail_1` VALUES (1,1,'Demo Beacon','ac233fa145b2',0,1,NULL,1558591580183,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(2,1,'Demo Beacon 2','ac233fa145b1',0,2,NULL,1558591619770,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(3,3,'adad','30aea41efae5',0,NULL,NULL,1558591662299,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(4,9,'dasdas','asdasdas',0,NULL,NULL,1559207764064,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(5,8,'dasdad','dasdasd',0,NULL,NULL,1559285432286,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(6,8,'dasda23','dasdas43wr32',0,NULL,NULL,1559286558320,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(7,8,'eesdasd','sfsf',0,NULL,NULL,1559287474357,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(8,8,'adasdasdasdasd','fsdfsdfsdfsfsdf',0,NULL,NULL,1559287518324,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(9,8,'adasd','sdffsdfsdf',0,NULL,NULL,1559287588241,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(10,8,'adasda','fsdfsdd',0,NULL,NULL,1559287620503,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(12,1,'30aea41efae6','30aea41efae7',0,NULL,NULL,1560402766926,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(13,1,'sfsdf','5345345345',0,NULL,NULL,1560424946265,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(14,8,'ControlRoom','807d3aa5e4c1',0,NULL,NULL,1560507161482,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,1561101561356),(15,6,'adas','30aea41efae2',0,NULL,NULL,1561030367705,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(16,7,'FoodCart_GW','30aea41efae0',0,NULL,NULL,1561031137114,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(18,1,'adasdas','dasdasdasd',0,NULL,NULL,1561113741726,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(19,1,'30aea41efae7','30aea41efae723',0,NULL,NULL,1561114379603,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL),(20,6,'New BUs Gateawy','30aea41efae1',0,NULL,NULL,1561123434689,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floor_plan_1`
--

LOCK TABLES `floor_plan_1` WRITE;
/*!40000 ALTER TABLE `floor_plan_1` DISABLE KEYS */;
INSERT INTO `floor_plan_1` VALUES (1,'Ground',0,'Ground.jpg',NULL,NULL,1),(2,'adasd',1,'adasd.png',NULL,NULL,1),(3,'Secon Floor',2,'Secon Floor.png',NULL,NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_cart_detail_1`
--

LOCK TABLES `food_cart_detail_1` WRITE;
/*!40000 ALTER TABLE `food_cart_detail_1` DISABLE KEYS */;
INSERT INTO `food_cart_detail_1` VALUES (2,'FC_08210','3357d4','MushirAhmed',16);
/*!40000 ALTER TABLE `food_cart_detail_1` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `kpiId` (`kpiId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpi_detail_1`
--

LOCK TABLES `kpi_detail_1` WRITE;
/*!40000 ALTER TABLE `kpi_detail_1` DISABLE KEYS */;
INSERT INTO `kpi_detail_1` VALUES (1,'KC001','Number of infiltrations','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(2,'KC002','Productivity counters 1','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 1, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(3,'KC003','Productivity counters 2','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(4,'KC004','Number of voilations 1','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"isAllowed\": 0, \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(5,'KC005','Number of voilations 2','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"isMax\": 1, \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(6,'KC006','Entry counters','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": true, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(7,'KC007','Exit counters','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"isEntry\": false, \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(8,'KA001','Productivity counters in hours','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}'),(9,'KS001','Performance stats','{\"time\": {\"$gte\": \"\", \"$lte\": \"\"}, \"type\": \"\", \"empId\": \"\", \"zoneId\": \"\", \"companyId\": \"\", \"assetTypeId\": \"\", \"assetSubTypeId\": \"\"}');
/*!40000 ALTER TABLE `kpi_detail_1` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_controlroomgw_zone_1`
--

LOCK TABLES `map_controlroomgw_zone_1` WRITE;
/*!40000 ALTER TABLE `map_controlroomgw_zone_1` DISABLE KEYS */;
INSERT INTO `map_controlroomgw_zone_1` VALUES (1,10,2),(2,10,4),(8,14,1),(9,14,2),(10,14,3),(11,14,4),(12,14,5),(13,14,8);
/*!40000 ALTER TABLE `map_controlroomgw_zone_1` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_argument_list_1`
--

LOCK TABLES `policy_argument_list_1` WRITE;
/*!40000 ALTER TABLE `policy_argument_list_1` DISABLE KEYS */;
INSERT INTO `policy_argument_list_1` VALUES (10,5,'{\"1\": \"Zone 1\", \"2\": \"Zone 2\"}','E23'),(11,4,'1','1'),(12,5,'{\"1\": \"Zone 1\", \"2\": \"Zone 2\"}','E34'),(13,4,'12','2'),(14,4,'12','5'),(15,4,'12','8');
/*!40000 ALTER TABLE `policy_argument_list_1` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_list`
--

LOCK TABLES `policy_list` WRITE;
/*!40000 ALTER TABLE `policy_list` DISABLE KEYS */;
INSERT INTO `policy_list` VALUES (4,1,'Zone Max Count','>','Zone Max Count'),(5,2,'Allowed Zone For Asset','in','Restricted Area');
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
INSERT INTO `privilegeUser` VALUES (1,'Mushir Ahmed Siddiqui',0,'superadmin@wavenetcorp.com','$2a$10$hh2tXlFjgS9Wb2P8dvlHR.J2ODL0I4st0I5HWEZK2NNWwHvUbBiBu',NULL);
/*!40000 ALTER TABLE `privilegeUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rule_policy`
--

DROP TABLE IF EXISTS `rule_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rule_policy` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(124) DEFAULT NULL,
  `opretor` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `opretor` (`opretor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rule_policy`
--

LOCK TABLES `rule_policy` WRITE;
/*!40000 ALTER TABLE `rule_policy` DISABLE KEYS */;
/*!40000 ALTER TABLE `rule_policy` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userInfo_1`
--

LOCK TABLES `userInfo_1` WRITE;
/*!40000 ALTER TABLE `userInfo_1` DISABLE KEYS */;
INSERT INTO `userInfo_1` VALUES (1,'Mushir Ahmed Siddiqui',1,'mushir@wavenetcorp.com',8826644268,'$2a$10$g.ijmFU2CaldT/MLlui9NeaDeH1Q4pcHPBYwdw6TPVwq9LUs4Ceqe','sec 46',NULL,NULL,NULL,NULL),(2,'Plant Admin',2,'planadmin@wavenetcorp.com',NULL,'$2a$10$g.ijmFU2CaldT/MLlui9NeaDeH1Q4pcHPBYwdw6TPVwq9LUs4Ceqe',NULL,NULL,NULL,NULL,NULL),(3,'Hr',3,'hr@wavenetcorp.com',NULL,'$2a$10$g.ijmFU2CaldT/MLlui9NeaDeH1Q4pcHPBYwdw6TPVwq9LUs4Ceqe',NULL,NULL,NULL,NULL,NULL),(4,'security',4,'security@wavenetcorp.com',NULL,'$2a$10$g.ijmFU2CaldT/MLlui9NeaDeH1Q4pcHPBYwdw6TPVwq9LUs4Ceqe',NULL,NULL,NULL,NULL,NULL),(5,'Control Room',5,'controlroom@wavenetcorp.com',NULL,'$2a$10$g.ijmFU2CaldT/MLlui9NeaDeH1Q4pcHPBYwdw6TPVwq9LUs4Ceqe',NULL,NULL,NULL,NULL,NULL);
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
  `led` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `led` (`led`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_detail_1`
--

LOCK TABLES `zone_detail_1` WRITE;
/*!40000 ALTER TABLE `zone_detail_1` DISABLE KEYS */;
INSERT INTO `zone_detail_1` VALUES (1,NULL,NULL,'Zone 1',1,'Zone 1.jpg',1,'[{\"x\": 611, \"y\": 265}, {\"x\": 879, \"y\": 264}, {\"x\": 920, \"y\": 553}, {\"x\": 604, \"y\": 547}]',1201,1010,NULL,2),(2,NULL,NULL,'Zone 2',1,'Zone 2.png',1,'[{\"x\": 422, \"y\": 124}, {\"x\": 469, \"y\": 116}, {\"x\": 474, \"y\": 35}, {\"x\": 542, \"y\": 37}, {\"x\": 542, \"y\": 95}, {\"x\": 503, \"y\": 95}, {\"x\": 503, \"y\": 123}, {\"x\": 607, \"y\": 120}, {\"x\": 602, \"y\": 362}, {\"x\": 400, \"y\": 357}]',1201,1010,NULL,3),(3,NULL,NULL,'Back',12,'Back.jpg',1,'[{\"x\": 606, \"y\": 266}, {\"x\": 876, \"y\": 266}, {\"x\": 917, \"y\": 551}, {\"x\": 602, \"y\": 548}]',1201,1010,NULL,4),(4,NULL,NULL,'Mushir',23,'Mushir.png',1,'[{\"x\": 95, \"y\": 442}, {\"x\": 204, \"y\": 443}, {\"x\": 146, \"y\": 767}, {\"x\": 14, \"y\": 765}]',1201,1010,NULL,5),(5,NULL,NULL,'Room',12,'Room.png',1,'[{\"x\": 174, \"y\": 121.1999969482422}, {\"x\": 260, \"y\": 124.1999969482422}, {\"x\": 217, \"y\": 359.1999969482422}, {\"x\": 113, \"y\": 357.1999969482422}]',1201,1010,NULL,1),(8,NULL,NULL,'New ZOne',NULL,'New ZOne.png',1,'[{\"x\": 420, \"y\": 122.5}, {\"x\": 603, \"y\": 122.5}, {\"x\": 606, \"y\": 358.5}, {\"x\": 408, \"y\": 364.5}]',1201,1010,NULL,12),(11,NULL,NULL,'Vijay',NULL,'Vijay.jpg',1,'[{\"x\": 422, \"y\": 121.5}, {\"x\": 607, \"y\": 118.5}, {\"x\": 602, \"y\": 361.5}, {\"x\": 401, \"y\": 363.5}]',1201,1010,NULL,7),(12,NULL,NULL,'ALim',NULL,'ALim.jpg',1,'[{\"x\": 362, \"y\": 765.5}, {\"x\": 600, \"y\": 768.5}, {\"x\": 608, \"y\": 447.5}, {\"x\": 391, \"y\": 443.5}]',1201,1010,NULL,10),(13,NULL,NULL,'dasd',NULL,'dasd.png',1,'[{\"x\": 170, \"y\": 123.5}, {\"x\": 260, \"y\": 122.5}, {\"x\": 238, \"y\": 233.5}, {\"x\": 144, \"y\": 230.5}]',1201,1010,NULL,8);
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

-- Dump completed on 2019-06-24 12:56:31
