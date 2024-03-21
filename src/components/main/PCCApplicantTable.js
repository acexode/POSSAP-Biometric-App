import React from 'react'
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
  } from "@material-ui/core";
const PCCApplicantTable = ({fileResult}) => {
  return (
    <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name </TableCell>
        <TableCell>File Number</TableCell>
        <TableCell>Reason</TableCell>
        <TableCell>Passport No</TableCell>
        <TableCell>Prev Convicted</TableCell>
        <TableCell>Destination</TableCell>
        <TableCell>Tribe</TableCell>
        <TableCell>Place of Issuance</TableCell>
        <TableCell>Place of Birth</TableCell>
        <TableCell>Year of Birth</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {/* {MOCK_INVOICES.map((row) => ( */}
        <TableRow key={fileResult?.CharacterCertificateDetailsId}>
          <TableCell>{`${fileResult?.CustomerName || 'N/A'}`}</TableCell>
          <TableCell>{fileResult?.RefNumber || 'N/A'}</TableCell>
          <TableCell>{fileResult?.ReasonForInquiry || 'N/A'}</TableCell>
          <TableCell>{fileResult?.PassportNumber || 'N/A'}</TableCell>
          <TableCell>{fileResult?.PreviouslyConvicted ? 'Yes' : 'No'}</TableCell>
          <TableCell>{fileResult?.DestinationCountry || 'N/A'}</TableCell>
          <TableCell>{fileResult?.Tribe || 'N/A'}</TableCell>
          <TableCell>{fileResult?.PlaceOfIssuance || 'N/A'}</TableCell>
          <TableCell>{fileResult?.PlaceOfBirth || 'N/A'}</TableCell>
          <TableCell>{fileResult?.DateOfBirth || 'N/A'}</TableCell>
        </TableRow>
      {/* ))} */}
    </TableBody>
  </Table>
  )
}

export default PCCApplicantTable
