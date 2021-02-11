import React, {useContext, useEffect, useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import {OrderContext} from '../context/order';
import { useHistory, Link } from "react-router-dom";


function  Basket() {
  const history = useHistory();
  const order_ontext = useContext(OrderContext)
  const [prceedButtonDisabled, setPrceedButtonDisabled] = useState(true)


  useEffect(() => {
    console.log(order_ontext.delivery)
    if(order_ontext.delivery == null || order_ontext.delivery == undefined){
      order_ontext.setDelivery(true)
    }
    setPrceedButtonDisabled(true)
  }, [])

  useEffect(() => {
    if(order_ontext.orderedDishes.length === 0){
      setPrceedButtonDisabled(true)
    } else {
      if(prceedButtonDisabled){
        setPrceedButtonDisabled(false)
      }
    }
  }, [order_ontext.orderedDishes])





  const decrease = (id) => {
    const duplicates = order_ontext.orderedDishes.filter(x => x.id === id)
    if(duplicates.length != 0){
        order_ontext.decreaseDish(id)
    } else {
      console.log("basket.js function decrease")
    }
  }







  const entries = order_ontext.orderedDishes.map((entry)=>{
    return (<li key={entry.id} className="collection-item">
              <div>
                  <div>{entry.name}</div>
                  <div>Amount: {entry.amount}</div>
                  <div>{(entry.amount * entry.price).toFixed(2) } €</div>
              </div>

              <div className="basketItemButtonsWrapper">
                  <a href="#!"  onClick={() => {decrease(entry.id)}} >
                    <i className="small material-icons" style={{fontSize: "1.5rem"}}>remove_circle</i>
                  </a>
                  <a href="#!" onClick={() => {order_ontext.increaseDish(entry.id)}} >
                    <i className="small material-icons" style={{fontSize: "1.5rem"}}>add_circle</i>
                  </a>
                  <a href="#!" onClick={() => {order_ontext.deleteDish(entry.id)}} >
                    <i className="small material-icons red-text" style={{fontSize: "1.5rem"}}>delete_forever</i>
                  </a>
              </div>
            </li>)
  })
  
let test = "card"
if(order_ontext.orderedDishes.length > 0){
  test += " orange lighten-3"
} else {
  test += " grey lighten-4"
}
  
      return (
        <div className={test}>
          <div classNem="card-content white-text">

          <div className="card-title center-align ">
            <div className=" wrapToCenter">
              <i className="large material-icons hide-on-small-only">shopping_cart</i>
              <div className="hide-on-med-and-up show-on-small">Your Order:</div>
            </div>
          </div>

            <div>
              <ul className="collection with-header">
                {entries}
              </ul>
            </div>
              
            <div className="center-align">
                <div>
                  <div>Please choose:</div>
                  <div className="wrapToCenter">
                    <label>
                    <input name="group1" type="radio" className=" with-gap"
                    checked={order_ontext.delivery} onClick={() => order_ontext.setDelivery(true)} />
                    <span className=" black-text " >Delivery</span>
                    </label>
                    <label style={{justifyContent: "space-around"}}>
                      <input name="group1" type="radio" className=" with-gap"
                      checked={!order_ontext.delivery} onClick={() => order_ontext.setDelivery(false)}/>
                      <span className=" black-text ">Self-pickup</span>
                    </label>
                  </div>
                  
                </div>
                <b className="h2">
                  Sum: {order_ontext.orderSum} €
                </b>
            </div>

              <div id="checkoutButtonWrapper">
                <Link to="/checkout" disabled={prceedButtonDisabled} 
                  className="btn blue-grey darken-4">Checkout <i className="material-icons right">arrow_forward</i>
                </Link>
              </div>

            </div>
        </div>



        
      )

}

export default Basket;
