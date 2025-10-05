import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from '../data/data.json';
import { useMemo } from 'react';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6A4923",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "18px",
     height: 52,
     paddingTop: 0,
     paddingBottom: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
     height: 52,
     paddingTop: 0,
     paddingBottom: 0,
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
  const processedRows = useMemo(() => {
    const rows = data.rows;
    const processed = [];
    
    for (let i = 0; i < rows.length; i++) {
      const row = { ...rows[i] };
      const isFirstInSection = i === 0 || rows[i].section !== rows[i - 1].section;
      
      const isFirstInKpi = i === 0 || 
        rows[i].section !== rows[i - 1].section || 
        rows[i].kpi !== rows[i - 1].kpi;
      
      if (isFirstInSection) {
        let sectionCount = 1;
        for (let j = i + 1; j < rows.length; j++) {
          if (rows[j].section === rows[i].section) {
            sectionCount++;
          } else {
            break;
          }
        }
        row.sectionRowSpan = sectionCount;
        row.showSection = true;
      } else {
        row.showSection = false;
      }
      
      if (isFirstInKpi) {
        let kpiCount = 1;
        for (let j = i + 1; j < rows.length; j++) {
          if (rows[j].section === rows[i].section && rows[j].kpi === rows[i].kpi) {
            kpiCount++;
          } else {
            break;
          }
        }
        row.kpiRowSpan = kpiCount;
        row.showKpi = true;
      } else {
        row.showKpi = false;
      }
      
      processed.push(row);
    }
    
    return processed;
  }, [data.rows]);
  
  return (
    <div>      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{height: '114px'}}>
            <TableRow>
              <StyledTableCell>Nội dung</StyledTableCell>
              <StyledTableCell>KPI</StyledTableCell>
              <StyledTableCell>Hạng mục chi tiết</StyledTableCell>
              <StyledTableCell align="right">Lũy kế tháng</StyledTableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {processedRows.map((row) => (
              <StyledTableRow key={row.id}>
                {row.showSection && (
                  <StyledTableCell 
                    component="th" 
                    scope="row"
                    rowSpan={row.sectionRowSpan}
                    style={{ 
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      verticalAlign: 'middle'
                    }}
                  >
                    {row.section}
                  </StyledTableCell>
                )}
                
                {row.showKpi && (
                  <StyledTableCell 
                    rowSpan={row.kpiRowSpan}
                    style={{ 
                      fontWeight: '500',
                      verticalAlign: 'middle'
                    }}
                  >
                    {row.kpi}
                  </StyledTableCell>
                )}
                
                <StyledTableCell>{row.detail}</StyledTableCell>
                <StyledTableCell align="right">{row.luyKe}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
}