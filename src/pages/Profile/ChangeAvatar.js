import {
  IconButton,
  Avatar,
  Input,
  Container,
  Box,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { useAsync } from '../../utils/useAsync';
import profileApi from '../../api/profile';
import Spinner from '../../components/spinner';
const ChangeAvatar = () => {
  const { run, status, error } = useAsync();
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  console.log(picture);
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('myFile', picture, picture.name);
    run(profileApi.uploadProfileAvatar(formData));
  };
  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'rejected') {
    throw error;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="form"
        noValidate
        onSubmit={onSubmit}
      >
        <Input
          onChange={onChangePicture}
          hidden
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <IconButton component="span">
            <Avatar
              src={imgData}
              style={{
                margin: '10px',
                width: '100px',
                height: '100px',
              }}
            />
          </IconButton>
        </label>

        <Button
          id="submit"
          color="success"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save Avatar
        </Button>
      </Box>
    </Container>
  );
};

export default ChangeAvatar;
