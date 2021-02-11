import { useHistory } from "react-router-dom";
import React, {useContext, useState, useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {GET_DISHES_QUERY, DELETE_DISH_MUTATION, ADD_DISH_MUTATION} from '../gql_queries/index';
import {AuthContext} from '../context/auth';
import AddDishForm from './addDishForm';



function AddDish (){
    

    const history = useHistory();
    const authContext = useContext(AuthContext)
    const { loading, error, data, refetch  } = useQuery(GET_DISHES_QUERY);

    if(!authContext.user){
        history.push('/')
    }


    const [uniqueCategories, setUniqueCategories] = useState([])
    const [dish_to_be_added, setDishToBeAdded] = useState({
            name: null,
            description: null,
            price: null, 
            availible: null, 
            allergies: null,
            category: null
    })


    const [addDish_execute] = useMutation(ADD_DISH_MUTATION, {
        variables: {
            name: dish_to_be_added.name,
            description: dish_to_be_added.description,
            price: dish_to_be_added.price, 
            availible: dish_to_be_added.availible, 
            allergies: dish_to_be_added.allergies,
            category: dish_to_be_added.category
        },
        onCompleted: ( response ) => {
          refetch()
        }
      });


    useEffect(() => {
        if(data){
            const uniqueCats = [...new Set(data.getDishes.map(dish => {
                return dish.category
            }))]
            setUniqueCategories(uniqueCats)
        }
    }, [data]);



    useEffect(() => {
        if(dish_to_be_added){
            addDish_execute()
        }
    }, [dish_to_be_added]);


    
    const addDish = (newDish) => {
        setDishToBeAdded(newDish)   // ok
    }







    return (
        <div className="container " id="mgmtArea">
            <AddDishForm addDish={addDish} categories={uniqueCategories}/>           
        </div>  
      );
}


export default AddDish;