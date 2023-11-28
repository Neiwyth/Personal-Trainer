import { Fragment, useState, } from 'react'
// import './App.css'
import { AppBar, Tab, Tabs, Typography } from '@mui/material';
import Customerlist from './components/Customerlist'
import Trainingslist from './components/Trainingslist';

function App() {

  const [value, setValue] = useState('Customers');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <Fragment>
      <div>
        <AppBar>
          <Typography variant='h4' align='center'>
            <Tabs value={value} onChange={handleChange}>
              <Tab value='Customers' label='Customers' />
              <Tab value='Trainings' label='Trainings' />
            </Tabs>
          </Typography>
        </AppBar>
        {value === 'Customers' && <Customerlist />}
        {value === 'Trainings' && <Trainingslist />}
      </div>
    </Fragment>
  )
}

export default App