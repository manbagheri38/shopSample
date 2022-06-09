import { alpha, AppBar, Avatar, Badge, Input, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { ListAlt, Mail, Search } from "@material-ui/icons";

const st = makeStyles((theme) => (
    {
        logoLG: {
            display: 'block',
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        },
        logoXs: {
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'block'
            }
            
            
        },
        search:{
            display:"flex",
            alignItems:"center",
            backgroundColor:alpha(theme.palette.common.white,0.15)
        },
        toolbar:{
            display:"flex",
            justifyContent:"space-between"
        }, 
        icons:{
            display:'flex',
            alignItems:'center',
            [theme.breakpoints.down('sm')]:{
                display:"none"
            }
        },
        avatar:{
            marginLeft:theme.spacing(2)
        }
    }
))

const Navbar = () => {
    const classes = st();
    return (
        <div >
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Typography variant={'h6'} className={classes.logoLG}>
                        سایت تاپ لرن
                    </Typography>
                    <Typography variant={'h6'} className={classes.logoXs}>
                        تاپ لرن
                    </Typography>
                    <div className={classes.search}>
                        <Search />
                        <Input />
                    </div>
                    <div className={classes.icons}>
                        <Badge badgeContent={4} color="secondary"  className={classes.avatar}>
                            <Mail />
                        </Badge>
                        <Badge badgeContent={2} color="error" className={classes.avatar}>
                            <ListAlt />
                        </Badge>
                        <Avatar className={classes.avatar} src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar"/>
                    </div>


                </Toolbar>
            </AppBar>
        </div>

    );
}

export default Navbar;
