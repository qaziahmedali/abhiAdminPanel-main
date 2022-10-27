import React, { useCallback, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'

import { apiManager } from '@/utils/apiManager/ApiManager'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Select, Tooltip, Input } from '@chakra-ui/react'

const data = [
  {
    id: 1,
    monthDay: '21',
    fee: '250',
    exceptionType: 'percentage'
  },
  {
    id: 2,
    monthDay: '23',
    fee: '240',
    exceptionType: 'absolute'
  },
  {
    id: 3,
    monthDay: '5',
    fee: '250',
    exceptionType: 'percentage'
  },
  {
    id: 4,
    monthDay: '6',
    fee: '250',
    exceptionType: 'absolute'
  },
  {
    id: 5,
    monthDay: '9',
    fee: '260',
    exceptionType: 'Tier Based'
  }
]

const EditableCell = ({ row, index, column, col, onChange }: any) => {
  const [value, setValue] = useState(row[column.selector])

  const handleOnChange = (e: any) => {
    setValue(e.target.value)
    onChange?.(e)
  }

  const exceptionType = (e: any) => {
    setValue(e.target.value)
    onChange?.(e)
  }

  if (column?.editing) {
    return (
      <>
        {column.name === 'Type' ? (
          <Select
            name={column.selector}
            value={value}
            width="100px"
            color="grey"
            style={{ fontSize: '12px', padding: '2px' }}
            placeholder="Type"
            onChange={handleOnChange}
          >
            <option value="absolute">Absolute</option>
            <option value="percentage">Percentage</option>
          </Select>
        ) : (
          <Input
            name={column.selector}
            style={{ width: '100%', padding: '2px', fontSize: '12px' }}
            onChange={handleOnChange}
            value={value}
          />
        )}
      </>
    )
  }

  if (col.cell) {
    return col.cell(row, index, column)
  }
  return row[column.selector]
}

export interface ExceptionTierProps {
  exceptionParameter: any
  updateExceptionParameter: any
}

const ExceptionTier: React.FC<ExceptionTierProps> = (props) => {
  const [parameterData, setParameterData] = useState<any | null>([])

  React.useEffect(() => {
    const paramData = props.exceptionParameter.map((val: any, index: any) => {
      return { ...val, index }
    })
    setParameterData(paramData)
  }, [props.exceptionParameter])

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      width: '70px',
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Day',
      selector: 'monthDay',
      sortable: true,
      width: '70px',
      editable: true
    },
    {
      name: 'Amount',
      selector: 'fee',
      sortable: true,
      editable: true,
      width: '70px'
    },

    {
      name: 'Type',
      selector: 'exceptionType',
      sortable: true,
      editable: true
    }
  ]

  const [editingId, setEditingId] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  let formData: any = useRef({}).current

  const isEditing = (record: any) => {
    return record.id === editingId
  }

  const formOnChange = (event: any) => {
    const nam = event.target.name
    const val = event.target.value

    formData = {
      ...formData,
      [nam]: val
    }
  }

  const edit = (record: any) => {
    setEditingId(record.id)
  }

  const deleteException = (record: any) => {
    const canDelete = confirm('Are you want to delete this record?')
    if (!canDelete) return

    setIsDeleting(true)
    apiManager
      .fetch({
        name: 'ManageDeleteTariffException',
        pathVariables: { id: record.id }
      })
      .then((r) => {
        const filteredParameterData = parameterData.filter((d: any) => {
          return d.id !== record.id
        })

        props.updateExceptionParameter(filteredParameterData)
      })
      .finally(() => setIsDeleting(false))
  }

  const cancel = () => {
    setEditingId('')
  }

  const save = () => {
    const foundIndex = parameterData.findIndex((item: any) => editingId === item.id)
    if (foundIndex > -1) {
      const item = parameterData[foundIndex]

      parameterData[foundIndex].monthDay = formData.monthDay ? parseInt(formData.monthDay) : item.monthDay
      parameterData[foundIndex].fee = formData.fee ? parseFloat(formData.fee) : item.fee
      parameterData[foundIndex].exceptionType = formData.exceptionType ? formData.exceptionType : item.exceptionType

      props.updateExceptionParameter(parameterData)
      setEditingId('')
    }
  }

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      cell: (row: any, index: any, column: any) => {
        const editing = isEditing(row)

        return (
          <EditableCell row={row} index={index} column={{ ...column, editing }} col={col} onChange={formOnChange} />
        )
      }
    }
  })

  const createColumns = useCallback(() => {
    return [
      ...mergedColumns,
      {
        name: 'Actions',
        allowOverflow: true,
        minWidth: '200px',
        cell: (row: any) => {
          const editable = isEditing(row)

          if (editable) {
            return (
              <div>
                <Button size="sm" bg="#7367F0" colorScheme="#ffffff" type="button" onClick={() => save()}>
                  save
                </Button>
                <Button ml="2" size="sm" colorScheme="green" type="button" onClick={cancel}>
                  cancel
                </Button>
              </div>
            )
          }

          return (
            <>
              <Button onClick={() => edit(row)} style={{ backgroundColor: 'aliceblue' }}>
                <Tooltip label="Edit" aria-label="Edit">
                  <EditIcon />
                </Tooltip>
              </Button>
              <Button ml="2" onClick={() => deleteException(row)} isLoading={isDeleting}>
                <Tooltip label="Delete" aria-label="Delete">
                  <DeleteIcon />
                </Tooltip>
              </Button>
            </>
          )
        }
      }
    ]
  }, [mergedColumns])

  return <DataTable columns={createColumns()} data={parameterData} defaultSortField="title" />
}

export default ExceptionTier
