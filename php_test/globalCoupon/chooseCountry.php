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

	$query = 'select banner_path from tour_banner where banner_belong_country = ' . $country_id;
	$banner_data = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);

	$query = 'select coupon_name, coupon_explain, coupon_ico_path from tour_coupon where coupon_belong_country =' . $country_id;
	$hot_coupon = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
	
	echo json_encode(
		array(
			'bannerData' => $banner_data,
			'hotCoupon' => $hot_coupon
		)
	);