import React, { useEffect, useState } from "react";
import { VStack, HStack, Heading, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function News() {
  const [news, setNews] = useState([]);

  const api = async () => {
    try {
      let response = await fetch(
        "https://newsapi.org/v2/everything?q=bitcoin&apiKey=7684b9a0b5e94656819efef1c0ed1b85"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let result = await response.json();
      setNews(result.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    api();
  }, []);

  const leftleftNews = news.slice(0, 3); // Get the first 2 news articles
  const leftrightNews = news.slice(3, 6); // Get the next 4 news articles
  const rightNews = news.slice(6, 12); // Get the next 4 news articles
  const carouselNews = news.slice(15, 20); // Get the next 5 news for the carousel

  return (
    <>
      <HStack spacing="24px" align="top">
        <VStack spacing="24px" align="top" width='60%' pr={'10'}>
          {/* News Carousel */}
          <Carousel showThumbs={false} infiniteLoop autoPlay >
            {carouselNews.map((article, index) => (
              <div key={index}>
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  style={{ width: "auto", height: "200px" }}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="overflow-auto mt-2">
                  <Heading as="h2" fontWeight="bold">
                    {article.title}
                  </Heading>
                  
                </div>
              </div>
            ))}
          </Carousel>

          {/* Existing News */}
          <HStack>
              <VStack pr={'10'} top={'0'}>
              {leftleftNews.map((article, index) => (
            <HStack key={index}>
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{ width: "100px", height: "100px" }}
                className="object-cover rounded-lg mr-4"
              />
              <div className="overflow-auto">
                <Heading as="h2" fontWeight="bold">
                  {article.title}
                </Heading>
                
              </div>
            </HStack>
          ))}
              </VStack>
              <VStack top={'0'} pl={'10'}>
              {leftrightNews.map((article, index) => (
            <HStack key={index}>
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{ width: "100px", height: "100px" }}
                className="object-cover rounded-lg mr-4"
              />
              <div >
                <Heading as="h2" fontWeight="bold" overflow={'hidden'}>
                  {article.title}
                </Heading>
                
              </div>
            </HStack>
          ))}
              </VStack>


          </HStack>




        </VStack>
        <VStack spacing="24px" align="top" shadow="2xl" padding="1.5" border="2px" width='40%' pl={'10'}>
          <Heading as="h1" size="lg" fontWeight="bold">
            Latest News
          </Heading>
          {rightNews.map((article, index) => (
            <HStack key={index}>
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{ width: "100px", height: "100px" }}
                className="object-cover rounded-lg mr-4"
              />
              <div className="overflow-auto">
                <Heading as="h2" fontWeight="bold">
                  {article.title}
                </Heading>
                
              </div>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </>
  );
}

export default News;




