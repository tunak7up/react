import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from '../data/data.json';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6A4923",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{height: '114px'}} >
          <TableRow>
            <StyledTableCell rowSpan={2}>Nội dung</StyledTableCell>
            <StyledTableCell align="right">KPI</StyledTableCell>
            <StyledTableCell align="right">Hạng mục chi tiết</StyledTableCell>
            <StyledTableCell align="right">Lũy kế</StyledTableCell>
          </TableRow>

        </TableHead>
        <TableBody>
          {data.rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.section}
              </StyledTableCell>
              <StyledTableCell align="right">{row.kpi}</StyledTableCell>
              <StyledTableCell align="right">{row.detail}</StyledTableCell>
              <StyledTableCell align="right">{row.luyKe}</StyledTableCell>
            </StyledTableRow>
          ))}
            
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
