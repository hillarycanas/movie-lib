import React, { Component } from 'react';
import _ from 'lodash'
import { Menu, Search} from 'semantic-ui-react'
import logo from '../images/logo.png';
import '../App.css';

const APIKEY ='f3c68b656d6745edbe8008be79baa7c1';
let baseURL = 'https://api.themoviedb.org/3/';


/**
 * Component MainMenu: Renders top menu.
 */
class MainMenu extends Component {

 	componentWillMount() {
	    this.resetComponent()
	}

  	resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

	componentDidMount() {
	  
	}
	/** [runSearch]	gets movies from value and display the top 5 results.	
	 * @param  {string} value - search input value
	 */
  	runSearch = (e, { value }) => {
	    this.setState({ isLoading: true, value })
	      let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', value);
	      fetch(url).then(result=>result.json()).then((data)=>{
	          let size = 5;
	          setTimeout(() => {  
	            if (this.state.value.length < 1) return this.resetComponent()
	            if (data.results !== undefined){	
	         		this.setState({ isLoading: false, results: data.results.slice(0,size)})	 
	         	}       	
	          }, 300)
	    })
  	}
  	/** [handleResult] give results to HomePage to render movie.		
	 * @param  {Object} result -  Movie searched for.
	 */
  	handleResultSelect = (e, { result }) => {
  		if (result !== 'undefined'){ 
  			this.resetComponent()
	  		this
	            .props
	            .give(result)
	    }
  	}

	render() {
		const { isLoading, value, results } = this.state
	    return (	    	
			<Menu borderless stackable>
				<Menu.Item>
            		<a href="./"><img src={logo} width={80} className="logo" alt="The Movie Database" /></a>
            	</Menu.Item>
            	<Menu.Item position='right'>
	            	<Search
		                placeholder='Search...'
		              	loading={isLoading}
		                onSearchChange={_.debounce(this.runSearch, 500, { leading: true })}
		                results={results}
		                value={value}
		                onResultSelect={this.handleResultSelect}
		            />
             	</Menu.Item>
         	</Menu>
	    );
  	}
}
export default MainMenu;