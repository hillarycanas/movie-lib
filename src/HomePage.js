import React, { Component } from 'react';
import { Grid, Dropdown} from 'semantic-ui-react'
import MainMenu from './components/MainMenu'
import TopMovies from './components/TopMovies'
import Movie from './components/Movie'
import './App.css';

const APIKEY ='f3c68b656d6745edbe8008be79baa7c1';
let baseURL = 'https://api.themoviedb.org/3/';
let initialMovie = 'https://api.themoviedb.org/3/movie/181808?api_key=f3c68b656d6745edbe8008be79baa7c1&language=en-US';

class HomePage extends Component {
  constructor(props) {
      super(props)

      this.state = {
        results: [],
        movie:[],
        genrelist:[],
        genreValue: 'select', 
        sectionTitle: 'Top Movies',
        displayedTable: 'ShowMovieList'
      }
  }
  getPopularMovies = () => {
        const url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&release_date.gte=2018&vote_count.gte=500');
        this.getCategories(url)
    }
  getCategories = (url) => {
    let results = []
    fetch(url).then((res) => res.json()).then((data) => {
        data.results.forEach((movie) => {  
            if(movie.poster_path != null || movie.backdrop_path != null){
                results.push({
                    id: movie.id,
                    title: movie.title,
                    release: movie.release_date,
                    vote: movie.vote_average,
                    poster: movie.poster_path,
                    backdrop: movie.backdrop_path
                })
            }
 
        })                
        this.setState({results: results})
    }).catch((err) => console.log('Something happened'))           
  }

  handleClick = (data) => {
      const url =''.concat(baseURL, 'movie/',data.id,'?api_key=', APIKEY, '&language=en-US');
      this.getMovie(url)
  }

  getMovie = (url) => {
      window.scroll({top: 0, left: 0, behavior: 'smooth'});
      fetch(url)
          .then(result=>result.json())
          .then((data)=>{         
          this.setState({movie: data})
          }).catch((err) => console.log('Movie not found'))

  }
  getGenres= () => {
    const url = ''.concat(baseURL, 'genre/movie/list?api_key=', APIKEY, '&language=en-US');
      fetch(url).then((results) => results.json()).then((data) => {
        let genres = [];
          for (var i = 0; i < 20; i++) {
              if (data.genres[i] !== undefined){
                  let obj = {
                    text: data.genres[i].name,
                    value: data.genres[i].id
                }
                genres.push(obj);
              }
          }
          this.setState({ genrelist: genres})
      })
  }    

  handleDropdownSelect = (e,{options, value}) => {
        this.setState({ genreValue: value })
        for (let i = 0;  i < 20; i++ ) {
          if(options[i].value === value && options[i].value !== undefined){
            this.setState({sectionTitle: options[i].text})
           break 
          }
        }
        const url =''.concat(baseURL, 'genre/',value,'/movies?api_key=', APIKEY, '&language=en-US&include_adult=false&sort_by=created_at.asc');
        this.getCategories(url);
    
  }

  start= () => {
      this.getMovie(initialMovie);
      this.getPopularMovies();
      this.getGenres();
  }
    
  render() {
    document.addEventListener('DOMContentLoaded', this.start);

    return (
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={15}>  
              <MainMenu give={this.handleClick} />
              <Dropdown id='genreDrop' placeholder='Filter by genre' fluid selection options={this.state.genrelist} value={this.genreValue} onChange={this.handleDropdownSelect} />              
              <Movie data={this.state.movie}/> 
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={16}>  
              <TopMovies data={this.state.results} give={this.handleClick} name={this.state.sectionTitle} />
            </Grid.Column>
          </Grid.Row>
      </Grid>
      
    );
    }
}
export default HomePage;