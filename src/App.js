import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import AddOrder from "./Components/Forms/AddOrder";
import EditOrder from "./Components/Forms/EditOrder";
import OrdersList from "./Components/OrdersList/OrdersList";
import { Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const mainTheme = createTheme({
    components: {
      MuiGrid: {
        styleOverrides: {
          root: {
            width: "100%",
          },
          item: {
            padding: "30px",
          },
        },
      },
    },
  });


  // Data
  const initialFormState = { id: null, firstName: "", lastName: "", date: "" };

  // Setting state
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("orders")) {
      setOrders(JSON.parse(localStorage.getItem("orders")));
    }
  }, []);

  // Overwrites local storage whenever orders state changes
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function addOrder(order) {
    order.id = orders.length + 1;
    setOrders([...orders, order]);
  }

  function deleteOrder(id) {
    setEditing(false);
    const newOrders = orders.filter((order) => {
      return order.id !== id;
    });

    const updatedNewOrders = newOrders.map((order, index) => {
      order.id = index + 1;
      return order;
    });

    setOrders(updatedNewOrders);
  }

  function updateOrder(id, updateOrder) {
    setEditing(false);
    setOrders(orders.map((order) => (order.id === id ? updateOrder : order)));
  }

  const editOrder = (order) => {
    setEditing(true);

    setCurrentOrder({
      id: order.id,
      firstName: order.firstName,
      lastName: order.lastName,
      date: order.date,
    });
  };

  return (
    <div className="App">
      <Header />
      <ThemeProvider theme={mainTheme}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xl={3} md={4} sm={12} xs={12}>
            <OrdersList
              orders={orders}
              editOrder={editOrder}
              isEdited={editing}
              deleteOrder={deleteOrder}
            />
          </Grid>
          <Grid item xl={6} md={8} sm={12} xs={12}>
            {editing ? (
              <Fragment>
                <EditOrder
                  editing={editing}
                  setEditing={setEditing}
                  currentOrder={currentOrder}
                  updateOrder={updateOrder}
                />
              </Fragment>
            ) : (
              <Fragment>
                <AddOrder addOrder={addOrder} />
              </Fragment>
            )}
          </Grid>
          <Grid item xl={3}></Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
