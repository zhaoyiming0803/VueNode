/*
 * Description:
 * User: zhaoyiming
 * Date: ${Date}
*/

import router from './index.js';
import testRouter from './test.js';

const formatRoutes = (list) => {
	return list.map((item) => {
		return {
			id: item.id,
			pid: item.pid,
			path: item.path,
			name: item.name,
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