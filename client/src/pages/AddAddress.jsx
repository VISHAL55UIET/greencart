import React, {useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import {useAppContext} from '../context/AppContext'
import toast from "react-hot-toast";

// Reusable input field component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
     const {axios, user, navigate } = useAppContext();
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    try {
    e.preventDefault();
    const {data} = await axios.post('/api/address/add', {address});
      
    if(data.success){
      toast.success(data.message);
      navigate('/cart');

    }else{
      toast.error(data.message);
    }

   } catch (error) {
    toast.success(error.message)
   }
  };
  
  useEffect(()=> {
    if(!user){
      navigate('/cart');
    }
  })


  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-4 mt-6 text-sm'>

            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder='First Name' />
              <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder='Last Name' />
            </div>

            <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Email Address' />
            <InputField handleChange={handleChange} address={address} name='phone' type='tel' placeholder='Phone Number' />

            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Street Address' />
              <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City' />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='State' />
              <InputField handleChange={handleChange} address={address} name='zipcode' type='text' placeholder='Zip Code' />
            </div>

            <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country' />

            <button
              type='submit'
              className='bg-primary hover:bg-primary-dull transition text-white py-2.5 w-full rounded font-medium'
            >
              SAVE ADDRESS
            </button>
          </form>
        </div>

        <img
          className='md:mr-16 mb-16 md:mt-0 w-full md:w-1/2 max-w-sm'
          src={assets.add_address_iamge}
          alt='Add Address'
        />
      </div>
    </div>
  );
};

export default AddAddress;
