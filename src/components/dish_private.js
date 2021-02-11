import React, {useContext, useState} from 'react';
import { useMutation } from '@apollo/client';
import {OrderContext} from '../context/order';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {CHANGE_DISH_MUTATION} from '../gql_queries/index';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      }
  }));



function Dish_private({dish, deleteDish, updateFinished, categories}) {
    const classes = useStyles();
    const [update_mode_state, setUpdateModeState] = useState(false)
    const [availableSwitchState, setAvailableSwitchState] = useState(dish.availible)
    const [update_data, setUpdateData] = useState({
        id: dish.id,
        name: dish.title,
        description: dish.description,
        price: dish.price,
        availible: availableSwitchState === "on",
        allergies: dish.allergies,
        category: dish.category,
    })
    


    


    const [update_execute] = useMutation(CHANGE_DISH_MUTATION, {
        variables: update_data,
        onCompleted: (x) => {
            updateFinished()
        }
      });

    

    const handleUpdateChange = (e) => {
        if(e.target.name === "price"){
            setUpdateData(prevState => ({
                ...prevState,
                price: parseFloat(e.target.value)
            }));
        }else if(e.target.name !== "availible") {
            setUpdateData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    }   
    

    const update = () => {
        console.log("-----------------------------")
        console.log(update_data)
        update_execute()
        setUpdateModeState(false)
        
    }




    let buttons;
    if(update_mode_state){
       buttons = <div>
                    <button onClick={() => update()}>
                        Save
                    </button>
                    <button onClick={() => deleteDish(dish.id)}>
                        Delete
                    </button>
                </div>
    }else {
        buttons =  <div>
                    <button onClick={() => setUpdateModeState(true)}>
                        Update
                    </button>
                    <button onClick={() => deleteDish(dish.id)}>
                        Delete
                    </button>
                </div>
    }

    let infoOrUpdate;
    if(update_mode_state){
        infoOrUpdate = (<div>
            <form  onChange={handleUpdateChange} className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                    //    id="standard-textarea"
                        label="Title"
                        placeholder={dish.name}
                        multiline
                        name="name" />
                </div>
                <div>
                    <TextField
                    //    id="standard-textarea"
                        label="Description"
                        placeholder={dish.description ? dish.description : ""}
                        multiline
                        name="description" />
                </div>
                <div>
                    <TextField
                    //    id="standard-textarea"
                        label="Price"
                        placeholder={dish.price ? dish.price : ""}
                        multiline
                        name="price" />
                </div>
                <div>
                    <TextField
                    //    id="standard-textarea"
                        label="Allergies"
                        placeholder={dish.allergies ? dish.allergies : ""}
                        multiline
                        name="allergies" />
                </div>
                <div>
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
                <div className="switch">
                    <label>
                        Currently Available
                        <input type="checkbox" 
                        name="availible"
                        checked={availableSwitchState} 
                        onChange={() => setAvailableSwitchState(!availableSwitchState)} />
                    <span className="lever"></span>
                    </label>
                </div>
                
                
                
                
            </form>
        </div>)
    } else {
        infoOrUpdate = (<div>
            <p>{dish.name}</p>
            <p>{dish.description}</p>
            <p>{dish.price}</p>
        </div>)
    }


      return (
        <div className="dish">

            {infoOrUpdate}

            {buttons}
            
        </div>
        
      )

}

export default Dish_private;