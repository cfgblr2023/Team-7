import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
// material-ui
import { Grid } from '@mui/material';

import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Admin = () => {
  const [isLoading, setLoading] = useState(false);
  const [issues, setIssues] = useState([
    { type: 'Encroachment', lat: 2345.1234 },
    { type: 'FootPath', lat: 3903.2345 }
  ]);

  async function getToBeApproved() {
    axios.get('http://localhost:5000/verify').then((res) => {
      console.log(res.data);
      setIssues(res.data);
    });
  }
  useEffect(() => {
    getToBeApproved();
  }, []);

  // getToBeApproved(s)

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          <Button variant="contained">Download Data</Button>
            {issues.map((item, i) => (
              <TotalOrderLineChartCard isLoading={isLoading} item={item} i={i} key={i} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Admin;
