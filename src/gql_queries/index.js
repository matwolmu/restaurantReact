//import { gql } from '@apollo/client';

import { gql } from 'apollo-boost'

export const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $userName: String!
    $pw: String!
  ) {
    login(userName: $userName, pw: $pw){
      id
      token 
      exp
      msg
    }
  }
`;


export const ADD_DISH_MUTATION = gql`
  mutation AddDish(
    $name: String
    $description: String
    $price: Float
    $availible: Boolean
    $allergies: String
    $category: String
  ){
    addDish(dish:
      {name: $name,
      description: $description,
      price: $price, 
      availible: $availible, 
      allergies: $allergies,
      category: $category}
    )
  }
`;


export const GET_DISHES_QUERY = gql`
    query fdgh{
      getDishes {
        id,
        name,
        description,
        price,
        availible,
        allergies,
        category
      }
    }
`;

export const GET_STATS_MUTATION = gql`
mutation GS($dateString: String)
{getStats(dateString: $dateString)}
`;




export const DELETE_DISH_MUTATION = gql`
  mutation DeleteDish($id: String!) {
    deleteDish(id: $id)
  }
`;

export const GET_CUSTOMER_INFO_MUTATION = gql`
  mutation GetCustomerInfo($id: String) {
    getCustomerInfo(id: $id){
      favDish,
      favPayment,
      favDelivery,
      totalSum
    }
  }
`;


export const CHANGE_DISH_MUTATION = gql`
  mutation ChangeDish(
    $id: String
    $name: String
    $description: String
    $price: Float
    $availible: Boolean
    $allergies: String
    $category: String
  ){
    changeDish(dish:
      {
      id: $id,
      name: $name,
      description: $description,
      price: $price, 
      availible: $availible, 
      allergies: $allergies,
      category: $category
    }
    )
  }
`;



export const SEND_ORDER_MUTATION = gql`
  mutation Order(
    $dishes: [String]
    $delivery: Boolean
    $payment: String
    $sum: Float
    $name: String
    $email: String
    $phone: String
    $address: String
  )
  {
    order(orderData:
      {
      dishes: $dishes,
      delivery: $delivery,
      payment: $payment,
      sum: $sum, 
      name: $name, 
      email: $email,
      phone: $phone,
      address: $address
      }
    )
  }


`;

