/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteUserMutation } from '../../redux/user/userApiSlice';
import { userSelector } from '../../redux/store';
import { fetchUser, removeUser } from '../../redux/user/userSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function AddAccount() {
  const [deleteUser] = useDeleteUserMutation();
  const { users, isLoading } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUser());
    }
  }, [dispatch, users.length]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      dispatch(removeUser(id));
      toast.success('you have successfully deleted a user');
    } catch (error) {
      if (error.status === 400) {
        toast.error('User cannot be deleted');
      } else {
        toast.error('something went wrong');
      }
      console.log(error);
    }
  };

  const [open, setOpen] = useState(null);

  const handleOpenModal = (id) => {
    setOpen(id);
  };

  const handleCloseModal = () => {
    setOpen(null);
  };

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  let content;
  let filteredUser;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading) {
    filteredUser = users.filter((user) => user.email.toLowerCase().includes(searchInput.toLowerCase()));
    content = (

      <div className="flex flex-col mt-8">
        <div className="flex justify-between items-center px-4">
          <div>
            <div className="mt-1 relative lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-mainColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-mainColor text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 px-2.5 py-2" placeholder="Search" value={searchInput} onChange={handleSearchInput} />
            </div>
          </div>
          <Link to="/admin/addUsers" className="px-12 pb-2 pt-1 rounded-md bg-mainColor text-white">Add new</Link>
        </div>
        <div className="p-4 overflow-x-auto">
          <div
            className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            {filteredUser.length === 0 ? <p className="text-center text-2xl text-gray-500">No user found</p>
              : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Name

                      </th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Department

                      </th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Role

                      </th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Actions

                      </th>

                    </tr>
                  </thead>
                  <tbody className="bg-white">

                    {filteredUser.map((user) => (

                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-10 h-10 rounded-full"
                                src={user.picture}
                                alt="img"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {user.first_name}
                                {' '}
                                {user.last_name}
                              </div>
                              <div className="text-sm leading-5 text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {user.department}
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            {user.role}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span className="inline-flex px-2 text-md  text-gray-500 leading-5 rounded-full">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-md leading-5 font-medium text-gray-500 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex gap-4">
                            <button className="text-red-600 hover:opacity-60" type="button" onClick={() => handleOpenModal(user.id)}>Delete</button>
                            <Modal open={open === user.id} onClose={handleCloseModal} center>
                              <div className="flex flex-col gap-1 pt-7">
                                <h2>Are you sure you whan to delete</h2>
                                <p>
                                  {user.first_name}
                                  {' '}
                                  {user.last_name}
                                </p>
                                <div className="flex gap-2 mt-2 justify-start items-center">
                                  <button className="bg-red-500 text-white px-4 py-1 rounded-md" onClick={() => handleDelete(open)} type="button">delete</button>
                                  <button className="bg-mainColor text-white px-4 py-1 rounded-md" onClick={handleCloseModal} type="button">cancle</button>
                                </div>
                              </div>
                            </Modal>

                          </div>
                        </td>
                      </tr>
                    )) }

                  </tbody>

                </table>
              )}
          </div>
        </div>
      </div>

    );
  }

  return (
    <>
      {content}
    </>
  );
}
