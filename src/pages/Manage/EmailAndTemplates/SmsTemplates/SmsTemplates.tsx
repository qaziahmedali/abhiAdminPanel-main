import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { Button, Flex, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Table from '../../../../components/common/DataTable'
import LoadingSpinner from '../../../../components/common/Spinner'
import { useEasyActions, useEasyState } from '../../../../store/hooks'
import { ISMSTemplate } from '../../../../types/Manage/SMSTemplateType'
import CreateSMSTemplate from './CreateSmsTemplate'
import EditSMSTemplate from './EditSmsTemplate'
import ViewSmsTemplate from './ViewSmsTemplate'

type TypeSMSTemplateProps = {
  tabIndex: number
}

function SMSTemplates({ tabIndex }: TypeSMSTemplateProps) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedSmsTemplate, setSelectedSmsTemplate] = useState<ISMSTemplate | null>(null)
  const { getSMSTemplates } = useEasyActions((actions) => actions.manage)
  const smsTemplates = useEasyState((state) => state.manage.smsTemplates)
  const smsTemplatesTotalCount = useEasyState((state) => state.manage.smsTemplatesTotalCount)

  useEffect(() => {
    if (tabIndex === 1) {
      getSMSTemplatesHandler()
    }
  }, [pagination, tabIndex])

  const getSMSTemplatesHandler = async () => {
    setIsLoading(true)
    try {
      await getSMSTemplates(pagination)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const onChangePage = (updatedPage: number) => {
    setPagination({
      ...pagination,
      page: updatedPage
    })
  }

  const onChangeRowsPerPage = (updatedLimit: number, updatedPage: number) => {
    setPagination({
      page: 1,
      limit: updatedLimit
    })
  }

  const showViewModalHandler = (smsTemplate: ISMSTemplate | null, isOpen: boolean = true) => {
    setShowViewModal(isOpen)
    setSelectedSmsTemplate(smsTemplate)
  }

  const showEditModalHandler = (smsTemplate: ISMSTemplate | null, isOpen: boolean = true) => {
    setShowEditModal(isOpen)
    setSelectedSmsTemplate(smsTemplate)
  }

  const columns = [
    {
      name: '#',
      sortable: true,
      cell: (row: ISMSTemplate, index: number) => <p>{index + (pagination.page - 1) * pagination.limit + 1}</p>,
      grow: 0
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      grow: 2,
      cell: (row: ISMSTemplate) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.name}</div>
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 2,
      cell: (row: ISMSTemplate) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row.description ? row.description : 'N/A  '}
        </div>
      )
    },
    {
      name: 'Actions',
      selector: 'edit',

      cell: (row: ISMSTemplate) => {
        return (
          <>
            <Button onClick={() => showViewModalHandler(row)}>
              <Tooltip label="View" aria-label="View">
                <ViewIcon />
              </Tooltip>
            </Button>

            <Button ml="2" onClick={() => showEditModalHandler(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>

            {false && (
              <Button ml="2">
                <Tooltip label="Delete" aria-label="Delete">
                  <DeleteIcon />
                </Tooltip>
              </Button>
            )}
          </>
        )
      }
    }
  ]

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Flex direction={'column'}>
      {selectedSmsTemplate && showViewModal && (
        <ViewSmsTemplate
          isOpen={showViewModal}
          onClose={() => showViewModalHandler(null, false)}
          {...selectedSmsTemplate}
        />
      )}
      {selectedSmsTemplate && showEditModal && (
        <EditSMSTemplate
          isOpen={showEditModal}
          onClose={() => showEditModalHandler(null, false)}
          smsTemplate={selectedSmsTemplate}
          getSMSTemplatesHandler={getSMSTemplatesHandler}
        />
      )}
      {showCreateModal && (
        <CreateSMSTemplate
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          getSMSTemplatesHandler={getSMSTemplatesHandler}
        />
      )}
      <Flex justifyContent="flex-end" alignItems="center">
        <Button type="button" bgColor={'PrimaryColor'} onClick={() => setShowCreateModal(true)}>
          Create New SMS Template
        </Button>
      </Flex>
      <Table
        data={smsTemplates}
        columns={columns}
        limit={pagination.limit}
        paginationTotalRows={smsTemplatesTotalCount}
        paginationDefaultPage={pagination.page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onSelectedRowsChange={() => {}}
      />
    </Flex>
  )
}

export default SMSTemplates
