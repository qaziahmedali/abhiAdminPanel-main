import React from 'react'
import BackendFeatureGroups from './BackendFeatureGroup/BackendFeatureGroup'

export interface ManagePageProps {}

const Backend: React.FC<ManagePageProps> = (props) => {
  return (
    <>
      <h1>
        <b>Backend Features </b>
      </h1>
      <BackendFeatureGroups />
    </>
  )
}

export default Backend
