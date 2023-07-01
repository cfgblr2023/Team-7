import { useEffect} from 'react';

import { Grid} from '@mui/material';

// import PopularCard from './PopularCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  // const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
           
          </Grid>
          {/* <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid> */}
          {/* <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
