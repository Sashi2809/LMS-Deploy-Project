import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import UserCard from './UserCard'; // Adjust the import path as necessary

const UserCardCarousel = () => {
  // Array of user data with dynamic content
  const users = [
    {
      id: 1,
      textLines: [
        "Because of this course I was able to clear my two interviews... Thanks for making such wonderful content.",
      ],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s",
      linkText: "Checkout course",
      linkUrl: "#",
    },
    {
      id: 2,
      textLines: [
        "This has helped me so much in my career...I joined as a frontend engineer and eventually transitioned to full stack engineer with the help of this course.",
      ],
      imageUrl: "https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg",
      linkText: "Checkout course",
      linkUrl: "#",
    },
    {
      id: 3,
      textLines: [
        "Today, I am a software developer, and I credit a significant part of my success to the solid foundation laid by this course.",
        
      ],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
      linkText: "Checkout course",
      linkUrl: "#",
    },
    {
      id: 4,
      textLines: [
        "I would highly recommend this Web Development Bootcamp to anyone interested in pursuing a career in web development or looking to enhance their skills in this field."
      ],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s",
      linkText: "Checkout course",
      linkUrl: "#",
    },
    {
      id: 5,
      textLines: [
        "I really appreciate the flexibility I get with this Course. I can try any course and switch to another one. This motivates me to learn even more!",
      ],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s",
      linkText: "Checkout course",
      linkUrl: "#",
    },
    {
      id: 6,
      textLines: [
        "I have a full-time job and 3 kids. I needed the flexibility offered by this Course in order to achieve my goals. This Course motivated me to keep learning.",
      ],
      imageUrl: "https://media.istockphoto.com/id/1320811419/photo/head-shot-portrait-of-confident-successful-smiling-indian-businesswoman.jpg?s=612x612&w=0&k=20&c=bCUTB8vd8MnzZFIq-x645-SmLNk2sQzOvOvWCPGDfZ4=",
      linkText: "Checkout course",
      linkUrl: "#",
    },
    
  ];

  return (
    <div className="container mx-auto mt-10 px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">
        See what others are achieving through learning
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {users.map((user) => (
          <SwiperSlide key={user.id}>
            <UserCard
              textLines={user.textLines}
              imageUrl={user.imageUrl}
              linkText={user.linkText}
              linkUrl={user.linkUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UserCardCarousel;