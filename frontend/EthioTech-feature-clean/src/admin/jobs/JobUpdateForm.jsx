/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { jobSelector } from '../../redux/store';
import { useUpdateJobDataMutation } from '../../redux/job/jobApiSlice';
import { fetchJob, updateJobState } from '../../redux/job/jobSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 20 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must not exceed 150 characters')
    .required('Description is required'),
  start_date: Yup.string()
    .required('Start date is required'),
  end_date: Yup.string()
    .required('End date is required'),
  salary: Yup.number()
    .required('Salary is required'),
  company: Yup.string()
    .required('Company is required'),
  department: Yup.string()
    .required('Department is required'),
  location: Yup.string()
    .required('Location is required'),
  workplace_type: Yup.string()
    .required('Work place is required'),
  employment_type: Yup.string()
    .required('Employment type is required'),
});

const cities = [
  { value: 'New York', label: 'New York' },
  { value: 'Los Angeles', label: 'Los Angeles' },
  { value: 'Chicago', label: 'Chicago' },
  { value: 'Houston', label: 'Houston' },
  { value: 'Miami', label: 'Miami' },
  { value: 'london', label: 'london' },
  { value: 'Tokyo', label: 'Tokyo' },
  { value: 'Sydney', label: 'Sydney' },
];

const departments = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'finance', label: 'Finance' },
  { value: 'human_resources', label: 'Human Resources' },
  { value: 'operations', label: 'Operations' },
  { value: 'research_and_development', label: 'Research and Development' },
  { value: 'customer_service', label: 'Customer Service' },
  { value: 'information_technology', label: 'Information Technology' },
];

const employmentTypes = [
  { value: 'full_time', label: 'Full-time' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' },
];

const workplaces = [
  { value: 'office', label: 'Office' },
  { value: 'remote', label: 'Remote' },
  { value: 'client_site', label: 'Client Site' },
];

export default function JobUpdateForm() {
  const [updateJobData, { isLoading }] = useUpdateJobDataMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isLoadingJob } = useSelector(jobSelector);
  const { id } = useParams();
  const [file, setFile] = useState('');
  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
  };

  let filteredJob;

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', values.title);
    formData.append('body', values.description);
    formData.append('company', values.company);
    formData.append('salary', values.salary);
    formData.append('start_date', values.start_date);
    formData.append('end_date', values.end_date);
    formData.append('department', values.department);
    formData.append('location', values.location);
    formData.append('workplace_type', values.workplace_type);
    formData.append('employment_type', values.employment_type);
    formData.append('id', filteredJob[0].id);
    try {
      const res = await updateJobData(formData).unwrap();
      dispatch(updateJobState(res.jobs));
      setSubmitting(false);
      toast.success('Job updated successfully');
      navigate('/admin/jobs');
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJob());
    }
  }, [dispatch, jobs.length]);

  let content;
  if (isLoadingJob) {
    content = <LoadingScreen />;
  } else if (!isLoadingJob && jobs.length > 0) {
    filteredJob = jobs.filter((job) => job.id === parseInt(id));
    content = (
      <section className=" py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Update Job
                </h6>
                <Link to="/admin/jobs" className="bg-mainColor text-white active:bg-lightMain font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                  Back
                </Link>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <Formik
                initialValues={{
                  title: filteredJob[0].title,
                  description: filteredJob[0].body,
                  company: filteredJob[0].company,
                  salary: filteredJob[0].salary,
                  start_date: filteredJob[0].start_date,
                  end_date: filteredJob[0].end_date,
                  department: filteredJob[0].department,
                  location: filteredJob[0].location,
                  workplace_type: filteredJob[0].workplace_type,
                  employment_type: filteredJob[0].employment_type,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  onSubmit(values, { setSubmitting, setErrors });
                }}
              >
                <Form>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Job Information
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Job Title
                        </label>

                        <Field
                          type="text"
                          id="title"
                          name="title"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <ErrorMessage name="title" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Company
                        </label>
                        <Field
                          type="text"
                          id="company"
                          name="company"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <ErrorMessage name="company" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Department
                        </label>
                        <Field
                          as="select"
                          id="department"
                          name="department"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value={filteredJob[0].department}>{filteredJob[0].department}</option>
                          {departments.map((department) => (
                            <option key={department.value} value={department.value}>
                              {department.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="department" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Location
                        </label>
                        <Field
                          as="select"
                          id="location"
                          name="location"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value={filteredJob[0].location}>{filteredJob[0].location}</option>
                          {cities.map((city) => (
                            <option key={city.value} value={city.value}>
                              {city.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="location" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Employment type
                        </label>
                        <Field
                          as="select"
                          id="employment_type"
                          name="employment_type"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value={filteredJob[0].employment_type}>{filteredJob[0].employment_type}</option>
                          {employmentTypes.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="employment_type" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Workplace type
                        </label>
                        <Field
                          as="select"
                          id="workplace_type"
                          name="workplace_type"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value={filteredJob[0].workplace_type}>{filteredJob[0].workplace_type}</option>
                          {workplaces.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="workplace_type" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Salary
                        </label>

                        <Field
                          type="text"
                          id="salary"
                          name="salary"
                          placeholder="salary"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <ErrorMessage name="salary" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                    {/* here */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Start date
                        </label>

                        <Field
                          type="date"
                          id="start_date"
                          name="start_date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <ErrorMessage name="start_date" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          End date
                        </label>
                        <Field
                          type="date"
                          id="end_date"
                          name="end_date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <ErrorMessage name="end_date" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                          Description
                        </label>
                        <Field
                          as="textarea"
                          rows={5}
                          id="description"
                          name="description"
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                    <div className="mt-2 mb-2 pl-4 flex items-center gap-x-3">
                      <img className=" rounded-full bg-red-300 h-20 w-20 " src={file ? URL.createObjectURL(file) : filteredJob[0].picture} alt="img" />
                      <input id="picture" name="picture" type="file" className="" onChange={handleFileChanges} />
                    </div>
                  </div>
                  <button className="bg-mainColor mt-6 ml-5 flex gap-2 justify-center items-center text-white active:bg-lightMain font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">
                    {isLoading ? <ButtonLoadingScreen /> : ''}
                    <span>Update Job</span>
                  </button>
                </Form>
              </Formik>
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
