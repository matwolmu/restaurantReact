import {useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {LOGIN_MUTATION} from '../gql_queries/index';
import { useHistory, useLocation } from "react-router-dom";
import {AuthContext} from '../context/auth';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));






function AddDishForm ({addDish, categories}) {
    const classes = useStyles();
    const [allergiesChecked, setAllergiesChecked] = useState(false);
    
    const [inputFieldsValues, setInputFieldsValues] = useState({
        title: "",
        description: "",
        availible: true,
        price: "",
        allergies: "",
        category: ""
    });
    const [newCategory, setNewCategory] = useState(inputFieldsValues.category);
    const [selectedCategory, setSelectedCategory] = useState(inputFieldsValues.category);

    useEffect(() => {
        if(inputFieldsValues.category === ""){
            if(newCategory !== ""){
                setNewCategory("")
            } else {
                setSelectedCategory("")
            }
            
        }
    }, [inputFieldsValues]);





    const handleCheck = (event) => {
        setAllergiesChecked(!allergiesChecked);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let category = ""
        if(newCategory !== ""){
            category = newCategory
        } else{
            category = selectedCategory
        }
        const newDish = {
            name: inputFieldsValues.title,
            description: inputFieldsValues.description,
            price: parseFloat(inputFieldsValues.price), 
            availible: inputFieldsValues.availible, 
            allergies: inputFieldsValues.allergies,
            category
        }
        setInputFieldsValues({
            title: "",
            description: "",
            availible: true,
            price: "",
            allergies: "",
            category: "",
        })


        addDish(newDish)


        console.log(newDish)
        
    }

    
    const handleInputChange = (e) => {
        console.log(e.target.name)
        if(["title", "description", "price", "allergies"].includes(e.target.name)){
            setInputFieldsValues(prevState =>( {
                ...prevState,
                [e.target.name]: e.target.value
            }))

        }
    }


    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value)
        if(e.target.value !== ""){
            setSelectedCategory("")
        }
    }

    const handleSelectedCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
        if(e.target.value !== ""){
            setNewCategory("")
        }

    }






    



    
  return (
    <div className="addDishForm card ">
        <div  className=" card-content ">
        <form   onChange={handleInputChange} className="">

            <div className="col">
                <label>
                Title:
                <input type="text" name="title"  value={inputFieldsValues.title} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={inputFieldsValues.description} />
                </label>
                <label>
                    Price:
                    <input type="text" name="price" value={inputFieldsValues.price} />
                </label>
            </div>
        
            <div className="col">
                <div className="row" style={{margin: "20px 0"}}>
                    <div>
                        <label>
                            <input type="checkbox" 
                                className="filled-in" 
                                checked={allergiesChecked}
                                onChange={handleCheck} />
                            <span>Allergical ingredients</span>
                        </label>
                    </div>
                    {allergiesChecked && <div>
                        <label>
                        Enter ingredients which might cause an allergical reaction:
                        <input type="text" name="allergies" value={inputFieldsValues.allergies} />
                        </label>
                    </div>}
                </div>
            
                <div className="row">
                    <div style={{margin: "0 10px"}}>
                    <label>
                        New Category:
                        <input type="text" name="newCat" 
                            onChange={(e) => handleNewCategoryChange(e)} 
                            value={newCategory}/>
                    </label>
                    </div>
                    <FormControl className={classes.formControl} 
                        
                        >
                        <InputLabel htmlFor="category_select">Category</InputLabel>
                        <Select
                        value={selectedCategory} 
                        onChange={(e) => handleSelectedCategoryChange(e)}
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

            </div>
            </form>
            <div class="card-action wrapToCenter" >
                <button type="submit" onClick={handleSubmit} className="waves-effect waves-light btn">Save</button>
            </div>
        </div>
    </div>


      
  );

};
 

export default AddDishForm;


