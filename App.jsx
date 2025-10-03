import './App.css'
// import { Select } from '@mui/material';
import SelectBar from './components/SelectBar';
import CustomizedTables from './components/CustomizedTables';
import StickyHeadTable from './components/StickyHeadTable';


function App() {

  return (
    <>
    <header className="app-header">
      <span>Tổng quan tuyến bán hàng 2025</span>
      <span style={{fontSize: '1.2rem', fontWeight: 400}}>DVT: Triệu đồng</span>
    </header>
      <SelectBar />
      <div style={{display: 'flex', gap: '1rem', flexWrap: 'nowrap', justifyContent: 'center'}}>
        <CustomizedTables />
        <StickyHeadTable />
      </div>
    </>
  )
}

export default App
