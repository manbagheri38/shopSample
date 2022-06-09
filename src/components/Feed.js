import { Card, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { Contacts } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllWare } from "../api/ApiWare";

import { setAllWare, useContactDispatch, useContactState } from "../Contaxt/WareContaxt";
import avatar from "../Images/avatar.png"

const st = makeStyles((theme) => (
  {
    item: {

      margin: theme.spacing(1),

    },
    media: {
      width: 250,
      height: 250,

      [theme.breakpoints.down('sm')]: {
        width: 100,
        height: 100,
        fontSize: "6px"
      }
    }

  }
))

const Feed = () => {
  const classes = st();
 
  const {wareList} = useContactState();
  const wareDispatch = useContactDispatch();
  useEffect(() => {
    GetAllWare().then((res) => {
      if (res.status === 200) {
       
        setAllWare(wareDispatch,res.data);
      }

    }).catch((error) => {
      console.log(error)
    })
  }, []);




  return (
    <Container >
      <Grid container>
        {wareList && wareList.length>0 &&
          wareList.map((ware) => {

            return <Grid item xs={5} sm={3} className={classes.item}>
              <Card className={classes.card} >
                <Link to={"/showware/" + ware.id} >
                  <CardMedia className={classes.media} component="img" image={ ware.image} />
                  <CardContent>
                    <Typography>
                      {ware.name}
                    </Typography>
                   
                    <Typography>
                      {ware.shortDescription}
                    </Typography>
                    <Typography>
                      {ware.price}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>

          })
        }
      </Grid>
    </Container>

  );
}

export default Feed;
