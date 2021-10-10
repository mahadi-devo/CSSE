-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: ticketingsystem
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` date NOT NULL,
  `creditAmount` float NOT NULL DEFAULT '100',
  `updatedAt` date NOT NULL,
  `passengerId` int(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `qrCode` longtext,
  `employeeId` int(11) DEFAULT NULL,
  `accountTypeId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `account_passenger_index` (`passengerId`),
  KEY `account_accountType_index` (`accountTypeId`),
  KEY `account_employeeId_index` (`employeeId`),
  CONSTRAINT `account_accountType_index_fk` FOREIGN KEY (`accountTypeId`) REFERENCES `accounttype` (`id`),
  CONSTRAINT `account_employeeId_index_fk` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`),
  CONSTRAINT `account_passenger_index_fk` FOREIGN KEY (`passengerId`) REFERENCES `passengers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (36,'2021-10-09',24800,'2021-10-09',51,'mahadihassan083@gmail.com','$2a$10$JGpyWCb53/mp1ch/yHdo1..rb35np4wrcxOUzumYRsQtGIvnPCetC','data:image/png;base64,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',NULL,1),(37,'2021-10-09',20,'2021-10-09',52,'mahadihassan083@gmail.com','$2a$10$7w5dlhtp2tolRaMPkVMUT.vM3348Hf2QwjgJgwrS4w3MLyvRRu/82','data:image/png;base64,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',NULL,1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounttype`
--

DROP TABLE IF EXISTS `accounttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounttype`
--

LOCK TABLES `accounttype` WRITE;
/*!40000 ALTER TABLE `accounttype` DISABLE KEYS */;
INSERT INTO `accounttype` VALUES (1,'Passenger'),(2,'Employee');
/*!40000 ALTER TABLE `accounttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus`
--

DROP TABLE IF EXISTS `bus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('normal','semi','luxuary') NOT NULL DEFAULT 'normal',
  `driverName` varchar(45) DEFAULT 'UNKNOWN',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus`
--

LOCK TABLES `bus` WRITE;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
INSERT INTO `bus` VALUES (1,'normal','Pasindu',1),(2,'semi','Avishka',0),(3,'luxuary','Aflal',1),(4,'normal','Mahadi',1);
/*!40000 ALTER TABLE `bus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `employeeTypeId` int(11) NOT NULL,
  `age` varchar(45) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_employeeTypeId_index_fx_idx` (`employeeTypeId`),
  CONSTRAINT `employee_employeeTypeId_index_fx` FOREIGN KEY (`employeeTypeId`) REFERENCES `employeetype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Mahadi',1,'12','2021-01-02','0000-00-00');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeetype`
--

DROP TABLE IF EXISTS `employeetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeetype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeetype`
--

LOCK TABLES `employeetype` WRITE;
/*!40000 ALTER TABLE `employeetype` DISABLE KEYS */;
INSERT INTO `employeetype` VALUES (1,'Inspector'),(2,'Transport Manager');
/*!40000 ALTER TABLE `employeetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fare`
--

DROP TABLE IF EXISTS `fare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fare` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `journeyId` int(11) NOT NULL,
  `passengerHistoryId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fare_journeyId_index` (`journeyId`),
  CONSTRAINT `fare_journeyId_index_fk` FOREIGN KEY (`journeyId`) REFERENCES `journey` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fare`
--

LOCK TABLES `fare` WRITE;
/*!40000 ALTER TABLE `fare` DISABLE KEYS */;
INSERT INTO `fare` VALUES (1,50,2,36),(2,50,2,36),(3,50,2,36),(4,50,2,37),(5,50,5,37),(6,50,5,36);
/*!40000 ALTER TABLE `fare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fine`
--

DROP TABLE IF EXISTS `fine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `accountId` int(11) DEFAULT NULL,
  `inspectionId` int(11) DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fine_accountId_index_fk_idx` (`accountId`),
  KEY `fine_inspectionId_index` (`inspectionId`),
  CONSTRAINT `fine_accountId_index_fk` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  CONSTRAINT `fine_inspectionId_index_fk` FOREIGN KEY (`inspectionId`) REFERENCES `inspection` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fine`
--

LOCK TABLES `fine` WRITE;
/*!40000 ALTER TABLE `fine` DISABLE KEYS */;
INSERT INTO `fine` VALUES (1,100,'2021-10-10',36,1,'2021-10-10');
/*!40000 ALTER TABLE `fine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspection`
--

DROP TABLE IF EXISTS `inspection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inspection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` date NOT NULL,
  `description` varchar(45) NOT NULL DEFAULT 'Normal Inspection',
  `journeyId` int(11) DEFAULT NULL,
  `inspectorId` int(11) NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `inspectionLat` varchar(100) NOT NULL,
  `inspectionLong` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inspection_journeyId_index` (`journeyId`),
  KEY `inspection_inspectorId_index` (`inspectorId`),
  CONSTRAINT `inspection_inspectorId_index_fk` FOREIGN KEY (`inspectorId`) REFERENCES `employee` (`id`),
  CONSTRAINT `inspection_journeyId_index_fk` FOREIGN KEY (`journeyId`) REFERENCES `journey` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspection`
--

LOCK TABLES `inspection` WRITE;
/*!40000 ALTER TABLE `inspection` DISABLE KEYS */;
INSERT INTO `inspection` VALUES (1,'2021-10-10','adfsa',2,1,'2021-10-10','3245','425435');
/*!40000 ALTER TABLE `inspection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey`
--

DROP TABLE IF EXISTS `journey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `busId` int(11) NOT NULL,
  `routeId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `journey_busId_index_fk_idx` (`busId`),
  KEY `journey_routeId_index_fk_idx` (`routeId`),
  CONSTRAINT `journey_busId_index_fk` FOREIGN KEY (`busId`) REFERENCES `bus` (`id`),
  CONSTRAINT `journey_routeId_index_fk` FOREIGN KEY (`routeId`) REFERENCES `route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey`
--

LOCK TABLES `journey` WRITE;
/*!40000 ALTER TABLE `journey` DISABLE KEYS */;
INSERT INTO `journey` VALUES (2,'2021-10-09','2021-10-09',1,1),(3,'2021-10-09','2021-10-09',1,1),(4,'2021-10-09','2021-10-09',1,1),(5,'2021-10-09','2021-10-09',2,1);
/*!40000 ALTER TABLE `journey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passengerhistory`
--

DROP TABLE IF EXISTS `passengerhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengerhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depatureLat` varchar(45) NOT NULL,
  `depatureLong` varchar(45) NOT NULL,
  `destinationLat` varchar(45) DEFAULT NULL,
  `destinationLong` varchar(45) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `accountId` int(11) NOT NULL,
  `journeyId` int(11) NOT NULL,
  `fineId` int(11) DEFAULT NULL,
  `fareId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `passengerhistory_fk_accountid_idx` (`accountId`),
  KEY `passengerhistory_fk_journeyid_idx` (`journeyId`),
  KEY `passengerhistory_fineId_idx` (`fineId`) /*!80000 INVISIBLE */,
  KEY `passengerhistory_fareId_index` (`fareId`) USING BTREE,
  CONSTRAINT `passengerhistory_fareId_idx_fk` FOREIGN KEY (`fareId`) REFERENCES `fare` (`id`),
  CONSTRAINT `passengerhistory_fineId_idx_fk` FOREIGN KEY (`fineId`) REFERENCES `fine` (`id`),
  CONSTRAINT `passengerhistory_fk_accountid` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  CONSTRAINT `passengerhistory_fk_journeyid` FOREIGN KEY (`journeyId`) REFERENCES `journey` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengerhistory`
--

LOCK TABLES `passengerhistory` WRITE;
/*!40000 ALTER TABLE `passengerhistory` DISABLE KEYS */;
INSERT INTO `passengerhistory` VALUES (5,'8.142135','80.96973','8.041785','80.953232','2021-10-09','2021-10-09',36,2,1,3),(6,'8.142135','80.96973','8.041785','80.953232','2021-10-09','2021-10-09',37,2,NULL,4),(7,'8.142135','80.96973','8.041785','80.953232','2021-10-09','2021-10-09',37,5,NULL,5),(8,'8.142135','80.96973','8.041785','80.953232','2021-10-09','2021-10-09',36,5,1,6);
/*!40000 ALTER TABLE `passengerhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passengers`
--

DROP TABLE IF EXISTS `passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `nic` varchar(20) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `passportNo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengers`
--

LOCK TABLES `passengers` WRITE;
/*!40000 ALTER TABLE `passengers` DISABLE KEYS */;
INSERT INTO `passengers` VALUES (1,'Mahadi','2000045','dwewr','122323'),(2,'Mahadi','2000045','dwewr','122323'),(3,'Mahadi','2000045','dwewr','122323'),(4,'Mahadi','2000045','dwewr','122323'),(5,'Mahadi','2000045','dwewr','122323'),(6,'Mahadi','2000045','dwewr','122323'),(7,'Mahadi-devo','2000045','dwewr','122323'),(8,'Mahadi-devo','2000045','dwewr','122323'),(9,'Mahadi-devo','2000045','dwewr','122323'),(10,'Mahadi-devo','2000045','dwewr','122323'),(11,'Mahadi-devo','2000045','dwewr','122323'),(12,'Mahadi-devo','2000045','dwewr','122323'),(13,'Mahadi-devo','2000045','dweasdwr','122323'),(14,'Mahadi-devo','2000045','dweasdwr','122323'),(15,'Mahadi-devo','2000045','dweasdwr','122323'),(16,'Mahadi-devo','2000045','dweasdwr','122323'),(17,'Mahadi-devo','2000045','dweasdwr','122323'),(18,'Mahadi-devo','2000045','dweasdwr','122323'),(19,'Mahadi-devo','2000045','dweasdwr','122323'),(20,'Mahadi-devo','2000045','dweasdwr','122323'),(21,'Mahadi-devo','2000045','dweasdwr','122323'),(22,'Mahadi-devo','2000045','dweasdwr','122323'),(23,'Mahadi-devo','2000045','dweasdwr','122323'),(24,'Mahadi-devo','2000045','dweasdwr','122323'),(25,'Mahadi-devo','2000045','dweasdwr','122323'),(26,'Mahadi-devo','2000045','dweasdwr','122323'),(27,'Mahadi-devo','2000045','dweasdwr','122323'),(28,'Mahadi-devo','2000045','dweasdwr','122323'),(29,'Mahadi-devo','2000045','dweasdwr','122323'),(30,'Mahadi-devo','2000045','dweasdwr','122323'),(31,'Mahadi-devo','2000045','dweasdwr','122323'),(32,'Mahadi-devo','2000045','dweasdwr','122323'),(33,'Mahadi-devo','2000045','dweasdwr','122323'),(34,'Mahadi-devo','2000045','dweasdwr','122323'),(35,'Mahadi-devo','2000045','dweasdwr','122323'),(36,'Mahadi-devo','2000045','dweasdwr','122323'),(37,'Mahadi-devo','2000045','dweasdwr','122323'),(38,'Mahadi-devo','2000045','dweasdwr','122323'),(39,'Mahadi-devo','2000045','dweasdwr','122323'),(40,'Mahadi-devo','2000045','dweasdwr','122323'),(41,'Mahadi-devo','2000045','dweasdwr','122323'),(42,'Mahadi-devo','2000045','dweasdwr','122323'),(43,'Mahadi-devo','2000045','dweasdwr','122323'),(44,'Mahadi-devo','2000045','dweasdwr','122323'),(45,'Mahadi-devo','2000045','dweasdwr','122323'),(46,'ABC','199113123','colombo',NULL),(47,'ABC','199113123','colombo',NULL),(48,'ABC','199113123','colombo',NULL),(49,'ABC','199113123','colombo',NULL),(50,'ABC','199113123','colombo',NULL),(51,'ABC','199113123','colombo',NULL),(52,'ABC','199113123','colombo',NULL),(53,'ABC','199113123','colombo',NULL),(54,'ABC','199113123','colombo',NULL);
/*!40000 ALTER TABLE `passengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `paymentMethodId` int(11) NOT NULL DEFAULT '1',
  `accountId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_paymentMethod_index_fk_idx` (`paymentMethodId`),
  KEY `payment_accountId_index` (`accountId`),
  CONSTRAINT `payment_accountId_index_fk` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  CONSTRAINT `payment_paymentMethod_index_fk` FOREIGN KEY (`paymentMethodId`) REFERENCES `paymentmethod` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,130,'2021-10-09','2021-10-09',1,36);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentmethod`
--

DROP TABLE IF EXISTS `paymentmethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentmethod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentmethod`
--

LOCK TABLES `paymentmethod` WRITE;
/*!40000 ALTER TABLE `paymentmethod` DISABLE KEYS */;
INSERT INTO `paymentmethod` VALUES (1,'Cash'),(2,'Credit'),(3,'Debit');
/*!40000 ALTER TABLE `paymentmethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(45) NOT NULL,
  `reportTypeId` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `report_reportTypeId_idx` (`reportTypeId`),
  CONSTRAINT `report_reportTypeId_idx_fk` FOREIGN KEY (`reportTypeId`) REFERENCES `reporttype` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reporttype`
--

DROP TABLE IF EXISTS `reporttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporttype`
--

LOCK TABLES `reporttype` WRITE;
/*!40000 ALTER TABLE `reporttype` DISABLE KEYS */;
INSERT INTO `reporttype` VALUES (1,'Fine Details Report'),(2,'Journey Details Report');
/*!40000 ALTER TABLE `reporttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depatureLat` varchar(45) NOT NULL,
  `depatureLong` varchar(45) NOT NULL,
  `destinationLat` varchar(45) NOT NULL,
  `destinationLong` varchar(45) NOT NULL,
  `stopCount` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'2345','245','245','245',6);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `destinationLat` varchar(100) DEFAULT NULL,
  `validityPeriod` varchar(45) NOT NULL,
  `issuedLocationLat` varchar(100) NOT NULL,
  `ticketTypeId` int(11) NOT NULL,
  `destinationLong` varchar(100) NOT NULL,
  `qrCode` longtext,
  `issuedLocationLong` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_ticketTypeId_index_fk_idx` (`ticketTypeId`),
  CONSTRAINT `ticket_ticketTypeId_index_fk` FOREIGN KEY (`ticketTypeId`) REFERENCES `tickettype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,120,'2021-10-03','2021-10-03','6.672834','2021-10-04T01:40:07.578Z','Rathnapura',1,'80.396576','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARQAAAEUCAYAAADqcMl5AAAAAklEQVR4AewaftIAABJLSURBVO3BQY7gRhLAQFLo/3+ZO8c8FSCoemwvMsL+YK21LnhYa61LHtZa65KHtda65GGttS55WGutSx7WWuuSh7XWuuRhrbUueVhrrUse1lrrkoe11rrkYa21LnlYa61LHtZa65KHtda65IePVP6miknlpOILlaliUjmpmFSmijdU3qiYVKaKE5Wp4kTlpopJZaqYVKaKE5Wp4g2VqeJE5aRiUvmbKr54WGutSx7WWuuSh7XWuuSHyypuUnmj4kRlqjipOKmYVCaVqWJSOamYKn6TyonKVPFGxYnKTSpTxYnKVHFSMalMFTdV3KRy08Naa13ysNZalzystdYlP/wylTcq3qiYVKaKqWJSeaNiUnlDZaqYVCaVNypOKiaVqeJEZVKZKiaVSeWk4qaKNyomlS9UfpPKGxW/6WGttS55WGutSx7WWuuSH/7jVN5QmSpOVCaVLyomlaliUpkqJpUvKiaVqeINlaliUjlROak4qZhUpoqpYlKZKiaVk4pJZaqYVP6fPKy11iUPa611ycNaa13yw39cxaTyhspJxYnKVDGpTCpTxUnFpHKiMlWcqJyovFFxUnGTym9SOal4Q2Wq+H/ysNZalzystdYlD2utdckPv6zin6RyUjGpTCpTxRcVb6hMFScqX1S8oXKiMlVMKlPFpDJVnFScqEwVU8Wk8obKScVNFf8mD2utdcnDWmtd8rDWWpf8cJnK36QyVUwqU8WkMlVMKr9JZap4Q2WqmFSmijdUpor/EpWpYlKZKk4qJpWpYlI5UZkqTlT+zR7WWuuSh7XWuuRhrbUu+eGjin8TlanipGJSeaPiDZWpYlKZKiaVNyq+qHhD5UTlb6qYVKaKN1Ruqjip+C95WGutSx7WWuuSh7XWuuSHj1SmiknlpGJSeaPiC5U3VE4qTipuqphUpopJ5UTlpopJZao4qfgnVbyhMlV8oTJVnKhMFZPKScUXD2utdcnDWmtd8rDWWpf88MsqJpU3KiaVL1SmihOVqWJSmVSmijcqJpWp4g2VqWJSmSomlZOKL1ROKiaVE5WTiknlpOJE5QuVmypOKn7Tw1prXfKw1lqXPKy11iU/XKZyUvGGyhsqX6hMFZPKGypfVEwqJxWTyhcVJypTxaQyVZyonFScqJyovKEyVUwVk8obFZPKicobFX/Tw1prXfKw1lqXPKy11iU//GUqb1RMKm9UTCpvqEwVk8obFZPKVPGFyhcqU8VJxaTyhspUMalMFW9UTConFZPKpPKGylRxUvGGylQxqUwVk8pU8cXDWmtd8rDWWpc8rLXWJfYHv0jljYpJ5Y2KSeVvqvhCZaq4SeWNiknlpOJE5aTiC5WpYlKZKiaVk4pJ5aRiUvmi4kTljYqbHtZa65KHtda65GGttS6xP7hI5aRiUjmpmFSmikllqphUTiomlTcqJpWTikllqvhNKm9UnKhMFZPKVHGiMlVMKicVN6ncVDGpTBVfqLxR8cXDWmtd8rDWWpc8rLXWJfYHF6lMFZPKVHGi8psqJpWTiknlpOJEZaqYVKaK36QyVdykclPFpPJGxaQyVbyhclIxqUwVk8pJxYnKVPGbHtZa65KHtda65GGttS754bKKN1SmiqniJpWTiknlpOINlanipGJSOamYVE4qTlSmikllqjipOFGZKiaVSWWqOFF5Q2WqmFSmiknlpOImlTdUpoovHtZa65KHtda65GGttS754SOVqeILlZOKSWWqmFSmijcqJpWp4kRlqnhD5aRiUjmpmFT+JpWTipOKSWVSOamYVE4qJpUTlTdUpoqp4r/kYa21LnlYa61LHtZa65IfPqr4ouINlS9UpooTlaniROU3VUwqU8WJylRxojKpnKi8UfGGyknFicpUMalMKlPFFyonKlPFGxUnKr/pYa21LnlYa61LHtZa65IfLlM5qThReaNiUpkq3lCZKiaVqWKquKniDZWTiknli4oTlaliUpkqJpWp4ouKSWWqmFS+UDmp+EJlqphU/qaHtda65GGttS55WGutS364rGJSOVE5qXij4kTli4oTlaniROWNiqnii4pJZaqYVE5UTlSmiknlC5WTii9UpoqTiknlC5U3Kv6mh7XWuuRhrbUueVhrrUt+uEzli4pJ5YuKNypOVKaKE5WTii9UpopJ5aRiqvii4qaKSeWk4p+kMlW8oTJV/Jc8rLXWJQ9rrXXJw1prXWJ/8BepTBWTylRxojJVvKFyUnGTylTxN6lMFScqU8WkMlWcqLxRMalMFZPKVPH/RGWqmFSmihOVqeKLh7XWuuRhrbUueVhrrUt++EhlqjipOKmYVKaKE5V/E5UTlaniROWLijcq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',''),(2,120,'2021-10-03','2021-10-03','6.672834','2021-10-04T02:06:05.637Z','80.396576',1,'80.396576','data:image/png;base64,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','6.672834');
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickettype`
--

DROP TABLE IF EXISTS `tickettype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickettype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickettype`
--

LOCK TABLES `tickettype` WRITE;
/*!40000 ALTER TABLE `tickettype` DISABLE KEYS */;
INSERT INTO `tickettype` VALUES (1,'One Way Ticket'),(2,'Day Use Ticket'),(3,'Pay As You Go Ticket');
/*!40000 ALTER TABLE `tickettype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-10 22:13:33
