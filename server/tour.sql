-- MySQL dump 10.13  Distrib 5.6.45, for Linux (x86_64)
--
-- Host: localhost    Database: tour
-- ------------------------------------------------------
-- Server version	5.6.45

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
  `banner_belong_region` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_banner`
--

LOCK TABLES `tour_banner` WRITE;
/*!40000 ALTER TABLE `tour_banner` DISABLE KEYS */;
INSERT INTO `tour_banner` VALUES (1,'http://jinnangtuan.com/uploads/20170828/1503899882.jpg',NULL),(2,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',NULL),(3,'http://jinnangtuan.com/uploads/20170828/1503913833.jpg',NULL),(4,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',NULL),(5,'http://imgoacdn.aliyuncs.com/Y2o3aW8wdW52MDAwczNkNXBwcXJ3NTN2Mg%3D%3D_855263232_NzUwKjQyMg%3D%3D.jpg?t=1505916543122',NULL),(6,'http://jinnangtuan.com/uploads/20170828/1503899882.jpg',NULL),(7,'http://jinnangtuan.com/uploads/20170828/1503913833.jpg',NULL),(8,'http://jinnangtuan.com/uploads/20170828/1503914220.jpg',NULL);
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
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_comment`
--

LOCK TABLES `tour_comment` WRITE;
/*!40000 ALTER TABLE `tour_comment` DISABLE KEYS */;
INSERT INTO `tour_comment` VALUES (39,'5分好评',5,'13126919251','1568439182401',15),(40,'好吧牛奶',4,'13126919251','1568467569520',4),(41,'广播操b n d',3,'13126919251','1568471287747',21),(42,'最新评论',5,'13126919251','1568517700355',22);
/*!40000 ALTER TABLE `tour_comment` ENABLE KEYS */;
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
  `coupon_type` varchar(20) NOT NULL,
  `coupon_ico_path` varchar(255) NOT NULL,
  `coupon_status` varchar(1) NOT NULL DEFAULT '0',
  `coupon_classify` int(1) NOT NULL DEFAULT '1',
  `coupon_belong_region` int(10) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_coupon`
--

LOCK TABLES `tour_coupon` WRITE;
/*!40000 ALTER TABLE `tour_coupon` DISABLE KEYS */;
INSERT INTO `tour_coupon` VALUES (3,'新罗免税店','满2000立减100元','1506524754000','1514300798000','7',' 这是是详细介绍 ','union','https://www.jinnangtuan.com/uploads/20171228/1514448288.png','0',1,1),(4,'都塔购物中心','满2000立减100元','1506524754000','1514300798000','12',' 这是是详细介绍 ','union','https://www.jinnangtuan.com/uploads/20190905/1567663882.png','0',1,1),(6,'松本清','满2000立减100日元','1506524754000','1514300798000','6',' 这是是详细介绍 ','jinnang','https://www.jinnangtuan.com/uploads/20180313/1520912878.jpg','0',1,1),(7,'高岛屋','满2000立减100日元','1506524754000','1514300798000','4',' 这是是详细介绍 ','gaodaowu','https://www.jinnangtuan.com/uploads/20190103/1546494662.jpeg','0',1,1),(8,'周先生','满2000立减100港币','1506524754000','1514300798000','4',' 这是是详细介绍 ','jinnang','https://www.jinnangtuan.com/uploads/20180912/1536723214.jpg','0',2,1),(9,'王权免税店','满2000立减100泰币','1506524754000','1514300798000','2',' 这是是详细介绍 ','visa','https://www.jinnangtuan.com/uploads/20190304/1551695276.jpg','0',1,1),(10,'新加坡Tumi','满2000立减100新加坡元','1506524754000','1514300798000','2',' 这是是详细介绍 ','jinnang','https://www.jinnangtuan.com/uploads/20190304/1551695276.jpg','0',1,1),(13,'泰国新罗免税店','满2000立减100泰币','1506524754000','1514300798000','1',' 这是是详细介绍 ','union','https://www.jinnangtuan.com/uploads/20190304/1551695276.jpg','0',2,1),(14,'LAOX','7%折扣+8%免税','1506956521000','1509116521000','0','这是优惠券详细描述，待完善','gaodaowu','https://www.jinnangtuan.com/uploads/20190304/1551695276.jpg','0',1,1),(15,'国民药妆','最高5%折扣+8%免税','1507043036000','1509116636000','2','这是优惠券详细描述，待完善','gaodaowu','https://www.jinnangtuan.com/uploads/20170925/1506336782.jpg','0',2,2),(16,'BicCamera','最高8%折扣+8%免税','1507215967000','1509116767000','1','这是优惠券详细描述，待完善','union','https://www.jinnangtuan.com/uploads/20170925/1506336782.jpg','0',1,2),(17,'关西机场免税店','最高6%折扣+8%免税','1507216067000','1509116867000','1','这是优惠券详细描述，待完善','jinnang','https://www.jinnangtuan.com/uploads/20190604/1559636300.png','0',1,2),(18,'莎莎','最高6%折扣+8%免税','1507129772000','1509116972000','2','这是优惠券详细描述，待完善','jinnang','https://www.jinnangtuan.com/uploads/20190604/1559636300.png','0',1,6),(19,'百老汇','9%折扣+8%免税','1507129822000','1509117022000','0','这是优惠券详细描述，待完善','jinnang','https://www.jinnangtuan.com/uploads/20190604/1559636300.png','0',1,5),(20,'卡莱美','最高5%折扣+8%免税','1507129886000','1509117086000','1','这是优惠券详细描述，待完善','visa','https://www.jinnangtuan.com/uploads/20190304/1551695098.jpg','0',1,4),(21,'六福珠宝','最高10%折扣+8%免税','1507129949000','1509117149000','1','这是优惠券详细描述，待完善','visa','https://www.jinnangtuan.com/uploads/20190304/1551695098.jpg','0',1,3),(22,'Siam Discovery','银联卡高达30%折扣','1507130106000','1509117306000','3','这是优惠券详细描述，待完善','union','https://www.jinnangtuan.com/uploads/20190304/1551695098.jpg','0',2,2),(23,'ZEN百货','满3000减300泰铢','1507216568000','1509117368000','1','这是优惠券详细描述，待完善','jinnang','https://www.jinnangtuan.com/uploads/20190304/1551695098.jpg','0',2,2);
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
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_coupon_user`
--

