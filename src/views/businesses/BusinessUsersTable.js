// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import AddBusinessUser from 'src/views/businesses/AddBusinessUsers'

// ** Data Import
import { rows as initialRows } from 'src/@fake-db/table/static-data-business-users'

// import { rows as initialRows } from 'src/@fake-db/table/static-data'

import { businesses as businessList } from 'src/@fake-db/table/static-data-businesses'

const statusObj = {
  1: { title: 'ACTIVE', color: 'success' },
  2: { title: 'INACTIVE', color: 'error' }
}

const columns = [
  {
    field: 'id',
    headerName: 'USER ID',
    minWidth: 90,
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'NAME',
    minWidth: 200,
    flex: 0.2
  },
  {
    field: 'business',
    headerName: 'BUSINESS',
    minWidth: 200,
    flex: 0.2
  },
  {
    field: 'email',
    headerName: 'EMAIL ADDRESS',
    minWidth: 200,
    flex: 0.2
  },
  {
    field: 'roles',
    headerName: 'ROLES',
    minWidth: 150,
    flex: 0.15,
    renderCell: params => <CustomChip rounded size='small' skin='light' color='primary' label={params.row.roles} />
  },
  {
    field: 'creationDate',
    headerName: 'CREATION DATE',
    minWidth: 150,
    flex: 0.15
  },
  {
    field: 'status',
    headerName: 'STATUS',
    minWidth: 120,
    flex: 0.1,
    renderCell: params => {
      const status = statusObj[params.row.status]

      return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />
    }
  },
  {
    field: 'actions',
    headerName: 'ACTIONS',
    minWidth: 150,
    flex: 0.1,
    renderCell: () => <Button variant='contained'>Action</Button>
  }
]

const BusinessUsersTable = () => {
  // ** State
  const [rows, setRows] = useState(initialRows)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [searchValue, setSearchValue] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [open, setOpen] = useState(false)

  const handleSearchChange = event => {
    setSearchValue(event.target.value)
  }

  const handleFilterChange = event => {
    setFilterStatus(event.target.value)
  }

  const handleAddBusinessUser = newUser => {
    setRows([...rows, newUser])
    setOpen(false)
  }

  const filteredRows = rows.filter(
    row =>
      row.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (filterStatus === '' || row.status === parseInt(filterStatus))
  )

  return (
    <Card>
      <CardHeader
        title='Business Users'
        action={
          <Box display='flex' alignItems='center' gap={2}>
            <TextField
              size='small'
              placeholder='Search Business Users'
              value={searchValue}
              onChange={handleSearchChange}
            />
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} label='Status' onChange={handleFilterChange}>
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='1'>Active</MenuItem>
                <MenuItem value='2'>Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button variant='contained' onClick={() => setOpen(true)}>
              + Add New Business User
            </Button>
          </Box>
        }
      />
      <DataGrid
        autoHeight
        rows={filteredRows}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle>Add New Business User</DialogTitle>
        <DialogContent>
          <AddBusinessUser onAddBusinessUser={handleAddBusinessUser} businessList={businessList} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default BusinessUsersTable
