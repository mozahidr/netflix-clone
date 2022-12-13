import React, { useEffect, useState } from 'react';
import "./Banner.css";
//import banner from "../images/banner.jpg";
//import blackBanner from "../images/blackBanner.jpg";
import axios from '../axios';
import requests from '../api/Requests';

export const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);
    console.log({movie});

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }
  return (
    <header
        className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}
    >
        <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie?.original_name || movie?.title || movie?.name }
                </h1>
            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>
            <h1 className='banner__description'>
                {truncate(movie?.overview, 150)}
            </h1>
        </div>

        <div className="banner__fadeBottom" />

    </header>
  )
}
