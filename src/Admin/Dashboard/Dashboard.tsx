import React from 'react'
import ButtonDone from '../../Ui/ButtonDone'
import Loading from '../../Component/Loading'

const Dashboard = () => {
  return (
    <div>
      <ButtonDone edit={true} checkLoading={true} />
      <Loading/>
    </div>
  )
}

export default Dashboard