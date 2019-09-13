interface StateType {
  regionId: number
  regionName: string
  classifyId: number
  classifyName: string
}

interface ActionsType {
  commit(actionHandler: string, actionObject?: any): void
}

const state: StateType = {
  regionId: 1,
	regionName: '全球',
	classifyId: 1,
  classifyName: '购物'
};

export default {
  state: state,

  getters: {
    //
  },

  mutations: {
    changeRegionId (state: StateType, countryId: number) {
      state.regionId = countryId;
    },

    changeRegionName (state: StateType, countryName: string) {
      state.regionName = countryName;
    },

    changeClassifyId (state: StateType, classifyId: number) {
      state.classifyId = classifyId;
    },

    changeClassifyName (state: StateType, classifyName: string) {
      state.classifyName = classifyName;
    }
  },

  actions: {
    
  }
}
