import { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
// import DataTable from '../../components/DataTable/DataTable'
import { Box, Typography, Avatar, TextField, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import './orders.scss'
import OrderActions from './OrderActions'
import useAuth from '../../../../hooks/useAuth'
import shortid from 'shortid'

export default function Orders() {

  const { auth, setAuth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowId,setRowId] = useState(null);


  const handleSearch = async () => {
    if (searchQuery === '') {
      // If search query is empty, fetch all users
      await fetchOrders();
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/order?user=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setOrders(response.data); // Update users state with data from the backend
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
      // Optionally, you can handle errors and display a message to the user
    }
  };

  const clearSearch = () => {
    setSearchQuery("")
    fetchOrders();
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


   // Fetch orders from your backend API
   const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/orders', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          // Authorization: `Bearer test`,
        },
      });
      setOrders(response.data); // Update users state with data from the backend
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Optionally, you can handle errors and display a message to the user
    }
  };

  useEffect(() => {
    fetchOrders(); // Call the fetchUsers function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts


  const columns = useMemo(()=>[
    {field: 'id',headerName: 'Id', width: 150},
    {field: 'orderId',headerName: 'OrderId', width: 170},
    {field: 'orderStatus',headerName: 'OrderStatus', width: 200, editable: true, cellClassName: 'editable-cell',
    onEditCommit: (params) => {
      const { id, value } = params;
    },
    },
    {field: 'userId',headerName: 'UserId', width: 150},
    {field: 'userEmail',headerName: 'Email', width: 200},
    {field: 'userPlan',headerName: 'UserPlan', width: 150 , width: 200, editable: true, cellClassName: 'editable-cell',
    onEditCommit: (params) => {
      const { id, value } = params;
    },
    },
    {field: 'actions', headerName: 'Actions', renderCell:params=><OrderActions {...{params, rowId, setRowId, fetchOrders}}/>}
  ],[rowId])

  return (
    <div className='orders'>
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
            View/Manage Orders
          </Typography>
          <TextField
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
         />
        <Button className='searchButton' variant="contained" onClick={handleSearch}>Search</Button>
        <Button className='clearButton' variant="contained" onClick={clearSearch}>Clear</Button>

          <DataGrid
          className='dataGrid'
          columns={columns}
          rows={orders}
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
