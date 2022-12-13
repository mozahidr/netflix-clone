import React from 'react'
import './HomeScreen.css'
import { Nav } from '../Navbar/Nav';
import { Banner } from '../Banner/Banner';
import { Row } from '../Row/Row';
import requests from '../api/Requests';

export const HomeScreen = () => {
  return (
    <div className='homeScreen'>
      {/* Navbar */}
      <Nav />

      {/* Banner */}
      <Banner />
        
      {/* Row */}
      <Row 
        title="Netflix Originals" 
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  )
}
