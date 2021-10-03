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
  `creditAmount` float NOT NULL DEFAULT '100',
  `updatedAt` date NOT NULL,
  `passengerId` int DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `qrCode` longtext,
  `employeeId` int DEFAULT NULL,
  `accountTypeId` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `account_passenger_index` (`passengerId`),
  KEY `account_accountType_index` (`accountTypeId`),
  KEY `account_employeeId_index` (`employeeId`),
  CONSTRAINT `account_accountType_index_fk` FOREIGN KEY (`accountTypeId`) REFERENCES `accounttype` (`id`),
  CONSTRAINT `account_employeeId_index_fk` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`),
  CONSTRAINT `account_passenger_index_fk` FOREIGN KEY (`id`) REFERENCES `passengers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (35,'2021-10-03',123,'2021-10-03',45,'mahadihassan083@gmail.com','$2a$10$GrWXBRdWSF4CBQiU/BYkqucUysfHmkDXJA5eX2b4PJ.8YIjg.zm8u','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAAD0CAYAAACsLwv+AAAAAklEQVR4AewaftIAAA5YSURBVO3BQW4sy7LgQDKh/W+ZraGPAkhU6fz7ot3MfrHWusLDWusaD2utazysta7xsNa6xsNa6xoPa61rPKy1rvGw1rrGw1rrGg9rrWs8rLWu8bDWusbDWusaD2utazysta7xw4dU/qWKT6hMFZPKVDGpTBWTyknFN6lMFW+ofKLiDZU3Kk5UpopJZap4Q+VfqvjEw1rrGg9rrWs8rLWu8cOXVXyTyidUpopJZao4qfhLKp9QmSomlaniDZUTlZOKSeVE5aTiDZWp4o2Kb1L5poe11jUe1lrXeFhrXeOHP6byRsUbKicVk8pUcaJyUvEJlaniDZWp4g2VqWJSmSomlZOKSeWNikllUpkqpopJ5ZtU3qj4Sw9rrWs8rLWu8bDWusYPl1OZKv6liknlmyomlanipOKkYlKZKiaVSWWqmFTeqHhDZaqYVKaK/2UPa61rPKy1rvGw1rrGD/+fU/mEylRxUnGiclIxqZyonKhMFZPKJyomlZOKN1Q+UXGTh7XWNR7WWtd4WGtd44c/VvEvVbxRMalMFScqk8pUcaJyUvFGxRsqk8pUMalMKlPFpDJVTConKicVJyp/qeK/5GGtdY2HtdY1HtZa1/jhy1T+S1SmikllqphUpoqTikllqjipmFSmijdUpoqTikllqphU/qWKSWWqeENlqjhR+S97WGtd42GtdY2HtdY17Bf/w1Smir+kclLxCZWp4kRlqnhD5aTiX1KZKk5UTiomlaniJg9rrWs8rLWu8bDWuob94gMqU8Wk8k0VJypTxaTyRsWJylTxL6l8U8WJyknFicpJxYnKVHGiMlVMKlPFpPJNFX/pYa11jYe11jUe1lrXsF/8QypTxaQyVZyoTBWTyknFpPIvVUwqb1S8ofKJikllqviEylRxojJVTConFZPKVPFNKicVn3hYa13jYa11jYe11jXsF/+QylQxqZxUnKicVEwq31QxqUwVk8obFW+oTBUnKlPFpPKJiknlExVvqEwVJypTxaQyVUwqJxXf9LDWusbDWusaD2uta9gvPqAyVUwqU8U3qUwV/5LKScWk8kbFpHJS8U0qU8WkclLxTSonFZPKJyr+kspU8YmHtdY1HtZa13hYa13jhw9VTCpTxaQyVUwqJxVTxaTylyreUDmp+EsqJxWTyonKVPGGyknFpDJVvFFxovKGyn/Zw1rrGg9rrWs8rLWu8cM/VjGpnFScqJxUTCpTxRsqJxUnKpPKGxVvVJyoTBWTyjdVvFExqUwVJypTxVQxqXyi4kTlLz2sta7xsNa6xsNa6xr2iw+oTBWTylQxqbxR8YbKVPEJlZOKT6hMFZPKVHGiMlWcqLxRMamcVEwqb1R8k8pUMamcVPyXPKy1rvGw1rrGw1rrGj98mcpUMalMFZPKVDGpTBUnFScqU8WkMlV8QmWqOFE5UZkqpooTlTcqJpWpYlI5qZhUTlROKiaVqeIvqUwVk8pU8U0Pa61rPKy1rvGw1rrGDx+q+Esq36QyVZxUTCpvVJyoTBXfpDJVTBUnKicVk8obKm9UvFHxhspJxaQyVUwqU8VfelhrXeNhrXWNh7XWNX74j6k4UTlRmSqmim+qmFTeqJhUTiomlaniROUvVUwqk8pUMalMFZ9QmSqmir9UMamcVHziYa11jYe11jUe1lrXsF98QGWqmFROKiaVk4pJZaqYVKaKSWWqOFE5qZhUpoo3VKaKT6hMFW+ovFFxojJVTCpTxaRyUjGpTBWTyknFicpU8S89rLWu8bDWusbDWusaP3yo4qTiROWkYlKZKt5QeUPlpGJSmSpOVN5QeaNiqphUpopJZaqYVE5UpoqpYlL5RMWk8omKE5VPqEwVn3hYa13jYa11jYe11jV++GMqU8VUcaLyTRUnKlPFicqJylRxUjGpTBVvqEwVJyonKlPFpDJVTCpvVEwqU8WkclIxqUwVk8obFZPKScU3Pay1rvGw1rrGw1rrGj98SOUNlTcqJpUTlanijYpJZao4qZhUJpUTlaliUpkq3lCZKiaVN1Smik9UvKHyiYqTihOVNyomlaniEw9rrWs8rLWu8bDWusYPf6xiUjmpmFSmiknlROWNiqliUnmj4g2Vk4pJZao4qZhUTiomlaliUnmj4hMVb6hMFZPKVDGpnKhMFScV3/Sw1rrGw1rrGg9rrWvYLz6g8omKN1S+qeJE5aTiROWk4kTlpOINlZOKN1TeqJhUpooTlZOKSeWk4kTlpGJSmSpOVKaKTzysta7xsNa6xsNa6xr2iy9SOamYVL6pYlKZKiaVk4o3VKaKSeWNihOVb6r4hMobFScqU8UnVP5LKr7pYa11jYe11jUe1lrXsF98QOWkYlI5qXhD5Y2KN1Q+UfGGyicq3lCZKiaVk4pJZar4JpWTiknljYo3VKaKE5WTik88rLWu8bDWusbDWusaP/wxlaliUjlRmSpOKiaVN1TeqDhRmSomlZOKSeUNlanijYoTlROVk4pJ5aRiUplUpopJ5Q2VqeINlZOKb3pYa13jYa11jYe11jV++FDFpDJVfKLim1Q+UTGpfFPFN1W8ofJGxYnKVHFS8YmKSWWqmFROKt5QmSomlUllqvjEw1rrGg9rrWs8rLWuYb/4gMpJxaTylyreUDmpmFROKiaVqeKbVL6pYlKZKr5JZaqYVE4qPqHyTRWTyhsVn3hYa13jYa11jYe11jV++I+peEPlDZVvqphUTlSmihOVb6qYVCaVE5Wp4ptUpopJZVL5popJZaqYVE4qTlS+6WGtdY2HtdY1HtZa17Bf/CGVqeINlaliUnmj4kTlpOIvqUwVb6h8omJSmSpOVN6oOFE5qXhDZar4hMpUMalMFX/pYa11jYe11jUe1lrXsF98QGWqmFTeqPiEyhsVk8pJxRsqb1R8k8pJxaQyVUwqb1R8k8obFZPKScWkMlVMKlPFGypTxSce1lrXeFhrXeNhrXWNHz5UMalMFZ9QOamYKk5UJpWTikllqnij4ptUvqnijYoTlaliUnmj4g2VqWJSmVTeqJhUTir+0sNa6xoPa61rPKy1rvHDh1ROVKaKE5Wp4hMqJxXfpDJVnKhMFZPKScU3qUwVJypTxVTxRsVfUvkmlTdU/tLDWusaD2utazysta5hv/iAylQxqUwVb6hMFScqJxWTyknFGyonFScqU8WJyjdVTCp/qeJE5aTiEyonFScqb1T8pYe11jUe1lrXeFhrXcN+8Q+pTBWTylRxovKJiknlExWTylQxqUwVk8pU8ZdUTiomlZOKSWWqmFQ+UTGpnFScqHyi4l96WGtd42GtdY2HtdY1fviPqZhU3qg4UZlUpopJ5aTiExUnFScqU8VfUpkqPqFyUvGGyknFicpU8YbKpDJV/KWHtdY1HtZa13hYa13jhz+mMlW8UTGpnKicVEwqk8pUcaIyVZyonFRMKp9QmSomlW9SmSpOKr6pYlKZVKaKN1S+SWWq+MTDWusaD2utazysta7xw4dUPqEyVUwqU8U3VUwqk8onKiaVE5Wp4kTlpOITFScqU8VJxaQyVUwqJxWTylRxovJNFZPKScU3Pay1rvGw1rrGw1rrGj98WcWk8omKE5U3Kt6o+ITKGxVvVJyoTBVTxYnKGypTxRsqJxWTylRxojJVnKhMFZPKScWJylTxiYe11jUe1lrXeFhrXeOH/2MVJypTxVRxovJGxaQyVfwllaliUjmpmComlaliUpkqJpWp4g2Vk4pJZVKZKiaVk4pPqEwVk8obFd/0sNa6xsNa6xoPa61r/PDHKiaVqWJSmSomlZOKN1Q+oTJVfKLijYoTlaniDZWp4hMVJyonFd+kMlWcVEwqJxUnKlPFJx7WWtd4WGtd42GtdQ37xQdUTiomlb9UcaIyVUwqU8UbKm9UTCpTxYnKVHGiclJxojJVTConFZPKVHGiMlV8QuWk4kRlqvi/9LDWusbDWusaD2uta9gvvkjlpOKbVE4qvkllqvgmlW+q+ITKVDGpnFRMKicVk8obFScqU8WkclIxqZxUnKhMFZ94WGtd42GtdY2HtdY17Bf/kMpUcaLylypOVKaKSWWqOFGZKj6h8k0VJypTxaRyUjGpTBWTyknFJ1S+qeJEZar4poe11jUe1lrXeFhrXcN+8T9M5f9SxaRyUnGi8omKN1TeqPiEyknFicpUcaIyVUwqU8UbKlPFpDJVTCpTxSce1lrXeFhrXeNhrXWNHz6k8i9VTBWTyknFpDJVvKFyUjGpTBVTxaQyVUwqJypTxUnFicpUMamcVEwqJypTxaRyUvEJlaniRGWqmFSmim96WGtd42GtdY2HtdY1fviyim9SOVH5JpU3KiaVk4pJ5S9VfFPFGxUnFZPKVPFNKm9U/CWVqeITD2utazysta7xsNa6xg9/TOWNik9UnKhMFZPKGypTxYnKVHGi8obKJ1Q+UfGGyhsqU8UbFZPKpPKJiknlpOKbHtZa13hYa13jYa11jR8upzJVTConFZPKicpJxaRyUjGpvFExqXyiYlL5RMWk8obKGxVvVEwqU8VJxb/0sNa6xsNa6xoPa61r/HC5iknlpGJSOamYVKaKNyomlaliUpkqJpWp4hMqJyonFZPKicpJxRsqU8Wk8obKVHGiclLxiYe11jUe1lrXeFhrXeOHP1bxlyr+UsWk8obKScWkcqIyVZxUfEJlqphUTipOKt5QmVSmiknljYqTim+q+KaHtdY1HtZa13hYa13jhy9T+ZdU3qiYVD6hclIxqUwqU8UbKp+omFROVKaKE5WpYlKZKiaVqeKNiknlROWkYlJ5o+IvPay1rvGw1rrGw1rrGvaLtdYVHtZa13hYa13jYa11jYe11jUe1lrXeFhrXeNhrXWNh7XWNR7WWtd4WGtd42GtdY2HtdY1HtZa13hYa13jYa11jf8HHxkzJFSm01gAAAAASUVORK5CYII=',NULL,1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounttype`
--

DROP TABLE IF EXISTS `accounttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounttype` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `employeeTypeId` int NOT NULL,
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
  `id` int NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengers`
--

LOCK TABLES `passengers` WRITE;
/*!40000 ALTER TABLE `passengers` DISABLE KEYS */;
INSERT INTO `passengers` VALUES (1,'Mahadi','2000045','dwewr','122323'),(2,'Mahadi','2000045','dwewr','122323'),(3,'Mahadi','2000045','dwewr','122323'),(4,'Mahadi','2000045','dwewr','122323'),(5,'Mahadi','2000045','dwewr','122323'),(6,'Mahadi','2000045','dwewr','122323'),(7,'Mahadi-devo','2000045','dwewr','122323'),(8,'Mahadi-devo','2000045','dwewr','122323'),(9,'Mahadi-devo','2000045','dwewr','122323'),(10,'Mahadi-devo','2000045','dwewr','122323'),(11,'Mahadi-devo','2000045','dwewr','122323'),(12,'Mahadi-devo','2000045','dwewr','122323'),(13,'Mahadi-devo','2000045','dweasdwr','122323'),(14,'Mahadi-devo','2000045','dweasdwr','122323'),(15,'Mahadi-devo','2000045','dweasdwr','122323'),(16,'Mahadi-devo','2000045','dweasdwr','122323'),(17,'Mahadi-devo','2000045','dweasdwr','122323'),(18,'Mahadi-devo','2000045','dweasdwr','122323'),(19,'Mahadi-devo','2000045','dweasdwr','122323'),(20,'Mahadi-devo','2000045','dweasdwr','122323'),(21,'Mahadi-devo','2000045','dweasdwr','122323'),(22,'Mahadi-devo','2000045','dweasdwr','122323'),(23,'Mahadi-devo','2000045','dweasdwr','122323'),(24,'Mahadi-devo','2000045','dweasdwr','122323'),(25,'Mahadi-devo','2000045','dweasdwr','122323'),(26,'Mahadi-devo','2000045','dweasdwr','122323'),(27,'Mahadi-devo','2000045','dweasdwr','122323'),(28,'Mahadi-devo','2000045','dweasdwr','122323'),(29,'Mahadi-devo','2000045','dweasdwr','122323'),(30,'Mahadi-devo','2000045','dweasdwr','122323'),(31,'Mahadi-devo','2000045','dweasdwr','122323'),(32,'Mahadi-devo','2000045','dweasdwr','122323'),(33,'Mahadi-devo','2000045','dweasdwr','122323'),(34,'Mahadi-devo','2000045','dweasdwr','122323'),(35,'Mahadi-devo','2000045','dweasdwr','122323'),(36,'Mahadi-devo','2000045','dweasdwr','122323'),(37,'Mahadi-devo','2000045','dweasdwr','122323'),(38,'Mahadi-devo','2000045','dweasdwr','122323'),(39,'Mahadi-devo','2000045','dweasdwr','122323'),(40,'Mahadi-devo','2000045','dweasdwr','122323'),(41,'Mahadi-devo','2000045','dweasdwr','122323'),(42,'Mahadi-devo','2000045','dweasdwr','122323'),(43,'Mahadi-devo','2000045','dweasdwr','122323'),(44,'Mahadi-devo','2000045','dweasdwr','122323'),(45,'Mahadi-devo','2000045','dweasdwr','122323');
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
  `paymentMethodId` int NOT NULL DEFAULT '1',
  `accountId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_paymentMethod_index_fk_idx` (`paymentMethodId`),
  KEY `payment_accountId_index` (`accountId`),
  CONSTRAINT `payment_accountId_index_fk` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
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
  `price` float NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `destinationLat` varchar(100) DEFAULT NULL,
  `validityPeriod` varchar(45) NOT NULL,
  `issuedLocationLat` varchar(100) NOT NULL,
  `ticketTypeId` int NOT NULL,
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

-- Dump completed on 2021-10-03 22:25:27
