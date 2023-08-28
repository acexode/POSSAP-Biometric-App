import React, { useRef, useState, useCallback } from "react";
import { styled } from "@material-ui/core/styles";
import { Icon } from "@iconify/react";
import { Box, Button } from "@material-ui/core";
import CameraIcon from "@iconify/icons-ic/camera-front";
import Redo from "@iconify/icons-ic/redo";
import Webcam from "react-webcam";
// import { Redo } from "@material-ui/icons";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const RootStyle = styled("div")(({ theme }) => ({
  "& .slick-slide": {
    float: theme.direction === "rtl" ? "right" : "left",
    "&:focus": { outline: "none" },
  },
}));
const PhotoCapture = ({setpassportImage, setshowWebCam}) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [showRecapture, setshowRecapture] = useState(false);

  const handleSubmit = useCallback(() => {
    setshowWebCam(false)
  }, [setpassportImage]);

  const capture = useCallback(() => {
    setshowRecapture(true)
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setpassportImage(imageSrc);
  }, [webcamRef, setImgSrc, setpassportImage]);

  const reCapture = useCallback(() => {
    setshowRecapture(false)
    setImgSrc(null);
  }, [setImgSrc]);

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {imgSrc ? (
            <img style={{ height: "100%", marginBottom: '10px',  borderRadius: '16px' }} src={imgSrc} />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          )}
          {!showRecapture ? (
            <Button
              fullWidth
              size="large"
              type="button"
              color="warning"
              variant="contained"
              startIcon={<Icon icon={CameraIcon} />}
              onClick={capture}
              sx={{ whiteSpace: "nowrap" }}
            >
              Capture
            </Button>
          ) : (
            <Button
              fullWidth
              size="large"
              type="button"
              color="success"
              variant="contained"
              startIcon={<Icon icon={Redo} />}
              onClick={reCapture}
              sx={{ whiteSpace: "nowrap" }}
            >
              Re-Capture
            </Button>
          )}
           <Button
              fullWidth
              size="large"
              sx={{marginTop: '10px'}}
              disabled={imgSrc === null}
              type="button"
              color="info"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
        </Box>
      </Box>
    </RootStyle>
  );
};

export default PhotoCapture;
