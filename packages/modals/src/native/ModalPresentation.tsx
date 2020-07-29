import { NativeModules } from 'react-native'

const NativeModal = NativeModules.RNRModalManager

export enum ModalPresentation {
  FullScreen = NativeModal.modalPresentationFullScreen,
  PageSheet = NativeModal.modalPresentationPageSheet,
  CurrentContext = NativeModal.modalPresentationCurrentContext,
  Custom = NativeModal.modalPresentationCustom,
  OverFullScreen = NativeModal.modalPresentationOverFullScreen,
  OverCurrentContext = NativeModal.modalPresentationOverCurrentContext,
  Popover = NativeModal.modalPresentationPopover,
  PresentationNone = NativeModal.modalPresentationNone
}
