import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import shareFill from "@iconify/icons-eva/share-fill";
import printerFill from "@iconify/icons-eva/printer-fill";
import archiveFill from "@iconify/icons-eva/archive-fill";
import downloadFill from "@iconify/icons-eva/download-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import { useTheme } from "@material-ui/core/styles";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import {
  Box,
  Menu,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  TableContainer,
} from "@material-ui/core";

import Label from "../Label";
import Scrollbar from "../Scrollbar";
import { MIconButton } from "../@material-extend";
import useAuth from "../../hooks/useAuth";
import Empty from "../Empty";
import { LoadingButton } from "@material-ui/lab";
import TintPermitApplicantTable from "./TintPermitApplicantTable";
import PCCApplicantTable from "./PCCApplicantTable";

// ----------------------------------------------------------------------

const MOCK_INVOICES = [
  {
    id: 1,
    name: "Sir Abubakar",
    fileNumber: "CC17670",
    reason: "Police Extract",
    passport_No: "A0565848",
    prev_convicted: "No",
    destination_country: "Dubai",
    tribe: "Nigerian",
    place_of_issuance: "Abuja",
    place_of_birth: "Jos",
    year_of_birth: "1992",
  },
];

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem>
          <Icon icon={downloadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={printerFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Print
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={shareFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Share
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={archiveFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Archive
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem sx={{ color: "error.main" }}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default function ApplicantInfo({handleDeviceLoad}) {
  const theme = useTheme();
  const { fileResult, fileNumber } = useAuth();
  console.log(fileResult, fileNumber);
  return (
    <Box sx={{ mx: 3, mt: 5 }}>
    <Card>
      <CardHeader title="Applicant Information" sx={{ mb: 1 }} />
      <Scrollbar>
        {!fileResult ? 
          <Empty /> 
          :
          <TableContainer sx={{ minWidth: 720 }}>
            {fileResult.TintPermitDetailsId ? 
            <TintPermitApplicantTable fileResult={fileResult} /> : 
            <PCCApplicantTable fileResult={fileResult} />  
          }
          </TableContainer>
        }
      </Scrollbar>

      <Divider />

    </Card>
      <Box sx={{ mt: 5, textAlign: "right" }}>
        <LoadingButton
          to="#"
          size="md"
          type="submit" 
          variant="contained"
          onClick={handleDeviceLoad}
          endIcon={<Icon icon={arrowIosForwardFill} />}
          disabled={!fileResult}
        >
          Enroll
        </LoadingButton>
      </Box>
    </Box>
  );
}
