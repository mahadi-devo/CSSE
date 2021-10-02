-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: ticketingsystem
-- ------------------------------------------------------
-- Server version	8.0.25

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
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` date NOT NULL,
  `creditAmount` varchar(45) NOT NULL DEFAULT '100',
  `updatedAt` date NOT NULL,
  `passengerId` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_passenger_index` (`passengerId`),
  CONSTRAINT `account_passenger_index_fk` FOREIGN KEY (`id`) REFERENCES `passengers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (3,'2021-10-02','123','2021-10-02',12,'mahadi@gmail.com','123');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus`
--

DROP TABLE IF EXISTS `bus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('normal','semi','luxuary') NOT NULL DEFAULT 'normal',
  `driverName` varchar(45) DEFAULT 'UNKNOWN',
  `status` int NOT NULL DEFAULT '0',
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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fare`
--

DROP TABLE IF EXISTS `fare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fare` (
  `id` int NOT NULL,
  `amount` int NOT NULL,
  `journeyId` int NOT NULL,
  `passengerHistoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fare_passengerHistory_index` (`passengerHistoryId`),
  KEY `fare_journeyId_index` (`journeyId`),
  CONSTRAINT `fare_journeyId_index_fk` FOREIGN KEY (`journeyId`) REFERENCES `journey` (`id`),
  CONSTRAINT `fare_passengerHistory_index_fk` FOREIGN KEY (`passengerHistoryId`) REFERENCES `passengerhistory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fare`
--

LOCK TABLES `fare` WRITE;
/*!40000 ALTER TABLE `fare` DISABLE KEYS */;
/*!40000 ALTER TABLE `fare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fine`
--

DROP TABLE IF EXISTS `fine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `createdAt` date NOT NULL,
  `accountId` int DEFAULT NULL,
  `inspectionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fine_accountId_index_fk_idx` (`accountId`),
  KEY `fine_inspectionId_index` (`inspectionId`),
  CONSTRAINT `fine_accountId_index_fk` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  CONSTRAINT `fine_inspectionId_index_fk` FOREIGN KEY (`inspectionId`) REFERENCES `inspection` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fine`
--

LOCK TABLES `fine` WRITE;
/*!40000 ALTER TABLE `fine` DISABLE KEYS */;
/*!40000 ALTER TABLE `fine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspection`
--

DROP TABLE IF EXISTS `inspection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inspection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` date NOT NULL,
  `description` varchar(45) NOT NULL,
  `journeyId` int NOT NULL,
  `inspectorId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inspection_journeyId_index` (`journeyId`),
  KEY `inspection_inspectorId_index` (`inspectorId`),
  CONSTRAINT `inspection_inspectorId_index_fk` FOREIGN KEY (`inspectorId`) REFERENCES `employee` (`id`),
  CONSTRAINT `inspection_journeyId_index_fk` FOREIGN KEY (`journeyId`) REFERENCES `journey` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspection`
--

LOCK TABLES `inspection` WRITE;
/*!40000 ALTER TABLE `inspection` DISABLE KEYS */;
/*!40000 ALTER TABLE `inspection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey`
--

DROP TABLE IF EXISTS `journey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `busId` int NOT NULL,
  `routeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `journey_busId_index_fk_idx` (`busId`),
  KEY `journey_routeId_index_fk_idx` (`routeId`),
  CONSTRAINT `journey_busId_index_fk` FOREIGN KEY (`busId`) REFERENCES `bus` (`id`),
  CONSTRAINT `journey_routeId_index_fk` FOREIGN KEY (`routeId`) REFERENCES `route` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey`
--

LOCK TABLES `journey` WRITE;
/*!40000 ALTER TABLE `journey` DISABLE KEYS */;
/*!40000 ALTER TABLE `journey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passengerhistory`
--

DROP TABLE IF EXISTS `passengerhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengerhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `depatureLat` varchar(45) NOT NULL,
  `depatureLong` varchar(45) NOT NULL,
  `destinationLat` varchar(45) NOT NULL,
  `destinationLong` varchar(45) NOT NULL,
  `createdAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengerhistory`
--

LOCK TABLES `passengerhistory` WRITE;
/*!40000 ALTER TABLE `passengerhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `passengerhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passengers`
--

DROP TABLE IF EXISTS `passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `nic` varchar(20) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `passportNo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengers`
--

LOCK TABLES `passengers` WRITE;
/*!40000 ALTER TABLE `passengers` DISABLE KEYS */;
INSERT INTO `passengers` VALUES (1,'Mahadi','2000045','dwewr','122323'),(2,'Mahadi','2000045','dwewr','122323'),(3,'Mahadi','2000045','dwewr','122323'),(4,'Mahadi','2000045','dwewr','122323'),(5,'Mahadi','2000045','dwewr','122323'),(6,'Mahadi','2000045','dwewr','122323'),(7,'Mahadi-devo','2000045','dwewr','122323'),(8,'Mahadi-devo','2000045','dwewr','122323'),(9,'Mahadi-devo','2000045','dwewr','122323'),(10,'Mahadi-devo','2000045','dwewr','122323'),(11,'Mahadi-devo','2000045','dwewr','122323'),(12,'Mahadi-devo','2000045','dwewr','122323');
/*!40000 ALTER TABLE `passengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `paymentMethodId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_paymentMethod_index_fk_idx` (`paymentMethodId`),
  CONSTRAINT `payment_paymentMethod_index_fk` FOREIGN KEY (`paymentMethodId`) REFERENCES `paymentmethod` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentmethod`
--

DROP TABLE IF EXISTS `paymentmethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentmethod` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(45) NOT NULL,
  `reportTypeId` int NOT NULL,
  `createdAt` date NOT NULL,
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
  `id` int NOT NULL AUTO_INCREMENT,
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
  `id` int NOT NULL AUTO_INCREMENT,
  `depatureLat` varchar(45) NOT NULL,
  `depatureLong` varchar(45) NOT NULL,
  `destinationLat` varchar(45) NOT NULL,
  `destinationLong` varchar(45) NOT NULL,
  `stopCount` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `destination` varchar(100) NOT NULL,
  `validityPeriod` varchar(45) NOT NULL,
  `issuedLocation` varchar(100) NOT NULL,
  `tickettypeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_ticketTypeId_index_fk_idx` (`tickettypeId`),
  CONSTRAINT `ticket_ticketTypeId_index_fk` FOREIGN KEY (`tickettypeId`) REFERENCES `tickettype` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickettype`
--

DROP TABLE IF EXISTS `tickettype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickettype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickettype`
--

LOCK TABLES `tickettype` WRITE;
/*!40000 ALTER TABLE `tickettype` DISABLE KEYS */;
INSERT INTO `tickettype` VALUES (1,'One Way Ticket'),(2,'Day User Ticket'),(3,'Pay As You Go Ticket');
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

-- Dump completed on 2021-10-03  2:41:55
