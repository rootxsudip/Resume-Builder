import React from 'react'
import './dataTable.scss'
import { DataGrid } from '@mui/x-data-grid';
const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];

export default function DataTable() {
  return (
    <div className='dataTable'>
      <div style={{ height: '300px', width: '100%' }}>
      <DataGrid 
      className='dataGrid'
      rows={rows} columns={columns}
      initialState={{
        pagination: {
            paginationModel: {
                pageSize: 5,
            },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
      />
    </div>
    </div>
  )
}
