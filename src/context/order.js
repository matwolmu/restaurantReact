import React, {useReducer, createContext } from 'react';


export const OrderContext = createContext({
    orderedDishes: [],
    orderSum: 0,
    delivery: null,
    payment: "",
    addDish: (dish) => {},
    deleteDish: (id) => {},
    increaseDish: (id) => {},
    decreaseDish: (id) => {},
    setDelivery: (booleanValue)  => {},
    setPayment: (payment) => {},
    reset: () => {}
})


function getSum(array){
    if(array.length === 0){
        return 0
    }else{
        return array.map((entry)=>{
                return entry.price * entry.amount
            }).reduce((a, b) => a + b, 0).toFixed(2);
    }
    
}



function orderReducer(state, action){
    switch(action.type){
        case 'ADD_DISH':
            console.log("orderedDishes")
            console.log(state.orderedDishes)
            const tmp = [...state.orderedDishes]
            tmp.push(action.payload)
            return{
                ...state,
                orderedDishes: tmp,
                orderSum: getSum(tmp)
    
            }
        case 'DELETE_DISH':
            const filtered = state.orderedDishes.filter(function(item) {
                if(item.id !== action.payload){
                    return item
                }
            })
            return{
                ...state,
                orderedDishes: filtered,
                orderSum: getSum(filtered)  
            }    
        case 'INCREASE':
            const result_inc = state.orderedDishes.map((x) => {
                if(x.id === action.payload){
                    const plusOne = x.amount + 1
                    return {
                        ...x,
                        amount: plusOne
                    }
                } else {
                    return x
                }
            })
            return {
                ...state,
                orderedDishes: result_inc,
                orderSum: getSum(result_inc)
            }; 
        case 'DECREASE':
            const result_dec = state.orderedDishes.map((x) => {
                if(x.id === action.payload){
                    if(x.amount > 0){
                        const minusOne = x.amount - 1
                        return {
                            ...x,
                            amount: minusOne
                        }
                    } else {
                        return {
                            ...x,
                        }
                    }       
                } else {
                    return x
                }
            })
            return {
                ...state,
                orderedDishes: result_dec,
                orderSum: getSum(result_dec)
            };
        case 'DELIVERY':
            return {
                ...state,
                delivery: action.payload 
            }; 
        case 'PAY':
            return {
                ...state,
                payment: action.payload 
            }; 
        case 'RESET':
            return {
                ...state,
                orderedDishes: [],
                orderSum: 0,
                delivery: null,
                payment: ""
            }; 
        default:
            return state;       
    }
}






export function OrderProvider(props){
    const [state, dispatch] = useReducer(orderReducer, 
        {orderedDishes: [], orderSum: 0, delivery: null , payment: ""})

    function addDish(dish){
        console.log("added one")
        dispatch({
            type: 'ADD_DISH',
            payload: dish
        })
    }

    function deleteDish(id){
        console.log("added one")
        dispatch({
            type: 'DELETE_DISH',
            payload: id
        })
    }

    function increaseDish(id){
        dispatch({
            type: 'INCREASE',
            payload: id
        })
    }

    function decreaseDish(id){
        dispatch({
            type: 'DECREASE',
            payload: id
        })
    }

    function setDelivery(booleanValue){
        dispatch({
            type: 'DELIVERY',
            payload: booleanValue
        })
    }

    function setPayment(payment){
        dispatch({ 
            type: 'PAY',
            payload: payment
        })
    }

    function reset(){
        dispatch({ 
            type: 'RESET'
        })
    }

    




    

    return (
        <OrderContext.Provider
            value={{orderedDishes: state.orderedDishes, 
                orderSum: state.orderSum, 
                delivery: state.delivery,
                payment: state.payment,
                addDish, deleteDish, increaseDish, decreaseDish, setDelivery, setPayment, reset}} 
            {...props} 
        />
    )
}




