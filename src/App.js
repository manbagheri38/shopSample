import { Grid, makeStyles } from "@material-ui/core";
import Navbar from "./components/Navbar";
import RightBar from "./components/RightBar";
import Feed from "./components/Feed";
import Leftbar from "./components/LeftBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ShowWare from "./components/ShowWare";
import { ContactProvider } from "./Contaxt/WareContaxt";
import WareGroup from "./components/Admin/WareGroup";
import Ware from "./components/Admin/Ware";
import WareDetails from "./components/Admin/WareDetails";
import WareList from "./components/Admin/WareList";

const st = makeStyles((theme) => (
  {

    container: {
      marginTop: theme.spacing(8)
    }

  }
))

function App() {
  const classes = st();
  return (
    <div >
         <Navbar className={classes.navbar} />
      <ContactProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/showWare/:id'} element={<ShowWare />} />
            <Route path={'/group'} element={<WareGroup />} />
            <Route path={'/ware'} element={<Ware />} />
            <Route path={'/waredetails/:id'} element={<WareDetails />} />
            <Route path={'/wareList'} element={<WareList />} />
          </Routes>
        </BrowserRouter>
      </ContactProvider>
    </div>

  );
}

export default App;
