import { ButtonStateAppearance } from './ButtonStateAppearance'

interface ReturnValue {
  normal?: ButtonStateAppearance
  highlighted?: ButtonStateAppearance
  disabled?: ButtonStateAppearance
  focused?: ButtonStateAppearance
  configure?: 'plain' | 'done'
}

export class ButtonAppearance {
  public normal?: ButtonStateAppearance
  public highlighted?: ButtonStateAppearance
  public disabled?: ButtonStateAppearance
  public focused?: ButtonStateAppearance

  static plain(): ButtonAppearance {
    return new PlainButtonAppearance()
  }

  static done(): ButtonAppearance {
    return new DoneButtonAppearance()
  }
}

class PlainButtonAppearance extends ButtonAppearance {
  public _configure = 'plain'
}

class DoneButtonAppearance extends ButtonAppearance {
  public _configure = 'done'
}

export function processButtonAppearance(
  buttonAppearance: ButtonAppearance
): ReturnValue {
  const returnValue: ReturnValue = {}
  if (buttonAppearance.normal) returnValue.normal = buttonAppearance.normal
  if (buttonAppearance.highlighted)
    returnValue.highlighted = buttonAppearance.highlighted
  if (buttonAppearance.disabled)
    returnValue.disabled = buttonAppearance.disabled
  if (buttonAppearance.focused) returnValue.focused = buttonAppearance.focused
  if ((buttonAppearance as any)._configure)
    returnValue.configure = (buttonAppearance as any)._configure
  return returnValue
}
