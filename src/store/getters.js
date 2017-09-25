/*
 * Description: vuex-getters.js
 * User: zhaoyiming
 * Date: 2017/9/17
*/

import state from './state.js'

export default {
    countryId (state) {
		return state.countryId;
	},
	countryName (state) {
		return state.countryName;
	},
	classifyId (state) {
		return state.classifyId;
	},
	classifyName (state) {
		return state.classifyName;
	}
}