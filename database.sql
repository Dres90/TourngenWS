CREATE DATABASE  IF NOT EXISTS `tourngen` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tourngen`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: tourngen
-- ------------------------------------------------------
-- Server version	5.6.16-log

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_5f412f9a` (`group_id`),
  KEY `auth_group_permissions_83d7f98b` (`permission_id`),
  CONSTRAINT `group_id_refs_id_f4b32aac` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `permission_id_refs_id_6ba0f519` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  KEY `auth_permission_37ef4eb4` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_d043b34a` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add fixture',7,'add_fixture'),(20,'Can change fixture',7,'change_fixture'),(21,'Can delete fixture',7,'delete_fixture'),(22,'Can add match',8,'add_match'),(23,'Can change match',8,'change_match'),(24,'Can delete match',8,'delete_match'),(25,'Can change a match if it is a data entry user',8,'usario_digitador'),(26,'Can add privilege',9,'add_privilege'),(27,'Can change privilege',9,'change_privilege'),(28,'Can delete privilege',9,'delete_privilege'),(29,'Can add team',10,'add_team'),(30,'Can change team',10,'change_team'),(31,'Can delete team',10,'delete_team'),(32,'Can view a team',10,'view_team'),(33,'Can add tournament',11,'add_tournament'),(34,'Can change tournament',11,'change_tournament'),(35,'Can delete tournament',11,'delete_tournament'),(36,'Can view a tournament',11,'view_tournament'),(37,'Can add auth group',12,'add_authgroup'),(38,'Can change auth group',12,'change_authgroup'),(39,'Can delete auth group',12,'delete_authgroup'),(40,'Can add auth group permissions',13,'add_authgrouppermissions'),(41,'Can change auth group permissions',13,'change_authgrouppermissions'),(42,'Can delete auth group permissions',13,'delete_authgrouppermissions'),(43,'Can add auth permission',14,'add_authpermission'),(44,'Can change auth permission',14,'change_authpermission'),(45,'Can delete auth permission',14,'delete_authpermission'),(46,'Can add auth user',15,'add_authuser'),(47,'Can change auth user',15,'change_authuser'),(48,'Can delete auth user',15,'delete_authuser'),(49,'Can add a user for data entry',15,'add_dataentry'),(50,'Can add a user that represents a team',15,'add_usuario_rep'),(51,'Can view a tournament even if it is private',15,'is_rep'),(52,'Can add auth user groups',16,'add_authusergroups'),(53,'Can change auth user groups',16,'change_authusergroups'),(54,'Can delete auth user groups',16,'delete_authusergroups'),(55,'Can add auth user user permissions',17,'add_authuseruserpermissions'),(56,'Can change auth user user permissions',17,'change_authuseruserpermissions'),(57,'Can delete auth user user permissions',17,'delete_authuseruserpermissions'),(58,'Can add django admin log',18,'add_djangoadminlog'),(59,'Can change django admin log',18,'change_djangoadminlog'),(60,'Can delete django admin log',18,'delete_djangoadminlog'),(61,'Can add django content type',19,'add_djangocontenttype'),(62,'Can change django content type',19,'change_djangocontenttype'),(63,'Can delete django content type',19,'delete_djangocontenttype'),(64,'Can add django session',20,'add_djangosession'),(65,'Can change django session',20,'change_djangosession'),(66,'Can delete django session',20,'delete_djangosession'),(67,'Can add user object permission',21,'add_userobjectpermission'),(68,'Can change user object permission',21,'change_userobjectpermission'),(69,'Can delete user object permission',21,'delete_userobjectpermission'),(70,'Can add group object permission',22,'add_groupobjectpermission'),(71,'Can change group object permission',22,'change_groupobjectpermission'),(72,'Can delete group object permission',22,'delete_groupobjectpermission'),(73,'Can add registration profile',23,'add_registrationprofile'),(74,'Can change registration profile',23,'change_registrationprofile'),(75,'Can delete registration profile',23,'delete_registrationprofile');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(75) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (-1,'','2014-03-19 03:31:18',0,'AnonymousUser','','','',0,1,'2014-03-19 03:31:18'),(1,'pbkdf2_sha256$12000$fAUwlTVkvgDv$edo0cVcAq/0jRcYEw9L43Pt1W16CPaUzWkOOvIJXb4o=','2014-03-19 20:05:51',1,'admin','','','rherrerapetit@gmail.com',1,1,'2014-03-19 03:31:18'),(2,'pbkdf2_sha256$12000$ngKnDv3NKPqX$caGeY0DveRNq4LaxQLOsKHPaeAxts6UU5I4S+UFVauw=','2014-03-19 04:36:06',0,'pedrito','','','',0,1,'2014-03-19 04:20:27'),(3,'pbkdf2_sha256$12000$XsRrp1n6Y69X$53jpwr4blIvEYNYbrgwZNM67s1OUt9hGIbf1qEKwNAU=','2014-03-20 17:10:00',0,'username','','','',0,1,'2014-03-19 16:31:39'),(4,'pbkdf2_sha256$12000$nsefXCzFMRUQ$SO26/GNCtjS+YjekUKZyt7X+gUHyqJvcsaL5G+vzXUM=','2014-03-19 17:27:11',0,'digitador1','','','',0,1,'2014-03-19 17:27:11'),(5,'pbkdf2_sha256$12000$URoptVn87xCX$Grq8fBYBFU7Vs7pwgB/9Clr0IIwDR4FqcEd8JbJ1S5I=','2014-03-19 17:29:57',0,'representante1','','','',0,1,'2014-03-19 17:29:57'),(6,'pbkdf2_sha256$12000$nKrrplG43Wra$sOCZchZGHg6kRtHFPicIOEaEpJ/UNRO3gt1m7S41Rjk=','2014-03-19 18:11:48',0,'papito','','','',0,1,'2014-03-19 18:11:48'),(7,'pbkdf2_sha256$12000$8WMa6A354A5N$/KQk2T0DYc/EiVYQYfuFgXIm4o3NE3wsSZ11BVfHWHs=','2014-03-31 18:05:13',0,'andres','','','',0,1,'2014-03-19 18:49:49'),(8,'pbkdf2_sha256$12000$5IlLpQrgLl9H$7kFzXBcpvCHUwkdfs4gLCRZoFaXVp+BDgl8pVdPag/Y=','2014-03-31 17:29:37',0,'AndresDigitador','','','',0,1,'2014-03-31 17:15:50'),(9,'pbkdf2_sha256$12000$NinT28YEy6bA$1tl+7fMWDiX18ot3fycFdDV1y6jiYtddgIj99Wwo2SA=','2014-03-31 17:17:54',0,'AndresRepresentante','','','',0,1,'2014-03-31 17:17:54'),(10,'pbkdf2_sha256$12000$clSErr4ZqH74$0yI/k2ZOAXc3GMpu9u9wAO3QWTGzsMZ9EPigWb69kIY=','2014-03-31 17:52:17',0,'Fabian','','','',0,1,'2014-03-31 17:19:18'),(11,'pbkdf2_sha256$12000$Tq86qzc6dAF9$EdVSzDPt9u7BIQb6QiiCX8XMauLZT7JOtBZk0NUGDKc=','2014-03-31 18:06:50',0,'FabianDigitador','','','',0,1,'2014-03-31 17:49:26');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `auth_user_groups_6340c63c` (`user_id`),
  KEY `auth_user_groups_5f412f9a` (`group_id`),
  CONSTRAINT `user_id_refs_id_40c41112` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `group_id_refs_id_274b862c` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_6340c63c` (`user_id`),
  KEY `auth_user_user_permissions_83d7f98b` (`permission_id`),
  CONSTRAINT `user_id_refs_id_4dc23c39` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `permission_id_refs_id_35d9ac25` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
