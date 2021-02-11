import {useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {LOGIN_MUTATION} from '../gql_queries/index';
import { useHistory, useLocation } from "react-router-dom";
import {AuthContext} from '../context/auth';






function Login () {
  const history = useHistory();
  const context = useContext(AuthContext)
  const [loginData, setLoginData] = useState({
    userName: "admin",
    pw: "admin"
  });
  
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: loginData,
    onCompleted: ({ login }) => {
      if(login.msg === "OK"){
        localStorage.setItem('jwt', login.token);
        context.login(login)
        history.push('/management')
      }else{
        console.log("login failed")  
        console.log(login)
      }
    }
  });




  
function handleFormChange(e){
  if(e.target.name === "userName" || e.target.name === "pw"){
    setLoginData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
  }));
  } else {
    console.log("hrmpf")
  }
}

function handleSubmit(e){
  e.preventDefault();
  login()
}




  return (
    <div className="container">
      <h1>Login</h1>
 
      <form onChange={handleFormChange} onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="userName" value={loginData.userName}/>
      </label>
      <label>
        Name:
        <input type="password" name="pw" value="admin"/>
      </label>
      <div class="card-action wrapToCenter" >
          <button type="submit" className="waves-effect waves-light btn">Submit</button>
      </div>
    </form>

    </div>


      
  );

};
 

export default Login;










/*
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
   //      } else if (
   //        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    //     ) {
           errors.email = 'Invalid email address';
         }
         if (!values.password) {
            errors.password = 'Required';
          } 
         
         return errors;
       }}

       onSubmit={(values, { setSubmitting }) => {
        console.log(loginData);
        lazy_login()       
       }}
     >
       {({ isSubmitting }) => (


<div className="row">
         <Form className="col 6"  onChange={handleFormChange}>
           <Field type="email" name="userName" placeholder="email"/>
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="pw" placeholder="password"/>
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting} className="waves-effect waves-light btn">
             Submit
           </button>
         </Form>
</div>


       )}
     </Formik>
*/

