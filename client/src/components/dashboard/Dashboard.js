import React, { Fragment, useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Background from "../../back2.png";

const Dashboard = ({
  auth: { user }
}) => {
  useEffect(() => {

  }, );

  const [completed, setCompleted] = useState(0);
  // useEffect(() => {
  //   setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  // }, []);

  function change(){
    setCompleted( Math.floor(Math.random() * (9)) + 90) ;
  }
  return (
    <section>
    <Fragment>
      <p className="lead">
        <h1 className='text-primary'><i className="fas fa-user" /> Welcome {user && user.name}</h1>
      </p>
      <h2></h2>
      <textarea  rows="10" cols="150" placeholder="Type something . . ."></textarea>
      <br></br><br></br><br></br><br></br>
      <input type="file"></input>
      <br></br><br></br>
      <button type="Submit" value="Submit" style={{color:'black'}} onClick={change}>Submit file</button>
      Accuracy: <span></span>
      <progress id="myProgress" value={completed} max="100"></progress><span>{completed}%</span>
      <div class="footer">
        <h1>&copy;<a href = 'https://abhinavgor.netlify.app/'>Bugs Bunny</a> 2020.</h1>
      </div>
    </Fragment>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(
  Dashboard
);
