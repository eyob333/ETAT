import React, { useState } from 'react';
import { PiShareFatThin } from 'react-icons/pi';
import { Link, useLocation, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { FaShareSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  AiOutlineDislike, AiOutlineLike, AiFillDislike, AiFillLike,
} from 'react-icons/ai';
import { useGetNewsQuery, useUpdateNewsLikeMutation } from '../../redux/news/newsApiSlice';
import LoadingScreen from '../../conditions/LoadingScreen';

export default function NewsPost() {
  const { slug } = useParams();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(
    localStorage.getItem(`${slug}no`) || false,
  );
  const [likeClicked, setLikeClicked] = useState(
    localStorage.getItem(slug) || false,
  );
  const [updateNewsLike] = useUpdateNewsLikeMutation();
  const { data: news = [], isLoading } = useGetNewsQuery();
  const clientUrl = 'http://localhost:3000';

  const handleLike = async (id, like) => {
    if (likeClicked) {
      try {
        setLikes(likes - 1);
        setDislikes(false);
        const res = await updateNewsLike({ id, like_count: like - 1 }).unwrap();
        localStorage.removeItem(slug);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLikes(likes + 1);
        setDislikes(false);
        setLikeClicked(!likeClicked);
        const res = await updateNewsLike({ id, total_likes: like + 1 }).unwrap();
        localStorage.setItem(slug, true);
        localStorage.removeItem(`${slug}no`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDisLike = async (id, like) => {
    if (likeClicked) {
      try {
        setLikeClicked(false);
        setDislikes(!dislikes);
        const res = await updateNewsLike({ id, like_count: like - 1 }).unwrap();
        setLikes(likes - 1);
        localStorage.removeItem(slug);
        localStorage.setItem(`${slug}no`, true);
      } catch (error) {
        toast.error('could not update');
      }
    } else {
      setDislikes(!dislikes);
      localStorage.setItem(`${slug}no`, true);
    }
  };

  const handleShareClick = async () => {
    const currentURL = window.location.href;

    try {
      await navigator.clipboard.writeText(currentURL);
      toast.success('Copied news to clipboard!!');
    } catch (error) {
      toast.error('Failed to copy link:');
    }
  };

  const html = (value) => {
    const myHTML = value;
    const mySafeHTML = DOMPurify.sanitize(myHTML);
    return mySafeHTML;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const filteredNews = news.filter((item) => item.slug === slug);
  if (!filteredNews.length) {
    return <div className="text-center py-10">News not found</div>;
  }

  const targetDateTime = new Date(filteredNews[0].createdAt);
  const timeIn12HourFormat = targetDateTime.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true,
  });

  const sortedNews = [...news].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const latestNews = sortedNews.slice(0, 2);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="">
        <div className="w-full md:w-1/2 mx-auto">
          <div className="w-full font-raleway text-gray-800 text-4xl px-5 pt-10 pb-5 font-bold leading-none">
            {filteredNews[0].title}
          </div>

          <div className="mx-5 mb-1">
            <img src={filteredNews[0].picture} alt={filteredNews[0].title} />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-full text-gray-600 font-thin italic px-5 pt-3">
              By
              {' '}
              <strong className="text-gray-700">{filteredNews[0].author_name}</strong>
              <br />
              {timeIn12HourFormat}
            </div>
            <div className="flex justify-center items-center gap-3 pr-6">
              <div className="flex justify-center text-2xl items-center gap-2">
                <span className="text-gray-600 text-sm">{filteredNews[0].like_count > 0 ? filteredNews[0].like_count : likes}</span>
                <button type="button" onClick={() => handleLike(filteredNews[0].id, filteredNews[0].like_count)}>{!likeClicked ? <AiOutlineLike /> : <AiFillLike />}</button>
                <button type="button" onClick={() => handleDisLike(filteredNews[0].id, filteredNews[0].like_count)}>{!dislikes ? <AiOutlineDislike /> : <AiFillDislike />}</button>
              </div>
              <button className="flex gap-2 justify-between text-white px-3 py-1 rounded-md hover:shadow-lg bg-mainColor items-center" type="button" onClick={handleShareClick}>
                <FaShareSquare />
                <span>share</span>
              </button>
            </div>
          </div>

          <div className="px-5 w-full mx-auto py-5" dangerouslySetInnerHTML={{ __html: html(`${filteredNews[0].body}`) }} />

          <div className="flex mb-4 px-4 lg:px-0 items-center justify-between mx-5">
            <h2 className="font-semibold text-3xl font-railway">Latest news</h2>
            <Link
              to="/news"
              className="bg-gray-200 hover:bg-secondColor hover:bg-opacity-30 text-gray-800 px-3 py-1 rounded cursor-pointer"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              View all
            </Link>
          </div>
          <div className=" block space-x-0 lg:flex lg:space-x-6 mx-5">
            {latestNews.length > 0 ? (
              latestNews.map((item) => (
                <div key={item.id} className="group rounded w-full lg:w-1/2 p-4 lg:p-0">
                  <img src={item.picture} className="rounded h-48 object-fit" alt={item.title} />
                  <div className="p-4 pl-0">
                    <h2 className="font-semibold text-2xl text-gray-800 group-hover:text-mainColor">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: html(`${item.body}`) }} />

                    <Link
                      to={`${clientUrl}/newspost/${item.slug}`}
                      className="inline-block py-2 rounded text-green-900 mt-2 ml-auto hover:text-blue-500"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No news found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

