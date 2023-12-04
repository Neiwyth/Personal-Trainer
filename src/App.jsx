import { Fragment, useState, } from 'react'
// import './App.css'
import { AppBar, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material';
import Customerlist from './components/Customerlist'
import Trainingslist from './components/Trainingslist';
import Calendar from './components/Calendar';
import Statistics from './components/TrainingStatistic';


function App() {

  const [value, setValue] = useState('Customers');

  const handleChange = (event, value) => {
    setValue(value);
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff6f00',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  })

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Tabs value={value} onChange={handleChange} indicatorColor='secondary' textColor='secondary'>
            <Tab value='Customers' label='Customers' />
            <Tab value='Trainings' label='Trainings' />
            <Tab value='Calendar' label='Calendar' />
            <Tab value='Statistics' label='Statistics' />
          </Tabs>
        </AppBar>
      </ThemeProvider>
      {value === 'Customers' && <Customerlist />}
      {value === 'Trainings' && <Trainingslist />}
      {value === 'Calendar' && <Calendar />}
      {value === 'Statistics' && <Statistics />}
    </Fragment >
  )
}

export default App