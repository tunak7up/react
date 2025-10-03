import { useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import data from "../data/data.json";

const rowsLength = data.rows.length;

function getDayInMonth(year, month) {
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
const daysIn2025Sep = getDayInMonth(2025, 8); 

export default function StickyHeadTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsLength);

  const displayRows = useMemo(
    () =>
      data.rows.slice(
        pageIndex * rowsPerPage,
        pageIndex * rowsPerPage + rowsPerPage
      ),
    [ pageIndex, rowsPerPage]
  );

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageIndex(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {daysIn2025Sep.map((day) => (
                <TableCell style={{backgroundColor:"#6A4923", color: "white", fontWeight: "bold", fontSize: "18px"}} key={day.getDate()} align="center" colSpan={1}>
                  {day.getDate()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {daysIn2025Sep.map((day) => {
                const weekDay = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                return (
                  <TableCell key={day.getDay()} align="center"
                  style={day.getDay() === 0 || day.getDay() === 6 ? {backgroundColor: 'rgba(240, 115, 32, 0.6)', fontWeight: "bold", fontSize: "18px"} : {backgroundColor: "#6A4923", color: "white", fontWeight: "bold", fontSize: "18px"}}
                    >
                    {weekDay[day.getDay()]}
                  </TableCell>
                );
              })}
              </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((row) => (
              <TableRow>
                {row.days.map((day, index) => { 
                  const date = new Date(day.dateKey);
                  return (
                  <TableCell
                    key={index} 
                    style={date.getDay() === 0 || date.getDay() === 6 ? {backgroundColor: 'rgba(253, 241, 203, 1)'} : {}}
                  >
                    {day.metrics.value} 
                  </TableCell>
                )})}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.rows.length}
        rowsPerPage={rowsPerPage}
        page={pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
