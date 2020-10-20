import {
  ButtonStateAppearanceProps,
  ProcessedButtonStateAppearanceValue,
  processButtonStateAppearance
} from './ButtonStateAppearance'

export interface ButtonAppearanceProps {
  normal?: React.ReactElement<ButtonStateAppearanceProps>
  highlighted?: React.ReactElement<ButtonStateAppearanceProps>
  disabled?: React.ReactElement<ButtonStateAppearanceProps>
  focused?: React.ReactElement<ButtonStateAppearanceProps>
}

export interface ProcessedButtonAppearanceValue {
  normal?: ProcessedButtonStateAppearanceValue
  highlighted?: ProcessedButtonStateAppearanceValue
  disabled?: ProcessedButtonStateAppearanceValue
  focused?: ProcessedButtonStateAppearanceValue
  _configure?: 'plain' | 'done'
}

const ButtonAppearanceBase: React.FC<ButtonAppearanceProps> = () => null
const ButtonAppearancePlain: React.FC<ButtonAppearanceProps> = () => null
const ButtonAppearanceDone: React.FC<ButtonAppearanceProps> = () => null

export const ButtonAppearance = Object.assign(ButtonAppearanceBase, {
  Plain: ButtonAppearancePlain,
  Done: ButtonAppearanceDone
})

export function processButtonAppearance(
  element: React.ReactElement<ButtonAppearanceProps>
): any {
  const props = element.props
  const final: ProcessedButtonAppearanceValue = { ...(props as any) }
  if (element.type === ButtonAppearancePlain) {
    final._configure = 'plain'
  } else if (element.type === ButtonAppearanceDone) {
    final._configure = 'done'
  }

  if (props.normal) final.normal = processButtonStateAppearance(props.normal)
  if (props.highlighted)
    final.highlighted = processButtonStateAppearance(props.highlighted)
  if (props.disabled)
    final.disabled = processButtonStateAppearance(props.disabled)
  if (props.focused) final.focused = processButtonStateAppearance(props.focused)

  return final
}
