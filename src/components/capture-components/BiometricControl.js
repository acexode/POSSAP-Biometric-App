import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Webcam from "react-webcam";
import plusFill from "@iconify/icons-eva/plus-fill";
import minusFill from "@iconify/icons-eva/minus-fill";
import fingerPrint from "@iconify/icons-ic/baseline-fingerprint";
import portrait from "@iconify/icons-ic/portrait";

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
  Checkbox,
  FormHelperText,
  Autocomplete,
  Chip,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Grid,
  Card,
  Select,
} from "@material-ui/core";

import { MIconButton } from "../@material-extend";
import Label from "../Label";
// import Select from "../../theme/overrides/Select";
import postBiometricData from "../../_apis_/PostBiometricData";
import useAuth from "../../hooks/useAuth";
import closeFill from "@iconify/icons-eva/close-fill";
import { useSnackbar } from "notistack5";
// import { sampleData } from "../../_apis_/sampledata";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    // padding: theme.spacing(5, 8),
  },
}));

const FINGERS = [" Little", " Ring", " Middle", " Index", " Thumb"];
const fingerCapture = [
  {
    label: "Left Hand",
    value: "LH",
  },
  {
    label: "Right Hand",
    value: "RH",
  },

  {
    label: "Two Thumbs",
    value: "TT",
  },
];
export const singleFingersCapture = [
  {
    label: "Right Thumb",
    value: "1",
  },
  {
    label: "Right Index",
    value: "2",
  },
  {
    label: "Right Middle",
    value: "3",
  },
  {
    label: "Right Ring",
    value: "4",
  },
  {
    label: "Right Pinky",
    value: "5",
  },
  {
    label: "Left Thumb",
    value: "6",
  },
  {
    label: "Left Index",
    value: "7",
  },
  {
    label: "Left Middle",
    value: "8",
  },
  {
    label: "Left Ring",
    value: "9",
  },
  {
    label: "Left Pinky",
    value: "10",
  },
];
// ----------------------------------------------------------------------
const fingers = [
  "Left Pinky",
  "Left Ring",
  "Left Middle",
  "Left Index",
  "Left Thumb",
  "Right Pinky",
  "Right Ring",
  "Right Middle",
  "Right Index",
  "Right Thumb",
];
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

export default function BiometricControl({
  applicantInfo,
  isDeviceConnected,
  device,
  Fun_LRTCapture,
  toggleWebCam,
  fingerDataObject,
  setIsAmputeeChecked,
  setMissingFingersToRemove,
}) {
  const [selectedFinger, setSelectedFinger] = useState(fingerCapture[0].value);
  const [isAmputee, setIsAmputte] = useState(false);
  const [missingFingers, setMissingFingers] = useState([]);
  const [fingerArray, setFingerArray] = useState(fingerCapture);

  const handleChange = (event) => {
    setIsAmputte(event.target.checked);
    setIsAmputeeChecked(event.target.checked);
  };
  const handleMissingChange = (event) => {
    const {
      target: { value },
    } = event;
    setMissingFingers(value);
  };
  const captureType = ["Left Hand", "Right Hand", "Two Thumb"];
  const { fileResult } = useAuth();
  useEffect(() => {
    if (isAmputee) {
      const filteredFingersCapture = singleFingersCapture.filter(
        (finger) => !missingFingers.includes(finger.label)
      );
      setMissingFingersToRemove(filteredFingersCapture);
      setFingerArray(filteredFingersCapture);
    } else {
      setFingerArray(fingerCapture);
    }
  }, [isAmputee, missingFingers]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      FileNumber: fileResult?.RefNumber,
      ApplicantName: fileResult?.CustomerName,
      Comment: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      const currentDate = new Date();

      // Get the year, month, and day from the current date
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      // Format the date in "YYYY-MM-DD" format
      const formattedDate = `${year}-${month}-${day}`;
      try {
        const newValues = {
          ...fingerDataObject,
          ...values,
          RegisteredDate: formattedDate,
          IsAmputee: isAmputee,
          NoOfMissingFingers: missingFingers.length,
        };
        delete newValues?.ApplicantName;
        // console.log(newValues);
        const res = await postBiometricData(newValues);
        console.log({ res });
        enqueueSnackbar("Success", {
          variant: "success",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        setSubmitting(true);
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message, {
          variant: "error",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  const { values, touched, errors, getFieldProps, handleSubmit, isSubmitting } =
    formik;

  const handleCapture = () => {
    Fun_LRTCapture(selectedFinger);
  };

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {isDeviceConnected ? (
            <Label
              variant="ghost"
              color="success"
              sx={{ textTransform: "uppercase" }}
            >
              Device Connected
            </Label>
          ) : (
            <Label
              variant="ghost"
              color="error"
              sx={{ textTransform: "uppercase" }}
            >
              Device not Connected
            </Label>
          )}
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
          >
            {device}
          </Stack>

          <Divider sx={{ borderStyle: "dashed" }} />

          <Stack spacing={3} sx={{ my: 3 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Applicant Name
              </Typography>
              <div style={{ width: 250 }}>
                <TextField
                  fullWidth
                  label="Applicant Name"
                  disabled={true}
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
              <div style={{ width: 250 }}>
                <TextField
                  fullWidth
                  disabled={true}
                  label="File Number"
                  {...getFieldProps("FileNumber")}
                  error={Boolean(touched.FileNumber && errors.FileNumber)}
                  helperText={touched.FileNumber && errors.FileNumber}
                />
              </div>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Is an Amputee?
              </Typography>
              <div style={{ width: 250 }}>
                <Checkbox checked={isAmputee} onChange={handleChange} />
              </div>
            </Stack>

            {isAmputee && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Missing Fingers
                </Typography>
                <div style={{ width: 250 }}>
                  <Select
                    variant="outlined"
                    fullWidth
                    multiple
                    value={missingFingers}
                    onChange={handleMissingChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {fingers.map((fingrt) => (
                      <MenuItem key={fingrt} value={fingrt}>
                        {fingrt}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Stack>
            )}
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Capture Finger
              </Typography>
              <div style={{ width: 250 }}>
                <TextField
                  variant="outlined"
                  select
                  fullWidth
                  value={selectedFinger}
                  onChange={(e) => setSelectedFinger(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {fingerArray.map((finger) => (
                    <MenuItem key={finger.value} value={finger.value}>
                      {finger.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Comment
              </Typography>
              <div style={{ width: 250 }}>
                <TextField
                  fullWidth
                  label="Comment"
                  multiline
                  {...getFieldProps("Comment")}
                  error={Boolean(touched.Comment && errors.Comment)}
                  helperText={touched.Comment && errors.Comment}
                />
              </div>
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
            <Button
              fullWidth
              size="large"
              type="button"
              color="warning"
              variant="contained"
              startIcon={<Icon icon={portrait} />}
              onClick={toggleWebCam}
              sx={{ whiteSpace: "nowrap" }}
            >
              Image Capture
            </Button>
          </Stack>
          <Stack sx={{ mt: 2 }}>
            <Button
              fullWidth
              size="large"
              disabled={
                isSubmitting || fingerDataObject?.PassportImage === undefined
              }
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
