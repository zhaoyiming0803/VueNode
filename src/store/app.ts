interface StateType {
  countryId: number
  countryName: string
  classifyId: number
  classifyName: string
}

interface ActionsType {
  commit(actionHandler: string, actionObject?: any): void
}

const state: StateType = {
  countryId: 1,
	countryName: '全球',
	classifyId: 1,
	classifyName: '购物'
};

export default {
  state: state,

  getters: {
    //
  },

  mutations: {
    changeCountryId (state: StateType, countryId: number) {
      state.countryId = countryId;
    },

    changeCountryName (state: StateType, countryName: string) {
      state.countryName = countryName;
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
