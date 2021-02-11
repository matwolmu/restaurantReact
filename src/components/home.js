import { useHistory, useLocation,  } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import React, {useContext, useState, useEffect} from 'react';
import {OrderContext} from '../context/order';
import {AuthContext} from '../context/auth';
import {GET_DISHES_QUERY} from '../gql_queries/index';
import Basket from './basket';
import Dish_public from './dish_public';
import headerImage from '../headerImage.jpg';
import headerImageSMALL from '../headerImageSMALL.jpg';



import Badge from '@material-ui/core/Badge';
import ShoppingCartSharp from '@material-ui/icons/ShoppingCartSharp';
import ArrowUpwardSharp from '@material-ui/icons/ArrowUpwardSharp';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));







function Home (){
    const classes = useStyles();
    const order_ontext = useContext(OrderContext)
    const { loading, error, data } = useQuery(GET_DISHES_QUERY);
    
    const [scrolledToBottom, setScrolledToBottom] = React.useState(false);
    const [uniqueCategories, setUniqueCategories] = useState([])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
   //     window.onscroll = () => {
   //         handleScroll()
   //     }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      useEffect(() => {
        if(data){
            const uniqueCats = [...new Set(data.getDishes.map(dish => {
                if(dish.availible){
                  return dish.category  
                }
            }))]
            setUniqueCategories(uniqueCats)
        }
    }, [data]);




    const scrollOnBasketButtonClick = () => {
        console.log(scrolledToBottom)
        const floatingButton = document.getElementById('floatingButton')
        if(scrolledToBottom){
            document.getElementById('navbar').scrollIntoView()
            setScrolledToBottom(false)
        } else {
            document.getElementById('basket').scrollIntoView()
            floatingButton.classList.add('floatingButton_Bottom');
            floatingButton.classList.remove('floatingButton_TOP');
            setScrolledToBottom(true)
        }
    }

    const handleScroll = () => {
        const totalPageHeight = document.body.scrollHeight; 
        const scrollPoint = window.scrollY + window.innerHeight;
        const floatingButton = document.getElementById('floatingButton')
        if(scrollPoint >= totalPageHeight){
            floatingButton && floatingButton.classList.add('floatingButton_TOP');
            floatingButton && floatingButton.classList.remove('floatingButton_Bottom');
            setScrolledToBottom(true)
        } else {
            floatingButton && floatingButton.classList.add('floatingButton_Bottom');
            floatingButton && floatingButton.classList.remove('floatingButton_TOP');
            setScrolledToBottom(false)
        }
    }
    


    const dishesByCategory = data && uniqueCategories.map(uniqueCategory => {
        return { 
            category: uniqueCategory,
            dishes: data.getDishes.filter( dish => {
                         return dish.category === uniqueCategory
                        })
            }
    })
    console.log(dishesByCategory)

    let dishes
    if(loading){
        dishes =  <div className={classes.root}>
                    <CircularProgress />
                </div>
    } else if(data){
        dishes = dishesByCategory ? uniqueCategories.map(category => {
            const dishesOfCategory = dishesByCategory.find(o => o.category === category)
            return (<div id={category} className="card">
                        <h5 className="green-text lighten-4">
                            {category}
                        </h5>
                        <div className=" ">
                            {dishesOfCategory.dishes.map(dish => {
                                if(dish.availible){
                                    return <Dish_public key={dish.id} dish={dish}/>
                            }
                            })}
                        </div>
                        <div class="divider"></div>
                    </div>)
            
        }) : <p>no dishes</p>
    } 


    let basketButton;
    if(!scrolledToBottom){
        basketButton = (
            <Badge badgeContent={order_ontext.orderedDishes.length} color="primary">
                <ShoppingCartSharp />
            </Badge>)
    } else {
        basketButton = (
            <Badge  color="primary">
                <ArrowUpwardSharp />
            </Badge>)
    }

    const categoryMenuItems = uniqueCategories.map(cat => {
        return <a href={"#" + cat} className="categoryMenuItem white-text text-lighten-4">{cat}</a>
    })
    

    

    return (

        <div>
            <img src={headerImage} alt="Logo" width="100%" height="200px" className="hide-on-small-only"/>
            <img src={headerImageSMALL} alt="Logo" width="100%" height="100px"  className="hide-on-med-and-up"/>

            <div className="row container" >
            <div id="categoryMenu" className="green lighten-3">
                {categoryMenuItems}
                </div>
            <div className="card" style={{margin: "5px"}}>
                 
                    
                <div className="menu col s12 m8" >
                    <div className="">
                        {dishes}
                    </div>
                </div>
            </div>
            



            <div id="basket" className="basket col s12 m4">
                    <Basket />
            </div>

            <div className="hide-on-med-and-up">
                <a id="floatingButton"
                    className="btn-floating btn-large waves-effect waves-light red floatingButton_Bottom"
                    onClick={() => scrollOnBasketButtonClick()}
                    
                    >
                    {basketButton}
                </a>
            </div>
        </div>

        </div>

        
      );
}


export default Home;