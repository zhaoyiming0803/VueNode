<?php
	/*
	 * Description: 将php作为后端，模拟获取app首页的获取所有国家与地区的集合
	 * User: zhaoyiming
	 * Date: 2017/9/21
	*/

	header('Content-type:text/html; charset="UTF-8"');

	$dsc = 'mysql:host=localhost; dbname=tour';
	$user = 'tour';
	$pwd = 'tour';
	$pdo = new PDO($dsc, $user, $pwd);

	$pdo->query("set names utf8");

	$query = 'select id, country_name from tour_country';
	$country_list = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
	

	echo json_encode(
		array(
			'countryList' => $country_list
		)
	);