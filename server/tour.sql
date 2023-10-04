-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (arm64)
--
-- Host: localhost    Database: tour
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1696406073873,'UpdateUserDefaultAvatar1696406073873'),(3,1696413073247,'UpdateTourIconPath1696413073247'),(4,1696418964257,'UpdateCouponEndtime1696418964257'),(6,1696423773558,'UpdateCouponRecivedNumInCouponTable1696423773558');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_banner`
--

DROP TABLE IF EXISTS `tour_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner_path` varchar(255) NOT NULL,
  `banner_belong_region` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_banner`
--

LOCK TABLES `tour_banner` WRITE;
/*!40000 ALTER TABLE `tour_banner` DISABLE KEYS */;
INSERT INTO `tour_banner` VALUES (1,'http://jinnangtuan.com/uploads/20170828/1503899882.jpg',1),(2,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',2),(3,'http://jinnangtuan.com/uploads/20170828/1503913833.jpg',4),(4,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',3),(5,'http://imgoacdn.aliyuncs.com/Y2o3aW8wdW52MDAwczNkNXBwcXJ3NTN2Mg%3D%3D_855263232_NzUwKjQyMg%3D%3D.jpg?t=1505916543122',5),(6,'http://jinnangtuan.com/uploads/20170828/1503899882.jpg',6),(7,'http://jinnangtuan.com/uploads/20170828/1503913833.jpg',6),(8,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',6);
/*!40000 ALTER TABLE `tour_banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_classify`
--

DROP TABLE IF EXISTS `tour_classify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_classify` (
  `id` int NOT NULL AUTO_INCREMENT,
  `classify_name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_content` text NOT NULL,
  `comment_user_phone` varchar(11) NOT NULL,
  `comment_time` varchar(30) NOT NULL,
  `comment_coupon_id` int NOT NULL,
  `comment_star` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_comment`
--

LOCK TABLES `tour_comment` WRITE;
/*!40000 ALTER TABLE `tour_comment` DISABLE KEYS */;
INSERT INTO `tour_comment` VALUES (39,'5分好评','13102029890','1568439182401',15,0),(40,'好吧牛奶','13102029890','1568467569520',4,0),(41,'广播操b n d','13102029890','1568471287747',21,0),(42,'最新评论','13102029890','1568517700355',22,0),(43,'sdfsdfsdfsdfsdfsdfsd','13100000000','1696437446847',23,4);
/*!40000 ALTER TABLE `tour_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_coupon`
--

DROP TABLE IF EXISTS `tour_coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_coupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coupon_name` varchar(50) NOT NULL,
  `coupon_explain` varchar(40) NOT NULL,
  `coupon_starttime` varchar(15) NOT NULL,
  `coupon_received_num` int NOT NULL DEFAULT '0',
  `coupon_detail` text NOT NULL,
  `coupon_type` varchar(20) NOT NULL,
  `coupon_ico_path` varchar(255) NOT NULL,
  `coupon_status` varchar(1) NOT NULL DEFAULT '0',
  `coupon_endtime` varchar(15) NOT NULL,
  `coupon_classify` varchar(1) NOT NULL DEFAULT '1',
  `coupon_belong_region` varchar(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_coupon`
--

LOCK TABLES `tour_coupon` WRITE;
/*!40000 ALTER TABLE `tour_coupon` DISABLE KEYS */;
INSERT INTO `tour_coupon` VALUES (3,'新罗免税店','满2000立减100元','1506524754000',7,' 这是是详细介绍 ','union','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1'),(4,'都塔购物中心','满2000立减100元','1506524754000',12,' 这是是详细介绍 ','union','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(6,'松本清','满2000立减100日元','1506524754000',6,' 这是是详细介绍 ','jinnang','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(7,'高岛屋','满2000立减100日元','1506524754000',4,' 这是是详细介绍 ','gaodaowu','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1'),(8,'周先生','满2000立减100港币','1506524754000',4,' 这是是详细介绍 ','jinnang','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(9,'王权免税店','满2000立减100泰币','1506524754000',2,' 这是是详细介绍 ','visa','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1'),(10,'新加坡Tumi','满2000立减100新加坡元','1506524754000',2,' 这是是详细介绍 ','jinnang','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(13,'泰国新罗免税店','满2000立减100泰币','1506524754000',1,' 这是是详细介绍 ','union','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1'),(14,'LAOX','7%折扣+8%免税','1506956521000',0,'这是优惠券详细描述，待完善','gaodaowu','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(15,'国民药妆','最高5%折扣+8%免税','1507043036000',2,'这是优惠券详细描述，待完善','gaodaowu','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1'),(16,'BicCamera','最高8%折扣+8%免税','1507215967000',2,'这是优惠券详细描述，待完善','union','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(17,'关西机场免税店','最高6%折扣+8%免税','1507216067000',2,'这是优惠券详细描述，待完善','jinnang','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1'),(18,'莎莎','最高6%折扣+8%免税','1507129772000',2,'这是优惠券详细描述，待完善','jinnang','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(19,'百老汇','9%折扣+8%免税','1507129822000',0,'这是优惠券详细描述，待完善','jinnang','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1'),(20,'卡莱美','最高5%折扣+8%免税','1507129886000',2,'这是优惠券详细描述，待完善','visa','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(21,'六福珠宝','最高10%折扣+8%免税','1507129949000',2,'这是优惠券详细描述，待完善','visa','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1'),(22,'Siam Discovery','银联卡高达30%折扣','1507130106000',4,'这是优惠券详细描述，待完善','union','//t7.baidu.com/it/u=1963305748,3425007544&fm=193','0','1727955033045','1','1'),(23,'ZEN百货','满3000减300泰铢','1507216568000',2,'这是优惠券详细描述，待完善','jinnang','//t7.baidu.com/it/u=3596032583,931971989&fm=193','0','1727955033045','1','1');
/*!40000 ALTER TABLE `tour_coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_coupon_user`
--

DROP TABLE IF EXISTS `tour_coupon_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_coupon_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coupon_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_coupon_user`
--

LOCK TABLES `tour_coupon_user` WRITE;
/*!40000 ALTER TABLE `tour_coupon_user` DISABLE KEYS */;
INSERT INTO `tour_coupon_user` VALUES (66,15,1,'0'),(67,4,1,'0'),(68,21,1,'0'),(69,22,1,'0'),(70,15,1,'0'),(71,16,23,'0'),(72,17,23,'0'),(73,23,23,'0'),(74,22,23,'0'),(75,21,23,'0'),(76,20,23,'0');
/*!40000 ALTER TABLE `tour_coupon_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_feature`
--

DROP TABLE IF EXISTS `tour_feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_feature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_title` varchar(60) NOT NULL,
  `feature_content` text NOT NULL,
  `feature_ico_path` varchar(255) NOT NULL,
  `feature_url` varchar(255) NOT NULL,
  `feature_classify` int NOT NULL DEFAULT '1',
  `feature_belong_region` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_feature`
--

LOCK TABLES `tour_feature` WRITE;
/*!40000 ALTER TABLE `tour_feature` DISABLE KEYS */;
INSERT INTO `tour_feature` VALUES (1,'韩国购物常见问题，你遇见过几个？','这里是文章详情','http://jinnangtuan.com/uploads/20170828/1503908101.jpg','https://mp.weixin.qq.com/s?__biz=MzIxMTU3NjEwMA==&mid=2247483955&idx=1&sn=dc1c8b978251c1ce4fd943601c3634d8&chksm=97527678a025ff6e13b6d109b5519a7ec97fd912404e20b62fff29f53ab6ff802a5bfeb21c44#rd',1,1),(2,'韩国退税全攻略！省钱=赚钱！','这里是文章详情','http://jinnangtuan.com/uploads/20170828/1503909809.jpg','https://mp.weixin.qq.com/s?__biz=MzIxMTU3NjEwMA==&mid=2247483768&idx=1&sn=7edf9e7236d8c733620d7b579e490e2b&chksm=97527533a025fc25242f7fd49f59aafc55a314236015058cfb1951ab4556fd69b1d9c5fd7143#rd',2,1),(3,'必备，香港买表省钱攻略！','这里是文章详情','http://jinnangtuan.com/uploads/20170828/1503911438.jpg','http://jinnangtuan.com/flow/11',1,1);
/*!40000 ALTER TABLE `tour_feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_region`
--

DROP TABLE IF EXISTS `tour_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_region`
--

LOCK TABLES `tour_region` WRITE;
/*!40000 ALTER TABLE `tour_region` DISABLE KEYS */;
INSERT INTO `tour_region` VALUES (1,'全球'),(2,'港澳'),(3,'韩国'),(4,'日本'),(5,'泰国'),(6,'其他');
/*!40000 ALTER TABLE `tour_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_user`
--

DROP TABLE IF EXISTS `tour_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(60) NOT NULL DEFAULT '锦囊团用户',
  `user_phone` varchar(11) NOT NULL,
  `user_pwd` varchar(255) NOT NULL,
  `user_headpic` varchar(255) NOT NULL DEFAULT 'http://jinnangtuan.com/static/img/users/jinnangusers/head.png',
  `user_sex` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_user`
--

LOCK TABLES `tour_user` WRITE;
/*!40000 ALTER TABLE `tour_user` DISABLE KEYS */;
INSERT INTO `tour_user` VALUES (25,'锦囊团用户','13100000004','e10adc3949ba59abbe56e057f20f883e','https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF',1),(24,'锦囊团用户','13100000001','e10adc3949ba59abbe56e057f20f883e','https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF',1),(23,'@peduarte','13100000000','e10adc3949ba59abbe56e057f20f883e','https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF',1);
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

-- Dump completed on 2023-10-05  0:50:09
