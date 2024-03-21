import React from 'react'
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
  } from "@material-ui/core";

const TintPermitApplicantTable = ({fileResult}) => {
    return (
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>Request ID</TableCell>
          <TableCell>Name </TableCell>
          <TableCell>File Number</TableCell>
          <TableCell>Vin</TableCell>
          <TableCell>Plate Number</TableCell>
          <TableCell>Destination</TableCell>
          <TableCell>Vehicle Make</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {MOCK_INVOICES.map((row) => ( */}
          <TableRow key={fileResult?.RequestId}>
            <TableCell>{fileResult?.RequestId }</TableCell>
            <TableCell>{`${fileResult?.CustomerName || 'N/A'}`}</TableCell>
            <TableCell>{fileResult?.RefNumber || 'N/A'}</TableCell>
            <TableCell>{fileResult?.Vin || 'N/A'}</TableCell>
            <TableCell>{fileResult?.PlateNumber || 'N/A'}</TableCell>
            <TableCell>{fileResult?.Color || 'N/A'}</TableCell>
            <TableCell>{fileResult?.VehMake || 'N/A'}</TableCell>
          </TableRow>
        {/* ))} */}
      </TableBody>
    </Table>
    )
}

export default TintPermitApplicantTable
