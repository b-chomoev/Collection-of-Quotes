import NavBar from "./components/NavBar/NavBar";
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import MutateQuote from "./pages/MutateQuote/MutateQuote";
import AllQuotes from "../src/pages/AllQuotes/AllQuotes";
import CategoryQuotes from "./pages/CategoryQuotes/CategoryQuotes";

const App = () => {

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Container component='main'>
        <Routes>
          <Route path='/' element={<AllQuotes />} />
          <Route path='/quotes/:category' element={<CategoryQuotes />} />
          <Route path='/new-quote' element={<MutateQuote />} />
          <Route path='/quotes/:id/edit' element={<MutateQuote />} />
          <Route path='*' element={<Typography variant='h2'>Not Found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App
