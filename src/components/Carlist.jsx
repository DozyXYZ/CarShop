import { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { fetchCars, deleteCar } from "../carapi";

import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";

import Addcar from "./Addcar";
import Editcar from "./Editcar";

function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    // it calls fetchCars() when the component is rendered
    // the empty array as the second argument means that the effect will only run once
    useEffect(() => { handleFetch() }, []);

    const handleFetch = () => {
        fetchCars()
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error("Error fetching data: ", err));
    };

    // use the snackbar to show a message when a car is deleted through the setOpen(true) state
    const handleDelete = (url) => {
        if (window.confirm('Are you sure you want to delete the car?')) {
            deleteCar(url)
                .then(() => {
                    handleFetch()
                    setOpen(true)
                })
                .catch(error => {
                    console.error('Error deleting car:', error);
                    alert('An error occurred while trying to delete the car.');
                })
        }
    };

    const saveCar = (newCar) => {
        fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCar),
        })
            .then(response => {
                if (response.ok) {
                    handleFetch(); // Refresh the data after adding a new car
                } else {
                    alert('Something went wrong');
                }
            })
            .catch(error => {
                console.error('Error adding car:', error);
                alert('An error occurred while trying to add a new car.');
            })
    };

    const updateCar = (car, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        })
            .then(response => {
                if (response.ok) {
                    handleFetch(); // Refresh the data after updating the car
                } else {
                    alert('Something went wrong');
                }
            })
            .catch(error => {
                console.error('Error updating car:', error);
                alert('An error occurred while trying to update the car.');
            })
    };

    const columns = [
        { field: "brand", sortable: true, filter: true, floatingFilter: true },
        { field: "model", sortable: true, filter: true, floatingFilter: true },
        { field: "color", sortable: true, filter: true, floatingFilter: true, width: 150 },
        { field: "fuel", sortable: true, filter: true, floatingFilter: true, width: 150 },
        { headerName: "Year", field: "modelYear", sortable: true, filter: true, floatingFilter: true, width: 120 },
        { field: "price", sortable: true, filter: true, floatingFilter: true, width: 150 },
        {
            width: 150,
            cellRenderer: (params) =>
                <Editcar
                    car={params.data}
                    updateCar={updateCar}
                />
        },
        {
            width: 150,
            cellRenderer: (params) =>
                <Button
                    onClick={() => handleDelete(params.data._links.self.href)}
                    variant="contained"
                    color="error"
                    size="small"
                >Delete
                </Button>
        }
    ];

    return (
        <>
            <div className="ag-theme-material" style={{ width: "1400px", height: "700px" }}>
                <Addcar saveCar={saveCar} />

                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    // paginationPageSize={10}
                    paginationAutoPageSize={true} // automatically adjusts the number of rows to fit the available space
                    // paginationPageSizeSelector={[10, 20, 50, 100]}
                    floatingFilter={true}
                />

                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Car deleted successfully"
                />

            </div>
        </>
    );
};

export default Carlist;