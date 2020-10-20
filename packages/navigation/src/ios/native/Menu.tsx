import { processBoolean } from '../utils/processBoolean'
import {
  ActionProps,
  processAction,
  Action,
  ProcessedActionValue
} from './Action'
import { ImageProps, ProcessedImageValue, processImage } from './Image'

export interface MenuProps {
  identifier?:
    | 'application'
    | 'file'
    | 'edit'
    | 'view'
    | 'window'
    | 'help'
    | 'about'
    | 'preferences'
    | 'services'
    | 'hide'
    | 'quit'
    | 'newScene'
    | 'openRecent'
    | 'close'
    | 'print'
    | 'undoRedo'
    | 'standardEdit'
    | 'find'
    | 'replace'
    | 'share'
    | 'textStyle'
    | 'spelling'
    | 'spellingPanel'
    | 'spellingOptions'
    | 'substitutions'
    | 'substitutionsPanel'
    | 'substitutionOptions'
    | 'transformations'
    | 'speech'
    | 'lookup'
    | 'learn'
    | 'format'
    | 'font'
    | 'textSize'
    | 'textColor'
    | 'textStylePasteboard'
    | 'text'
    | 'writingDirection'
    | 'alignment'
    | 'toolbar'
    | 'fullscreen'
    | 'minimizeAndZoom'
    | 'bringAllToFront'
    | 'root'
    | string
  destructive?: boolean
  displayInline?: boolean
  items?: (React.ReactElement<ActionProps> | React.ReactElement<MenuProps>)[]
  loading?: boolean
  title?: string
  image?: React.ReactElement<ImageProps> | null
}

export interface ProcessedMenuValue
  extends Omit<
    MenuProps,
    'destructive' | 'displayInline' | 'items' | 'loading' | 'image'
  > {
  destructive?: number
  displayInline?: number
  items?: (ProcessedMenuValue | ProcessedActionValue)[]
  loading?: number
  image?: ProcessedImageValue
  _type: 'menu'
  _id: string
}

let id = 0

export const Menu: React.FC<MenuProps> = () => null

export function processMenu({
  props
}: React.ReactElement<MenuProps>): ProcessedMenuValue {
  const final: ProcessedMenuValue = { ...(props as any) }

  if (props['destructive'] !== undefined)
    final['destructive'] = processBoolean(props['destructive'])
  if (props['displayInline'] !== undefined)
    final['displayInline'] = processBoolean(props['displayInline'])

  if (props['items']) {
    final['items'] = props['items'].map((item) => {
      if (item.type === Action) {
        return processAction(item)
      }
      return processMenu(item)
    })
  }

  if (props['loading'] !== undefined)
    final['loading'] = processBoolean(props['loading'])
  if (props['image']) final['image'] = processImage(props['image'])

  final['_type'] = 'menu'
  final['_id'] = `menu.${id++}`

  return final
}
