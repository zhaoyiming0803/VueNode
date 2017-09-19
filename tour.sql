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
INSERT INTO `tour_country` VALUES (1,'全球'),(2,'港澳'),(3,'韩国'),(4,'日本'),(5,'法国'),(6,'其他国家');
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
  `coupon_starttime` varchar(50) NOT NULL,
  `coupon_endtime` varchar(50) NOT NULL,
  `coupon_recived_num` varchar(255) NOT NULL DEFAULT '0',
  `coupon_detail` text NOT NULL,
  `coupon_belong` varchar(50) NOT NULL,
  `coupon_type` varchar(20) NOT NULL,
  `coupon_ico_path` varchar(255) NOT NULL,
  `coupon_status` varchar(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_coupon`
--

LOCK TABLES `tour_coupon` WRITE;
/*!40000 ALTER TABLE `tour_coupon` DISABLE KEYS */;
INSERT INTO `tour_coupon` VALUES (1,'百老汇','满2000立减100港币','1505750128','1764950128','0','u003cp style=\"white-space: normal;\"u003eu003cstrongu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(0, 176, 240);\"u003e【优惠券有效期】u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003eu003c/spanu003eu003c/strongu003eu003c/pu003eu003cp style=\"white-space: normal;\"u003eu003cspan style=\"font-size: 14px;\"u003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e自领取日起10天内有效u003cstrongu003eu003cbr/u003eu003c/strongu003eu003cspan style=\"font-size: 14px; color: rgb(0, 176, 240);\"u003eu003cstrongu003e【活动范围】u003c/strongu003eu003c/spanu003eu003cbr/u003e仅限中国境内发行银联卡（卡号以62开头）u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; color: rgb(0, 176, 240);\"u003eu003cstrongu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003e【活动地点】u003c/spanu003eu003c/strongu003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003eu003cbr/u003e仅限百老汇香港指定门店，详情请查询银联国际官网u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; color: rgb(0, 176, 240);\"u003eu003cstrongu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003e【活动内容】u003c/spanu003eu003c/strongu003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e持卡人使用中国境内发行的银联卡（卡号以62开头），持电子现金券以指定银联卡购买产品满港币2000元或以上经验证“优计划”百老汇专属优惠二维码/条形码后，即可立减港币100元。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; color: rgb(0, 176, 240);\"u003eu003cstrongu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003e【活动细则】u003c/spanu003eu003c/strongu003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e1. 此优惠只限中国境内发行的银联卡，持卡人在香港百老汇摄影器材有限公司 (百老汇) 持有效电子现金券并以指定银联卡购买产品满港币2,000元或以上及经验证“优计划”百老汇专属优惠二维码/条形码后，刷银联卡立减港币100元优惠。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e2. 选购前，请先出示电子现金券及指定的银联卡。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e3. 电子现金券数量有限，先到先得。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e4. 电子现金券可使用时间以券上显示有效期为准，每笔合资格交易仅可使用一张电子现金券。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e5. 交易必须通过银联网络付款，方可享有此优惠。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e6. 每张电子现金券仅可使用一次，不可拆分，不能提现或作现金找赎。u003cbr/u003e7. 现金立减不适用于购买百老汇礼券、指定产品及分期付款计划u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e8.现金立减可与银联卡优惠同时使用。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e9. 如交易发生退款或退货，仅退还持卡人实际支付的金额，并不包含优惠金额。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e10. 已使用的电子现金券即时失效，电子现金券将不获返还。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e11. 如退货后适用商品金额未达到活动指定金额，将不能享用此电子现金券立减优惠，客户需补回已立减金额。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e12. 百老汇摄影器材有限公司及银联国际保留变更活动细则並不另行通知的权利。u003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体;\"u003eu003cbr/u003eu003c/spanu003eu003cspan style=\"font-size: 14px; font-family: 宋体; color: rgb(98, 96, 96);\"u003e13. 如有任何争议，百老汇摄影器材有限公司及银联国际对条款及细则保留最终决定权。u003c/spanu003eu003c/spanu003eu003c/pu003eu003cpu003eu003cbr/u003eu003c/pu003e','hongkong','union','http://jinnangtuan.com/uploads/20170828/1503919201.jpg','0');
/*!40000 ALTER TABLE `tour_coupon` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_user`
--

LOCK TABLES `tour_user` WRITE;
/*!40000 ALTER TABLE `tour_user` DISABLE KEYS */;
INSERT INTO `tour_user` VALUES (1,'赵一鸣','13126919251','fcea920f7412b5da7be0cf42b8c93759'),(2,NULL,'13126919255','e10adc3949ba59abbe56e057f20f883e'),(3,NULL,'13126919252','00c66aaf5f2c3f49946f15c1ad2ea0d3'),(4,NULL,'13126919253','e10adc3949ba59abbe56e057f20f883e'),(5,NULL,'13126919254','e10adc3949ba59abbe56e057f20f883e'),(6,NULL,'13126919256','e10adc3949ba59abbe56e057f20f883e'),(7,NULL,'13126919257','e10adc3949ba59abbe56e057f20f883e'),(8,NULL,'13126919250','96e79218965eb72c92a549dd5a330112'),(9,NULL,'13126919258','e10adc3949ba59abbe56e057f20f883e');
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

-- Dump completed on 2017-09-19 23:50:53
