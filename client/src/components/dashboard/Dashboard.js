import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Dashboard = ({
  auth: { user }
}) => {
  useEffect(() => {

  }, );

  return (
    <Fragment>
      <p className="lead">
        <h1 className='text-primary'><i className="fas fa-user" /> Welcome {user && user.name}</h1>
      </p>
      <h2>Dashboard content here</h2>
      <div class="footer">
        <h1>&copy;<a href = 'https://abhinavgor.netlify.app/'>Abhinav Gorantla</a> 2020.</h1>
      </div>
    </Fragment>
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
