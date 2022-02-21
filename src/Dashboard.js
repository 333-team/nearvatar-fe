import React from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import logo from './images/logo.png';
import searchIcon from './images/search.png';
import defaultAvatar from './images/avatar.png';
import './App.css';

import Profile from './Profile.js';
import Footer from './Footer.js';

import { useNavigate } from "react-router-dom";

import { getAccountId, signIn, signOut } from './near.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

class Dashboard extends React.Component {
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
      { name: this.state.accountId, href: '#', current: false, id: 'connect-near', click: () => this.clickName() },
    ];
  
    return (
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="Dashboard relative">
              {/* Nav */}
              <div className="h-89px relative bg-white">
                <div className="py-22px pl-28px float-left">
                  <img onClick={() => {
                    this.props.navigate('/')
                  }} src={logo} className="App-logo cursor-pointer" alt="logo" />
                </div>

                <div className="absolute inset-y-0 top-32px right-158px items-center">
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={defaultAvatar}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/dashboard"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/settings"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/signout"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>

                <div className="right-0 text-12px py-32px leading-32px font-bold text-right">
                  {navigation.map((item) => (
                    <a
                      id={item.id || ''}
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? '' : '',
                        'h-100px text-white px-50px'
                      )}
                      onClick={item.click}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-14px mt-48px ml-searchCenter w-500px text-left">
                <input className="w-full" id="search" type="text" name="address" placeholder='SEARCH FOR AN ADDRESS' />
              </div>

              <div className="text-14px mt-48px ml-searchCenterIcon mt-search w-500px text-left">
                <img className="t-0" src={searchIcon} alt="search icon"/>
              </div>
              
              <Profile></Profile>
              <Footer></Footer>
            </div>
          </>
        )}
      </Disclosure>
    )
  }
}

export default function(props) {
  const navigate = useNavigate();
  return <Dashboard {...props} navigate={navigate} />;
};