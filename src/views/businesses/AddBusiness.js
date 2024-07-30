// ** React Imports
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

const validationSchema = Yup.object({
  businessName: Yup.string().required('Business Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phone: Yup.string().required('Phone Number is required'),
  abn: Yup.string()
    .matches(/^\d{11}$/, 'Enter a valid 11 Digit ABN')
    .required('ABN is required'),
  address1: Yup.string().required('Address is required'),
  suburb: Yup.string().required('Town/Suburb is required'),
  state: Yup.string().required('State is required'),
  postcode: Yup.string()
    .matches(/^\d{4}$/, 'Enter a valid Postcode')
    .required('Postcode is required')
})

const AddBusiness = ({ onAddBusiness }) => {
  const formik = useFormik({
    initialValues: {
      businessName: '',
      email: '',
      phone: '',
      abn: '',
      address1: '',
      address2: '',
      suburb: '',
      state: '',
      postcode: '',
      contactFirstName: '',
      contactLastName: '',
      googleMapsUrl: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const newBusiness = {
        id: `b-${Math.floor(Math.random() * 1000)}`, // Generate a random ID
        businessName: values.businessName,
        status: 1, // Default status to Active
        stores: 1, // Default stores to 1
        email: values.email,
        phone: values.phone,
        location: `${values.suburb}, ${values.state}, ${values.postcode}`,
        lastActive: 'just now'
      }
      onAddBusiness(newBusiness)
      formik.resetForm()
    }
  })

  return (
    <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        fullWidth
        id='businessName'
        label='Business Name'
        name='businessName'
        autoComplete='businessName'
        autoFocus
        value={formik.values.businessName}
        onChange={formik.handleChange}
        error={formik.touched.businessName && Boolean(formik.errors.businessName)}
        helperText={formik.touched.businessName && formik.errors.businessName}
      />
      <TextField
        margin='normal'
        fullWidth
        id='email'
        label='Business Email'
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
        label='Business Phone Number'
        name='phone'
        autoComplete='phone'
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <TextField
        margin='normal'
        fullWidth
        id='abn'
        label='ABN/ACN'
        name='abn'
        autoComplete='abn'
        value={formik.values.abn}
        onChange={formik.handleChange}
        error={formik.touched.abn && Boolean(formik.errors.abn)}
        helperText={formik.touched.abn && formik.errors.abn}
      />
      <TextField
        margin='normal'
        fullWidth
        id='address1'
        label='Business Address'
        name='address1'
        autoComplete='address1'
        value={formik.values.address1}
        onChange={formik.handleChange}
        error={formik.touched.address1 && Boolean(formik.errors.address1)}
        helperText={formik.touched.address1 && formik.errors.address1}
      />
      <TextField
        margin='normal'
        fullWidth
        id='address2'
        label='Business Address 2'
        name='address2'
        autoComplete='address2'
        value={formik.values.address2}
        onChange={formik.handleChange}
      />
      <TextField
        margin='normal'
        fullWidth
        id='suburb'
        label='Town/Suburb'
        name='suburb'
        autoComplete='suburb'
        value={formik.values.suburb}
        onChange={formik.handleChange}
        error={formik.touched.suburb && Boolean(formik.errors.suburb)}
        helperText={formik.touched.suburb && formik.errors.suburb}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl fullWidth margin='normal'>
          <InputLabel id='state-label'>State</InputLabel>
          <Select
            labelId='state-label'
            id='state'
            name='state'
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
          >
            <MenuItem value='VIC'>VIC</MenuItem>
            <MenuItem value='NSW'>NSW</MenuItem>
            <MenuItem value='QLD'>QLD</MenuItem>
            <MenuItem value='WA'>WA</MenuItem>
            <MenuItem value='SA'>SA</MenuItem>
            <MenuItem value='TAS'>TAS</MenuItem>
            <MenuItem value='ACT'>ACT</MenuItem>
            <MenuItem value='NT'>NT</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin='normal'
          fullWidth
          id='postcode'
          label='Postcode'
          name='postcode'
          autoComplete='postcode'
          value={formik.values.postcode}
          onChange={formik.handleChange}
          error={formik.touched.postcode && Boolean(formik.errors.postcode)}
          helperText={formik.touched.postcode && formik.errors.postcode}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          margin='normal'
          fullWidth
          id='contactFirstName'
          label='Business Contact First Name'
          name='contactFirstName'
          autoComplete='contactFirstName'
          value={formik.values.contactFirstName}
          onChange={formik.handleChange}
        />
        <TextField
          margin='normal'
          fullWidth
          id='contactLastName'
          label='Business Contact Last Name'
          name='contactLastName'
          autoComplete='contactLastName'
          value={formik.values.contactLastName}
          onChange={formik.handleChange}
        />
      </Box>
      <TextField
        margin='normal'
        fullWidth
        id='googleMapsUrl'
        label='Store Google Maps URL'
        name='googleMapsUrl'
        autoComplete='googleMapsUrl'
        value={formik.values.googleMapsUrl}
        onChange={formik.handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default AddBusiness
