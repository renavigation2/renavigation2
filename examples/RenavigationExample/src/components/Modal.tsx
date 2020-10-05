import React from 'react'
import { useModal, Modal as ModalBase } from '@renavigation2/modals'
import { NavigationBar, NavigationRouter } from '@renavigation2/navigation'
import { Routes } from '../Routes'

interface Props {}

export const Modal: React.FC<Props> = ({}) => {
  const { location } = useModal()
  return (
    <ModalBase>
      <NavigationRouter
        initialEntries={[location]}
        initialIndex={0}
        navigationBar={<NavigationBar prefersLargeTitles={false} />}
      >
        {Routes}
      </NavigationRouter>
    </ModalBase>
  )
}
