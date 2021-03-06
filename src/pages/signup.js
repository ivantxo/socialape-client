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
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadthis
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
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
    this.setState({ loading: true });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
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
            Signup
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
            <TextField 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              label="Confirm Password" 
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth 
            />
            <TextField 
              id="handle" 
              name="handle" 
              type="text" 
              label="Handle" 
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
              Signup
              {loading && (
                <CircularProgress
                  className={classes.progress}
                  size={30}
                />
              )}
            </Button>
            <br />
            <small>
              Already have an account? Login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

export default connect(
  mapStateToProps, 
  { signupUser }
)(withStyles(styles)(signup));
