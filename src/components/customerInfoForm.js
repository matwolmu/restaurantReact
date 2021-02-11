import React, {useContext, useState, useEffect} from 'react';
import {useMutation } from '@apollo/client';
import {SEND_ORDER_MUTATION} from '../gql_queries/index';
import {AuthContext} from '../context/auth';
import {OrderContext} from '../context/order';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));



function  CustomerInfoForm() {
  const history = useHistory();
  const classes = useStyles();
  const authContext = useContext(AuthContext)
  const order_ontext = useContext(OrderContext)
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false)
  const [formFilled, setFormFilled] = useState(false)
  
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    address: {
        street: "",
        zip: ""
    },
    order: {
        dishes: order_ontext.orderedDishes.map(dish => dish.id),
        delivery: order_ontext.delivery,
        payment: order_ontext.payment,
        sum: order_ontext.orderSum
    }
  });


  const [submitOrder] = useMutation(SEND_ORDER_MUTATION, {
    variables: {
        dishes: customerData.order.dishes,
        delivery: customerData.order.delivery,
        payment: customerData.order.payment,
        sum: parseFloat(customerData.order.sum),
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address.street + "/" + customerData.address.zip
    },
    onCompleted: (response) => {
        console.log("order sent")
        order_ontext.reset()
        history.push('/finished')
    }
  });

  useEffect(() => {
    order_ontext.setPayment("cash")
  }, [])

  useEffect(() => {
    if(order_ontext.delivery){   
        if(customerData.name !== "" 
            && customerData.address.street !== "" 
            && customerData.address.zip !== "" 
            && customerData.phone !== ""){
                console.log("bre")
                setFormFilled(true)
        }
    } else {
        if(customerData.phone !== ""){
            setFormFilled(true)
        }
    }
}, [customerData]);

  

  function handleFormChange(e){
      if(e.target.name !== "group1"){
            if(e.target.name === "street" || e.target.name === "zip"){
                setCustomerData(prevState => ({
                    ...prevState,
                    address: {
                        ...prevState.address,
                        [e.target.name]: e.target.value
                }}));
            } else {    // name, phone, email
                console.log(e.target.name)
                console.log(e.target.value)
                setCustomerData(prevState => ({
                    ...prevState,
                    [e.target.name]: e.target.value
                    
                }));
            }  
        } else {       // payment radio buttons
            order_ontext.setPayment(e.target.value)
            if(!paymentMethodSelected){
                setPaymentMethodSelected(!paymentMethodSelected)
            }
            setCustomerData(prevState => ({
                ...prevState,
                order: {
                    ...prevState.order,
                    payment: e.target.value
                }
                
            }));
            
        }
  }

  





  function handleSubmit(e){
    e.preventDefault();
    console.log("-------------------------")
    console.log(customerData)
    submitOrder()

    console.log("paymentMethodSelected")
    console.log(paymentMethodSelected)
    console.log("formFilled")
    console.log(formFilled)

}
  


      return (
          <div className="row someMorePaddingTOP">
            <form  noValidate autoComplete="off" 
                onChange={handleFormChange} onSubmit={handleSubmit}>
                <div>
                <label>
                    Name:
                        <input type="text" name="name" className=""/>
                    </label>
                    <label>
                    Address:
                        <input type="text" name="street" className=""/>
                    </label>
                    <label>
                    ZIP Code:
                        <input type="text" name="zip" className=""/>
                    </label>
                    <label>
                    Phone:
                        <input type="text" name="phone" className=""/>
                    </label>
                    <label>
                    Email:
                        <input type="text" name="email" className=""/>
                    </label>
                </div>
                <div className="wrapToCenter ">
                    <div className="MobileSwitchFlexToCol">
                    <label className="somePaddingSIDE">
                        <input name="group1" type="radio"  value="cash" />
                        <span>Cash</span>
                    </label>
                    <label className="somePaddingSIDE">
                        <input name="group1" type="radio" value="pp" />
                        <span>Paypal</span>
                    </label>
                    <label className="somePaddingSIDE">
                        <input name="group1" type="radio" value="cc" />
                        <span>Credit Card</span>
                    </label>

                    </div>
                    
              </div>
                <div className="wrapToCenter somePaddingTOP">
                    <button type="submit" disabled={ !(paymentMethodSelected && formFilled)} 
                    className="waves-effect waves-light btn">Finish Order</button>
                </div>
            </form>
          </div>
      )

}

export default CustomerInfoForm;


// !(paymentMethodSelected && formFilled)