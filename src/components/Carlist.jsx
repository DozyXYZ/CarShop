import { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from '@mui/material/Button';

import Addcar from "./Addcar";
import Editcar from "./Editcar";

function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchCars(), []);

    const fetchCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error("Error fetching data: ", err));
    };

    const deleteCar = (url) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchCars(); // Refresh the data after deletion
                    } else {
                        alert('Something went wrong');
                    }
                })
                .catch(error => {
                    console.error('Error deleting car:', error);
                    alert('An error occurred while trying to delete the car.');
                })
        }
    };

    const saveCar = (newCar) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCar),
        })
            .then(response => {
                if (response.ok) {
                    fetchCars(); // Refresh the data after adding a new car
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
                    fetchCars(); // Refresh the data after updating the car
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
        { headerName: "Brand", field: "brand", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Model", field: "model", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Color", field: "color", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Fuel", field: "fuel", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Year", field: "modelYear", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Price", field: "price", sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "",
            field: "_links.self.href",
            cellRenderer: (params) =>
                <Editcar
                    car={params.data}
                    updateCar={updateCar}
                />
        },
        {
            headerName: "",
            field: "_links.self.href",
            cellRenderer: (params) =>
                <Button
                    onClick={() => deleteCar(params.data._links.self.href)}
                    variant="contained"
                    color="error"
                >Delete
                </Button>
        }
    ];

    return (
        <>
            <div className="ag-theme-material" style={{ width: 1600, height: 700 }}>
                <Addcar saveCar={saveCar} />

                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    floatingFilter={true}
                />

            </div>
        </>
    );
};

export default Carlist;