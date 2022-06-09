import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllWare } from "../../api/ApiWare";


const st = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(9)
    }
}))

const WareList = () => {
    const classes = st();
    const [wares, setWears] = useState([]);

    useEffect(() => {
        GetAllWare().then((res) => {
            if (res.status === 200) {
                setWears(res.data)
            }
        })
    }, [])
    return (
        <div className={classes.container}>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                نام کالا
                            </TableCell>
                            <TableCell>
                                کد کالا
                            </TableCell>
                            <TableCell>
                                قیمت کالا
                            </TableCell>
                            <TableCell>
                                عملیات
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wares.map((ware) => {
                            return <TableRow>
                                <TableCell>{ware.name}</TableCell>
                                <TableCell>{ware.code}</TableCell>
                                <TableCell>{ware.price}</TableCell>
                                <TableCell>
                                    <Link to={'/waredetails/' + ware.id}>
                                        <Button variant="contained" color="secondary">جزئیات کلا</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        })

                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

export default WareList;