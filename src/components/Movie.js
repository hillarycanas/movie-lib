import React, { Component } from 'react';
import { Segment, Image, Header, Grid} from 'semantic-ui-react'
import '../App.css';

/**
 * Component Movie: Render movie section. 
 * Includes movie poster, backdrop and movie details
 */
class Movie extends Component {
   render() {
    const data = this.props.data
    if (data !== undefined){
      var sectionStyle = {
          backDrop:{
          backgroundImage:`url('https://image.tmdb.org/t/p/w1280${data.backdrop_path}') `,
          backgroundSize: 'cover',
          overflow: 'hidden', 
        },
        content: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }
      };

   
      return (
        <Segment style={sectionStyle.backDrop}> 
          <Grid divided='vertically' style={sectionStyle.content} stackable verticalAlign='middle'>
            <Grid.Row columns={3}>
              <Grid.Column width={4} >
                <div className="poster-container">
                  <Image fluid className='poster' src={`https://image.tmdb.org/t/p/w342${data.poster_path}`} alt='movie-poster'/>
                </div>
              </Grid.Column>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={6}>
                <div className="movie-details">
                    <Header as='h1'>
                      {data.title}
                      <Header.Subheader className="tagline">
                        {data.tagline}
                      </Header.Subheader>
                    </Header>
                    <p>{data.overview}</p>
                    <div className="details">
                      <div> Original Release: <span className="detail">{data.release_date}</span></div>
                      <div> Running Time: <span className="detail">{data.runtime} mins</span> </div>
                      <div> Vote Average: <span className="detail">{data.vote_average}</span></div>
                    </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>            
            
        </Segment>  
      ) 
    }
  }
      
}export default Movie;