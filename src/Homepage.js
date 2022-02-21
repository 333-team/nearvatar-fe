import React from 'react';
import { Disclosure } from '@headlessui/react'

import logo from './images/logo.png';
import searchIcon from './images/search.png';
import './App.css';

import { useNavigate } from "react-router-dom";

import { getAccountId, getInformation, signIn, signOut } from './near.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 'Connect NEAR'
    };
  }
  async getAccountId() {
    const accountId = await getAccountId();
    this.setState({
      accountId: accountId || 'Connect NEAR'
    });
    this.render()
  }
  async getInformation() {
    const accountInformation = await getInformation();
    this.setState({
      accountInformation: accountInformation || {}
    });
    this.render()
  }
  routeToDashboard() {
    const address = document.getElementById('search').value;
    this.props.navigate('/dashboard/' + address)
  }
  clickName() {
    if (this.state.accountId === 'Connect NEAR') {
      signIn()
    } else {
      signOut()
    }
    
    this.getAccountId()
  }
  componentDidMount() {
    this.getAccountId()
  }
  render() {
    const navigation = [
      { name: 'HOME', href: '#', current: true },
      { name: 'ABOUT', href: '#', current: false },
      { name: 'DOCS', href: '#', current: false },
      { name: 'CAREERS', href: '#', current: false },
      { name: 'CONTACT', href: '#', current: false },
      { name: this.state.accountId, href: '#', current: false, id: 'connect-near', click: () => this.clickName() },
    ];
    
    return (
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="Homepage relative">
              <div className="h-100px relative">
                <div className="py-28px pl-28px float-left">
                  <img onClick={() => {
                    this.props.navigate('/')
                  }} src={logo} className="App-logo cursor-pointer" alt="logo" />
                </div>

                <div className="right-0 text-12px py-42px font-bold text-right">
                  {navigation.map((item) => (
                    <a
                      id={item.id || ''}
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? '' : '',
                        'h-100px text-white px-50px'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                      onClick={item.click}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-96px mt-174px ml-67px w-1084px text-left">
                <span className=''>One. Web 3. Identity.</span>
              </div>

              <div className="text-28px mt-48px ml-210px w-1084px text-left">
                <div className=''>Nearvatar empowers you with unique identity</div>
                <div className=''>acrossing the Web 3.0, and possibly Web 2.0.</div>
              </div>

              <div className="text-14px mt-48px ml-160px w-1084px text-left">
                <button onClick={() => {
                  this.props.navigate('/launchboard')
                }} className='homepage-button homepage-button-color'>GET YOUR NEARVATAR</button>
                <button className='homepage-button'>IMPLEMENT NEARVATA API</button>
                <button className='homepage-button'>WEB3LOGIN.IN</button>
              </div>

              <div className="text-14px mt-48px ml-160px w-500px text-left">
                <input className="w-full" id="search" type="text" name="address" placeholder='SEARCH FOR AN ADDRESS' />
              </div>

              <div className="text-14px mt-48px ml-610px mt-search w-500px text-left">
                <img className="t-0 cursor-pointer" src={searchIcon} alt="search icon" onClick={() => {
                  this.routeToDashboard()
                }}/>
              </div>


            </div>
          </>
        )}
      </Disclosure>
    );
  }
}

export default function(props) {
  const navigate = useNavigate();
  return <Homepage {...props} navigate={navigate} />;
};