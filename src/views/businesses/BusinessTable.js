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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import AddBusiness from './AddBusiness'

// ** Data Import
import { rows as initialRows } from 'src/@fake-db/table/static-data-businesses'

const statusObj = {
  1: { title: 'ACTIVE', color: 'success' },
  2: { title: 'INACTIVE', color: 'error' }
}

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 90,
    flex: 0.1
  },
  {
    field: 'businessName',
    headerName: 'Business Name',
    minWidth: 200,
    flex: 0.2
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 120,
    flex: 0.1,
    renderCell: params => {
      const status = statusObj[params.row.status]

      return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />
    }
  },
  {
    field: 'stores',
    headerName: 'Stores',
    minWidth: 100,
    flex: 0.1
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 200,
    flex: 0.2
  },
  {
    field: 'phone',
    headerName: 'Phone',
    minWidth: 150,
    flex: 0.15
  },
  {
    field: 'location',
    headerName: 'Location',
    minWidth: 150,
    flex: 0.15
  },
  {
    field: 'lastActive',
    headerName: 'Last Active',
    minWidth: 150,
    flex: 0.15
  },
  {
    field: 'actions',
    headerName: 'Actions',
    minWidth: 150,
    flex: 0.1,
    renderCell: () => <Button variant='contained'>Action</Button>
  }
]

const BusinessesTable = () => {
  // ** State
  const [rows, setRows] = useState(initialRows || [])
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

  const handleAddBusiness = newBusiness => {
    setRows(prevRows => [...prevRows, newBusiness])
    setOpen(false)
  }

  const filteredRows = (rows || []).filter(
    row =>
      row.businessName?.toLowerCase().includes(searchValue.toLowerCase()) &&
      (filterStatus === '' || row.status === parseInt(filterStatus))
  )

  return (
    <Card>
      <CardHeader
        title='Businesses'
        action={
          <Box display='flex' alignItems='center' gap={2}>
            <TextField size='small' placeholder='Search Businesses' value={searchValue} onChange={handleSearchChange} />
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} label='Status' onChange={handleFilterChange}>
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='1'>Active</MenuItem>
                <MenuItem value='2'>Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button variant='contained' onClick={() => setOpen(true)}>
              + Add New Business
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
        <DialogTitle>Add New Business</DialogTitle>
        <DialogContent>
          <AddBusiness onAddBusiness={handleAddBusiness} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default BusinessesTable
