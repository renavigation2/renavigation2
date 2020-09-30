import React from 'react'
import { NavigationBarItemProps } from '../native/NavigationBarItem'

interface Props {
  navigationBarItem?: React.ReactElement<NavigationBarItemProps> | null
}

export const NavigationScreen: React.FC<Props> = ({
  navigationBarItem,
  children
}) => {
  return (
    <>
      {children}
      {navigationBarItem}
    </>
  )
}
