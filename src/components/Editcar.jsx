import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { updateCar } from "../carapi";

function Editcar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''
    });

    const handleClickOpen = () => {
        // console.log(props.car);
        setCar({
            brand: props.car.brand,
            model: props.car.model,
            color: props.car.color,
            fuel: props.car.fuel,
            modelYear: props.car.modelYear,
            price: props.car.price
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        updateCar(props.car._links.car.href, car)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error(err))
        handleClose();
    };

    return (
        <>
            <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen}>
                Edit Car
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Car</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Please modify the information below.
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

export default Editcar;