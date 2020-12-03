import {
  MathOperation,
  ProcessedMathOperation,
  MathContext,
  MathValue
} from '../typings/Math'

function add(
  ...args: Array<number | MathValue | ProcessedMathOperation>
): ProcessedMathOperation {
  return {
    operation: 'add',
    values: args
  }
}

function mul(
  ...args: Array<number | MathValue | ProcessedMathOperation>
): ProcessedMathOperation {
  return {
    operation: 'mul',
    values: args
  }
}

function div(
  ...args: Array<number | MathValue | ProcessedMathOperation>
): ProcessedMathOperation {
  return {
    operation: 'div',
    values: args
  }
}

function sub(
  ...args: Array<number | MathValue | ProcessedMathOperation>
): ProcessedMathOperation {
  return {
    operation: 'sub',
    values: args
  }
}

const context: MathContext = {
  add,
  mul,
  div,
  sub,
  window: {
    dimensions: {
      width: {
        item: 'window',
        property: 'dimensions',
        attribute: 'width'
      },
      height: {
        item: 'window',
        property: 'dimensions',
        attribute: 'height'
      }
    },
    margin: {
      top: {
        item: 'window',
        property: 'margin',
        attribute: 'top'
      },
      left: {
        item: 'window',
        property: 'margin',
        attribute: 'left'
      },
      bottom: {
        item: 'window',
        property: 'margin',
        attribute: 'bottom'
      },
      right: {
        item: 'window',
        property: 'margin',
        attribute: 'right'
      }
    },
    safeArea: {
      top: {
        item: 'window',
        property: 'safeArea',
        attribute: 'top'
      },
      left: {
        item: 'window',
        property: 'safeArea',
        attribute: 'left'
      },
      bottom: {
        item: 'window',
        property: 'safeArea',
        attribute: 'bottom'
      },
      right: {
        item: 'window',
        property: 'safeArea',
        attribute: 'right'
      }
    }
  },
  superview: {
    dimensions: {
      width: {
        item: 'superview',
        property: 'dimensions',
        attribute: 'width'
      },
      height: {
        item: 'superview',
        property: 'dimensions',
        attribute: 'height'
      }
    },
    margin: {
      top: {
        item: 'superview',
        property: 'margin',
        attribute: 'top'
      },
      left: {
        item: 'superview',
        property: 'margin',
        attribute: 'left'
      },
      bottom: {
        item: 'superview',
        property: 'margin',
        attribute: 'bottom'
      },
      right: {
        item: 'superview',
        property: 'margin',
        attribute: 'right'
      }
    },
    safeArea: {
      top: {
        item: 'superview',
        property: 'safeArea',
        attribute: 'top'
      },
      left: {
        item: 'superview',
        property: 'safeArea',
        attribute: 'left'
      },
      bottom: {
        item: 'superview',
        property: 'safeArea',
        attribute: 'bottom'
      },
      right: {
        item: 'superview',
        property: 'safeArea',
        attribute: 'right'
      }
    }
  },
  view: {
    dimensions: {
      width: {
        item: 'view',
        property: 'dimensions',
        attribute: 'width'
      },
      height: {
        item: 'view',
        property: 'dimensions',
        attribute: 'height'
      }
    },
    margin: {
      top: {
        item: 'view',
        property: 'margin',
        attribute: 'top'
      },
      left: {
        item: 'view',
        property: 'margin',
        attribute: 'left'
      },
      bottom: {
        item: 'view',
        property: 'margin',
        attribute: 'bottom'
      },
      right: {
        item: 'view',
        property: 'margin',
        attribute: 'right'
      }
    },
    safeArea: {
      top: {
        item: 'view',
        property: 'safeArea',
        attribute: 'top'
      },
      left: {
        item: 'view',
        property: 'safeArea',
        attribute: 'left'
      },
      bottom: {
        item: 'view',
        property: 'safeArea',
        attribute: 'bottom'
      },
      right: {
        item: 'view',
        property: 'safeArea',
        attribute: 'right'
      }
    }
  }
}

export function processMathOperation(
  operation: MathOperation
): ProcessedMathOperation | MathValue | number {
  return operation(context)
}
