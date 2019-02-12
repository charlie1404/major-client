import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { login } from 'actions/users';

import styles from './styles';

class SignIn extends Component {
  state = {
    email: 'admin@charlieweb.tk',
    password: '123456789',
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <form onSubmit={this.onSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={this.onChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div>
              <Button
                disableRipple
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={this.props.isLoading}
                classes={{
                  root: classes.submit,
                  disabled: classes.loadingSubmit,
                }}
              >
                {this.props.isLoading ? <CircularProgress color="secondary" size={30} /> : 'Sign in'}
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.users.get('isLoading'),
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SignIn)
);
