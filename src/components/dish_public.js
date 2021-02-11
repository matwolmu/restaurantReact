import React, {useContext, useState} from 'react';
import { useQuery } from '@apollo/client';
import {OrderContext} from '../context/order';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));






function Dish_public({dish}) {
  const classes = useStyles();
  const order_ontext = useContext(OrderContext)
  const [hover, setHover] = useState(false);


  
  const addDish = () => {
    const duplicates = order_ontext.orderedDishes.filter(x => x.id === dish.id)
    if(duplicates.length == 0){
      const modifiedDish = {
        ...dish,
        amount: 1
      }
        order_ontext.addDish(modifiedDish)
    } else {
      order_ontext.increaseDish(dish.id)
    }
  }

 


      return (
        <div className={hover ? "hoverable red lighten-5" : "hoverable"}  style={{padding: "15px 0 "}}
          onMouseOver={() => {setHover(true)}}
          onMouseLeave={() => {setHover(false)}}
        >
          <div className="container singleDish">
            <div className="">
              <div className="dishTitle">
                <span>{dish.name + "  "}   </span>
                {hover && dish.allergies !== "" && 
                  <Tooltip title={"Allergies: " + dish.allergies}>
                    <InfoOutlinedIcon fontSize="small"/>
                </Tooltip>}
              </div>
              <div>
                {hover && dish.description !== "" && <span>{dish.description}</span>}
              </div>
              <div>
                {dish.price} €
              </div>
            </div>

            <div className="wrapToCenter">
              {hover ? (
              <a class="btn-floating btn-medium waves-effect waves-light green" onClick={addDish}>
                <i class="material-icons">add</i>
              </a>
          ) : (<div></div>)}
                
            </div>
          </div>
        </div>
        
      )

}

export default Dish_public;