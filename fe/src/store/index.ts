import { createStore } from 'vuex'
import app, { StateProps as AppState } from './modules/app'

export type StateProps = {
  app: AppState
}

export default createStore<StateProps>({
  modules: {
    app
  }
})
