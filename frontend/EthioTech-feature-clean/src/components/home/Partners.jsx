import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServicesData = [
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1745843488/consulting_zvg1y8.png',
        label: 'Consulting',
    },
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1744872803/2cyber_security_ancre5.png',
        label: 'Cyber Security',
    },
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1744872803/3Modern_DC_and_Networking_ojujtt.png',
        label: 'Modern DC and Networking',
    },
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1744872805/4Business_Automation_and_Intelligence_tghplb.png',
        label: 'Business Automation and Intelligence',
    },
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1744872804/5Software_Licensing_wrnpwt.png',
        label: 'Software Licensing',
    },
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1744872804/6Tech_Supply_chlmah.png',
        label: 'Tech Supply',
    },
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1744872804/7Surveillance_evctfy.png',
        label: 'Surveillance',
    },
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1744872803/8VOIP_PBXSIP_Solutions_ljjzgp.png',
        label: 'VOIP/PBX/SIP Solutions',
    },
    {
        icon: 'https://res.cloudinary.com/deqp41wyr/image/upload/v1744872806/9Maintenance_and_247_Support_o8mqfv.png',
        label: 'Maintenance and 24/7 Support',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function ServicesSection() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-dark dark:text-white mb-8">Services</h2>
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {ServicesData.map((service, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center w-full md:w-auto"
                            variants={itemVariants}
                        >
                            <motion.div
                                whileHover={{
                                    rotate: 360,
                                    scale: 1.2,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    },
                                }}

                            >
                                {typeof service.icon === 'string' ? (
                                    <img
                                        src={service.icon}
                                        alt={service.label}
                                        className="w-16 h-16 md:w-20 lg:w-24 md:h-20 lg:h-24 object-contain text-mainColor dark:text-secondaryColor"
                                    />
                                ) : (
                                    <div className="w-16 h-16 md:w-20 lg:w-24 md:h-20 lg:h-24 flex items-center justify-center text-mainColor dark:text-secondaryColor">
                                        {service.icon}
                                    </div>
                                )}
                            </motion.div>
                            <p className="mt-4 text-sm md:text-base text-gray-700 dark:text-gray-300 text-center">
                                {service.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-12">
                    <Link
                        to="/services"
                        className="bg-red-600 hover:bg-secondColor text-white font-semibold py-3 px-8 text-sm inline-flex items-center group rounded-md shadow-md"
                    >
                        <p> LEARN MORE </p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2 group-hover:translate-x-2 delay-100 duration-200 ease-in-out"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

