import React from 'react';
import { useGetNewsQuery } from '../../redux/news/newsSlice';
import { useGetContactsQuery } from '../../redux/contact/contactSlice';
import { useSelector } from 'react-redux';
import { productSelector } from '../../redux/store';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LoadingScreen from '../../conditions/LoadingScreen';

export default function Home() {
  const { data: news = [] } = useGetNewsQuery();
  const { data: contacts = [] } = useGetContactsQuery();
  const { products } = useSelector(productSelector);

  const latestNews = news.slice(0, 3);

  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to EthioTech</h1>
          <p className="text-xl text-gray-600 mb-8">Discover our latest products and innovations</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Products <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>

        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="h-[400px]"
          >
            {products?.slice(0, 6).map((product) => (
              <SwiperSlide key={product._id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden h-full"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <Link
                      to={`/products/${product._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View More
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Latest News */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.body.substring(0, 100)}...</p>
                  <Link
                    to={`/news/${item.slug}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">{contacts[0]?.phone}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">{contacts[0]?.email}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600">{contacts[0]?.address}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

