import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { GetAllGroup } from "../api/ApiGroup";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { setAllWare, useContactDispatch, useContactState } from "../Contaxt/WareContaxt";
import { GetAllWare } from "../api/ApiWare";


const st = makeStyles((theme) => (
  {

  }
))

const RightBar = () => {
  const classes = st();

 
  const [groups, setGroups] = useState([]);
  const {wareList}=useContactState();
  const contactDispatch=useContactDispatch();

  useEffect(() => {
    GetAllGroup().then((res) => {
      if (res.status === 200) {
        setGroups(res.data)
      }
    }).catch((err) => {
      console.log(err.message)
    })
  }, []);

 const handleSubGroupClick=(id)=>{
  
    GetAllWare().then((res)=>{
      if(res.status===200){
        const data=res.data.filter((ware)=>{
          return  ware.parentId===id;
        });
        console.log(res.data);
        console.log(data);
        setAllWare(contactDispatch,data)
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  const handleGroupClick =(id)=>{
    GetAllWare().then((res)=>{
      if(res.status===200){
        const data=res.data.filter((ware)=>{
          return ware.groupId===id;
        });
        console.log("id", id);
        console.log(res.data);
        console.log(data);
        setAllWare(contactDispatch,data)
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  return (
    <div >

      {groups.map((group) => {
        return <>
          {group.parentId == 0 &&
            <Accordion>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
               <Typography onClick={()=>{handleSubGroupClick(group.id)}}>{group.groupName}</Typography>
              </AccordionSummary>
              {groups.map((group1) => {
                return <>{
                  group1.parentId === group.id && <AccordionDetails onClick={()=>{handleGroupClick(group1.id)}}>
                   <Typography >
                     {group1.groupName}
                   </Typography>
                  </AccordionDetails>
                }
                </>
              })

              }
            </Accordion>
          }
        </>
      })
      }


    </div>

  );
}

export default RightBar;
