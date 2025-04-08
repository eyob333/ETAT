/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCurrentUser } from '../redux/auth/authSlice';
import { userSelector } from '../redux/store';
import { fetchUser, setAdmin } from '../redux/user/userSlice';
import { useUpdateUserDataMutation } from '../redux/user/userApiSlice';
import LoadingScreen from '../conditions/LoadingScreen';
import { useChangePasswordMutation } from '../redux/resetPassword/passwordApiSlice';
import ButtonLoadingScreen from '../conditions/ButtonLoadingScreen';

export default function Profile() {
  const dispatch = useDispatch();
  const [changePassword, { isLoading: loadChangePass }] = useChangePasswordMutation();
  const [updateUserData, { isLoading: loadUpdate }] = useUpdateUserDataMutation();
  const user = useSelector(selectCurrentUser);
  const { users, isLoading } = useSelector(userSelector);
  const [isEditable, setIsEditable] = useState(false);
  const filteredUser = users.filter((u) => u.email === user);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [changePass, setChangePassword] = useState({
    old: '',
    new: '',
    confirm: '',
  });

  const handleChangePasswordClick = () => {
    setIsChangePassword(!isChangePassword);
  };

  const handleChangePassword = (e) => {
    setChangePassword({
      ...changePass,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('currentPassword', changePass.old);
    formData.append('newPassword', changePass.new);
    formData.append('email', filteredUser[0].email);

    if (changePass.new.length < 8) {
      toast.error('Password must be at least 8 characters long');
    } else if (changePass.new !== changePass.confirm) {
      toast.error('New password and confirm password does not match');
    } else {
      try {
        const res = await changePassword(formData).unwrap();
        toast.success(res.message);
      } catch (error) {
        toast.error(error.data.error);
      }
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUser());
    }
  }, [dispatch, users.length]);

  const [data, setData] = useState({
    picture: '',
    id: '',
    first_name: '',
    last_name: '',
    department: '',
    role: '',
  });

  useEffect(() => {
    if (filteredUser.length > 0) {
      setData({
        picture: filteredUser[0].picture,
        id: filteredUser[0].id,
        first_name: filteredUser[0].first_name,
        last_name: filteredUser[0].last_name,
        department: filteredUser[0].department,
        role: filteredUser[0].role,
      });
    }
  }, [filteredUser.length]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [file, setFile] = useState('');
  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    setIsEditable(!isEditable);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('id', data.id);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('department', data.department);
    formData.append('role', data.role);

    try {
      const res = await updateUserData(formData).unwrap();
      console.log('res', res);
      const { profile } = res;
      setData({
        picture: profile.picture,
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        department: profile.department,
        role: profile.role,
      });
      dispatch(setAdmin(res.profile));
      console.log('data', data);
      setIsEditable(!isEditable);
      toast.success('you have successfully updated your profile');
    } catch (error) {
      toast.error('something went wrong');
      console.log(error);
    }
  };

  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } if (isLoading === false && users.length > 0) {
    content = (
      <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                My account
              </h6>
              {!isEditable
                ? (
<button className="bg-mainColor text-white active:bg-lightMain font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" onClick={handleUpdate}>
               Update
</button>
                )
                : (
<button className="bg-mainColor text-white flex gap-2 justify-center items-center active:bg-lightMain font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" onClick={() => handleSubmit()}>
{loadUpdate ? <ButtonLoadingScreen /> : ''}
                  <span>Save</span>
</button>
                )}

            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <div className=" ">
                      <label htmlFor="photo" className="block uppercase text-gray-500 text-xs font-bold mb-2">
                        Photo
                      </label>
                      <div className="mt-2 mb-2 flex items-center gap-x-3">
                        <img className={`rounded-full bg-red-300 h-20 w-20 ${isEditable ? 'hidden' : ''}`} src={data.picture} alt="" />
                        <img className={`rounded-full bg-red-300 h-20 w-20 ${!isEditable ? 'hidden' : ''}`} src={file ? URL.createObjectURL(file) : data.picture} alt="img" />
                        <div className={`flex gap-4 ${!isEditable ? 'hidden' : ''}`}>
                          <input id="photo" name="photo" type="file" className="" onChange={handleFileChanges} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                      First Name
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="first_name" value={data.first_name} readOnly={!isEditable} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                      Last Name
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="last_name" value={data.last_name} readOnly={!isEditable} onChange={handleChange} />
                  </div>
                </div>
                <div className={`w-full lg:w-6/12 px-4  ${isEditable ? 'hidden' : ''}`}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                      Email
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="email" value={filteredUser[0].email} readOnly={!isEditable} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                      Departement
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="departement" value={data.department} readOnly={!isEditable} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                      Role
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="role" value={data.role} readOnly={!isEditable} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </form>
            <button type="button" className=" mx-4 mb-4 text-mainColor underline" onClick={handleChangePasswordClick}>{!isChangePassword ? 'Chnage password?' : 'cancle'}</button>
            <form className={`px-4 ${isChangePassword ? 'flex' : 'hidden'}`}>
              <div className="w-full lg:w-12/12">
                  <div className="relative flex flex-col gap-2 w-full mb-3">
                    <input type="password" className="border px-3 py-3 placeholder-gray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={handleChangePassword} name="old" placeholder="Old password" />
                    <input type="password" className="border px-3 py-3 placeholder-gray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={handleChangePassword} name="new" placeholder="New password" />
                    <input type="password" className="border px-3 py-3 placeholder-gray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={handleChangePassword} name="confirm" placeholder="Confirm password" />
                    <button type="submit" className="bg-mainColor flex gap-2 justify-center items-center rounded-md mt-2 text-white py-2 hover:shadow-2xl" onClick={handleChangePasswordSubmit}>
                    {loadChangePass ? <ButtonLoadingScreen /> : ''}
                    <span>Change</span>
                    </button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </section>
    );
  }
  return (
    <>
     {content}
    </>
  );
}
