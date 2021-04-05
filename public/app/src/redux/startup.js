import configureStore from './reducers';
import getUserProfileThunk from './operators/user';

function getUserLoginStatus(store) {
  store.dispatch(getUserProfileThunk(store.dispatch));
}

export default function startupStore() {
  const store = configureStore();
  getUserLoginStatus(store);

  return store;
}
