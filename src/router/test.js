/*
 * Description: 登录成功之后才可用的路由
 * User: zhaoyiming
 * Date: ${Date}
*/


export default {
	mediaList: () => import('@/components/test/media-list.vue'),
	addMedia: () => import('@/components/test/add-media.vue'),
	editMedia: () => import('@/components/test/edit-media.vue'),
	checkMedia: () => import('@/components/test/check-media.vue'),
	promotionList: () => import('@/components/test/promotion-list.vue'),
	addPlan: () => import('@/components/test/add-plan.vue'),
	editPlan: () => import('@/components/test/edit-plan.vue'),
	checkPromotion: () => import('@/components/test/check-promotion.vue')
}