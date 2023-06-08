'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';
import profileImg from '../../assets/images/default_profile_avatar.png';
import { BsPlus } from 'react-icons/bs';
import UserAddresses from './user/UserAddresses';
import axios from 'axios';

const Profile = () => {
  const [addresses, setAddresses] = useState([]);
  const { user } = useContext(AuthContext);

  const getAddresses = async () => {
    // const { data } = await axios.get(`${process.env.API_URL}/api/v1/address`);
    const { data } = await axios.get(`/api/v1/address`);

    setAddresses(data?.data);

    return data?.data;
  };

  useEffect(() => {
    getAddresses();
  }, []);
  console.log('address data', addresses);

  return (
    <>
      <figure className='flex items-start sm:items-center'>
        <div className='relative'>
          <img
            className='w-16 h-16 rounded-full mr-4'
            src={user?.avatar ? user?.avatar?.url : profileImg.src}
            alt={user?.name}
          />
        </div>
        <figcaption>
          <h5 className='font-semibold text-lg'>{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On:</b>
            {String(user?.createdAt).substr(0, 10)}
          </p>
        </figcaption>
      </figure>

      <hr className='my-4' />

      <UserAddresses addresses={addresses} />

      <Link href='/dashboard/user/address'>
        <button className='px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100'>
          <BsPlus className='mr-1' /> Add new address
        </button>
      </Link>

      <hr className='my-4' />
    </>
  );
};

export default Profile;
