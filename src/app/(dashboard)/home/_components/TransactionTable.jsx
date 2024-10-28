import React, { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Typography
} from '@mui/material'

// Sample transaction data - replace with your actual data source
const sampleTransactions = [
  { id: 1, date: '2024-10-28', description: 'Groceries', amount: -120.5, budget: 'Monthly Budget' },
  { id: 2, date: '2024-10-27', description: 'Gas', amount: -45.0, budget: 'Monthly Budget' },
  { id: 3, date: '2024-10-26', description: 'Emergency repair', amount: -250.0, budget: 'Emergency Fund' },
  { id: 4, date: '2024-10-25', description: 'Hotel booking', amount: -400.0, budget: 'Holiday Budget' }

  // Add more sample transactions as needed
]

export default function TransactionTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows = Math.max(0, rowsPerPage - Math.min(rowsPerPage, sampleTransactions.length - page * rowsPerPage))

  return (
    <TableContainer component={Paper}>
      <Typography variant='h6' sx={{ p: 2 }}>
        Recent Transactions
      </Typography>
      <Table sx={{ minWidth: 500 }} aria-label='transaction table'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell align='right'>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? sampleTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : sampleTransactions
          ).map(row => (
            <TableRow key={row.id}>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.budget}</TableCell>
              <TableCell
                align='right'
                sx={{
                  color: row.amount < 0 ? 'error.main' : 'success.main'
                }}
              >
                ${Math.abs(row.amount).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={sampleTransactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            /> */}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
