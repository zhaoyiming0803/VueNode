/*
 * Description:
 * User: zhaoyiming
 * Date: ${Date}
*/

import router from './index.js';
import testRouter from './test.js';

const toUpperCaseFirst = (str) => {
	return str.substr(0, 1).toUpperCase() + str.substr(1);
};

const formatRoutes = (list) => {
	return list.map((item) => {
		return {
			id: item.id,
			pid: item.pid,
			path: '/' + item.node_name,
			name: toUpperCaseFirst(item.node_name),
			component: testRouter[item.node_name],
			meta: [1, 2, 3]
		};
	});
};

const merge = (list, pid=0) => {
	const arry = [];
	list.forEach((item) => {
		if (item.pid === pid) {
			item.children = merge(list, item.id);
			arry.push(item);
		}
	});
	return arry;
};

export default function (routes) {
	console.log(merge(formatRoutes(routes)));
	router.addRoutes(merge(formatRoutes(routes)));
};