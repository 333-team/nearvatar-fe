// import { useForm } from 'react-hook-form'

import { Wallet, Chain, Network } from 'mintbase'

// import { gql } from 'apollo-boost'
// import { useLazyQuery } from '@apollo/client'

// import { useState, useEffect } from 'react'

// import { useWallet } from '../services/providers/MintbaseWalletContext'

import { createStore } from 'redux';

async function mintbaseStore(state = {
  accountId: "",
  allowance: "",
  balance: "",
  contractName: "",
}, action) {
  switch (action.type) {
    case 'init':
      // const { data: walletData } = await new Wallet().init({
      //   networkName: Network.testnet,
      //   chain: Chain.near,
      //   apiKey: '42f375c5-6c7e-464b-8d8d-9fcb45685375',
      // })
    
      // const { wallet, isConnected } = walletData
    
      // if (isConnected) {
      //   const { data: details } = await wallet.details()
      //   return {
      //     ...state,
      //     ...details,
      //   }
      // }

      return state;
      
    default:
      return state
  }
}

let store = createStore(mintbaseStore)
export default store;
