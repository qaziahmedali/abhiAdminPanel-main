import { calc } from '@chakra-ui/styled-system'
import { IDataTableStyles } from 'react-data-table-component'

export const customStyles: IDataTableStyles = {
  table: {
    style: {
      color: 'red',
      backgroundColor: '#ffffff',
      height: `calc(100vh-120px)`,
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  },
  header: {
    style: {
      fontSize: '20px',
      color: '#F6FFFC',
      backgroundColor: '#fdfd',
      maxHeight: '12px',
      paddingLeft: '8px',
      paddingRight: '8px',
      display: 'none'
    }
  },
  rows: {
    style: {
      color: 'black',
      fontWeight: 900
    }
  },
  headCells: {
    style: {
      display: 'block',
      paddingLeft: '8px',
      paddingRight: '8px',
      fontWeight: 'bold',
      fontSize: '15px'
    }
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px'
    }
  }
}
