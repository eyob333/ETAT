/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { newsSelector } from '../../redux/store';
import { useUpdateNewsDataMutation } from '../../redux/news/newsApiSlice';
import { fetchNews, updateNewsState } from '../../redux/news/newsSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
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

function NewsUpdateForm() {
  const navigate = useNavigate();
  const [updateNews, { isLoading: loading }] = useUpdateNewsDataMutation();
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const { id } = useParams();
  const { news, isLoading } = useSelector(newsSelector);
  let filteredNews;
  let contents;

  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  let contentPrev;
  const [content, setContent] = useState(contentPrev);
  const [error, setError] = useState('');

  const handleEditorChange = (value) => {
    setContent(value);
    value == '<p><br></p>' ? setError('Please enter body') : setError('');
    // console.log(value);
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

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', values.newsTitle);
    formData.append('body', content);
    formData.append('id', filteredNews[0].id);

    if (content == '<p><br></p>' || content == '') {
      toast.error('Please insert a body');
    } else {
      try {
        const res = await updateNews(formData).unwrap();
        console.log(res);
        dispatch(updateNewsState(res.news));
        setSubmitting(false);
        toast.success('News Updated Successfully');
        navigate('/admin/news');
      } catch (error) {
        setSubmitting(false);
        setErrors(error);
        toast.error('Something went wrong');
      }
    }
  };

  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, news.length]);

  if (isLoading) {
    contents = <LoadingScreen />;
  } else if (!isLoading && news.length > 0) {
    filteredNews = news.filter((news) => news.id === parseInt(id));
    contentPrev = filteredNews[0].body;
    contents = (
      <div className="">
        <center>
          <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
            <Link
              to="/admin/news"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              back
            </Link>
          </div>
          <div className="text-center  px-8  w-full">
            <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Update News</h1>
          </div>
          <Formik
            initialValues={{
              newsTitle: filteredNews[0].title,
              newsAuthor: filteredNews[0].author_name,
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
                  {loading ? <ButtonLoadingScreen /> : ''}
                  <span>Update News</span>
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
      {contents}
    </>
  );
}
export default NewsUpdateForm;
