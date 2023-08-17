import React from "react";
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
  Radio,
} from "@material-ui/core";

import { MIconButton } from "../@material-extend";
import Label from "../Label";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

const FINGERS = [" Little", " Ring", " Middle", " Index", " Thumb"];

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

export default function BiometricControl({ applicantInfo }) {
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

  };

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Label
            variant="ghost"
            color="success"
            sx={{ textTransform: "uppercase" }}
          >
            Device Connected
          </Label>
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
          ></Stack>

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
              <Autocomplete
                multiple
                freeSolo
                value={[captureType[0]]}
                onChange={(event, newValue) => {
                  console.log(newValue);
                }}
                options={captureType.map((option) => option)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option}
                      size="small"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField label="Fingers" {...params} />
                )}
              />
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
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
