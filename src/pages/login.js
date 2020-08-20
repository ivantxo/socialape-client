import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png'
import { Link } from 'react-router-dom';

// Material UI imports
import Grid from '@material-ui/core/Grid';
import Typograghy from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux imports
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadthis
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  static getDerivedStateFromProps (nextProps, state) {
    if (nextProps.ui.errors) {
      // this.setState({ errors: nextProps.ui.errors });
      return {
        ...state,
        errors: nextProps.ui.errors
      };
    }
    return null;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { 
      classes, 
      ui: { 
        loading 
      } 
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typograghy variant="h2" className={classes.pageTitle}>
            Login
          </Typograghy>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField 
              id="email" 
              name="email" 
              type="email" 
              label="Email" 
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth 
            />
            <TextField 
              id="password" 
              name="password" 
              type="password" 
              label="Password" 
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth 
            />
            {errors.general && (
              <Typograghy variant="body2" className={classes.customError}>
                {errors.general}
              </Typograghy>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress
                  className={classes.progress}
                  size={30}
                />
              )}
            </Button>
            <br />
            <small>
              Dont have an account? Sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps, 
  mapActionsToProps
)(withStyles(styles)(login));
