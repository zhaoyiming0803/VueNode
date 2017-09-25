<?php
	/*
	 * Description: 将php作为后端，模拟获取app首页的获取国家地区的控制器
	 * User: zhaoyiming
	 * Date: 2017/9/21
	*/

	header('Content-type:text/html; charset="utf8"');

	$country_id = $_POST['countryId'];

	$dsc = 'mysql:host=localhost; dbname=tour';
	$user = 'tour';
	$pwd = 'tour';

	$pdo = new PDO($dsc, $user, $pwd);
	$pdo->query("set names utf8");

	
	if ($country_id == 1) {
		$query = 'select banner_path from tour_banner limit 0, 4';
	} else {
		$query = 'select banner_path from tour_banner where banner_belong_country = "'. $country_id .'" limit 0, 4';
	}
	$banner_data = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);

	if ($country_id == 1) {
		$query = 'select coupon_name, coupon_explain, coupon_ico_path from tour_coupon limit 0, 4';
	} else {
		$query = 'select coupon_name, coupon_explain, coupon_ico_path from tour_coupon where coupon_belong_country ="'. $country_id .'" limit 0, 4';
	}
	
	$hot_coupon = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);

	if ($country_id == 1) {
		$query = 'select feature_title, feature_ico_path, feature_url, feature_classify from tour_feature limit 0, 4';
	} else {
		$query = 'select feature_title, feature_ico_path, feature_url, feature_classify from tour_feature where feature_belong_country="'. $country_id .'" limit 0, 4';
	}

	$feature_article = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
	
	echo json_encode(
		array(
			'bannerData' => $banner_data,
			'hotCoupon' => $hot_coupon,
			'featureArticle' => $feature_article
		)
	);