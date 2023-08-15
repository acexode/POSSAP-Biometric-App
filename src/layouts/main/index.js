import React, { useState, useCallback } from "react";
import FindFile from "../dashboard/FindFile";
import ApplicantInfo from "../../components/main/ApplicantInfo";
import MainNavbar from "./MainNavbar";
import { Box, styled } from "@material-ui/core";
import LoadingScreen from "../../components/LoadingScreen";
import Page from "../../components/Page";
import CapturePage from "../../pages/capture/capture";

// ----------------------------------------------------------------------

const LoaderContainerStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    marginTop: '35%',
    justifyContent: 'center'
  }
}));
export default function MainLayout() {

  const [layoutSettings, setlayoutSettings] = useState({
    deviceLoaded: false,
    showForm: true,
    showLoader: false,
  });
  const handleDeviceLoad = useCallback(() => {
    console.log("clicked");
    setlayoutSettings({
      ...layoutSettings,
      showForm: false,
      showLoader: true,
    });
    setTimeout(() => {
      setlayoutSettings({
        showForm: false,
        deviceLoaded: true,
        showLoader: false,
      });
    }, 3000);
  }, []);
  return (
    <>
      <MainNavbar />
      <Box>
        {layoutSettings.showForm ? (
          <Box>
            <FindFile />
            <ApplicantInfo handleDeviceLoad={handleDeviceLoad} />
          </Box>
        ) : layoutSettings.deviceLoaded ? (
          <Box>
            <CapturePage />
          </Box>
        ) : (
         <LoaderContainerStyle>
             <LoadingScreen />
         </LoaderContainerStyle>
        )}
      </Box>
      {/* <MainFooter /> */}
    </>
  );
}
