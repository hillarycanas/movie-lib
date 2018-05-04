import React from 'react';
import { Segment, Image, Header,Card, Icon} from 'semantic-ui-react'
import '../App.css';

/**
 * Component TopMovies: Renders list of movie posters.
 */

export default class TopMovies extends React.Component {
  render() {
    const data = this.props.data
    const name = this.props.name
    return (
      <Segment>
          <div>
            <Header size='huge'>{name}</Header>
          </div>
        <Card.Group>
              {data.map((obj, i) => {
                  return  <Card key={i}> <Item2  data={obj} give={this.handleClick}/>  </Card>
                  
              })}
        </Card.Group>
      </Segment>  
    ) 
  }
handleClick = (data) => {
      this
          .props
          .give(data)
  }
}

class Item2 extends React.Component {
    handleClick = () => {
        this
            .props
            .give(this.props.data)
    }
    render() {
        const data = this.props.data
        return (
            <div className='wrap relative' onClick={this.handleClick}>
                <Image fluid  src={`https://image.tmdb.org/t/p/w342${data.poster}`} alt='movie-poster'/>
                <div className='description'>
                    <div className='description-detail infos-one'>{data.release}</div>
                    <div className='description-detail infos-two'>{data.title}</div>
                    <div className='description-detail infos-three'>
                        <span className='description-detail'><Icon  name='star' /></span>
                        <span>{data.vote}</span>
                    </div>
                </div>
            </div>
        )
    }
}

