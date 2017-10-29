/*
 * Description:
 * User: zhaoyiming
 * Date: ${Date}
*/

import router from '../../../router/index.js';
import testRouter from './test.js';

router.addRoutes([
	{path: '/test', name: 'Test', component: testRouter['test']}
]);

export default router;