INSERT INTO `auth_user_user_permissions` VALUES (5,2,22),(2,2,23),(4,2,29),(8,2,31),(1,2,33),(7,2,35),(3,2,49),(6,2,50),(13,3,22),(10,3,23),(12,3,29),(16,3,31),(9,3,33),(15,3,35),(11,3,49),(14,3,50),(17,4,25),(18,5,51),(23,6,22),(20,6,23),(22,6,29),(26,6,31),(19,6,33),(25,6,35),(21,6,49),(24,6,50),(31,7,22),(28,7,23),(30,7,29),(34,7,31),(27,7,33),(33,7,35),(29,7,49),(32,7,50),(36,8,23),(35,8,25),(37,9,51),(42,10,22),(39,10,23),(41,10,29),(45,10,31),(38,10,33),(44,10,35),(40,10,49),(43,10,50),(47,11,23),(46,11,25);
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_6340c63c` (`user_id`),
  KEY `django_admin_log_37ef4eb4` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_93d2d1f8` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `user_id_refs_id_c0d12874` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2014-03-19 04:26:04',1,4,'1','admin',2,'Changed password.');
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_label` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'log entry','admin','logentry'),(2,'permission','auth','permission'),(3,'group','auth','group'),(4,'user','auth','user'),(5,'content type','contenttypes','contenttype'),(6,'session','sessions','session'),(7,'fixture','tournament_creator','fixture'),(8,'match','tournament_creator','match'),(9,'privilege','tournament_creator','privilege'),(10,'team','tournament_creator','team'),(11,'tournament','tournament_creator','tournament'),(12,'auth group','tournament_creator','authgroup'),(13,'auth group permissions','tournament_creator','authgrouppermissions'),(14,'auth permission','tournament_creator','authpermission'),(15,'auth user','tournament_creator','authuser'),(16,'auth user groups','tournament_creator','authusergroups'),(17,'auth user user permissions','tournament_creator','authuseruserpermissions'),(18,'django admin log','tournament_creator','djangoadminlog'),(19,'django content type','tournament_creator','djangocontenttype'),(20,'django session','tournament_creator','djangosession'),(21,'user object permission','guardian','userobjectpermission'),(22,'group object permission','guardian','groupobjectpermission'),(23,'registration profile','registration','registrationprofile');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_b7b81f0c` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('c571eo9ryym09yv51zmq2sy68nkv3163','M2NkNzNlM2MzYzgyZWZjNzdhNWI2NDZmZmNiMTBlY2Y4NzA2NTdlNzp7fQ==','2014-04-02 18:11:36'),('us95l3y5x5jueg02qi1x1afuv62e4tw9','OTQyNDdjOTU1NzIwNjAyMjNkOWRlMDU0N2NmYzgwYmQzMDg5ZTJkNDp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6MTF9','2014-04-14 18:06:50'),('zy5qyw0gj9jqhiworktkrhguzg16gada','OWIyYmYwNTZjMDA2ZjE1NDJjNTg0MzJiODdjY2NkOGUxMDY5ZjJjNTp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6M30=','2014-04-03 17:10:00');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fixture`
--

DROP TABLE IF EXISTS `fixture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fixture` (
  `Fixture_id` int(11) NOT NULL AUTO_INCREMENT,
  `Tournament_id` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `Info` text,
  `Last_updated` datetime NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Fixture_id`),
  KEY `fk_Fixture_Tournament` (`Tournament_id`),
  CONSTRAINT `fk_Fixture_Tournament` FOREIGN KEY (`Tournament_id`) REFERENCES `tournament` (`Tournament_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixture`
--

LOCK TABLES `fixture` WRITE;
/*!40000 ALTER TABLE `fixture` DISABLE KEYS */;
INSERT INTO `fixture` VALUES (1,2,1,'','2014-03-19 16:49:37',1),(2,2,2,'','2014-03-19 17:02:55',1),(3,3,1,'','2014-03-19 18:53:25',1),(4,3,2,'','2014-03-19 18:53:25',1),(5,3,3,'','2014-03-19 18:53:25',1),(6,3,4,'','2014-03-19 18:53:25',1),(7,3,5,'','2014-03-19 18:53:25',1),(8,3,6,'','2014-03-19 18:53:25',1),(9,3,7,'','2014-03-19 18:53:25',1),(10,3,8,'','2014-03-19 18:53:25',1),(11,3,9,'','2014-03-19 18:53:25',1),(12,3,10,'','2014-03-19 18:53:25',1),(13,3,11,'','2014-03-19 18:53:25',1),(14,3,12,'','2014-03-19 18:53:25',1),(15,3,1,'','2014-03-19 19:05:45',1),(16,3,2,'','2014-03-19 19:05:45',1),(17,3,3,'','2014-03-19 19:05:45',1),(18,3,4,'','2014-03-19 19:05:45',1),(19,3,5,'','2014-03-19 19:05:45',1),(20,3,6,'','2014-03-19 19:05:45',1),(21,3,7,'','2014-03-19 19:05:45',1),(22,3,8,'','2014-03-19 19:05:45',1),(23,3,9,'','2014-03-19 19:05:45',1),(24,3,10,'','2014-03-19 19:05:45',1),(25,3,11,'','2014-03-19 19:05:45',1),(26,3,12,'','2014-03-19 19:05:45',1),(27,2,1,'','2014-03-20 17:20:03',1),(28,2,2,'','2014-03-20 17:20:03',1),(29,2,3,'','2014-03-20 17:20:03',1),(30,2,2,'','2014-03-20 17:25:06',1),(31,2,3,'','2014-03-20 17:25:06',1),(32,2,4,'','2014-03-20 17:25:06',1),(33,3,1,'','2014-03-31 18:05:20',1),(34,3,2,'','2014-03-31 18:05:20',1),(35,3,3,'','2014-03-31 18:05:20',1),(36,3,4,'','2014-03-31 18:05:20',1),(37,3,5,'','2014-03-31 18:05:20',1),(38,3,6,'','2014-03-31 18:05:20',1),(39,3,7,'','2014-03-31 18:05:20',1),(40,3,8,'','2014-03-31 18:05:20',1),(41,3,9,'','2014-03-31 18:05:20',1),(42,3,10,'','2014-03-31 18:05:20',1),(43,3,11,'','2014-03-31 18:05:20',1),(44,3,12,'','2014-03-31 18:05:20',1),(45,4,2,'','2014-03-31 18:05:45',1),(46,4,3,'','2014-03-31 18:05:45',1),(47,4,4,'','2014-03-31 18:05:45',1),(48,4,5,'','2014-03-31 18:05:45',1),(49,4,6,'','2014-03-31 18:05:45',1),(50,4,7,'','2014-03-31 18:05:45',1);
/*!40000 ALTER TABLE `fixture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guardian_groupobjectpermission`
--

DROP TABLE IF EXISTS `guardian_groupobjectpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guardian_groupobjectpermission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `object_pk` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`,`object_pk`),
  KEY `guardian_groupobjectpermission_83d7f98b` (`permission_id`),
  KEY `guardian_groupobjectpermission_37ef4eb4` (`content_type_id`),
  KEY `guardian_groupobjectpermission_5f412f9a` (`group_id`),
  CONSTRAINT `content_type_id_refs_id_ca873eba` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `group_id_refs_id_d890d4d6` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `permission_id_refs_id_ab04ab90` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guardian_groupobjectpermission`
--

LOCK TABLES `guardian_groupobjectpermission` WRITE;
/*!40000 ALTER TABLE `guardian_groupobjectpermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `guardian_groupobjectpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guardian_userobjectpermission`
--

DROP TABLE IF EXISTS `guardian_userobjectpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guardian_userobjectpermission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `object_pk` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`,`object_pk`),
  KEY `guardian_userobjectpermission_83d7f98b` (`permission_id`),
  KEY `guardian_userobjectpermission_37ef4eb4` (`content_type_id`),
  KEY `guardian_userobjectpermission_6340c63c` (`user_id`),
  CONSTRAINT `user_id_refs_id_29f71157` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `content_type_id_refs_id_ccf6cb3f` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `permission_id_refs_id_720a4b21` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guardian_userobjectpermission`
--

LOCK TABLES `guardian_userobjectpermission` WRITE;
/*!40000 ALTER TABLE `guardian_userobjectpermission` DISABLE KEYS */;
INSERT INTO `guardian_userobjectpermission` VALUES (1,36,11,'1',3),(2,36,11,'2',3),(3,32,10,'1',3),(4,32,10,'2',3),(5,36,11,'3',7),(6,32,10,'3',7),(7,32,10,'4',7),(8,32,10,'5',7),(9,32,10,'6',7),(10,32,10,'7',3),(11,36,11,'4',7),(12,32,10,'8',7),(13,32,10,'9',7),(14,32,10,'10',7),(15,32,10,'11',7),(16,36,11,'3',8),(17,36,11,'4',8),(18,36,11,'3',9),(19,36,11,'4',9),(20,36,11,'5',10),(21,32,10,'12',10),(22,32,10,'13',10),(23,32,10,'14',10),(24,36,11,'5',11);
/*!40000 ALTER TABLE `guardian_userobjectpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match` (
  `Match_id` int(11) NOT NULL AUTO_INCREMENT,
  `Fixture_id` int(11) NOT NULL,
  `Home_id` int(11) NOT NULL,
  `Away_id` int(11) NOT NULL,
  `Date` datetime DEFAULT NULL,
  `Info` text,
  `Last_updated` blob NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT '1',
  `Score_home` int(11) NOT NULL DEFAULT '0',
  `Score_away` int(11) NOT NULL DEFAULT '0',
  `Played` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Match_id`),
  KEY `fk_Match_Fixture1_idx` (`Fixture_id`),
  KEY `fk_Match_Team1_idx` (`Home_id`),
  KEY `fk_Match_Team2_idx` (`Away_id`),
  CONSTRAINT `fk_Match_Fixture1` FOREIGN KEY (`Fixture_id`) REFERENCES `fixture` (`Fixture_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Match_Team1` FOREIGN KEY (`Home_id`) REFERENCES `team` (`Team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Match_Team2` FOREIGN KEY (`Away_id`) REFERENCES `team` (`Team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (1,2,1,2,NULL,'','2014-03-19 22:02:55',0,2,1,1),(2,1,1,2,NULL,'','2014-03-19 22:11:49',0,0,0,1),(3,3,3,4,NULL,'','2014-03-19 23:53:25',0,3,2,1),(4,4,3,5,NULL,'','2014-03-19 23:53:25',0,-1,-1,1),(5,5,3,6,NULL,'','2014-03-19 23:53:25',0,-2,-2,1),(6,6,4,3,NULL,'','2014-03-19 18:53:25',1,0,0,0),(7,7,4,5,NULL,'','2014-03-19 18:53:25',1,0,0,0),(8,8,4,6,NULL,'','2014-03-19 18:53:25',1,0,0,0),(9,9,5,3,NULL,'','2014-03-19 18:53:25',1,0,0,0),(10,10,5,4,NULL,'','2014-03-19 18:53:25',1,0,0,0),(11,11,5,6,NULL,'','2014-03-19 18:53:25',1,0,0,0),(12,12,6,3,NULL,'','2014-03-19 18:53:25',1,0,0,0),(13,13,6,4,NULL,'','2014-03-19 18:53:25',1,0,0,0),(14,14,6,5,NULL,'','2014-03-19 18:53:25',1,0,0,0),(15,15,3,4,NULL,'','2014-03-19 19:05:45',1,0,0,0),(16,16,3,5,NULL,'','2014-03-19 19:05:45',1,0,0,0),(17,17,3,6,NULL,'','2014-03-19 19:05:45',1,0,0,0),(18,18,4,3,NULL,'','2014-03-19 19:05:45',1,0,0,0),(19,19,4,5,NULL,'','2014-03-19 19:05:45',1,0,0,0),(20,20,4,6,NULL,'','2014-03-19 19:05:45',1,0,0,0),(21,21,5,3,NULL,'','2014-03-19 19:05:45',1,0,0,0),(22,22,5,4,NULL,'','2014-03-19 19:05:45',1,0,0,0),(23,23,5,6,NULL,'','2014-03-19 19:05:45',1,0,0,0),(24,24,6,3,NULL,'','2014-03-19 19:05:45',1,0,0,0),(25,25,6,4,NULL,'','2014-03-19 19:05:45',1,0,0,0),(26,26,6,5,NULL,'','2014-03-19 19:05:45',1,0,0,0),(27,30,1,2,NULL,'','2014-03-20 17:25:06',1,0,0,0),(28,31,1,7,NULL,'','2014-03-20 17:25:06',1,0,0,0),(29,32,2,7,NULL,'','2014-03-20 17:25:06',1,0,0,0),(30,33,3,4,NULL,'','2014-03-31 18:05:20',1,0,0,0),(31,34,3,5,NULL,'','2014-03-31 18:05:20',1,0,0,0),(32,35,3,6,NULL,'','2014-03-31 18:05:20',1,0,0,0),(33,36,4,3,NULL,'','2014-03-31 18:05:20',1,0,0,0),(34,37,4,5,NULL,'','2014-03-31 18:05:20',1,0,0,0),(35,38,4,6,NULL,'','2014-03-31 18:05:20',1,0,0,0),(36,39,5,3,NULL,'','2014-03-31 18:05:20',1,0,0,0),(37,40,5,4,NULL,'','2014-03-31 18:05:20',1,0,0,0),(38,41,5,6,NULL,'','2014-03-31 18:05:20',1,0,0,0),(39,42,6,3,NULL,'','2014-03-31 18:05:20',1,0,0,0),(40,43,6,4,NULL,'','2014-03-31 18:05:20',1,0,0,0),(41,44,6,5,NULL,'','2014-03-31 18:05:20',1,0,0,0),(42,45,8,9,NULL,'','2014-03-31 23:05:45',0,2,1,1),(43,46,8,10,NULL,'','2014-03-31 18:05:45',1,0,0,0),(44,47,8,11,NULL,'','2014-03-31 18:05:45',1,0,0,0),(45,48,9,10,NULL,'','2014-03-31 18:05:45',1,0,0,0),(46,49,9,11,NULL,'','2014-03-31 18:05:45',1,0,0,0),(47,50,10,11,NULL,'','2014-03-31 18:05:45',1,0,0,0);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege` (
  `Privilege_id` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(80) NOT NULL,
  `Code` varchar(15) NOT NULL,
  PRIMARY KEY (`Privilege_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` VALUES (1,'Tournament administrator','admin'),(2,'Inputs Results','data_entry'),(3,'Team Representative','team_rep'),(4,'Tournament Follower','follow');
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_registrationprofile`
--

DROP TABLE IF EXISTS `registration_registrationprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registration_registrationprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `activation_key` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_id_refs_id_954d2985` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_registrationprofile`
--

LOCK TABLES `registration_registrationprofile` WRITE;
/*!40000 ALTER TABLE `registration_registrationprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration_registrationprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `Team_id` int(11) NOT NULL AUTO_INCREMENT,
  `Tournament_id` int(11) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `E-mail` varchar(45) DEFAULT NULL,
  `Info` text,
  `Last_updated` datetime NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Team_id`),
  KEY `fk_Team_Tournament1_idx` (`Tournament_id`),
  CONSTRAINT `fk_Team_Tournament1` FOREIGN KEY (`Tournament_id`) REFERENCES `tournament` (`Tournament_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,2,'Un equipo','','','2014-03-19 16:46:20',1),(2,2,'Otro Equipo','','','2014-03-19 16:46:27',1),(3,3,'Team A','','','2014-03-19 18:52:46',1),(4,3,'Team B','','','2014-03-19 18:52:51',1),(5,3,'Team C','','','2014-03-19 18:52:59',1),(6,3,'Team D','','','2014-03-19 18:53:04',1),(7,2,'Nuevo equipito','','','2014-03-20 17:18:35',1),(8,4,'Team 1','','','2014-03-31 17:09:00',1),(9,4,'Team 2','','','2014-03-31 17:09:13',1),(10,4,'Team 3','','','2014-03-31 17:09:20',1),(11,4,'Team 4','','','2014-03-31 17:09:29',1),(12,5,'1','','','2014-03-31 17:50:32',1),(13,5,'2','','','2014-03-31 17:50:36',1),(14,5,'3','','','2014-03-31 17:50:40',1);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `Token` varchar(44) NOT NULL,
  `User_id` int(11) NOT NULL,
  `Expire_date` datetime NOT NULL,
  PRIMARY KEY (`Token`),
  KEY `User_id_idx` (`User_id`),
  CONSTRAINT `User_id` FOREIGN KEY (`User_id`) REFERENCES `auth_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES ('5TU++S8q15p4+VS3bhk2GpvEUeT77YMtqQbB9+Yto8c=',9,'2015-03-31 22:43:13'),('CA7hK+SVgfhfM/Nn9IvpKRHzqmciQDCRRpDB9p0++9I=',8,'2015-03-31 22:42:47'),('F58WOF0/ki0Wyx+5sL2ONnTt4PxfO1bweDSPXusGtAI=',7,'2015-03-31 22:30:26'),('mKhhCh+Sc8v94ciNECLx9QZ/dA211wbCgdAj7edKe2o=',10,'2015-03-31 22:43:40');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournament` (
  `Tournament_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Date_start` datetime NOT NULL,
  `Date_end` datetime DEFAULT NULL,
  `Home_and_away` tinyint(1) NOT NULL,
  `Info` text,
  `Last_updated` datetime NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT '1',
  `Public` tinyint(1) NOT NULL,
  PRIMARY KEY (`Tournament_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` VALUES (2,'Un torneo nuevo ','2013-12-12 05:00:00',NULL,0,'','2014-03-19 16:38:28',1,1),(3,'Public Tourney','2013-01-01 05:00:00',NULL,1,'','2014-03-19 18:52:36',1,1),(4,'Private Tourney','2014-03-31 05:00:00','2014-04-05 05:00:00',0,'','2014-03-31 17:08:44',1,0),(5,'MiTorneo','2014-12-01 05:00:00','2014-12-02 05:00:00',0,'','2014-03-31 17:50:23',1,1);
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament_rights`
--

DROP TABLE IF EXISTS `tournament_rights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournament_rights` (
  `Tournament_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `Privilege_id` int(11) NOT NULL,
  PRIMARY KEY (`Tournament_id`,`User_id`),
  KEY `fk_Tournament_RIghts_User1_idx` (`User_id`),
  KEY `fk_Tournament_RIghts_Privilege1_idx` (`Privilege_id`),
  CONSTRAINT `fk_Tournament_RIghts_User1` FOREIGN KEY (`User_id`) REFERENCES `auth_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tournament_RIghts_Privilege1` FOREIGN KEY (`Privilege_id`) REFERENCES `privilege` (`Privilege_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tournament_RIghts_Tournament1` FOREIGN KEY (`Tournament_id`) REFERENCES `tournament` (`Tournament_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament_rights`
--

LOCK TABLES `tournament_rights` WRITE;
/*!40000 ALTER TABLE `tournament_rights` DISABLE KEYS */;
INSERT INTO `tournament_rights` VALUES (2,10,1),(3,7,1),(4,7,1),(5,10,1),(3,8,2),(4,8,2),(3,9,3),(4,9,3);
/*!40000 ALTER TABLE `tournament_rights` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-03-31 19:33:33
