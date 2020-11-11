import React from 'react'
import { NavigationItem } from '../native/NavigationItem'

interface Props {
  navigationItem?: React.ReactElement<any> | null
}

export const NavigationScreen: React.FC<Props> = ({
  navigationItem,
  children
}) => {
  return (
    <>
      {children}
      {navigationItem ? navigationItem : <NavigationItem />}
    </>
  )
}
