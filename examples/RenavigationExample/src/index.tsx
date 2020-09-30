import React from 'react'
import { Routes } from './Routes'
import { ModalsRouter, ModalsRoutes, ModalRoute } from '@renavigation2/modals'
import { Modal } from './Modal'

interface Props {}

export const App: React.FC<Props> = ({}) => {
  return (
    <ModalsRouter>
      <Routes />
      <ModalsRoutes>
        <ModalRoute path="*" element={<Modal />} />
      </ModalsRoutes>
    </ModalsRouter>
  )
}

export default App
