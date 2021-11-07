import React, { useState, useEffect } from 'react'
import { TextField, InputLabel, Button, Grid, Typography } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function EditOrderForm(props) {
    const editOrderFormTheme = createTheme({
        components: {
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        width: "100%",

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
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontSize: "15px",
                        fontWeight: "bold",
                        fontFamily: "Rubik",
                        color: "rgb(161, 161, 161)",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: "gray",
                        padding: "14px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        fontFamily: "Rubik",
                        "&:hover": {
                            backgroundColor: "gray"
                        }
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        display: "block",
                        '& label.Mui-focused': {
                            color: 'rgb(161, 161, 161)',
                            border: "2px solid rgb(161, 161, 161)",
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'rgb(161, 161, 161)',
                            border: "2px solid rgb(161, 161, 161)",
                            borderRadius: "8px",
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgb(161, 161, 161)',
                                border: "2px solid rgb(161, 161, 161)",
                                borderRadius: "8px",
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgb(161, 161, 161)',
                                border: "2px solid rgb(161, 161, 161)",
                                borderRadius: "8px",
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(161, 161, 161)',
                                border: "2px solid rgb(161, 161, 161)",
                                borderRadius: "8px",
                            },
                        },
                    },
                }
            },
        },
    });

    const [order, setOrder] = useState(props.currentOrder)
    const [selectedDate, setSelectedDate] = useState(props.currentOrder.date);

    useEffect(
        () => {
            setOrder(props.currentOrder)
        },
        [props]
    )

    function handleInputChange(event) {
        const { name, value } = event.target
        setOrder({ ...order, [name]: value })
    }

    function handleDateChange(date) {
        setSelectedDate(date)
    }

    function submitUpdatedOrder(event) {
        event.preventDefault()
        order.date = selectedDate
        props.updateOrder(order.id, order)
    }

    return (
        <div className="formContainer">
            <form>
                <ThemeProvider theme={editOrderFormTheme}>
                    <Typography variant="h4" mb={4}>הזמנה {props.currentOrder.id}</Typography>
                    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Grid item xl={6} md={6} xs={12}>
                            <InputLabel>
                                שם פרטי
                            </InputLabel>
                            <TextField id="outlined-basic" name="firstName" variant="outlined" margin="noraml" fullWidth onChange={handleInputChange} value={order.firstName} />
                        </Grid>
                        <Grid item xl={6} md={6} xs={12}>
                            <InputLabel>
                                שם משפחה
                            </InputLabel>
                            <TextField id="outlined-basic" name="lastName" variant="outlined" margin="noraml" fullWidth onChange={handleInputChange} value={order.lastName} />

                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <InputLabel>
                                תאריך
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yy"
                                    id="data-picker"
                                    name="date"
                                    margin="normal"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                        </Grid>
                        <Grid item xl={6} md={6} xs={12}>
                            <Button onClick={submitUpdatedOrder} fullWidth variant="contained">עדכון</Button>
                        </Grid>
                        <Grid item xl={6} md={6} xs={12}>
                            <Button onClick={() => props.setEditing(false)} fullWidth variant="contained">ביטול</Button>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </form>
        </div>
    )
}

export default EditOrderForm
