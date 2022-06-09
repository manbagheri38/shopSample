import { Button, Container, Divider, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InsertWare } from "../../api/Admin/Ware";
import { GetAllGroup } from "../../api/ApiGroup";


const st = makeStyles((theme) => (
    {
        container: {
            marginTop: theme.spacing(9),
            margin: theme.spacing(3)
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(3)
        },
        inputs: {
            margin: theme.spacing(2)
        },
        title:{
            textAlign:'center',
            padding:theme.spacing(3)
        }
    }
))

const Ware = () => {
    const classes = st();
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [groupId, setGroupId] = useState(0);
    const [discount, setDiscount] = useState('');
    const [parentGroupId, setParentGroupId] = useState(0)
    const [image, setImage] = useState('');
    const [groups, setGroups] = useState([]);
    const [parentGroups, setParentGroups] = useState([]);
    const [childGroups, setChildGroups] = useState([]);

    useEffect(() => {
        GetAllGroup().then((res) => {
            if (res.status === 200) {
                setGroups(res.data);
                const groupParents = res.data.filter((group) => {
                    return group.parentId == 0;
                })
                setParentGroups(groupParents);
            }
        })
    }, []);
    const handleChildGroup = (id) => {
        setParentGroupId(id);
        const childGroups1 = groups.filter((group) => {
            return group.parentId == id;
        })
        setChildGroups(childGroups1);
    }
    const SaveWare = () => {
        const ware = {
           
            "name": name,
            "code": code,
            "shortDescription": shortDescription,
            "description": description,
            "price": price,
            "discount": discount,
            "groupParentId": parentGroupId,
            "groupId": groupId,
            "image": image
        }
        InsertWare(ware).then((res) => {
            if (res.status === 201) {
                alert("کالا با موفقیت ثبت گردید");
                resetForm('');
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }
    const resetForm = () => {
        setName('');
        setCode('');
        setShortDescription('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setImage('');
        setParentGroupId('');
        setGroupId('');

    }
    return (
        <Container className={classes.container}>

            <Paper className={classes.paper}>
                <Link to={"/warelist"} >لیست کالاها</Link>
                <div className={classes.title} >
                    <Typography variant="h5" color="secondary">اضافه کردن کالای جدید</Typography>
                    <Divider />
                </div>
                <TextField className={classes.inputs} label="نام کالا" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} />
                <TextField className={classes.inputs} label="کد کالا" variant="outlined" value={code} onChange={(e) => { setCode(e.target.value) }} />
                <TextField className={classes.inputs} label="توضیحات کوتاه" variant="outlined" value={shortDescription} onChange={(e) => { setShortDescription(e.target.value) }} />
                <TextField className={classes.inputs} label="توضیحات" variant="outlined" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                <TextField className={classes.inputs} label="قیمت" variant="outlined" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                <TextField className={classes.inputs} label="تخفیف " variant="outlined" value={discount} onChange={(e) => { setDiscount(e.target.value) }} />
                <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">گروه مادر</InputLabel>
                    <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select1"
                        value={parentGroupId}
                        label="گروه مادر"
                        onChange={(e) => { handleChildGroup(e.target.value) }}
                    >
                        {parentGroups && parentGroups.map((group) => {
                            return <MenuItem value={group.id}>{group.groupName}</MenuItem>
                        })

                        }


                    </Select>
                </FormControl>
                <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select2"
                        value={groupId}
                        label="Age"
                        onChange={(e) => { setGroupId(e.target.value) }}
                    >
                        {childGroups && childGroups.map((group) => {
                            return <MenuItem value={group.id}>{group.groupName}</MenuItem>
                        })

                        }


                    </Select>
                </FormControl>
                <TextField type="file" label=" تصویر کالا" variant="outlined" value={image} onChange={(e) => { setImage(e.target.value) }} />
                <Button className={classes.inputs} variant="contained" color="primary" onClick={SaveWare}>ذخیره</Button>
            </Paper>

           
        </Container>

    )
}

export default Ware;