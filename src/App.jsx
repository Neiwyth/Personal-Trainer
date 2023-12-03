import { Fragment, useState, } from 'react'
// import './App.css'
import { AppBar, Tab, Tabs, Typography } from '@mui/material';
import Customerlist from './components/Customerlist'
import Trainingslist from './components/Trainingslist';
import Calendar from './components/Calendar';
import Statistics from './components/TrainingStatistic';

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
              <Tab value='Calendar' label='Calendar' />
              <Tab value='Statistics' label='Statistics' />
            </Tabs>
          </Typography>
        </AppBar>
        {value === 'Customers' && <Customerlist />}
        {value === 'Trainings' && <Trainingslist />}
        {value === 'Calendar' && <Calendar />}
        {value === 'Statistics' && <Statistics />}
      </div>
    </Fragment>
  )
}

export default App