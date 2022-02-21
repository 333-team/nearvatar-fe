import { createStore } from 'redux';
import "regenerator-runtime/runtime";
import * as nearAPI from "near-api-js";
import getConfig from "./near_config.js";
// import { stringifyJsonOrBytes } from "near-api-js/lib/transaction";

const nearConfig = getConfig('testnet');

async function nearStore(state = {
  near: null,
  contract: null,
  walletConnection: null,
}, action) {
  switch (action.type) {
    case 'init':
      const near = await nearAPI.connect({
        deps: {
          keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
        },
        ...nearConfig
      });

      const walletConnection = new nearAPI.WalletConnection(near);

      const contract = await new nearAPI.Contract(
        walletConnection.account(),
        nearConfig.contractName,
        {
          // View methods are read-only – they don't modify the state, but usually return some value
          viewMethods: ['get_record_by_owner'],
          // Change methods can modify the state, but you don't receive the returned value when called
          changeMethods: ['del_record_by_owner', 'set_record_by_owner', 'update_avatar_by_owner', 'upsert_asset_by_owner'],
          // Sender is the account ID to initialize transactions.
          // getAccountId() will return empty string if user is still unauthorized
          sender: walletConnection.getAccountId()
        });

      return {
        ...state,
        near,
        contract,
        walletConnection,
      };

    default:
      return state
  }
}

let store = createStore(nearStore)
store.dispatch({ type: 'init' });

export default store;

export async function getAccountId() {
  const { walletConnection } = await store.getState();
  const result = walletConnection.getAccountId();

  return result;
}

export async function getInformation() {
  const { walletConnection, contract } = await store.getState();
  const accountId = walletConnection.getAccountId();

  if (!accountId) {
    return {};
  }

  const result = await contract.get_record_by_owner({ owner: accountId }) || {};
  return result;
}

export async function updateAvatar(avatarUrl) {
  const result = await store.getState().contract.update_avatar_by_owner({ avatar: avatarUrl });
  return result;
}

export async function updateAsset(asset) {
  const result = await store.getState().contract.upsert_asset_by_owner(asset);
  return result;
}

export async function signIn() {
  const { walletConnection } =  await store.getState()
  const result = walletConnection.requestSignIn(
    nearConfig.contractName,
    'Nearvatar',
  );
  return result;
}

export async function signOut() {
  const { walletConnection } =  await store.getState()
  const result = walletConnection.signOut();
  return result;
}