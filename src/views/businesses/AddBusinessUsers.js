// ** React Imports
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const validationSchema = Yup.object({
  business: Yup.string().required('Business is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Surname is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phone: Yup.string().matches(/^\d+$/, 'Enter a valid phone number').required('Phone Number is required'),
  role: Yup.string().required('Role is required')
})

const AddBusinessUser = ({ onAddBusinessUser, businessList }) => {
  const formik = useFormik({
    initialValues: {
      business: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'Business Admin'
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const newUser = {
        id: `bu-${Math.floor(Math.random() * 1000)}`, // Generate a random ID
        name: `${values.firstName} ${values.lastName}`,
        business: values.business,
        email: values.email,
        roles: values.role,
        creationDate: new Date().toLocaleDateString(),
        status: 1 // Default status to Active
      }
      onAddBusinessUser(newUser)
      formik.resetForm()
    }
  })

  return (
    <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='business-label'>Business</InputLabel>
        <Select
          labelId='business-label'
          id='business'
          name='business'
          value={formik.values.business}
          onChange={formik.handleChange}
          error={formik.touched.business && Boolean(formik.errors.business)}
        >
          {businessList.map(business => (
            <MenuItem key={business.id} value={business.businessName}>
              {business.businessName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          margin='normal'
          fullWidth
          id='firstName'
          label='First Name'
          name='firstName'
          autoComplete='firstName'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          margin='normal'
          fullWidth
          id='lastName'
          label='Surname'
          name='lastName'
          autoComplete='lastName'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </Box>
      <TextField
        margin='normal'
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        margin='normal'
        fullWidth
        id='phone'
        label='Phone Number'
        name='phone'
        autoComplete='phone'
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <FormControl fullWidth margin='normal'>
        <InputLabel id='role-label'>Role</InputLabel>
        <Select
          labelId='role-label'
          id='role'
          name='role'
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
        >
          <MenuItem value='Business Admin'>Business Admin</MenuItem>
          <MenuItem value='Store User'>Store User</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default AddBusinessUser
