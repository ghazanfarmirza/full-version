/* eslint-disable lines-around-comment */
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from 'next/link'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import TableSelection from 'src/views/table/data-grid/TableSelection'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import BusinessUsersTable from 'src/views/businesses/BusinessUsersTable'

const BusinessUsers = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <BusinessUsersTable />
        </Grid>
      </Grid>
    </>
  )
}

export default BusinessUsers
