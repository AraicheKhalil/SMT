

import SectionTitle from "@/components/SectionTitle";
import React from "react";
import styled, { keyframes, css } from "styled-components";

const testimonials1 = [
  {
    name: "Sarah Johnson",
    handle: "@sarahjohnson",
    text: "This platform has streamlined our workflow significantly. The intuitive design and seamless integration have made it a vital tool in our daily operations.",
    avatar: "https://i.pravatar.cc/150?img=1", // Replace with actual avatar URL
  },
  {
    name: "Michael Lee",
    handle: "@michaellee",
    text: "The flexibility and customization options have allowed us to tailor the platform to our specific needs. It's truly a game-changer for our team.",
    avatar: "https://i.pravatar.cc/150?img=2", // Replace with actual avatar URL
  },
  {
    name: "Emily Davis",
    handle: "@emilydavis",
    text: "I can't imagine going back to our old processes. This platform has made everything so much easier and more efficient.",
    avatar: "https://i.pravatar.cc/150?img=4", // Replace with actual avatar URL
  },
  {
    name: "John Smith",
    handle: "@johnsmith",
    text: "The support team is fantastic! They are always quick to respond and help with any questions or issues we have.",
    avatar: "https://i.pravatar.cc/150?img=3", // Replace with actual avatar URL
  },
  {
    name: "Alicia Brown",
    handle: "@aliciabrown",
    text: "I love how user-friendly this platform is. It's made onboarding new team members a breeze, and they can get up to speed in no time.",
    avatar: "https://i.pravatar.cc/150?img=5", // Replace with actual avatar URL
  },
  {
    name: "David Wilson",
    handle: "@davidwilson",
    text: "The performance and reliability of this platform are outstanding. We can always count on it to deliver when we need it most.",
    avatar: "https://via.placeholder.com/150/6", // Replace with actual avatar URL
  },
  {
    name: "Jessica Martinez",
    handle: "@jessicamartinez",
    text: "The analytics features have given us valuable insights into our processes. We've been able to make data-driven decisions that have improved our productivity.",
    avatar: "https://i.pravatar.cc/150?img=6", // Replace with actual avatar URL
  },
  {
    name: "Tom Roberts",
    handle: "@tomroberts",
    text: "The platform's scalability has allowed our business to grow without any hiccups. It's the perfect solution for our expanding team.",
    avatar: "https://i.pravatar.cc/150?img=7", // Replace with actual avatar URL
  },
];


const testimonials2 = [
  {
    name: "Laura White",
    handle: "@laurawhite",
    text: "This platform has transformed the way we collaborate. The real-time updates and seamless communication tools are incredible.",
    avatar: "https://i.pravatar.cc/150?img=15", // Replace with actual avatar URL
  },
  {
    name: "James Carter",
    handle: "@jamescarter",
    text: "The learning curve was practically non-existent. Our team was up and running in no time, thanks to the platform’s intuitive design.",
    avatar: "https://i.pravatar.cc/150?img=16", // Replace with actual avatar URL
  },
  {
    name: "Olivia Turner",
    handle: "@oliviaturner",
    text: "I appreciate how this platform keeps everything organized. It’s so easy to find what I need and stay on top of my tasks.",
    avatar: "https://via.placeholder.com/150/11", // Replace with actual avatar URL
  },
  {
    name: "Daniel Harris",
    handle: "@danielharris",
    text: "The customer service is top-notch. Anytime we’ve needed help, the support team has been responsive and extremely helpful.",
    avatar: "https://i.pravatar.cc/150?img=14", // Replace with actual avatar URL
  },
  {
    name: "Sophia Lewis",
    handle: "@sophialewis",
    text: "The platform’s automation features have saved us countless hours. We can focus on more strategic work instead of repetitive tasks.",
    avatar: "https://i.pravatar.cc/150?img=13", // Replace with actual avatar URL
  },
  {
    name: "Jack Clark",
    handle: "@jackclark",
    text: "I’ve used many tools over the years, but this one stands out for its reliability and ease of use. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=12", // Replace with actual avatar URL
  },
  {
    name: "Mia King",
    handle: "@miaking",
    text: "The design is beautiful and functional. It’s rare to find a platform that is both aesthetically pleasing and practical.",
    avatar: "https://via.placeholder.com/150/15", // Replace with actual avatar URL
  },
  {
    name: "Liam Walker",
    handle: "@liamwalker",
    text: "We’ve seen a noticeable increase in productivity since we started using this platform. It’s a must-have for any team.",
    avatar: "https://via.placeholder.com/150/16", // Replace with actual avatar URL
  },
];


function App() {
  return (
    <>

    <div className="mb-20">
      <SectionTitle badge={"Testimonials"} titleSection={"Trusted by all"} description={"Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs."} />
    </div>
    
    <AppContainer>
      <MarqueeWrapper>
        <Marquee>
          <MarqueeGroup>
            {testimonials1.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <div className="flex gap-3">
                  <Avatar src={testimonial.avatar} />
                  <TextWrapper>
                    <Name>{testimonial.name}</Name>
                    <Handle>{testimonial.handle}</Handle>
                  </TextWrapper>

                </div>
                <Text className="line-clamp-3">{testimonial.text}</Text>
              </TestimonialCard>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {testimonials1.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <div className="flex gap-3">
                  <Avatar src={testimonial.avatar} />
                  <TextWrapper>
                    <Name>{testimonial.name}</Name>
                    <Handle>{testimonial.handle}</Handle>
                  </TextWrapper>

                </div>
                <Text className="line-clamp-3">{testimonial.text}</Text>
              </TestimonialCard>
            ))}
          </MarqueeGroup>
        </Marquee>
        <Marquee reverse className="mt-5">
          <MarqueeGroup>
          {testimonials2.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <div className="flex gap-3">
                  <Avatar src={testimonial.avatar} />
                  <TextWrapper>
                    <Name>{testimonial.name}</Name>
                    <Handle>{testimonial.handle}</Handle>
                  </TextWrapper>

                </div>
                <Text className="line-clamp-3">{testimonial.text}</Text>
              </TestimonialCard>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
          {testimonials2.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <div className="flex gap-3">
                  <Avatar src={testimonial.avatar} />
                  <TextWrapper>
                    <Name>{testimonial.name}</Name>
                    <Handle>{testimonial.handle}</Handle>
                  </TextWrapper>

                </div>
                <Text className="line-clamp-3">{testimonial.text}</Text>
              </TestimonialCard>
            ))}
          </MarqueeGroup>
        </Marquee>
      </MarqueeWrapper>
    </AppContainer>
    
    </>

  );
}

export default App;


const AppContainer = styled.div`
  margin-top : -45px;
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  position : relative;
`;

const MarqueeWrapper = styled.div`
  width: 100%;
  overflow: hidden;


  width: 100%;
  overflow: hidden;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // height: fit-content;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;
`;

const scrollX = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const Marquee = styled.div`
  display: flex;
  width: 200%;
  animation: ${(props) => (props.reverse ? css`${scrollX} 50s linear infinite reverse` : css`${scrollX} 50s linear infinite`)};

  
`;

const MarqueeGroup = styled.div`
  display: flex;
  width: 200%;
  justify-content: space-around;
  flex-wrap: nowrap; /* Ensure items don’t wrap */
  
`;

const TestimonialCard = styled.div`
  // background: ;
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  // min-width : 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink : 0 ;
  box-shadow: 0px 4px 10px #334155;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const TextWrapper = styled.div`

`;

const Name = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Handle = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;










