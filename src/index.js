import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShowDrinks from './drinks/ShowDrinks';
import NewDrink from './drinks/NewDrink';
import ShoWWaiters from './waiters/ShowWaiters';
import ShowWaiters from './waiters/ShowWaiters';
import NewWaiter from './waiters/NewWaiter';
import ShowBracelets from './bracelets/ShowBracelets';
import NewBracelet from './bracelets/NewBracelet';
import ShowGuests from './guests/ShowGuests';
import NewGuest from './guests/NewGuest';
import Drink from './drinks/Drink';
import Waiter from './waiters/Waiter';
import Bracelet from './bracelets/Bracelet';
import Guest from './guests/Guest';
import DrinkEdit from './drinks/DrinkEdit';
import WaiterEdit from './waiters/WaiterEdit';
import BraceletEdit from './bracelets/BraceletEdit';
import GuestEdit from './guests/GuestEdit';
import WaiterWork from './waiters/WaiterWork';
import OverviewBracelets from './bracelets/OverviewBracelets';
import AvailableBracelets from './bracelets/AvailableBracelets';
import DrinksByWaiter from './waiters/DrinksByWaiter';
import AllDrinks from './waiters/AllDrinks';





const router = createBrowserRouter (
  [
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/drinks",
          element:<ShowDrinks/>,
          loader: async()=>{
            return fetch("http://localhost:8080/discoBracelet/drinks")
          }
        },
        {
          path:'/drinks/add_new_drink',
          element:<NewDrink/>
        }, 
        {
          path:"drinks/:id",
          element:<Drink/>,
          loader: async({params}) =>{
            return fetch(`http://localhost:8080/discoBracelet/drinks/${params.id}`);
          }
        },
        {
          path:'drinks/changeById/:id',
          element:<DrinkEdit/>,
          loader: async ({params})=>{
            return fetch(`http://localhost:8080/discoBracelet/drinks/${params.id}`);
          }
        },
        {
        path:"/waiters",
        element:<ShowWaiters/>,
        loader: async()=>{
          return fetch ("http://localhost:8080/discoBracelet/waiters")
        }
      },
      {
        path:"/waiters/add_new_waiter",
        element:<NewWaiter/>
      },
      {
        path:"waiters/:id",
        element:<Waiter/>,
        loader: async ({params}) =>{
          return fetch (`http://localhost:8080/discoBracelet/waiters/${params.id}`);
        }
      },
      {
        path:"waiters/changeById/:id",
        element:<WaiterEdit/>,
        loader: async ({params})=>{
          return fetch(`http://localhost:8080/discoBracelet/waiters/${params.id}`);
        }
      },
      {
        path:"assign_drinks/:waiterId",  // Nova putanja
        element:<WaiterWork/>,                    // Nova komponenta
        loader: async ({params}) => {
          return fetch(`http://localhost:8080/discoBracelet/waiters/${params.waiterId}`);
        }
      },
      {
        path:"/drinksByWaiter/:waiterId",
        element:<DrinksByWaiter/>
      },
      {
        path:"/drinksByWaiters",
        element:<AllDrinks/>
      },
      {
        path:"/bracelets",
        element:<ShowBracelets/>,
        loader: async()=>{
          return fetch ("http://localhost:8080/discoBracelet/bracelets")
        }
      },
      {
        path:"/bracelets/add_new_bracelet",
        element:<NewBracelet/>
      },
      {
        path:"bracelets/:id",
        element:<Bracelet/>,
        loader: async({params})=>{
          return fetch(`http://localhost:8080/discoBracelet/bracelets/${params.id}`);
        }
      },
      {
        path:"bracelets/changeById/:id",
        element:<BraceletEdit/>,
        loader: async({params})=>{
          return fetch (`http://localhost:8080/discoBracelet/bracelets/${params.id}`);
        }
      },
      {
        path:"overviewBracelets/:braceletId",
        element:<OverviewBracelets/>
      },
      {
        path:"/availableBracelets",
        element:<AvailableBracelets/>
      },
      {
        path:"/guests",
        element:<ShowGuests/>,
        loader: async()=>{
          return fetch("http://localhost:8080/discoBracelet/guests")
        }
      },
      {
        path:"/guests/add_new_guest",
        element:<NewGuest/>
      },
      {
        path:"guests/:id",
        element:<Guest/>,
        loader: async({params})=>{
          return fetch (`http://localhost:8080/discoBracelet/guests/${params.id}`);
        }
      },
      {
        path:"/guests/changeById/:id",
        element:<GuestEdit/>,
        loader: async({params})=>{
          return fetch(`http://localhost:8080/discoBracelet/guests/${params.id}`);
      }
    }
      ]
    }
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
