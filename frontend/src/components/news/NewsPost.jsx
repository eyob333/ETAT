import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PiShareFatThin } from 'react-icons/pi';
import { Link, useLocation, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { FaShareSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  AiOutlineDislike, AiOutlineLike, AiFillDislike, AiFillLike,
} from 'react-icons/ai';
import {
  newsSelector,
} from '../../redux/store';
import { fetchNews, updateLikes } from '../../redux/news/newsSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import { useUpdateNewsLikeMutation } from '../../redux/news/newsApiSlice';

export default function NewsPost() {
  const dispatch = useDispatch();
  const { news, isLoading } = useSelector(newsSelector);
  const { slug } = useParams();
  console.log("Slug from URL:", slug); // Add this
  
  const [likes, setLikes] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [dislikes, setDislikes] = useState(
    localStorage.getItem(`${slug}no`) || false,
  );
  const [likeClicked, setLikeClicked] = useState(
    localStorage.getItem(slug) || false,
  );
  const [updateNewsLike] = useUpdateNewsLikeMutation();
  const clientUrl = import.meta.env.VITE_FRONT_URL;

  const handleLike = async (id, like, dislike) => {
    const currentLikes = typeof like === 'number' ? like : 0;
    const currentDislikes = typeof dislike === 'number' ? dislike : 0;
    if (likeClicked) {
      try {
        const updatedLikes = Math.max(currentLikes - 1, 0);
        dispatch(updateLikes({ id, likes: updatedLikes, dislikes: currentDislikes }));
        setLikes(updatedLikes);
        setLikeClicked(false);
        const res = await updateNewsLike({ id, total_likes: updatedLikes, total_dislikes: currentDislikes }).unwrap();
        localStorage.removeItem(slug);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updatedLikes = currentLikes + 1;
        dispatch(updateLikes({ id, likes: updatedLikes, dislikes: currentDislikes }));
        setLikes(updatedLikes);
        setLikeClicked(true);
        setDislikes(false);
        const res = await updateNewsLike({ id, total_likes: updatedLikes, total_dislikes: currentDislikes }).unwrap();
        localStorage.setItem(slug, true);
        localStorage.removeItem(`${slug}no`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDisLike = async (id, like, dislike) => {
    const currentLikes = typeof like === 'number' ? like : 0;
    const currentDislikes = typeof dislike === 'number' ? dislike : 0;
    if (dislikes) {
      try {
        const updatedDislikes = Math.max(currentDislikes - 1, 0);
        dispatch(updateLikes({ id, likes: currentLikes, dislikes: updatedDislikes }));
        setDislikesCount(updatedDislikes);
        setDislikes(false);
        const res = await updateNewsLike({ id, total_likes: currentLikes, total_dislikes: updatedDislikes }).unwrap();
        localStorage.removeItem(`${slug}no`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updatedDislikes = currentDislikes + 1;
        dispatch(updateLikes({ id, likes: currentLikes, dislikes: updatedDislikes }));
        setDislikesCount(updatedDislikes);
        setDislikes(true);
        setLikeClicked(false);
        const res = await updateNewsLike({ id, total_likes: currentLikes, total_dislikes: updatedDislikes }).unwrap();
        localStorage.setItem(`${slug}no`, true);
        localStorage.removeItem(slug);
      } catch (error) {
        console.log(error);
      }
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

  const { pathname } = useLocation();

  const html = (value) => {
    const myHTML = value;
    const mySafeHTML = DOMPurify.sanitize(myHTML);
    return mySafeHTML;
  };

  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    } else {
      const filtered = news.filter((item) => item.slug === slug);
      if (filtered.length > 0) {
        setLikes(Math.max(filtered[0].like_count || 0, 0));
        setDislikesCount(Math.max(filtered[0].dislike_count || 0, 0));
      }
    }
  }, [dispatch, news.length, slug, news]);

  let filteredNews;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoading && news.length > 0) {
    filteredNews = news.filter((item) => item.slug === slug);
    console.log("foo news", news);
    console.log("foo filtered", filteredNews)
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
              <img src={filteredNews[0].picture} />
            </div>

            <div className="flex justify-between items-center">
              <div className="w-full text-gray-600 font-thin italic px-5 pt-3">
                By <strong className="text-gray-700">{filteredNews[0].author_name}</strong>
                <br />
                {timeIn12HourFormat}
              </div>
              
              <div className="flex justify-center items-center gap-3 pr-6">
                <div className="flex justify-center text-2xl items-center gap-2">
                  <span className="text-gray-600 text-sm">
                    Likes: {Math.max(filteredNews[0].like_count, likes)}
                  </span>
                  <button type="button" onClick={() => handleLike(filteredNews[0].id, filteredNews[0].like_count, filteredNews[0].dislike_count)}>
                    {!likeClicked ? <AiOutlineLike /> : <AiFillLike />}
                  </button>
                  <span className="text-gray-600 text-sm">
                    Dislikes: {Math.max(filteredNews[0].dislike_count, dislikesCount)}
                  </span>
                  <button type="button" onClick={() => handleDisLike(filteredNews[0].id, filteredNews[0].like_count, filteredNews[0].dislike_count)}>
                    {!dislikes ? <AiOutlineDislike /> : <AiFillDislike />}
                  </button>
                </div>
                
                <button
                  className="flex gap-2 justify-between text-white px-3 py-1 rounded-md hover:shadow-lg bg-mainColor items-center"
                  type="button"
                  onClick={handleShareClick}
                >
                  <FaShareSquare />
                  <span>share</span>
                </button>
                
              </div>
            </div>

            <div className="px-5 w-full mx-auto py-5" dangerouslySetInnerHTML={{ __html: html(`${filteredNews[0].body}`) }} />
            <h1 className='px-5 w-full mx-auto py-5 text-sky-500'>
              <Link to={filteredNews[0].source}>source: {filteredNews[0].source}</Link>
            </h1>
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
                latestNews.map((item, index) => (
                  <div key={item.id} className="group rounded w-full lg:w-1/2 p-4 lg:p-0">
                    <img src={item.picture} className="rounded h-48 object-fit" alt="technology" />
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
}
