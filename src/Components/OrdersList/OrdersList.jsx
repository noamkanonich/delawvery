import React, { useState, useEffect } from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function OrdersList(props) {
    const orderListTheme = createTheme({
        components: {
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        width: "100%"
                    },
                    input: {
                        fontSize: "16px",
                        fontWeight: "bold",
                        fontFamily: "Rubik",
                    }
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        fontWeight: "bold",
                        fontFamily: "Rubik",
                        color: "black"
                    },
                    h6: {
                        fontSize: "20px",
                        fontWeight: "bold",
                        textAlign: "right",
                    },
                    cardBody: {
                        color: "gray",
                        fontSize: "14px",
                        marginTop: "30px"
                    },
                    p: {
                        fontSize: "16px"
                    }
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        display: "block",
                    },
                }
            },
            MuiGrid: {
                styleOverrides: {
                    root: {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "rgb(161, 161, 161)"
                    },
                }
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        padding: "2px"
                    },
                }
            },
            MuiCard: {
                root: {
                    border: "14px solid rgb(161, 161, 161)",
                    color: "red"
                },
            },
            MuiCardContent: {
                root: {
                    color: "rgb(161, 161, 161)",
                    border: "14px solid rgb(161, 161, 161)",
                    width: "80px",
                    textAlign: "right"
                },
            },
        },
    });

    return (
        <div className="listContainer">
            <ThemeProvider theme={orderListTheme}>
                <Box sx={{ textAlign: "center", margin: "auto auto", width: "150px", height: "100px" }}>
                    <Typography variant="h5" mb={2}>רשימת הזמנות</Typography>
                    <Typography variant="p" mb={2} sx={{ float: "left" }}>{props.orders.length}</Typography>
                    <Typography variant="p" mb={2} sx={{ float: "right" }}>מספר הזמנות:</Typography>
                </Box>
                {props.orders.map((order, index) => (
                    <div key={order.id}>
                        <Card
                            sx={{ m: "20px auto", width: "100%", borderRadius: 3 }}
                            variant="outlined"
                        >
                            <CardContent>
                                <Typography variant="h6" mb={2} gutterBottom>
                                    הזמנה {order.id}
                                    <Box sx={{ float: "left" }}>
                                        <ModeEditIcon color="action" sx={{ fontSize: 20 }} onClick={() => {
                                            props.editOrder(order)
                                        }} />
                                        <ClearIcon color="action" sx={{ fontSize: 20 }} onClick={() => props.deleteOrder(order.id)} />
                                    </Box>
                                </Typography>

                                <Typography variant="cardBody">
                                    <p style={{ margin: "2px 0px", fontSize: "16px", color: "black" }}><b>פרטים</b></p>
                                    <span>{order.firstName}, {order.lastName}</span><br />
                                    <span>{moment(order.date).format("DD/MM/YYYY")}</span>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))
                }
            </ThemeProvider>
        </div>
    )
}

export default OrdersList
