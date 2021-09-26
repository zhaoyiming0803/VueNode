export interface StateProps {
  regionId: number
  regionName: string
  classifyId: number
  classifyName: string
}
export interface ActionsType {
  commit(actionHandler: string, actionObject?: any): void
}

const state: StateProps = {
  regionId: 1,
	regionName: '全球',
	classifyId: 1,
  classifyName: '购物'
}

const mutations = {
  changeRegionId (state: StateProps, countryId: number) {
    state.regionId = countryId
  },

  changeRegionName (state: StateProps, countryName: string) {
    state.regionName = countryName
  },

  changeClassifyId (state: StateProps, classifyId: number) {
    state.classifyId = classifyId
  },

  changeClassifyName (state: StateProps, classifyName: string) {
    state.classifyName = classifyName
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
