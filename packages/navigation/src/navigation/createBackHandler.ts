/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
const createBackHandler = () => {
  const listeners: any = []
  const addEventListener = (eventName: any, handler: any) => {
    if (listeners.indexOf(handler) === -1) listeners.push(handler)
    return { remove: () => removeEventListener(eventName, handler) }
  }
  const removeEventListener = (_: any, handler: any) => {
    if (listeners.indexOf(handler) !== -1)
      listeners.splice(listeners.indexOf(handler), 1)
  }
  const handleBack = () => {
    for (let i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i]()) return true
    }
    return false
  }
  return { addEventListener, removeEventListener, handleBack }
}

export default createBackHandler
