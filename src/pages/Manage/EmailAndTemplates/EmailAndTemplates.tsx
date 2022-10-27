import React, { useState } from 'react'
import { Flex, Spacer, Button, useDisclosure, Tooltip } from '@chakra-ui/react'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import Table from '../../../components/common/DataTable'
import LoadingSpinner from '../../../components/common/Spinner'

import ViewEmail from './ViewEmail'

import { ViewIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import EditEmailTemplate from './EditEmailTemplate'
import { IUpdateEmailTemplatePayload } from '@/types/Manage/EmailTemplateType'
import AddEmail from './AddEmail'

export interface EmailAndTemplatesProps {}

const EmailAndTemplates: React.FC<EmailAndTemplatesProps> = (props) => {
  const { onOpen } = useDisclosure()

  const [isDataLoading, setIsDataLoading] = useState(false)

  const [openTemplate, setOpenTemplate] = useState(false)
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  const [totalEmailTemplates, setTotalEmailTemplates] = useState(0)

  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')

  const { getEmailTemplates } = useEasyActions((actions) => actions.manage)
  const emailTemplates = useEasyState((state) => state.manage.emailTemplates)

  const [isOpenEditEmailTemplateModal, setIsOpenEditEmailTemplateModal] = useState<boolean>(false)
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<IUpdateEmailTemplatePayload | null>(null)
  const [showAddEmailDrawer, setShowAddEmailDrawer] = useState<boolean>(false)

  React.useEffect(() => {
    getEmailTemplatesData()
  }, [offset, limit])

  const getEmailTemplatesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      offset,
      limit
    }
    const data = await getEmailTemplates(params)
    if (data) {
      setIsDataLoading(false)
      setTotalEmailTemplates(data.total)
    } else {
      setIsDataLoading(false)
    }
  }

  const viewEmailHandler = async (row: any) => {
    setOpenTemplate(true)
    setEmailSubject(row.emailSubject)
    setEmailBody(row.emailBody)
  }

  const openEditEmailTemplateModal = async (row: any) => {
    setIsOpenEditEmailTemplateModal(true)
    setSelectedEmailTemplate({
      id: row.id,
      emailSubject: row.emailSubject,
      emailBody: row.emailBody
    })
  }

  const closeEditEmailTemplateModal = () => {
    setIsOpenEditEmailTemplateModal(false)
    setSelectedEmailTemplate(null)
  }

  const onCloseHandler = () => {
    setOpenTemplate(false)
  }

  const onChangeRowsPerPage = (updatedLimit: number, page: number) => {
    setLimit(updatedLimit)
  }

  const columns = [
    {
      name: '#',
      sortable: true,
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      grow: 3,
      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.name}</div>
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 2,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row.description ? row.description : 'N/A  '}
        </div>
      )
    },
    {
      name: 'Type',
      selector: 'emailType',
      sortable: true
    },
    {
      name: 'Actions',
      selector: 'edit',

      cell: (row: any) => {
        return (
          <>
            <Button onClick={() => viewEmailHandler(row)}>
              <Tooltip label="View" aria-label="View">
                <ViewIcon />
              </Tooltip>
            </Button>

            <Button ml="2" onClick={() => openEditEmailTemplateModal(row)}>
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

  return (
    <>
      <Flex mb="5">
        <Spacer />
        {/* <Button bg="#7367F0" colorScheme="#ffffff" onClick={onOpen}>
          Add
        </Button> */}
      </Flex>
      <Flex justifyContent="flex-end" alignItems="center">
        <Button type="button" bgColor={'PrimaryColor'} onClick={() => setShowAddEmailDrawer(true)}>
          Create New Email Template
        </Button>
      </Flex>
      <AddEmail isOpen={showAddEmailDrawer} onClose={() => setShowAddEmailDrawer(false)} />
      <ViewEmail
        isOpen={openTemplate}
        onClose={onCloseHandler}
        setTemplate={viewEmailHandler}
        emailSubject={emailSubject}
        emailBody={emailBody}
      />
      {selectedEmailTemplate && (
        <EditEmailTemplate
          isOpen={isOpenEditEmailTemplateModal}
          onClose={closeEditEmailTemplateModal}
          setTemplate={openEditEmailTemplateModal}
          emailTemplate={selectedEmailTemplate}
          getEmailTemplatesData={getEmailTemplatesData}
        />
      )}
      {/* <AddEmail isOpen={isOpen} onClose={onClose} /> */}
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <Table
          columns={columns}
          data={emailTemplates}
          paginationDefaultPage={offset}
          onChangePage={(page: any) => setOffset(page)}
          paginationTotalRows={totalEmailTemplates}
          limit={limit}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      )}
    </>
  )
}

export default EmailAndTemplates
