import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import Login from './components/login';
import Navbar from './components/navbar';
import Test from './components/test';
import Home from './components/home';
import Footer from './components/footer';

import Management from './components/management';
import AddDish from './components/addDish';
import Stats from './components/stats';
import About from './components/about';


import Checkout from './components/checkout';
import Finished from './components/finished';


import jwtDecode from "jwt-decode";
import {AuthProvider} from './context/auth';
import {OrderProvider} from './context/order';


  function App() {

    if(localStorage.getItem('jwt')){
      console.log("TOKEN:")
      const token = jwtDecode(localStorage.getItem('jwt'))
      console.log(token)
    }



    const client = new ApolloClient({
  //    uri: 'http://localhost:5000/graphql',
      uri: 'https://restaurant-backend-js.herokuapp.com/graphql',
      cache: new InMemoryCache()
    });





  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <OrderProvider>

          <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch>
                  <main>
                    <Route path="/" component={Home} exact />
                    <Route path="/login" component={Login}  />

                    <Route path="/management" component={Management} />
                    <Route path="/addDish" component={AddDish} />
                    <Route path="/stats" component={Stats} />
                    
                    
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/finished" component={Finished} />

                    <Route path="/about" component={About} />

                  </main>
                </Switch>
            </div>
          </BrowserRouter>

        </OrderProvider>
      </AuthProvider>
    </ApolloProvider>
    
  );
}

export default App;
