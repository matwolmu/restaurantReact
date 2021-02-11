import { useHistory, useLocation } from "react-router-dom";
import React, {useContext, useState, useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Dish_private from './dish_private';
import DishPrivateALT from './dish_private_ALT';
import {GET_DISHES_QUERY, DELETE_DISH_MUTATION, ADD_DISH_MUTATION} from '../gql_queries/index';
import {AuthContext} from '../context/auth';
import AddDishForm from './addDishForm';



function Management (){
    

    const history = useHistory();
    const authContext = useContext(AuthContext)
    const { loading, error, data, refetch  } = useQuery(GET_DISHES_QUERY);

    if(!authContext.user){
        history.push('/')
    }

    const [dish_to_be_deleted, setDishToBeDeleted] = useState(null)
    const [uniqueCategories, setUniqueCategories] = useState([])


    const [deleteDish_execute] = useMutation(DELETE_DISH_MUTATION, {
        variables: {
            id: dish_to_be_deleted
        },
    //    pollInterval: 1000,
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
        if(dish_to_be_deleted){
            deleteDish_execute()
        
        }
    }, [dish_to_be_deleted]);




    const deleteDish = (id) => {
        setDishToBeDeleted(id)
    }

    const updateFinished = () => {
        console.log("refetch")
        refetch()
    }



    const dishes = data ? data.getDishes.map(dish => {
        return <DishPrivateALT  key={dish.id} dish={dish} deleteDish={deleteDish} 
                updateFinished={updateFinished} categories={uniqueCategories}/>
    }) : <p>no dishes</p>






    return (
        <div className="container " id="mgmtArea">
            {dishes}
        </div>

        
      );
}


export default Management;