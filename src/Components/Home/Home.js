import React, {useState, useEffect} from 'react'
import './Home.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import axios from 'axios'





function Home() {
  const[posts, setPost] = useState([])
  const[searchTerm, setSearchTerm] = useState("")
  const[checkBox, setCheckBox] = useState(false)
  const[checkBoxText, setCheckBoxText] = useState("")

  const[archivedRow, setArchivedRow] = useState("")
  
  const[buttonTrue, setButtonTrue]= useState("Unarchive")

  const changeTrueButton= (archived) => {
    if (buttonTrue === "Unarchive"){
      setButtonTrue("Archive")
    }
    else{
      setButtonTrue("Unarchive")
    }
  }

  const[buttonFalse, setButtonFalse]= useState("Archive")

  const changeFalseButton= (archived) => {
    if (buttonFalse === "Archive"){
      setButtonFalse("Unarchive")
    }
    else{
      setButtonFalse("Archive")
    }
  }

  const changeCheckBox = (event) =>{
    if(checkBox=== false){
      setCheckBox(true)
      setCheckBoxText("true")
      setArchivedRow(32000)
    }
    else{
      setCheckBox(false)
      setCheckBoxText("")
    }
  }
  const url = 'https://gist.githubusercontent.com/EthanMarrs/8a5c090fe3787cff0f4f044d0dc35278/raw/751c0b21a6648dfe6b99e1924c0068ee2b7fac70/interviewRequests.json'

  function updateData(archived){
   
    if(archived === true){
      console.log("true")
    }
    else{
      console.log("false")
    }

  }


  useEffect(() => {
      axios.get(url)
          .then(res => {
              console.log(res)
              setPost(res.data)
          })
          .catch(err => {
              console.log(err)
          })
  }, [])
    return (
      <div>
        <div style={{background:"white", height:"80px", display:"flex"}}>
          <div style={{marginLeft:"60px", marginTop:"10px"}}>
            <TextField
            
              placeholder="search "
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              onChange={event => {setSearchTerm(event.target.value)}}
            />
                   

          </div>
          <div style={{marginTop:"10px", fontSize:"larger", color:"E4EBEF"}} >
              <FormControlLabel
                
                control={<Checkbox color="primary" onChange={event =>changeCheckBox(event.target.value)}/>}
                label="Show archived"
                labelPlacement="Start"
              />
          </div>
          <h1>{checkBoxText}</h1>
        </div>
      
        <div className="home">
        
          <div className='appInterviews'>
            <p>7 interview requests</p>
          </div>

          <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell align="left">Candidate</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Last Communication</TableCell>
                  <TableCell align="left">Salary</TableCell>
                  <TableCell align="left">Sent by</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.filter((row) => {
                  if (searchTerm === ""){
                    return row
                  } else if(row.candidate.toLowerCase().includes(searchTerm.toLowerCase())){
                    return row
                  }
                  else if(checkBoxText === ""){
                    return row
                  }
                  else if( checkBox===true && row.salary.includes(archivedRow)){
                    return row
                  }
                }).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell style={{display:"flex", flexDirection:"row", color:"#7C7C80", fontSize:"larger"}}>
                      <Avatar className="profImage" src={row.image}/> 
                      <div style={{marginLeft:"5px", marginTop:"10px"}}>{row.candidate}</div>
                    </TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="left" style={{display:"flex"}}>
                     <FiberManualRecordIcon style={row.last_comms.unread===true ? {color:"green"} : {color:"white"}}/>  {row.last_comms.description} {row.last_comms.date_time}</TableCell>
                    <TableCell align="left">{row.salary}</TableCell>
                    <TableCell align="left">{row.sent_by}</TableCell>
                    <TableCell align="left">
                      <h1>
                        {row.archived===false ? <button className="arcButton" value="true" onClick={() =>changeFalseButton(row.archived)} >{buttonFalse}</button> : <button className="arcButton" onClick={() =>changeTrueButton(row.archived)}>{buttonTrue}</button>}
                      </h1>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      
       

    );
}

export default Home
