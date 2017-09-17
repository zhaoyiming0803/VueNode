/*
 * Description: vuex-actions.js
 * User: zhaoyiming
 * Date: 2017/9/17
*/


import mutations from './mutations.js'

export default {
    increment : function({commit}){
        commit('increment');
    },
    decrement : function({commit}){
        commit('decrement');
    }
}