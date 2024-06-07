import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */


function JokeList ({numJokesToGet = 5}) {
  const [jokes, setJokes] = useState([])
  //create separate state for isLoading
  const [isLoading, setIsLoading] = useState(false)

  let gottenJokes = new Set()
  let reset = function() {
    setJokes([])
    setIsLoading(false)
  }
  


  {/*##get jokes from api, then load jokes one at a time, adding not-yet-seen jokes*/}

  let getJokes = async function() {
    reset()
      console.log('getJokes')
      setIsLoading(true)
      for(let i=0; i < numJokesToGet; i++) {
    
        console.log(jokes.length)
        let res = await axios.get("https://icanhazdadjoke.com", {headers: { Accept: "application/json" }});
        let {id, joke} = res.data
        if(!gottenJokes.has(id)){
          gottenJokes.add(id)
          setJokes((prevState) => {
            //set state by calling key for first object - jokes
                  return [...prevState,
                  {id, joke : joke, votes : 0}]
                  })
        }  
    }
    setIsLoading(false)
        console.log('setJokes')
      
  }

  const upVote = (id) => {
    setJokes((prevJokes) =>
      prevJokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + 1 } : joke
      )
    );
  };

  const downVote = (id) => {
    setJokes((prevJokes) =>
      prevJokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes - 1 } : joke
      )
    );
  };

  // useEffect(() => {
  //   getJokes();
  // }, [getJokes])
  
  
  let mapResult = jokes.map(function(j, index) {
    return (
      <li key={index}>
        <Joke id={j.id} joke={j.joke} votes={j.votes} upVote={upVote} downVote={downVote}/>
      </li>
    )
    
    
  })

  return (
    <>
      <button onClick={getJokes}>Add Jokes</button>
    
      <ul>{mapResult}</ul>

      <li>{isLoading ? <i className="fas fa-4x fa-spinner fa-spin" /> : null}</li>
    </>
  )
}

export default JokeList
        
        






 

  


