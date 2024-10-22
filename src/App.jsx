import Carlist from './components/Carlist';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from "@mui/material";

function App() {

  return (
    <>
      <Container maxWidth="xxl">

        <AppBar position="static" style={{ marginBottom: "20px" }}>
          <Toolbar>
            <Typography variant="h6">
              Car Shop
            </Typography>
          </Toolbar>
        </AppBar>

        <Carlist />

        <CssBaseline />

      </Container>
    </>
  )
}

export default App;
