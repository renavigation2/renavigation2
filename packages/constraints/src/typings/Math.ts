export interface ProcessedMathOperation {
  operation: 'add' | 'mul' | 'div' | 'sub'
  values: Array<number | MathValue | ProcessedMathOperation>
}

export type MathValueItem = 'window' | 'view' | 'superview'
export type MathValueProperty = 'margin' | 'safeArea' | 'dimensions'

export interface MathValue {
  item: MathValueItem
  property: MathValueProperty
  attribute: 'top' | 'left' | 'bottom' | 'right' | 'width' | 'height'
}

export interface MathEdgeInsetsValues<
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

export interface MathDimensionsValues<Item extends MathValueItem> {
  width: {
    item: Item
    property: 'dimensions'
    attribute: 'width'
  }
  height: {
    item: Item
    property: 'dimensions'
    attribute: 'height'
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
    dimensions: MathDimensionsValues<'window'>
    margin: MathEdgeInsetsValues<'window', 'margin'>
    safeArea: MathEdgeInsetsValues<'window', 'safeArea'>
  }
  superview: {
    dimensions: MathDimensionsValues<'superview'>
    margin: MathEdgeInsetsValues<'superview', 'margin'>
    safeArea: MathEdgeInsetsValues<'superview', 'safeArea'>
  }
  view: {
    dimensions: MathDimensionsValues<'view'>
    margin: MathEdgeInsetsValues<'view', 'margin'>
    safeArea: MathEdgeInsetsValues<'view', 'safeArea'>
  }
}

export type MathOperation = (
  context: MathContext
) => ProcessedMathOperation | MathValue | number
