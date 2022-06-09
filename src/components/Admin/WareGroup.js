import { Button, Container, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllParentGroup, InsertGroup } from "../../api/Admin/ApiWareGroup";

const st = makeStyles((theme) => (
    {
        container: {
            marginTop: theme.spacing(9),
            margin: theme.spacing(2)
        },
        paper: {
            padding: theme.spacing(3)
        }
    }
))

const WareGroup = () => {
    const classes = st()
    const [groupName, setGroupName] = useState('');
    const [parentId, setParentId] = useState(0);
    const [parents, setParents] = useState([]);
    useEffect(() => {
        getAllParentGroup().then((res) => {
            if (res.status === 200) {
                const parents = res.data.filter((group) => {
                    return group.parentId == 0;
                });
                setParents(parents);

            }
        }).catch((err) => {
            console.log(err.message);
        })
    }, [groupName])
    const saveGroup = () => {
        validateForm();
        const group = {
            id: Math.floor(Math.random() * 1000),
            groupName: groupName,
            parentId: parentId

        }
        InsertGroup(group).then((res) => {
            if (res.status === 201){
                alert("گروه با موفقیت ایجاد شد.");
                setGroupName('');
                setParentId(0);

            }
              
        }).catch((err)=>{
            console.log(err);
        })

    }
    const validateForm = () => {
        if (groupName == '')
            return alert("نام گروه باید وارد شود");
    }
    return (

        <Container className={classes.container} >
            <Paper className={classes.paper}>
                <TextField label="نام گروه" variant="outlined" value={groupName} onChange={(e) => { setGroupName(e.target.value) }} />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">گروه مادر</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={parentId}
                        label="Age"
                        onChange={(e) => { setParentId(e.target.value) }}
                    >
                        <MenuItem value={0}>گروه مادر هست</MenuItem>
                        {parents && parents.map((group) => {
                            return <MenuItem value={group.id}>{group.groupName}</MenuItem>
                        })

                        }

                    </Select>
                </FormControl>
                <Button variant="contained" onClick={saveGroup} color="primary" style={{ marginTop: '2rem' }}>ذخیره</Button>
            </Paper>
        </Container>
    )
}

export default WareGroup;