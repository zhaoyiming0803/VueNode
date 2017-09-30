-- MySQL dump 10.13  Distrib 5.7.14, for Win32 (AMD64)
--
-- Host: localhost    Database: tour
-- ------------------------------------------------------
-- Server version	5.7.14

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
-- Table structure for table `tour_banner`
--

DROP TABLE IF EXISTS `tour_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_banner` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `banner_path` varchar(255) DEFAULT NULL,
  `banner_belong_country` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_banner`
--

LOCK TABLES `tour_banner` WRITE;
/*!40000 ALTER TABLE `tour_banner` DISABLE KEYS */;
INSERT INTO `tour_banner` VALUES (1,'http://jinnangtuan.com/uploads/20170828/1503899882.jpg',1),(2,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',1),(3,'http://jinnangtuan.com/uploads/20170828/1503913833.jpg',1),(4,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',2),(5,'http://imgoacdn.aliyuncs.com/Y2o3aW8wdW52MDAwczNkNXBwcXJ3NTN2Mg%3D%3D_855263232_NzUwKjQyMg%3D%3D.jpg?t=1505916543122',3),(6,'http://jinnangtuan.com/uploads/20170828/1503899882.jpg',4),(7,'http://jinnangtuan.com/uploads/20170828/1503913833.jpg',5),(8,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',6);
/*!40000 ALTER TABLE `tour_banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_classify`
--

DROP TABLE IF EXISTS `tour_classify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_classify` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `classify_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_classify`
--

LOCK TABLES `tour_classify` WRITE;
/*!40000 ALTER TABLE `tour_classify` DISABLE KEYS */;
INSERT INTO `tour_classify` VALUES (1,'购物'),(2,'退税');
/*!40000 ALTER TABLE `tour_classify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_comment`
--

DROP TABLE IF EXISTS `tour_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_comment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `comment_content` text,
  `comment_star` int(1) NOT NULL DEFAULT '1',
  `comment_user_phone` varchar(11) DEFAULT NULL,
  `comment_time` varchar(30) DEFAULT NULL,
  `comment_coupon_id` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_comment`
--

LOCK TABLES `tour_comment` WRITE;
/*!40000 ALTER TABLE `tour_comment` DISABLE KEYS */;
INSERT INTO `tour_comment` VALUES (1,'优惠券很好用，优惠力度很大',5,'13126919252','1506605105000',1),(2,'非常喜欢，产品不错',4,'13126919251','1506605439000',1),(3,'不太好用，网卡',1,'13126919252','1506605469000',3),(4,'还不错',3,'13126919255','1506607137000',3),(5,'挺好的',4,'13126919256','1506607149000',3),(6,'用着还行',5,'13126919253','1506607176000',4),(7,'还行吧，能解决问题',5,'13126919251','1506607188000',4),(8,'去日本玩的好，多亏了这里的优惠券',1,'13126919254','1506608981000',6),(9,'泰国一日游，优惠券都用完了，以后还会有吗？',4,'13126919254','1506609036000',9),(15,'的认同感',3,'13126919251','1506758614972',6),(14,'的认同感',3,'13126919251','1506758611991',6),(13,'我的天哪，太好用了！',5,'13126919254','1506757841652',3),(16,'发',4,'13126919251','1506758634550',6),(18,'第三方',0,'13126919251','1506759570649',4),(19,'纵贯线',2,'13126919251','1506759650831',7),(20,'个人业余项目，使用node.js+mysql+vue.js+webpack+less+es6技术栈构建。 http://www.zymseo.com/qianduan/',4,'13126919254','1506760673210',3);
/*!40000 ALTER TABLE `tour_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_country`
--

DROP TABLE IF EXISTS `tour_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_country` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(50) NOT NULL DEFAULT '其他国家',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_country`
--

