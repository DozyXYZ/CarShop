import './App.css';
import Carlist from './components/Carlist';
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {

  return (
    <>
      <div className="App">
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6">
              Car Shop
            </Typography>
          </Toolbar>
        </AppBar>
        <Carlist />
      </div>
    </>
  )
}

export default App;