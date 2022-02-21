import React from 'react';

import expand from './images/expand.png';
import defaultAvatar from './images/avatar.png';

import { getAccountId, getInformation, signIn } from './near.js';

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 'Connect NEAR',
      accountInformation: {}
    };
  }
  async getAccountId() {
    const accountId = await getAccountId();
    this.setState({
      accountId: accountId || 'Connect NEAR'
    });

    if (this.state.accountId === 'Connect NEAR') {
      signIn()
    } else {
      this.render()
    }
  }
  async getInformation() {
    const accountInformation = await getInformation();
    console.log(accountInformation)
    this.setState({
      accountInformation: accountInformation || {}
    });
    this.render()
  }
  componentDidMount() {
    this.getAccountId()
    this.getInformation()
  }
  render() {
    return (
      <>
        <div className='Setup relative text-left mx-28px pt-52px mt-28px px-52px w-1680px mx-auto'>
          <div className="height-36px text-36px font-bold text-black">To launch with...</div>

          <>
          {/* <div className="mt-29px ml-145px inline-block leading-270px h-270px">
            <img className='rounded-[30px]' src="https://via.placeholder.com/270x270.png?text=Nearvatar" />
            <img className='rounded-[30px] w-270px' src={profilePng} />
          </div> */}

          <div className='rounded-[6px] border w-560px inline-block mt-29px h-648px relative align-top'>
            <div className='ml-30px mt-30px h-22px height-32px text-32px font-bold leading-22px'>My Assets</div>
            <div className='ml-29px mt-23px h-400px'>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt="avatar"></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt="avatar"></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt="avatar"></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt="avatar"></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt="avatar"></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt="avatar"></img>
            </div>

            <div className='relative bottom-0 grid place-content-center'>
              <button className='w-120px h-36px text-12px use-my-nft-button rounded-[36px] text-white'>Use my NFT</button>
            </div>
          </div>
          </>

          <div className="mt-29px w-270px ml-68px inline-block mb-68px">
            <img className='w-215px border-2 border-nvorange ml-28px' src={defaultAvatar} alt="default avatar"/>
            <span className="w-270px inline-block mt-52px text-36px font-bold text-black text-center">{this.state.accountId}</span>
            <div className='rounded-[6px] border w-270px inline-block mt-40px h-270px relative align-top'>
              <div className='text-center mt-23px h-22px leading-22px'>Account Info</div>
              <div className='leading-20px h-20px align-top'>
              <svg className="inline-block ml-29px h-20px w-20px text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
              <span className='ml-29px mt-18px inline-block'>others.twitter</span>
              </div>
              <div className='leading-20px h-20px align-top mt-18px'>
              <svg className="inline-block ml-29px h-20px w-20px text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M17.788 5.108A9 9 0 1021 12h-8" /></svg>
              <span className='ml-29px mt-18px inline-block'>others@gmail.com</span>
              </div>
              <div className='leading-20px h-20px align-top mt-18px'>
              <svg className="inline-block ml-29px h-20px w-20px text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              <span className='ml-29px mt-18px inline-block'>others@gmail.com</span>
              </div>
              <div className='leading-20px h-20px align-top mt-18px'>
              <svg className="inline-block ml-29px h-20px w-20px text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
              <span className='ml-29px mt-18px inline-block'>others@gmail.com</span>
              </div>
              <div className='leading-20px h-20px align-top mt-18px'>
              <svg className="inline-block ml-29px h-20px w-20px text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              <span className='ml-29px mt-18px inline-block'>others@gmail.com</span>
            </div>
          </div>
          </div>

          <>
          <div className='rounded-[6px] border w-560px inline-block ml-85px mt-29px h-648px relative align-top'>
            <div className='ml-30px mt-30px h-22px height-32px text-32px font-bold leading-22px'>Popular</div>
            <div className='ml-29px mt-23px h-360px'>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt='avatar'></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt='avatar'></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt='avatar'></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt='avatar'></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt='avatar'></img>
              <img className="inline-block mt-24px mr-30px" src="https://via.placeholder.com/143x143.png?text=Nearvatar" alt='avatar'></img>
            </div>

            <div className='relative bottom-0 grid place-content-center'>
              <img className="w-26px ml-48px mb-18px" src={expand} alt="expand"></img>
              <button className='w-120px h-36px text-12px use-my-nft-button rounded-[36px] text-white'>Use my NFT</button>
            </div>
          </div>
          </>

          
        </div>
      </>
    )
  }
}

export default Setup;