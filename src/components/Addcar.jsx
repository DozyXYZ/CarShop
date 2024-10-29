import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { saveCar } from "../carapi";

function Addcar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        saveCar(car)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.log(err))
    };

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Button style={{ margin: 10 }} variant="contained" color="success" onClick={handleClickOpen}>
                Add Car
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New Car</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Please fill in the form below to add a new car.
                    </DialogContentText>

                    <TextField
                        required
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => handleInputChange(e)}
                        label="Brand"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        required
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={e => handleInputChange(e)}
                        label="Model"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        required
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={e => handleInputChange(e)}
                        label="Color"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        required
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => handleInputChange(e)}
                        label="Fuel"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        required
                        margin="dense"
                        name="modelYear"
                        value={car.modelYear}
                        onChange={e => handleInputChange(e)}
                        label="Model Year"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        required
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={e => handleInputChange(e)}
                        label="Price"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default Addcar;