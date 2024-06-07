import React, { Component } from "react";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. */

function Joke({id, joke, votes, upVote, downVote}) {

    return(
  <>
    <li>{joke} Votes:{votes} <button onClick={() => upVote(id)}>Upvote</button> <button onClick={() => downVote(id)}>Downvote</button>
      </li>

  </>
    )

}

export default Joke;
