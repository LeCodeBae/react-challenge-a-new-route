import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <div className="App">
      <Router>
      <div>
      <h1>Chuck Norris Joke Generator</h1>
      <a><Link to="/home">Home</Link></a><br/>
      <a><Link to="/categories">Categories</Link></a>
      
      <Route path="/home" component={Home}/>
      <Route path="/categories" component={Categories}/>
      </div>
      </Router>
      </div>
    );
  }
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      joke: ""
    }
  }
  createJoke(e){
    e.preventDefault()
    let that = this
    axios.get('https://api.icndb.com/jokes/random')
    .then((response)=>{
      that.setState(
        {joke: response.data.value.joke}
      )
    }).catch((err)=>{
      console.log(err);
    })
    
  }
  render(){
    return(
      <div>
      <form onSubmit={(e)=>{this.createJoke(e)}}>
      <button type="submit">Generate</button>
      </form>
      <h3>{this.state.joke}</h3>
      </div>
    )
  }
}

class Categories extends Component {
  constructor(props){
    super(props)
    this.state = {
      jokes: []
    }
  }
  getNerdy(e){
    e.preventDefault()
    let that = this
    axios.get('https://api.icndb.com/jokes?limitTo=[nerdy]')
    .then((response)=>{
      that.setState(
        {jokes: response.data.value}
      )
      console.log(response.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  getExplicit(e){
    e.preventDefault()
    let that = this
    axios.get('https://api.icndb.com/jokes?limitTo=[explicit]')
    .then((response)=>{
      that.setState(
        {jokes: response.data.value}
      )
      console.log(response.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  render(){
    return (
      <div>
      <ul>
      <a onClick={(e)=>{this.getNerdy(e)}}><li>nerdy</li></a>
      <a onClick={(e)=>{this.getExplicit(e)}}><li>explicit</li></a>
      </ul>
      <ol>
      {this.state.jokes.map((joke)=>
        <li>{joke.joke}</li>
      )}
      </ol>
      </div>
    )
  }
}

export default App;
