import "./templates.scss";
import { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
// import DataTable from '../../components/DataTable/DataTable'
import { Box, Typography, Avatar, TextField, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import TemplateActions from "./TemplateActions";
import useAuth from '../../../../hooks/useAuth'
import shortid from 'shortid'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'; 
import Popover from 'react-bootstrap/Popover'
import PopoverInputForm from "./PopoverInputForm";
export default function ManageTemplate() {

  const { auth, setAuth } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [rowId,setRowId] = useState(null);


   // Fetch templates from backend API
   const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/templates', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          // Authorization: `Bearer test`,
        },
      });
      setTemplates(response.data); // Update users state with data from the backend
    } catch (error) {
      console.error('Error fetching templates:', error);
      // Optionally, you can handle errors and display a message to the user
    }
  };

  useEffect(() => {
    fetchTemplates(); // Call the fetchUsers function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts


  const columns = useMemo(()=>[
    {field: 'id',headerName: 'Id', width: 150, },
    {field: 'templateName',headerName: 'TemplateName', width: 170, editable: true},
    {field: 'templateFormat',headerName: 'TemplateFormat', width: 200, editable: true},
    {field: 'premium',headerName: 'Premium', width: 150, editable: true},
    // {field: 'role',headerName: 'Role', width: 100},
    {field: 'actions', headerName: 'Actions', renderCell:params=><TemplateActions {...{params, rowId, setRowId, fetchTemplates}}/>}
  ],[rowId])

  return (
    <div className='templates'>
      <div className='info'>
        <Box
        sx={{
          height: 400,
          width: '100%'
        }}
        >
          <Typography
          variant='h3'
          component='h3'
          sx={{textAlign:'center', mt:3, mb:3}}
          >
            Manage Templates
          </Typography>
          {/* <TextField
          id="search-input"
          className='search'
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            // Root class for the input field
            "& .MuiOutlinedInput-root": {
              color: "#FFFFFF",
              fontFamily: "Arial",
              fontWeight: "bold",
              // Class for the border around the input field
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
                borderWidth: "2px",
              },
            },
            // Class for the label of the input field
            "& .MuiInputLabel-outlined": {
              color: "#FFFFFF",
              fontWeight: "bold",
            },
          }}
         /> */}
        {/* {/* <Button className='searchButton' variant="contained" onClick={handleSearch}>Search</Button> */}
        <Button className='searchButton' variant="contained">Add Template</Button>
        <PopoverInputForm/>
          <DataGrid
          className='dataGrid'
          columns={columns}
          rows={templates}
          // getRowId={(row) => shortid.generate()}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5,10,25]}
          // checkboxSelection
          // disableRowSelectionOnClick
          // disableColumnFilter
          // disableDensitySelector
          // disableColumnSelector
          // getRowSpacing={(params) => ({
          //   top: params.isFirstVisible ? 0 : 5,
          //   bottom: params.isLastVisible ? 0 : 5,
          // })}
          onCellEditCommit={(params) => setRowId(params.id)}
      />
        </Box>
      </div>
      <style>
      
      </style>
    </div>
  )
}
