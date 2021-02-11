import React, { useState, useEffect} from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {CHANGE_DISH_MUTATION} from '../gql_queries/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));




function DishPrivateALT({dish, deleteDish, updateFinished, categories}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);


  const [availableSwitchState, setAvailableSwitchState] = useState(dish.availible)
    const [update_data, setUpdateData] = useState({
        id: dish.id,
        name: dish.name,
        description: dish.description,
        price: dish.price,
        availible: availableSwitchState, // === "on",
        allergies: dish.allergies,
        category: dish.category,
    })

    useEffect(() => {
      setUpdateData(prevState => ({
        ...prevState,
        availible: availableSwitchState
    }));
  }, [availableSwitchState]);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const [update_execute] = useMutation(CHANGE_DISH_MUTATION, {
    variables: update_data,
    onCompleted: (x) => {
      console.log(update_data)
        updateFinished()          //// ??? check
    }
  });



  const handleUpdateChange = (e) => {
    if(e.target.name === "price"){
        setUpdateData(prevState => ({
            ...prevState,
            price: parseFloat(e.target.value)
        }));
    } else if(e.target.name === "title") {
      setUpdateData(prevState => ({
          ...prevState,
         name: e.target.value
      }));
    }else if(e.target.name !== "availible") {
        setUpdateData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    } 
}

const test = (e) => {
  e.preventDefault()
  console.log("-----------------------------")
  console.log(update_data)
  update_execute()
  
}
const test2 = (e) => {
  e.preventDefault()
  console.log("-----------------------------")
  console.log(availableSwitchState)
  
  if(availableSwitchState){
    setAvailableSwitchState(false)
  }else{
    setAvailableSwitchState(true)
  }
//  setAvailableSwitchState(prevAvailableSwitchState => !prevAvailableSwitchState);

  
}



  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          className="blue lighten-5"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{dish.name}</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </AccordionSummary>
        <AccordionDetails>

              <form  onChange={handleUpdateChange} 
              className={classes.root} noValidate autoComplete="off">
                <div className="updateDishForm">
                  <div className="cColumnUpdateDish">
                    
                        <TextField
                        //    id="standard-textarea"
                            label="Title"
                            placeholder={dish.name}
                            multiline fullWidth
                            name="title"
                        />
                        <TextField
                        //    id="standard-textarea"
                            label="Description"
                            placeholder={dish.description ? dish.description : ""}
                            multiline fullWidth
                            name="description" 
                        />
                        <TextField
                        //    id="standard-textarea"
                            label="Price"
                            placeholder={dish.price ? dish.price : ""}
                            multiline fullWidth
                            name="price" 
                        />
                        <TextField
                        //    id="standard-textarea"
                            label="Allergies"
                            placeholder={dish.allergies ? dish.allergies : ""}
                            multiline fullWidth
                            name="allergies" 
                      />
                  </div>

                  <div className="cColumnUpdateDish">

                    <div style={{margin: "20px"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="category_select">Category</InputLabel>
                            <Select
                            value={update_data.category} 
                            native
                            inputProps={{
                                name: 'category',
                                id: 'category_select',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {categories.map(cat => {
                                return <option value={cat}>{cat}</option>  
                            })}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="switch" onClick={(e) => {test2(e)}} >
                        <label>
                            Currently Available
                            <input type="checkbox" 
                            name="availible"
                            checked={availableSwitchState} 
                            
                        />
                        <span className="lever"></span>
                        </label>
                    </div>

                    <div className="updateDishButtonWrapper">
                      <div class="card-action wrapToCenter" >
                          <button type="submit" onClick={(e) => test(e)} 
                          className="waves-effect waves-light btn">Update</button>
                      </div>
                      <div class="card-action wrapToCenter" >
                          <button type="submit" onClick={() => deleteDish(dish.id)} 
                          className="waves-effect waves-light btn red">Delete</button>
                      </div>
                    </div>
                  </div>

                </div>
            </form>
        </AccordionDetails>
      </Accordion>

    
    
   
   
    </div>
  );
}


export default DishPrivateALT;