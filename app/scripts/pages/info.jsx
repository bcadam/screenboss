import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');




var Info = React.createClass({
  componentWillMount(){

      var currentUser = Parse.User.current();

      if(!currentUser)
      {
        window.location.assign("#/login");
      }
      
  },  
  render(){
  return (
    <div>
      <h1>Info area</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe aliquam, 
        aspernatur possimus natus. Sapiente odio quibusdam eum sunt, velit vel saepe 
        facere voluptas animi explicabo consequuntur provident id at quis.
      </p>
    </div>
  );
  }


});

export default Info;