/*
 * Description: vuex-getters.js
 * User: zhaoyiming
 * Date: 2017/9/17
*/

import state from './state.js'

export default {
    count : function(state){
        return state.count;
    }
}