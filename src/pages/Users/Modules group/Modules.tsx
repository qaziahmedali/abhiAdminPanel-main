import React from 'react'

import Module from './Modules/Modules'
import FrontendUI from './FrontendUI/FrontendUI'

export interface ManagePageProps {}

const Frontend: React.FC<ManagePageProps> = (props) => {
  return (
    <>
      <h1>
        <b>Platform Services </b>
      </h1>
      <Module />

      <h1>
        <b>UI Feature </b>
      </h1>
      <FrontendUI />
    </>
  )
}

export default Frontend
