import React from 'react'
import { useModal, Modal as ModalBase } from '@renavigation2/modals'
import {
  NavigationBar,
  NavigationRouter,
  NavigationRoutes
} from '@renavigation2/navigation'
import { Routes } from '../Routes'

interface Props {}

export const Modal: React.FC<Props> = ({}) => {
  const { location } = useModal()
  return (
    <ModalBase style={{ backgroundColor: 'white' }}>
      <NavigationRouter initialEntries={[location]} initialIndex={0}>
        <NavigationRoutes
          navigationBar={<NavigationBar prefersLargeTitles={false} />}
        >
          {Routes}
        </NavigationRoutes>
      </NavigationRouter>
    </ModalBase>
  )
}
