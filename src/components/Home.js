import {  Container, Grid, makeStyles } from "@material-ui/core";
import Feed from "./Feed";

import Navbar from "./Navbar";
import RightBar from "./RightBar";

const st = makeStyles((theme) => (
  {
    container:{
        marginTop:theme.spacing(9)
    }
   
  }
))

const Home = () => {
  const classes=st();
  return (
    <Container  >
      
     <Grid container className={classes.container}>
       <Grid item xs={3}>
        <RightBar />
       </Grid>
       <Grid item xs={9}>
        <Feed />
       </Grid>
      
     </Grid>
    </Container>

  );
}

export default Home;