LOCK TABLES `tour_coupon_user` WRITE;
/*!40000 ALTER TABLE `tour_coupon_user` DISABLE KEYS */;
INSERT INTO `tour_coupon_user` VALUES (66,15,1,1),(67,4,1,1),(68,21,1,1),(69,22,1,1);
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
  `feature_classify` int(1) NOT NULL DEFAULT '1',
  `feature_belong_region` int(2) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_region` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `region_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tour_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(60) DEFAULT '锦囊团用户',
  `user_phone` varchar(11) NOT NULL,
  `user_pwd` varchar(255) NOT NULL,
  `user_headpic` varchar(255) NOT NULL DEFAULT 'http://jinnangtuan.com/static/img/users/jinnangusers/head.png',
  `user_sex` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_user`
--

LOCK TABLES `tour_user` WRITE;
/*!40000 ALTER TABLE `tour_user` DISABLE KEYS */;
INSERT INTO `tour_user` VALUES (1,'赵一鸣','13126919251','e10adc3949ba59abbe56e057f20f883e','http://cdn.0351zhuangxiu.com/vuenode/file-1568517223787.jpeg',1),(2,'柳生飘絮','13126919255','e10adc3949ba59abbe56e057f20f883e','../../static/uploads/images/headpic-1509270571762.png',0),(3,'成是非','13126919252','00c66aaf5f2c3f49946f15c1ad2ea0d3','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(4,'归海一刀','13126919253','e10adc3949ba59abbe56e057f20f883e','../../static/uploads/images/headpic-1508516716022.jpg',1),(5,'古三通','13126919254','e10adc3949ba59abbe56e057f20f883e','../../static/uploads/images/headpic-1506875379823.jpg',1),(6,'云罗郡主','13126919256','e10adc3949ba59abbe56e057f20f883e','../../static/uploads/images/headpic-1506875974089.jpg',0),(7,'朱铁胆','13126919257','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(8,'海棠','13126919250','96e79218965eb72c92a549dd5a330112','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',0),(9,'断天涯','13126919258','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(10,'万三千','13126919221','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',0),(14,'多啦A梦','13133333333','e10adc3949ba59abbe56e057f20f883e','../../static/uploads/images/headpic-1507362358963.png',1),(13,'锦囊团用户','13111111111','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(15,'锦囊团用户','13188990099','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(16,'锦囊团用户','13122222990','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(17,'锦囊团用户','13100009989','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(18,'锦囊团用户','13126919261','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(19,'锦囊团用户','13126919262','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(20,'锦囊团用户','13126919264','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(21,'锦囊团用户','13090908763','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1),(22,'锦囊团用户','13126919251','e10adc3949ba59abbe56e057f20f883e','http://jinnangtuan.com/static/img/users/jinnangusers/head.png',1);
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

-- Dump completed on 2019-09-15 11:28:53
