import React, { useState, useEffect } from 'react';
import {
  ListItem,
  Dialog,
  DialogTitle,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import { addRole, setUserProfile , getRole} from "../utils/FirebaseDbUtils";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Grid, CardContent, Typography, CardMedia, CardActionArea } from "@material-ui/core";
 

 
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(153deg, #67A6FC 30%, #D4FFE8 90%)',
    boxShadow: '0',
  },
});

const LoginDialog = ({ user , setUserRole }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [role, setRole] = useState('seller');
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      setOpen(true);
      setProfile({
        name: user.displayName,
        email: user.email,
        address: '',
        role: 'seller'
      })
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = prop => event => {
    setProfile({ ...profile, [prop]: event.target.value });
  };

  const submitForm = () => {
    setUserProfile(user.uid, profile);
    getRole(user.uid, setUserRole)
    handleClose();
  }

  return (
   
    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        },
      }}
      className={classes.root}
      fullScreen={fullScreen}
      
    >
      <ValidatorForm
        onSubmit={() => {
          submitForm();
        }}
      >
        <DialogTitle id="simple-dialog-title">
        <div> 
          <h1 style = {{textAlign: 'center'}}> <div style={{display: 'inline-block', fontFamily:'Gill Sans Nova', fontWeight: 'bolder', color:'white', letterSpacing:'4px'}}> 
          THRIFT
          </div>
          <div style={{display: 'inline-block', fontFamily:'Gill Sans Nova', fontStyle: 'italic', color:'white', letterSpacing:'4px'}}> SHIFT</div>
          </h1>
        </div>
        </DialogTitle>
        
        <ListItem>
           <p style = {{color: 'white'}}>Welcome {user.displayName}! Are you interested in selling your items to local thrift stores, or are you a store owner looking to buy?</p>
        </ListItem>

        <ListItem style = {{color: "white"}}>
          <TextValidator
            label="Name"
            value={profile.name}
            validators={["required"]}
            errorMessages={["This field is required"]}
            onChange={handleChange("name")}
            style = {{color: "white"}}
          />
        </ListItem>
        <ListItem style = {{color: "white"}}>
          <TextValidator
            label="Email Address"
            value={profile.email}
            validators={["required"]}
            errorMessages={["This field is required"]}
            style = {{color: "white"}}
            onChange={ handleChange("email") }
          />
        </ListItem>
        <ListItem style = {{color: "white"}}>
          <TextField label="Address" value={profile.address} onChange={ handleChange('address') } style = {{color: "white"}} />
        </ListItem>
        <ListItem style = {{color: "white"}}>
          <RadioGroup aria-label="gender" name="gender1" value={profile.role} onChange={handleChange('role')}>
            <FormControlLabel value="seller" control={<Radio />} label="I'm a Seller" />
            <FormControlLabel value="buyer" control={<Radio />} label="I'm a Buyer" />
          </RadioGroup>
        </ListItem>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '5px', marginBottom: '5px', width: '50%', marginLeft: '25%' }}
         
        >
          Submit
        </Button>
      </ValidatorForm>
    </Dialog>
  )

}

export default LoginDialog;