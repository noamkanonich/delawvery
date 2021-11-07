import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Order from "./Components/Order/Order"
import AddOrder from "./Components/Forms/AddOrder"
// import EditOrder from "../src/Components/Forms/EditOrder";
// import OrderList from "../src/Components/OrderList/OrderList";
import { Grid } from "@mui/material";


function App() {
  const styles = {
    // borderRight: '1px solid',
    textAlign: "right",
  };

  const [orders, setOrders] = useState('');
  const [edit, setEdit] = useState(false)

    function addOrder(newOrder) {
    setOrders((prevOrders) => {
      return [...prevOrders, newOrder];
    });
  }

  function editOrder() {
    setEdit(!edit)
    console.log(edit)
    // setOrders((prevOrders) => {
    //   return prevOrders.filter((orderItem, index) => {
    //     return index !== id;
    //   });
    // });
  }

  function deleteOrder(id) {
    setOrders((prevOrders) => {
      return prevOrders.filter((orderItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="App">
      <Header />
      <Grid container spacing={2} justifyContent="center"  >
        <Grid item xl={2} xs={12} className="list">
          {/* <OrderList /> */}
         
        <div className="container">
          <div className="listHeader">
            <h2>רשימת הזמנות</h2>
            <p>מספר הזמנות: {orders.length}</p>
          </div>
          
            {/* {orders.map((orderItem, index) => {
              return (
                <Order
                    key={index}
                    id={index}
                    firstName={orderItem.firstName}
                    lastName={orderItem.lastName}
                    date={orderItem.date}
                    onEdit={editOrder}
                    onDelete={deleteOrder}
                />
              );
          })} */}
        </div>

        </Grid>
        <Grid item xl={4} xs={12} style={styles}>
          <AddOrder onAdd={addOrder} edit={edit} />
      
        {
          edit ? (
            <h1>AAAA</h1>
          ) : (
            <h1>BBBB</h1>
          )
        } 

        </Grid>
        <Grid item xs={6} style={styles}>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
