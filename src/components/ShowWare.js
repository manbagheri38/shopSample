import { Card, CardContent, CardMedia, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWareById } from "../api/ApiWare";

import avatar from "../Images/avatar.png";


const st = makeStyles((theme) => (
    {
        container: {
            marginTop: theme.spacing(9),

        },
        card: {

        },
        media: {
            width: 300,
            height: 300
        }
    }
))

const ShowWare = () => {
    const classes = st();
    const [ware, setWare] = useState();
    const params = useParams();

    useEffect(() => {
        getWareById(params.id).then((res) => {
            if (res.status === 200) {
                setWare(res.data)
                console.log(res);
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <Paper className={classes.container}>
            {ware && <Grid container>
                <Grid item sm={4}>
                    <Card>
                        <CardMedia image={ware.image} component="img"  alt={ware.fullname} />
                    </Card>
                </Grid>
                <Grid item sm={7}>
                    <Paper>
                        <Typography>نام کالا :</Typography>
                        <Typography>{ware.name}</Typography>
                    </Paper>

                </Grid>

            </Grid>
            }


        </Paper>

    )
}

export default ShowWare;