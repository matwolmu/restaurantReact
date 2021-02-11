import {useState, useEffect, useContext } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

import {GET_STATS_MUTATION} from '../gql_queries/index';
import {GET_CUSTOMER_INFO_MUTATION} from '../gql_queries/index';

import { useHistory, useLocation } from "react-router-dom";
import {AuthContext} from '../context/auth';

import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
    typography: {
      padding: theme.spacing(2),
    },
  },
}));






function Stats () {
    const history = useHistory();
    const authContext = useContext(AuthContext)
    if(!authContext.user){
      history.push('/')
  }
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [selectedCustomerID, setSelectedCustomerID] = React.useState(null);
  const [customerDetails, setCustomerDetails] = React.useState("");

  const [statsData, setStatsData] = React.useState(null);

  const [getStats_execute] = useMutation(GET_STATS_MUTATION, {
    variables: {
      dateString: "" + selectedDate
    },
    onCompleted: ( response ) => {
      if(response){
        setStatsData(response)
      }
    }
  });

  const [getCustomerInfo_execute] = useMutation(GET_CUSTOMER_INFO_MUTATION, {
    variables: {
      id: selectedCustomerID
    },
    onCompleted: ( response ) => {
      if(response){
        console.log("response")
        console.log(response.getCustomerInfo)
       setCustomerDetails(response.getCustomerInfo)
      }
    }
  });

  

  




useEffect(() => {
  getStats_execute()
  }, [])

useEffect(() => {
  getCustomerInfo_execute()
  }, [selectedCustomerID])


  

    const handleDateChange = (date) => {
      setSelectedDate("" + date);
      getStats_execute()
      
    };



    const handlePopover = (event, id) => {
      
      setSelectedCustomerID(id)

      setAnchorEl(event.currentTarget);
    };
  


    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;






let stats = "no stats"
if(statsData){
  const statData = statsData.getStats.slice(1).map(singleStat => {
    return JSON.parse(singleStat)
  })

  stats = statData.map(stat => {
    let sum;
    const sumString = stat.order.sum + "";
    if( sumString.includes(".") ){
      if(sumString.split(".")[1].length > 1){
        sum = sumString
      } else {
        sum = sumString + "0"
      }
    } else {
      sum = sumString + ".00"
    }

    return (
      <TableRow key={stat.id}>
          <TableCell align="left">
            {stat.order.date.hour}:{stat.order.date.min !== 0 ? stat.order.date.min : stat.order.date.min + "0"}
          </TableCell>
          <TableCell align="left">{
            stat.dishes.length > 0 ?
              stat.dishes.map(dish => {
                return (<div>{dish.name}</div>)
                  })
              : <div><i>This dish has been deleted from the menu</i></div>
                
                }
          </TableCell>
          <TableCell align="left">{sum} €</TableCell>
          <TableCell align="left">
            <Badge badgeContent={stat.customer.ordered === 1 ? "New" : stat.customer.ordered} 
              color={stat.customer.ordered === 1 ? "secondary" : "primary"}
              onClick={(e) => {handlePopover(e, stat.customer.id)}}
              style={{cursor: "pointer"}} 
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}>
             <PersonIcon style={{ fontSize: 30 }} />
            </Badge>
          </TableCell>
      </TableRow> 
    )
  })
  
}




  return (
    <div className="container">
      <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
      </div>

      <div>
          Latest Orders from: {statsData && statsData.getStats[0]}
      </div>

      <div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="left">Dishes</TableCell>
              <TableCell >Sum</TableCell>
              <TableCell >Customer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

              {stats}
    
          </TableBody>
        </Table>
      </div>



      <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          
            <div className="container customerInfoList">
              {customerDetails && (
                <div>
                  <div className="customerInfoItem">
                    <StarBorderIcon  />
                    <div>Favorite Dish: {customerDetails.favDish }</div>
                  </div>
                  <div className="customerInfoItem">
                    <LocalAtmIcon  />
                    <div>Prefered Payment: {customerDetails.favPayment }</div>
                  </div>
                  <div className="customerInfoItem">
                    <ExitToAppIcon  />
                    <div>Prefered Delivery: {customerDetails.favDelivery ? "Delivery" : "Self-Pickup"}</div>
                  </div>
                  <div className="customerInfoItem">
                    <AssessmentIcon  /> 
                    <div>Total Sum Ordered: {customerDetails.totalSum } €</div>
                  </div>
                </div>
              )}
            </div>    
        </Typography>

      </Popover>
    </div>


    </div>
  );

};
 

export default Stats;

