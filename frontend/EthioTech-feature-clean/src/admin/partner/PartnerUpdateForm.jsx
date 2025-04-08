/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { partnerSelector } from '../../redux/store';
import { useUpdatePartnerDataMutation } from '../../redux/partner/partnerApiSlice';
import { fetchPartner, updatePartnerState } from '../../redux/partner/partnerSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  partnerName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 20 characters')
    .required('Name is required'),
  partnerDescription: Yup.string()
    .min(20, 'Description must be at least 100 characters')
    .max(300, 'Description must not exceed 300 characters')
    .required('Description is required'),
  partnerKeyOffering: Yup.string()
    .min(10, 'Key Offering must be at least 100 characters')
    .max(400, 'Key Offering must not exceed 400 characters')
    .required('Key Offering is required'),
});

function PartnerUpdateForm() {
  const navigate = useNavigate();
  const [updatePartner, { isLoading: loading }] = useUpdatePartnerDataMutation();
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const { id } = useParams();
  const { partners, isLoading } = useSelector(partnerSelector);
  let filteredPartner;
  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log(values.partnerName + values.partnerDescription + values.partnerKeyOffering);
    const formData = new FormData();
    formData.append('logo', file);
    formData.append('name', values.partnerName);
    formData.append('body', values.partnerDescription);
    formData.append('key_offerings', values.partnerKeyOffering);
    formData.append('id', filteredPartner[0].id);

    try {
      const res = await updatePartner(formData).unwrap();
      console.log(res);
      dispatch(updatePartnerState(res.partner));
      setSubmitting(false);
      toast.success('Partner Updated Successfully');
      navigate('/admin/partners');
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (partners.length === 0) {
      dispatch(fetchPartner());
    }
  }, [dispatch, partners.length]);

  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && partners.length > 0) {
    filteredPartner = partners.filter((partner) => partner.id === parseInt(id));
    content = (
      <div className="">
        <center>
          <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
            <Link
              to="/admin/partners"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              back
            </Link>
          </div>
          <div className="text-center  px-8  w-full">
            <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Update Partner</h1>
          </div>
          <Formik
            initialValues={{
              partnerDescription: filteredPartner[0].body,
              partnerKeyOffering: filteredPartner[0].key_offerings,
              partnerName: filteredPartner[0].name,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              onSubmit(values, { setSubmitting, setErrors });
            }}
          >
            <Form className="flex flex-col items-start px-8 py-10 w-full">
              <div className="flex mb-6 w-5/6 items-start">
                <label htmlFor="partnerName" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                  Name*
                </label>
                <div className="w-4/5">
                  <Field
                    id="partnerName"
                    name="partnerName"
                    placeholder="Title"
                    className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="partnerName" component="div" className="text-red-500  flex items-start" />

                </div>
              </div>

              <div className="flex mb-6 w-5/6 items-start">
                <label htmlFor="partnerDescription" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                  Description*
                </label>
                <div className="w-4/5">
                  <Field
                    as="textarea"
                    rows={5}
                    id="partnerDescription"
                    name="partnerDescription"
                    placeholder="Description"
                    className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="partnerDescription" component="div" className="text-red-500  flex items-start" />
                </div>
              </div>

              <div className="flex mb-6 w-5/6 items-start">
                <label htmlFor="partnerKeyOffering" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                  Key Offerings*
                </label>
                <div className="w-4/5">
                  <Field
                    as="textarea"
                    rows={5}
                    id="partnerKeyOffering"
                    name="partnerKeyOffering"
                    placeholder="Description"
                    className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="partnerKeyOffering" component="div" className="text-red-500  flex items-start" />
                </div>
              </div>

              <div className="flex mb-6 w-5/6 items-start">
                <label htmlFor="partnerImage" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                  Image
                </label>
                <input
                  id="partnerImage"
                  name="partnerImage"
                  placeholder="Description"
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  className="py-1.5"
                  onChange={handleFileChanges}
                />
              </div>

              <div className="flex mb-6 w-5/6 items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 flex gap-2 justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {loading ? <ButtonLoadingScreen /> : ''}
                  <span>Update partner</span>

                </button>
              </div>
            </Form>
          </Formik>
        </center>
      </div>
    );
  }
  return (
    <>
      {content}
    </>
  );
}
export default PartnerUpdateForm;
