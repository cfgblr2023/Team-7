import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';


import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Admin = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const issues = [{type:"Encroachment",lat:2345.1234},{type:"FootPath",lat:3903.2345}]

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            {issues.map((item,i) => <TotalOrderLineChartCard isLoading={isLoading} item={item} i={i} key={i}/>)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Admin;
