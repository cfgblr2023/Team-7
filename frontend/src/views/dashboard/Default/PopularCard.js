import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons';

// project imports
import { List, ListItemButton, ListItemIcon } from '@mui/material';
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Registered Users</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> This Year</MenuItem>
                      <MenuItem onClick={handleClose}> 2022</MenuItem>
                      <MenuItem onClick={handleClose}> 2021 </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid>
              <Grid item xs={12}>
                <List
                  component="nav"
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 300,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '10px',
                    [theme.breakpoints.down('md')]: {
                      minWidth: '100%'
                    },
                    '& .MuiListItemButton-root': {
                      mt: 0.5
                    }
                  }}
                >
                  <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }}>
                    <ListItemIcon>
                      <IconSettings stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Students
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              139
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItemButton>
                  <Divider sx={{ my: 1.5 }} />
                  <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }}>
                    <ListItemIcon>
                      <IconUser stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Home Makers
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              200
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItemButton>
                  <Divider sx={{ my: 1.5 }} />
                  <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }}>
                    <ListItemIcon>
                      <IconLogout stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Senior Citizens
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              100
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItemButton>
                  <Divider sx={{ my: 1.5 }} />
                  <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }}>
                    <ListItemIcon>
                      <IconLogout stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Differently Abled
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              10
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItemButton>
                  <Divider sx={{ my: 1.5 }} />
                  <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }}>
                    <ListItemIcon>
                      <IconLogout stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Professionals
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              189
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItemButton>
                  <Divider sx={{ my: 1.5 }} />
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
