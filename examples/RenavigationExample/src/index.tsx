import React from 'react'
import { Routes } from './Routes'
import { ModalsRouter, ModalsRoutes, ModalRoute } from '@renavigation2/modals'
import { Modal } from './components/Modal'
import { NavigationBar, NavigationRouter } from '@renavigation2/navigation'

interface Props {}

export const App: React.FC<Props> = ({}) => {
  return (
    <ModalsRouter>
      <NavigationRouter
        initialEntries={[{ pathname: '/' }]}
        initialIndex={0}
        navigationBar={<NavigationBar prefersLargeTitles />}
      >
        {Routes}
      </NavigationRouter>
      <ModalsRoutes>
        <ModalRoute path="*" element={<Modal />} />
      </ModalsRoutes>
    </ModalsRouter>
  )
}

export default App
