/*
 * Description: vuex-mutation.js
 * User: zhaoyiming
 * Date: 2017/9/17
*/

import getters from './getters.js'

export default {
    increment : function(state){
        state.count += 1;
    },
    decrement : function(state){
        state.count -= 1;
    }
}