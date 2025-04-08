/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../../redux/user/userApiSlice';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

export default function AddForm() {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [data, setData] = useState({
    picture: 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-11.jpg',
    first_name: '',
    last_name: '',
    email: '',
    password: 'abc123',
    department: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.first_name === ''
      || data.last_name === ''
      || data.department === ''
      || data.role === ''
      || data.email === ''
    ) {
      toast.error('Please fill all the fields');
    } else {
      try {
        const res = await createUser(data).unwrap();
        console.log(res);
        setData({
          picture: 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-11.jpg',
          first_name: '',
          last_name: '',
          email: '',
          password: 'abc123',
          department: '',
          role: '',
        });
        toast.success('you have successfully added a new user');
      } catch (error) {
        toast.error('something went wrong');
      }
    }
  };

  return (
    <section className=" flex justify-center items-center h-screen">
      <div className="w-full lg:w-8/12 bg-white shadow-lg px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-green-400 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Add new user
              </h6>
              <Link to="/admin/add" className="bg-mainColor text-white active:bg-lightMain font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                back
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex-auto bg-gray-50 px-4 lg:px-10 py-10 mb-4 pt-4">
            <form onSubmit={handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      First Name
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="first_name" value={data.first_name} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Last Name
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="last_name" value={data.last_name} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Email address
                    </label>
                    <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="email" value={data.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Role
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="role" value={data.role} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Department
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="department" value={data.department} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <button className="bg-mainColor mt-6 flex gap-2 justify-center items-center text-white active:bg-lightMain font-bold uppercase text-xs px-8 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">
                      {isLoading ? <ButtonLoadingScreen /> : ''}
                      <span>Add User</span>
                    </button>
                  </div>
                </div>

              </div>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
