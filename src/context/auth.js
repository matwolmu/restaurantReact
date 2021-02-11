import React, {useReducer, createContext } from 'react';


export const AuthContext = createContext({
    user: null,
    activeMenuItem: null,
    login: (userData) => {},
    logout: () => {},
    setActiveMenuItem: (activeItem) => {}
})



function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        case 'ACTIVE':
            return{
                ...state,
                activeMenuItem: action.payload
            }
        default:
            return state;       
    }
}


export function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, {user: null, activeMenuItem: null})

    function login(userData){
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }
    function logout(){
        dispatch({
            type: 'LOGOUT'
        })
    }

    function setActiveMenuItem(activeItem){
        dispatch({
            type: 'ACTIVE',
            payload: activeItem
        })
    }



    



    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                activeMenuItem: state.activeMenuItem, 
                login, logout, setActiveMenuItem }} 
            {...props} 
        />
    )
}




