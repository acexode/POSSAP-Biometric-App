import React, {useEffect, useState} from "react";
import { Icon } from "@iconify/react";

import plusFill from "@iconify/icons-eva/plus-fill";
import minusFill from "@iconify/icons-eva/minus-fill";
import fingerPrint from "@iconify/icons-ic/baseline-fingerprint";
import { useFormik, Form, FormikProvider, useField } from "formik";
// material
import { styled } from "@material-ui/core/styles";
import {
  Box,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  FormHelperText,
  Autocomplete,
  Chip,
  FormControlLabel,
  RadioGroup,
  Radio, MenuItem, Grid,
    Card
} from "@material-ui/core";

import { MIconButton } from "../@material-extend";
import Label from "../Label";
import Select from "../../theme/overrides/Select";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

const FINGERS = [" Little", " Ring", " Middle", " Index", " Thumb"];
const fingerCapture = [
  {
    label :"Right Hand",
    value: "RH"
  },
  {
    label: "Left Hand",
    value: "LH"
  },
  {
    label:"Two Thumbs",
    value: "TT"
  }
]
// ----------------------------------------------------------------------

const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types
  const { available } = props;
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        borderColor: "grey.50032",
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: "center",
          display: "inline-block",
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

export default function BiometricControl({ applicantInfo,isDeviceConnected,device,Fun_LRTCapture }) {
  // const [device,setDevice] = useState("")
  // const [isDeviceConnected,setIsDeviceConnected] = useState(false)
  const [selectedFinger,setSelectedFinger] = useState("")
  const captureType = ["Left Hand", "Right Hand", "Two Thumb"];
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Id: '',
      FileNumber: 'PCC339393',
      ApplicantName: 'Sir Abubakar',
      LeftFourFingerPrint: '',
      RightFourFingerPrint: '',
      TwoThumbPrint: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });
  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  const handleCapture = () => {
    console.log({selectedFinger})
    Fun_LRTCapture(selectedFinger)
  };


  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Card sx={{mb: 2}}>
          <Typography style={{ padding:2, textAlign:"center"}}> Preview </Typography>
          <Typography style={{ padding:2, textAlign:"center"}}>  <span id="msg_id" style={{fontSize:"15px", fontWeight:"bold"}}>&nbsp;</span>
            <span id="Q1_id" style={{fontSize:"15px", fontWeight:"bold"}}>&nbsp;</span>
            <span id="Q2_id" style={{fontSize:"15px", fontWeight:"bold"}}>&nbsp;</span>
            <span id="Q3_id" style={{fontSize:"15px", fontWeight:"bold"}}>&nbsp;</span>
            <span id="Q4_id" style={{fontSize:"15px", fontWeight:"bold"}}>&nbsp;</span></Typography>

        <img id="img_id" src="data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="400" height="375"  alt={""}/>
      <Typography style={{textAlign:"center", margin:2}}>  <span id="cmsg_id" style={{fontSize:"15px", fontWeight:"bold"}}>&nbsp;</span></Typography>
        </Card>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {isDeviceConnected ? <Label
              variant="ghost"
              color="success"
              sx={{textTransform: "uppercase"}}
          >
            Device Connected
          </Label> :
            <Label
            variant="ghost"
            color="error"
            sx={{textTransform: "uppercase"}}
            >
            Device not Connected
            </Label>}
          <Typography
            variant="overline"
            sx={{
              mt: 2,
              mb: 1,
              display: "block",
              color: "info.main",
            }}
          >
            JPEG
          </Typography>

          <Typography variant="h5" paragraph>
            Device Name
          </Typography>

          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ mb: 2 }}
          >{device}</Stack>

          <Divider sx={{ borderStyle: "dashed" }} />

          <Stack spacing={3} sx={{ my: 3 }}>
          <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Applicant Name
              </Typography>
              <div>
                <TextField
                  fullWidth
                  label="Applicant Name"
                  {...getFieldProps("ApplicantName")}
                  error={Boolean(touched.ApplicantName && errors.ApplicantName)}
                  helperText={touched.ApplicantName && errors.ApplicantName}
                />
              </div>
            </Stack>
          <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                File Number
              </Typography>
              <div>
                <TextField
                  fullWidth
                  label="File Number"
                  {...getFieldProps("FileNumber")}
                  error={Boolean(touched.FileNumber && errors.FileNumber)}
                  helperText={touched.FileNumber && errors.FileNumber}
                />
              </div>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Capture Finger
              </Typography>
              <TextField
                  variant="outlined"
                  select
                  value={selectedFinger}
                  onChange={(e) => setSelectedFinger(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {fingerCapture.map((finger) => (
                    <MenuItem key={finger.value} value={finger.value}>
                      {finger.label}
                    </MenuItem>
                ))}
              </TextField>
              {/*<Select*/}
              {/*    labelId="demo-simple-select-label"*/}
              {/*    id="demo-simple-select"*/}
              {/*    value={selectedFinger}*/}
              {/*    label="Finger"*/}
              {/*    onChange={(e)=> setSelectedFinger(e.target.value)}*/}
              {/*>*/}
              {/*  <MenuItem value="">*/}
              {/*    <em>None</em>*/}
              {/*  </MenuItem>*/}
              {/*  {fingerCapture.map((finger,index)=>(*/}
              {/*      <MenuItem key={index} value={finger} >*/}
              {/*        {finger}*/}
              {/*      </MenuItem>*/}
              {/*  ))}*/}
              {/*</Select>*/}

              {/*<Autocomplete*/}
              {/*    multiple*/}
              {/*    freeSolo*/}
              {/*    value={captureType.slice(0, 1)}*/}
              {/*    onChange={(event, newValue) => {*/}
              {/*      console.log(newValue);*/}
              {/*    }}*/}
              {/*    options={captureType}*/}
              {/*    renderTags={(value, getTagProps) =>*/}
              {/*        value.map((option, index) => (*/}
              {/*            <Chip*/}
              {/*                key={option}*/}
              {/*                size="small"*/}
              {/*                label={option}*/}
              {/*                {...getTagProps({ index })}*/}
              {/*            />*/}
              {/*        ))*/}
              {/*    }*/}
              {/*    renderInput={(params) => (*/}
              {/*        <TextField label="Fingers" {...params} />*/}
              {/*    )}*/}
              {/*/>*/}

              {/*<Autocomplete*/}
              {/*  multiple*/}
              {/*  freeSolo*/}
              {/*  value={[captureType[0]]}*/}
              {/*  onChange={(event, newValue) => {*/}
              {/*    console.log(newValue);*/}
              {/*  }}*/}
              {/*  options={captureType.map((option) => option)}*/}
              {/*  renderTags={(value, getTagProps) =>*/}
              {/*    value.map((option, index) => (*/}
              {/*      <Chip*/}
              {/*        key={option}*/}
              {/*        size="small"*/}
              {/*        label={option}*/}
              {/*        {...getTagProps({ index })}*/}
              {/*      />*/}
              {/*    ))*/}
              {/*  }*/}
              {/*  renderInput={(params) => (*/}
              {/*    <TextField label="Fingers" {...params} />*/}
              {/*  )}*/}
              {/*/>*/}
            </Stack>

          
          </Stack>
          <Divider sx={{ borderStyle: "dashed" }} />

          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            sx={{ mt: 5 }}
          >
            <Button
              fullWidth
              size="large"
              type="button"
              color="warning"
              variant="contained"
              startIcon={<Icon icon={fingerPrint} />}
              onClick={handleCapture}
              sx={{ whiteSpace: "nowrap" }}
            >
              Capture
            </Button>
            <Button fullWidth size="large" type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
          {/*    <table border="0" width="90%" cellspacing="0" cellpadding="3" align="center" class="txt" >*/}
          {/*            <tr>*/}
          {/*              <th width="33%">Left Four Fingers</th>*/}
          {/*            <th width="33%">Two Thumbs</th>*/}
          {/*          <th  width="33%">Right Four Fingers</th>*/}
          {/*      </tr>*/}
          {/*      <tr>*/}
          {/*        <th  width="33%"><img id="img_LS" src="data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="400" height="375" /></th>*/}
          {/*      <th  width="33%"><img id="img_TT" src="data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="400" height="375" /></th>*/}
          {/*  <th  width="33%"><img id="img_RS" src="data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="400" height="375" /></th>*/}
          {/*</tr>*/}
          {/*</table>*/}
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
