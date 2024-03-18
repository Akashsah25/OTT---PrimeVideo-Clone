import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import './style.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';



export default function Banner() {
  const [query, setquery] = useState("");
  const [background, setbackground] = useState("");
  const { url } = useSelector((state) => state.home)
  const navigate = useNavigate()
  const searchQuery = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  const { data, loading } = useFetch("/discover/movie?api_key=285552cb6170731e80f84163aadc725c&page=1&primary_release_year=2023&with_original_language=hi")


  console.log("banner", data)


  // useEffect(() => {
  //   const bg = url.backdrop + data?.data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
  //   setbackground(bg)
  //   console.log("banner url",bg)
  // }, [data])

  return (
    <div>
      {/* <input
        type='text'
        placeholder='search movie or tv show'
        onChange={(e) => setquery(e.target.value)}
        onKeyUp={searchQuery}
      />
      <button>Search</button> */}
      {!loading ?
        (<div className='poster'>

          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={5}
            infiniteLoop={true}
            showStatus={false}
          >
            {data?.data?.results?.map((item) => {

              const imgurl = item?.backdrop_path ? url.backdrop + item?.backdrop_path : <h1>akash</h1>
              const imdbimage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"

              return (
                <div className='poster_item' key={item.id}>
                  <div className='poster_Img'>
                    <img src={imgurl} />
                  </div>
                  <div className='poster_overview'>
                      <div className='poster_title'>
                        {item.title ? item.title : ""}
                      </div>
                      <div className='poster_rating'>
                        <div className='logo'>
                          <img src={imdbimage}></img>
                        </div>
                        <div className='rating'>
                          {item.vote_average ? item.vote_average.toString().slice(0, 3) : ""}/10
                        </div>
                      </div>
                      <div className='poster_description'>
                        {item ? item.overview : ""}
                      </div>
                  </div>
                </div>
              )
            }
            )
            }
          </Carousel>

        </div>
        ) :
        <SkeletonTheme baseColor="#202020" highlightColor="#444">

          <Skeleton height={600} duration={2} />

        </SkeletonTheme>

      }
    </div>
  );
}
