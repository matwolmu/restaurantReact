import React, {useContext} from 'react';
import {AuthContext} from '../context/auth';
import {OrderContext} from '../context/order';
import { useHistory, Link } from "react-router-dom";

import CustomerInfoForm from './customerInfoForm';






function  Checkout() {
  const history = useHistory();
  const authContext = useContext(AuthContext)
  const order_ontext = useContext(OrderContext)



    const order = order_ontext.orderedDishes.map((dish) => {
        return (
            <div style={{padding: "10px"}}>
                <div>
                {dish.amount}x {dish.name}
                </div>
                <div>
                {dish.price * dish.amount} €
                </div>
            </div>
        )
    })

  


      return (
        <div className="container " >
          <div className="row">

            <div className="col s12 m6 " id="checkoutOrderRecapWrapper">
              <div className="somePaddingTOP">
                <Link to="/" className="btn btn-primary"><i class="material-icons right">arrow_backward</i> Back to Menu </Link>
              </div>
              <div className="somePaddingTOP">
                  Your order:
              </div>
              <div>
                  {order}
              </div>
              <div className="somePaddingTOP">
                <b>Total: {order_ontext.orderSum} €</b>
              </div>
            </div>

            <div className="col s12 m6">
              <CustomerInfoForm />
            </div>
          </div>
        </div>
      )



}

export default Checkout;

