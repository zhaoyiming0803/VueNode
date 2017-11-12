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
			path: item.path,
			name: toUpperCaseFirst(item.name),
			component: testRouter[item.name],
			meta: item.meta
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
	router.addRoutes(merge(formatRoutes(routes)));
};