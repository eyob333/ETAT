/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateNewsMutation } from '../../redux/news/newsApiSlice';
import { userSelector } from '../../redux/store';
import { addNews } from '../../redux/news/newsSlice';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  newsTitle: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .required('Title is required'),
  newsAuthor: Yup.string()
    .min(3, 'Author name must be at least 3 characters')
    .max(50, 'Author name must not exceed 20 characters')
    .required('Author name is required'),
});

export default function NewsForm() {
  const navigate = useNavigate();
  const { admin } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [createNews, { isLoading }] = useCreateNewsMutation();
  const [file, setFile] = useState('');
  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };
  const [content, setContent] = useState(' ');
  const [error, setError] = useState('');

  const handleEditorChange = (value) => {
    setContent(value);
    value == '<p><br></p>' ? setError('Please enter body') : setError('');
    // console.log(value);
  };

  // const handleError = async () => {
  //   await content == '<p><br></p>' || content == '' ? setError('Please enter body') : setError('');
  // };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log(values.newsAuthor);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', values.newsTitle);
    formData.append('author_name', values.newsAuthor);
    formData.append('body', content);
    formData.append('id', admin[0].id);
    console.log('rrrrrrrrrrrr');

    if (file === '') {
      toast.error('Please select an Image');
      console.log('imgerror');
    } else if (content == '<p><br></p>' || content == '') {
      console.log('imgerror22');
      toast.error('Please insert a body');
    } else {
      try {
        const res = await createNews(formData).unwrap();
        console.log(res);
        dispatch(addNews(res));
        setSubmitting(false);
        toast.success("You've successfully added news");
        navigate('/admin/news');
      } catch (error) {
        setSubmitting(false);
        setErrors(error);
        if (error.status === 500) {
          toast.error(error.data.error);
        } else {
          toast.error('Something went wrong');
        }
      }
    }
    // try {
    //   const res = await createNews(formData).unwrap();
    //   console.log(res);
    //   dispatch(addNews(res));
    //   setSubmitting(false);
    //   toast.success("You've successfully added a new news");
    //   navigate('/admin/news');
    // } catch (error) {
    //   setSubmitting(false);
    //   setErrors(error);
    //   if (error.status === 500) {
    //     toast.error(error.data.error);
    //   } else {
    //     toast.error('Something went wrong');
    //   }
    // }
  };

  const modules = {
    toolbar: [
      // [{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };

  const formats = [
    // 'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
  ];
  return (
    <div className="">
      <center className="">
        <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
          <Link
            to="/admin/news"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>
        </div>
        <div className="text-center  px-8  w-full">
          <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Add News</h1>
        </div>

        <Formik
          initialValues={{
            newsTitle: '',
            newsDescription: '',
            newsAuthor: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            onSubmit(values, { setSubmitting, setErrors });
          }}
        >
          <Form className="flex flex-col items-start px-8 py-10 w-full">
            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="newsTitle" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Title*
              </label>
              <div className="w-4/5">
                <Field
                  id="newsTitle"
                  name="newsTitle"
                  placeholder="Title"
                  // onSubmit={handleError}
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="newsTitle" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>
            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="newsAuthor" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Author/s*
              </label>
              <div className="w-4/5">
                <Field
                  type="text"
                  id="newsAuthor"
                  name="newsAuthor"
                  placeholder="Author/s"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="newsAuthor" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="newsImage" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Image
              </label>
              <input
                id="newsImage"
                name="newsImage"
                placeholder="Description"
                type="file"
                accept=".jpg, .png, .jpeg"
                className="py-1.5"
                onChange={handleFileChanges}
              />
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="newsBody" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                Body*
              </label>
              <div className="flex flex-col items-start justify-start lg:w-4/5 sm:5/6">
                <div className="lg:w-full lg:mb-20 mb-32">

                  <ReactQuill
                    style={{
                      height: '600px', marginBottom: '10px', float: 'left',
                    }}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={content}
                    onChange={handleEditorChange}
                    required
                  />

                </div>
                {/* <ErrorMessage name="content" component="div" className="text-red-500  flex items-start " /> */}

                {/* <div className="lg:mt-16 mt-20 text-base text-red-600">{error !== '' ? <h1>{error}</h1> : ''}</div> */}
              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 flex gap-2 justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isLoading ? <ButtonLoadingScreen /> : ''}
                <span>Add News</span>
              </button>
            </div>
          </Form>
        </Formik>
      </center>
    </div>
  );
}
