'use client'

import React, { useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'

import TransactionTable, { TablePaginationActions } from './_components/TransactionTable'

export default function DashboardPage() {
  const [selectedBudget, setSelectedBudget] = useState('')
  const [transactionDialog, setTransactionDialog] = useState(false)
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  // Budget options
  const budgetOptions = [
    { id: 1, name: 'Monthly Budget', amount: 5000 },
    { id: 2, name: 'Holiday Budget', amount: 2000 },
    { id: 3, name: 'Emergency Fund', amount: 10000 }
  ]

  // Handle budget selection
  const handleBudgetChange = event => {
    setSelectedBudget(event.target.value)
  }

  // Handle transaction dialog
  const handleTransactionOpen = () => {
    if (!selectedBudget) {
      alert('Please select a budget first')

      return
    }

    setTransactionDialog(true)
  }

  const handleTransactionClose = () => {
    setTransactionDialog(false)
    setAmount('')
    setDescription('')
  }

  const handleAddTransaction = () => {
    if (!amount || !description) {
      alert('Please fill in all fields')

      return
    }

    console.log('New transaction:', {
      budgetId: selectedBudget,
      amount: parseFloat(amount),
      description,
      date: new Date()
    })

    handleTransactionClose()
  }

  const data = [
    { name: 'Group A', value: 400, label: 'series A' },
    { name: 'Group B', value: 300, label: 'series B' },
    { name: 'Group C', value: 300, label: 'series C' },
    { name: 'Group D', value: 200, label: 'series D' }
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Card Section */}
        <Grid item xs={12} md={6} sx={{ marginY: 'auto' }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Total Balance
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                $7,777.56
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Chart Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant='h4'>Spending Overview</Typography>
            <PieChart
              series={[
                {
                  data: data,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
                }
              ]}
              width={500}
              height={250}
            />
          </Box>
        </Grid>

        {/* Budget Selection and Transaction Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div' align='center'>
                Budget Management
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Select Budget</InputLabel>
                <Select value={selectedBudget} onChange={handleBudgetChange} label='Select Budget'>
                  {budgetOptions.map(budget => (
                    <MenuItem key={budget.id} value={budget.id}>
                      {budget.name} (${budget.amount})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
              <Button variant='contained' onClick={handleTransactionOpen} disabled={!selectedBudget}>
                Add Transaction
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {' '}
          <TransactionTable />
        </Grid>
      </Grid>

      {/* Add Transaction Dialog */}
      <Dialog open={transactionDialog} onClose={handleTransactionClose}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label='Amount'
              type='number'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: '$'
              }}
            />
            <TextField
              label='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTransactionClose}>Cancel</Button>
          <Button onClick={handleAddTransaction} variant='contained'>
            Add Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
