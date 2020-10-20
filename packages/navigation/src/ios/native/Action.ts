import { NativeSyntheticEvent } from 'react-native'
import { processBoolean } from '../utils/processBoolean'
import { ImageProps, ProcessedImageValue, processImage } from './Image'

export interface ActionProps {
  disabled?: boolean
  destructive?: boolean
  hidden?: boolean
  state?: 'on' | 'mixed' | 'off'
  title?: string
  image?: React.ReactElement<ImageProps> | null
  identifier?: string
  discoverabilityTitle?: string
  onPress?: (event: NativeSyntheticEvent<any>) => void
}

export interface ProcessedActionValue
  extends Omit<ActionProps, 'disabled' | 'destructive' | 'hidden' | 'image'> {
  disabled?: number
  destructive?: number
  hidden?: number
  image?: ProcessedImageValue
  _type: 'action'
  _id: string
  _hasOnPress: number
}

export const Action: React.FC<ActionProps> = () => null

let id = 0

export function processAction({
  props
}: React.ReactElement<ActionProps>): ProcessedActionValue {
  const final: ProcessedActionValue = { ...(props as any) }
  if (props['disabled'] !== undefined)
    final['disabled'] = processBoolean(props['disabled'])
  if (props['destructive'] !== undefined)
    final['destructive'] = processBoolean(props['destructive'])
  if (props['hidden'] !== undefined)
    final['hidden'] = processBoolean(props['hidden'])
  if (props['image']) final['image'] = processImage(props['image'])

  final['_type'] = 'action'
  final['_hasOnPress'] = processBoolean(!!props['onPress'])
  final['_id'] = `action.${id++}`

  return final
}
