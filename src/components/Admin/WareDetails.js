import { Button, Container, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWareDetailById } from "../../api/Admin/Ware";



const st = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(9),


    },
    item: {
        margin: theme.spacing(3)
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto'
    },
    table: {
        textAlign: 'right'
    }
}))


const WareDetails = () => {
    const { wareId } = useParams();

    const classes = st();
    const [details, setDetails] = useState([]);
    const [value, setValue] = useState('');
    const [text, setText] = useState('');
    const [wId, setWid] = useState(0);
    const [dId, setDid] = useState();

    useEffect(() => {
        getWareDetailById(wareId).then((res) => {
            if (res.status === 200) {
                setDetails(res.data);
            }
        })
    }, []);

    const deleteDetail = (id) => {
        const wareDetailNew = details.filter((ware) => {
            return ware.id !== id
        });
        setDetails(wareDetailNew);
    }

    const handelDetails = () => {

        if (wId > 0) {

            var detailIndex = details.findIndex((detail) => {
                return detail.id === dId;
            })

            setDetails(
                [...details.slice(0, detailIndex), {
                    ...details[detailIndex],
                    "text" : text,
                    "value" : value,
                    "id" : dId,
                    "wareId" : wId,
                },...details.slice(detailIndex+1)]
            );
            setValue('');
        setText('');
        setWid(0);
        setDid(0);
            return;

        }
        const wareDetail = {
            "id": Math.floor(Math.random() * 10000),
            "wareId": wareId,
            "value": value,
            "text": text
        }

        setDetails([...details, wareDetail]);
        setValue('');
        setText('');
        
    }
    const EditDetail = (id) => {
        var detailIndex = details.findIndex((detail) => {
            return detail.id === id;
        })
        setValue(details[detailIndex].value);
        setText(details[detailIndex].text);
        setWid(details[detailIndex].wareId);
        setDid(id);

    }
    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <TextField label="نام جزئیات" className={classes.item} variant="outlined" value={value} onChange={(e) => { setValue(e.target.value) }} />
                <TextField label="مقدار" className={classes.item} variant="outlined" value={text} onChange={(e) => { setText(e.target.value) }} />
                <Button variant="contained" className={classes.item} color='primary' onClick={handelDetails}>ذخیره</Button>
            </Paper>
            <Paper className={classes.container}>
                <Table className={classes.table}>
                    <TableHead >
                        <TableRow>
                            <TableCell>نام</TableCell>
                            <TableCell>مقدار</TableCell>
                            <TableCell>عملیات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.map((detail) => {
                            return <TableRow>
                                <TableCell>{detail.value}</TableCell>
                                <TableCell>{detail.text}</TableCell>
                                <TableCell>
                                    <Button startIcon={<Delete />} color="secondary" onClick={() => { deleteDetail(detail.id) }}></Button>
                                    <Button startIcon={<Edit />} color="primary" onClick={() => { EditDetail(detail.id) }}></Button>
                                </TableCell>
                            </TableRow>

                        })}
                    </TableBody>

                </Table>

                <Button variant="contained" color="secondary" className={classes.item}>ذخیره</Button>
            </Paper>
        </Container>
    )
}

export default WareDetails;