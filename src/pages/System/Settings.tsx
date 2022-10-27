import React from 'react'
import ReactJson from 'react-json-view'

export interface SettingsProps {}

const my_json_object = {
  data: ['users', 'admin', 'manager'],
  config: true,
  amount: 2,
  roles: {
    admin: 2,
    users: 10
  }
}

const Settings: React.FC<SettingsProps> = (props) => {
  return (
    <>
      <ReactJson
        src={my_json_object}
        theme="monokai"
        onEdit={(edit) => {
          console.log(edit)
        }}
      />
    </>
  )
}

export default Settings