LOCK TABLES `tour_country` WRITE;
/*!40000 ALTER TABLE `tour_country` DISABLE KEYS */;
INSERT INTO `tour_country` VALUES (1,'全球'),(2,'港澳'),(3,'韩国'),(4,'日本'),(5,'泰国'),(6,'其他国家');
/*!40000 ALTER TABLE `tour_country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_coupon`
--

DROP TABLE IF EXISTS `tour_coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_coupon` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `coupon_name` varchar(50) NOT NULL,
  `coupon_explain` varchar(40) NOT NULL,
  `coupon_starttime` varchar(15) DEFAULT NULL,
  `coupon_endtime` varchar(50) NOT NULL,
  `coupon_recived_num` varchar(255) NOT NULL DEFAULT '0',
  `coupon_detail` text NOT NULL,
  `coupon_belong_country` int(10) NOT NULL DEFAULT '1',
  `coupon_type` varchar(20) NOT NULL,
  `coupon_ico_path` varchar(255) NOT NULL,
  `coupon_status` varchar(1) NOT NULL DEFAULT '0',
  `coupon_classify` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_coupon`
--

LOCK TABLES `tour_coupon` WRITE;
/*!40000 ALTER TABLE `tour_coupon` DISABLE KEYS */;
INSERT INTO `tour_coupon` VALUES (3,'新罗免税店','满2000立减100元','1506524754000','1514300798000','5',' 这是是详细介绍 ',3,'union','http://jinnangtuan.com/uploads/20170828/1503915401.png','0',1),(4,'都塔购物中心','满2000立减100元','1506524754000','1514300798000','6',' 这是是详细介绍 ',3,'union','http://jinnangtuan.com/uploads/20170828/1503916455.png','0',1),(6,'松本清','满2000立减100日元','1506524754000','1514300798000','4',' 这是是详细介绍 ',4,'jinnang','http://jinnangtuan.com/uploads/20170828/1503920325.png','0',1),(7,'高岛屋','满2000立减100日元','1506524754000','1514300798000','3',' 这是是详细介绍 ',4,'gaodaowu','http://jinnangtuan.com/uploads/20170922/1506048040.jpg','0',1),(8,'周先生','满2000立减100港币','1506524754000','1514300798000','1',' 这是是详细介绍 ',2,'jinnang','http://jinnangtuan.com/uploads/20170828/1503918518.png','0',2),(9,'王权免税店','满2000立减100泰币','1506524754000','1514300798000','2',' 这是是详细介绍 ',5,'visa','http://jinnangtuan.com/uploads/20170828/1503916670.png','0',1),(10,'新加坡Tumi','满2000立减100新加坡元','1506524754000','1514300798000','2',' 这是是详细介绍 ',6,'jinnang','http://jinnangtuan.com/uploads/20170907/1504778592.jpg','0',1),(13,'泰国新罗免税店','满2000立减100泰币','1506524754000','1514300798000','1',' 这是是详细介绍 ',5,'union','http://jinnangtuan.com/uploads/20170828/1503917187.png','0',2);
/*!40000 ALTER TABLE `tour_coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_coupon_user`
--

DROP TABLE IF EXISTS `tour_coupon_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_coupon_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `coupon_id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_coupon_user`
--

LOCK TABLES `tour_coupon_user` WRITE;
/*!40000 ALTER TABLE `tour_coupon_user` DISABLE KEYS */;
INSERT INTO `tour_coupon_user` VALUES (32,4,1,1),(33,3,1,1),(34,7,1,1),(35,4,4,0),(36,7,4,1),(37,6,1,0),(38,6,4,0),(39,4,6,0),(40,10,1,0),(41,3,4,0),(42,3,5,1);
/*!40000 ALTER TABLE `tour_coupon_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_feature`
--

DROP TABLE IF EXISTS `tour_feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_feature` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `feature_title` varchar(60) DEFAULT NULL,
  `feature_content` text,
  `feature_ico_path` varchar(255) DEFAULT NULL,
  `feature_url` varchar(255) DEFAULT NULL,
  `feature_belong_country` int(2) NOT NULL DEFAULT '1',
  `feature_classify` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_feature`
--

LOCK TABLES `tour_feature` WRITE;
/*!40000 ALTER TABLE `tour_feature` DISABLE KEYS */;
INSERT INTO `tour_feature` VALUES (1,'韩国购物常见问题，你遇见过几个？','这里是文章详情','http://jinnangtuan.com/uploads/20170828/1503908101.jpg','https://mp.weixin.qq.com/s?__biz=MzIxMTU3NjEwMA==&mid=2247483955&idx=1&sn=dc1c8b978251c1ce4fd943601c3634d8&chksm=97527678a025ff6e13b6d109b5519a7ec97fd912404e20b62fff29f53ab6ff802a5bfeb21c44#rd',3,1),(2,'韩国退税全攻略！省钱=赚钱！','这里是文章详情','http://jinnangtuan.com/uploads/20170828/1503909809.jpg','https://mp.weixin.qq.com/s?__biz=MzIxMTU3NjEwMA==&mid=2247483768&idx=1&sn=7edf9e7236d8c733620d7b579e490e2b&chksm=97527533a025fc25242f7fd49f59aafc55a314236015058cfb1951ab4556fd69b1d9c5fd7143#rd',3,2),(3,'必备，香港买表省钱攻略！','这里是文章详情','http://jinnangtuan.com/uploads/20170828/1503911438.jpg','http://jinnangtuan.com/flow/11',2,1);
/*!40000 ALTER TABLE `tour_feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_user`
--

DROP TABLE IF EXISTS `tour_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(60) DEFAULT NULL,
  `user_phone` varchar(11) NOT NULL,
  `user_pwd` varchar(255) NOT NULL,
  `user_headpic` varchar(255) NOT NULL DEFAULT 'http://jinnangtuan.com/static/img/users/jinnangusers/head.png',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_user`
--

LOCK TABLES `tour_user` WRITE;
/*!40000 ALTER TABLE `tour_user` DISABLE KEYS */;
INSERT INTO `tour_user` VALUES (1,'赵一鸣','13126919251','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(2,NULL,'13126919255','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(3,NULL,'13126919252','00c66aaf5f2c3f49946f15c1ad2ea0d3','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(4,NULL,'13126919253','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(5,NULL,'13126919254','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(6,NULL,'13126919256','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(7,NULL,'13126919257','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(8,NULL,'13126919250','96e79218965eb72c92a549dd5a330112','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(9,NULL,'13126919258','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png'),(10,NULL,'13126919221','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png');
/*!40000 ALTER TABLE `tour_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-30 16:55:44
