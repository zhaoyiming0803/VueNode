interface StateType {
  appName: string
  version: string
  menuList: any[]
}

interface ActionsType {
  commit(actionHandler: string, actionObject?: any): void
}

const state: StateType = {
  appName: 'Vue-Cli3-TypeScript',
  version: 'v0.0.1',
  menuList: []
};

export default {
  state: state,

  getters: {
    //
  },

  mutations: {
    setVersion (state: StateType, version: any) {
      state.version = version;
    },
    setMenuList (state: StateType, menuList: any[]) {
      state.menuList = menuList;
    }
  },

  actions: {
    
  }
}
