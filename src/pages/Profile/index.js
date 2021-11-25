import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FaceIcon from '@mui/icons-material/Face';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TabPanel from '../../components/tabPanel';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import ChangeAvatar from './ChangeAvatar';
export default function IconLabelTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        selectionFollowsFocus
        centered
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab icon={<FaceIcon />} label="Change Avatar" />
        <Tab icon={<PasswordIcon />} label="Change Password" />
        <Tab icon={<AccountBoxIcon />} label="Data" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <ChangeAvatar />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Profile />
      </TabPanel>
    </Box>
  );
}
