/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage, useFormik,
} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateProjectMutation } from '../../redux/project/projectApiSlice';
import { userSelector } from '../../redux/store';
import { addProject } from '../../redux/project/projectSlice';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  projectTitle: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 20 characters')
    .required('Required'),
  projectDescription: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .required('Required'),
  projectStatus: Yup.string()
    .required('Required')
    .oneOf(['Ongoing', 'Completed'], 'Invalid Job Type'),
  projectStartDate: Yup.date().required('Required'),
  projectEndDate: Yup.date()
    .when('projectStartDate', (projectStartDate, schema) => (
      projectStartDate
        ? schema.min(projectStartDate, 'Must be after start date')
        : schema
    ))
    .nullable(),
});

export default function ProjectCreateForm() {
  const { admin } = useSelector(userSelector);
  const [file, setFile] = useState('');
  const [doc, setDoc] = useState('');
  const [projectStatus, setProjectStatus] = useState('Ongoing');
  const [projectArea, setProjectArea] = useState('Technology');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleDocChanges = (e) => {
    setDoc(e.target.files[0]);
    console.log(doc);
  };
  const handleStatusChange = (event) => {
    const selectedOption = event.target.value;
    setProjectStatus(selectedOption);
  };

  const handleAreaChange = (event) => {
    const selectedOption = event.target.value;
    setProjectArea(selectedOption);
  };
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formattedStartDate = (values.projectStartDate).toLocaleString('en-US', options).replace(',', '');
    const formattedEndDate = (values.projectEndDate) ? (values.projectEndDate).toLocaleString('en-US', options).replace(',', '') : '';
    console.log(`${formattedStartDate}jj`);
    console.log(`${formattedEndDate}kk`);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('doc', doc);
    formData.append('title', values.projectTitle);
    formData.append('body', values.projectDescription);
    const status = values.projectStatus === 'Ongoing';
    formData.append('status', status);
    formData.append('area', projectArea);
    formData.append('start_date', formattedStartDate);
    if (formattedEndDate !== '') {
      formData.append('end_date', formattedEndDate);
    }
    formData.append('id', admin[0].id);

    if (file === '') {
      toast.error('Please select an image');
    } else {
      try {
        const res = await createProject(formData).unwrap();
        console.log(res);
        dispatch(addProject(res));
        setSubmitting(false);
        toast.success("You've successfully added a new project");
        navigate('/admin/projects');
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        setErrors(error);
      }
    }
    // try {
    //   const res = await createProject(formData).unwrap();
    //   console.log(res);
    //   dispatch(addProject(res));
    //   setSubmitting(false);
    //   toast.success("You've successfully added a new project");
    //   navigate('/admin/projects');
    //   setSubmitting(false);
    // } catch (error) {
    //   setSubmitting(false);
    //   setErrors(error);
    // }
  };

  return (
    <div className="">
      <center>
        <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
          <Link
            to="/admin/projects"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>
        </div>
        <div className="text-center  px-8  w-full">
          <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Add Project</h1>
        </div>
        <Formik
          initialValues={{
            projectTitle: '',
            projectDescription: '',
            projectStatus,
            projectStartDate: '',
            projectEndDate: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            onSubmit(values, { setSubmitting, setErrors });
          }}
        >
          <Form className="flex flex-col items-start px-8 py-10 w-full">
            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="projectTitle" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Title*
              </label>
              <div className="w-4/5">
                <Field
                  id="projectTitle"
                  name="projectTitle"
                  placeholder="Title"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="projectTitle" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="projectDescription" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Description*
              </label>
              <div className="w-4/5">
                <Field
                  as="textarea"
                  rows={5}
                  id="projectDescription"
                  name="projectDescription"
                  placeholder="Description"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="projectDescription" component="div" className="text-red-500  flex items-start" />
              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="projectImage" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Image*
              </label>
              <input
                id="projectImage"
                name="projectImage"
                placeholder="Description"
                type="file"
                accept=".jpg, .png, .jpeg"
                className="py-1.5"
                onChange={handleFileChanges}
              />
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="projectDocument" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Document
              </label>
              <input
                id="projectDocument"
                name="projectDocument"
                placeholder="Document"
                type="file"
                accept=".pdf"
                className="py-1.5"
                onChange={handleDocChanges}
              />
            </div>

            <div className="flex mb-6 w-5/6 items-start">

              <label htmlFor="projectStatus" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start ">
                Status
              </label>
              <div className="w-4/5 flex justify-start flex-col items-start">
                <Field
                  as="select"
                  id="projectStatus"
                  name="projectStatus"
                  placeholder="Please select a status"
                  onChange={handleStatusChange}
                  value={projectStatus}
                  className="py-1.5 border-2 border-grey-200 bg-gray-100 rounded-md border-1 focus:border-blue-400 focus:outline-none focus:ring flex justify-start w-36"
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </Field>
                <ErrorMessage name="projectStatus" component="div" className="text-red-500 flex items-end" />
              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">

              <label htmlFor="projectArea" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start ">
                Area
              </label>
              <div className="w-4/5 flex justify-start flex-col items-start">
                <Field
                  as="select"
                  id="projectArea"
                  name="projectArea"
                  placeholder="Please select an area"
                  onChange={handleAreaChange}
                  value={projectArea}
                  className="py-1.5 border-2 border-grey-200 bg-gray-100 rounded-md border-1 focus:border-blue-400 focus:outline-none focus:ring flex justify-start w-36"
                >
                  <option value="Technology">Technology</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Consulatancy">Consulatancy</option>
                  <option value="AI">AI</option>
                  <option value="Networking">Networking</option>
                </Field>
                <ErrorMessage name="projectArea" component="div" className="text-red-500 flex items-end" />
              </div>
            </div>

            <div className="mb-4 flex">
              <label htmlFor="projectStartDate" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Start Date
              </label>
              <div className="w-4/5 flex justify-start flex-col items-start">

                <Field
                  id="projectStartDate"
                  name="projectStartDate"
                  placeholder=""
                  type="date"
                  className="py-1.5 border-2 lg:mx-3 border-grey-200  bg-gray-100 rounded-md border-1 px-1 focus:border-blue-400 focus:outline-none focus:ring w-36"
                />
                <ErrorMessage name="projectStartDate" component="div" className="text-red-500  flex items-end lg:mx-3" />

              </div>

            </div>

            <div className="mb-4 flex">
              <label htmlFor="projectEndDate" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                End Date
              </label>
              <div className="w-4/5 flex justify-start flex-col items-start">

                <Field
                  id="projectEndDate"
                  name="projectEndDate"
                  placeholder=""
                  type="date"
                  className="py-1.5 border-2 lg:mx-3 border-grey-200  bg-gray-100 rounded-md border-1 px-1 focus:border-blue-400 focus:outline-none focus:ring w-36"
                />
                <ErrorMessage name="projectEndDate" component="div" className="text-red-500  flex items-end lg:mx-3" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 flex gap-2 items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isLoading ? <ButtonLoadingScreen /> : ''}
                <span>Add Project</span>
              </button>
            </div>
          </Form>
        </Formik>
      </center>
    </div>
  );
}
