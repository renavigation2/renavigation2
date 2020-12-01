export interface ProcessedMathOperation {
  operation: 'add' | 'mul' | 'div' | 'sub'
  values: Array<number | MathValue | ProcessedMathOperation>
}

export type MathValueItem = 'window' | 'view' | 'superview'
export type MathValueProperty = 'margin' | 'safeArea'

export interface MathValue {
  item: MathValueItem
  property: MathValueProperty
  attribute: 'top' | 'left' | 'bottom' | 'right'
}

export interface MathItemPropertyValues<
  Item extends MathValueItem,
  Property extends MathValueProperty
> {
  top: {
    item: Item
    property: Property
    attribute: 'top'
  }
  left: {
    item: Item
    property: Property
    attribute: 'left'
  }
  bottom: {
    item: Item
    property: Property
    attribute: 'bottom'
  }
  right: {
    item: Item
    property: Property
    attribute: 'right'
  }
}

export interface MathContext {
  add: (
    ...args: Array<number | MathValue | ProcessedMathOperation>
  ) => ProcessedMathOperation
  mul: (
    ...args: Array<number | MathValue | ProcessedMathOperation>
  ) => ProcessedMathOperation
  div: (
    ...args: Array<number | MathValue | ProcessedMathOperation>
  ) => ProcessedMathOperation
  sub: (
    ...args: Array<number | MathValue | ProcessedMathOperation>
  ) => ProcessedMathOperation
  window: {
    margin: MathItemPropertyValues<'window', 'margin'>
    safeArea: MathItemPropertyValues<'window', 'safeArea'>
  }
  superview: {
    margin: MathItemPropertyValues<'superview', 'margin'>
    safeArea: MathItemPropertyValues<'superview', 'safeArea'>
  }
  view: {
    margin: MathItemPropertyValues<'view', 'margin'>
    safeArea: MathItemPropertyValues<'view', 'safeArea'>
  }
}

export type MathOperation = (
  context: MathContext
) => ProcessedMathOperation | MathValue | number
