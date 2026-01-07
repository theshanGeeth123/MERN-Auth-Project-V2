import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AdminHome() {

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {

    const confirmed = window.confirm(
      "Are you sure to Logout?"
    );

    if (!confirmed) return;

    try {
      setIsLoading(true);
      await axios.get(`http://localhost:4000/api/admin/logout`);
      navigate("/login");
      toast.success("Logout Succesful");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.success(`Error ${error.message}`);
    }

  }

  return (

    isLoading ? <LoadingSpinner/>:
    <div>
      <h1 className='text-3xl text-center mt-4'>Admin Dashboard</h1>
      <button onClick={logout} className='bg-black/70 px-5 py-3 rounded-2xl text-white cursor-pointer'>Logout</button>
    </div>
  )
}

export default AdminHome
