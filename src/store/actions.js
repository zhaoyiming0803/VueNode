/*
 * Description: vuex-actions.js
 * User: zhaoyiming
 * Date: 2017/9/17
*/


import mutations from './mutations.js'

export default {
	changeCountryId ({commit}) {
		commit('changeCountryId');
	},
	changeCountryName ({commit}) {
		commit('changeCountryName');
	},
	changeClassifyId ({commit}) {
		commit('changeClassifyId');
	},
	changeClassifyName ({commit}) {
		commit('changeClassifyName');
	}
}