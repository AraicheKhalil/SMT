import React from "react";
import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Nav/Navbar";
import PlayGround from "@/components/PlayGround/PlayGround";
import WhyUs from "@/components/WhyUs/WhyUs";
import Packages from "@/components/Packages/Packages";
import Testimonial from "@/components/Testimonial/Testimonial";
import Footer from "@/components/Footer/Footer";
import Usage from "@/components/usage/index"
import './home.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css"
// import UseCase from "../../Components/UseCase/UseCase";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <PlayGround />
      <Usage />
      <WhyUs />
      <Packages />
      <Testimonial />
      <Footer />
    </>
  );
};

export default LandingPage;
