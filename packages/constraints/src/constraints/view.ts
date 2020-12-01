import { processMathOperation } from '../math/processMathOperation'
import {
  SafeAreaXAxisFunction,
  SafeAreaYAxisFunction,
  SuperviewDimensionFunction,
  SuperviewXAxisFunction,
  SuperviewYAxisFunction,
  ViewDimensionFunction,
  ViewXAxisFunction,
  ViewYAxisFunction
} from '../typings/Functions'
import { MathOperation } from '../typings/Math'
import { ProcessedConstraint } from '../typings/ProcessedConstraint'
import {
  ConstantRelation,
  MultiplierRelationX,
  MultiplierRelationY
} from '../typings/Relation'

function left(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'left',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'left',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
left.item = 'view'
left.attribute = 'left'
left.xAxis = true

function right(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'right',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'right',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
right.item = 'view'
right.attribute = 'right'
right.xAxis = true

function leading(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'leading',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'leading',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
leading.item = 'view'
leading.attribute = 'leading'
leading.xAxis = true

function centerX(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'centerX',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'centerX',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
centerX.item = 'view'
centerX.attribute = 'centerX'
centerX.xAxis = true

function trailing(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'trailing',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'trailing',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
trailing.item = 'view'
trailing.attribute = 'trailing'
trailing.xAxis = true

function leftMargin(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'leftMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'leftMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
leftMargin.item = 'view'
leftMargin.attribute = 'leftMargin'
leftMargin.xAxis = true

function rightMargin(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'rightMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'rightMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
rightMargin.item = 'view'
rightMargin.attribute = 'rightMargin'
rightMargin.xAxis = true

function leadingMargin(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'leadingMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'leadingMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
leadingMargin.item = 'view'
leadingMargin.attribute = 'leadingMargin'
leadingMargin.xAxis = true

function centerXWithinMargins(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'centerXWithinMargins',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'centerXWithinMargins',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
centerXWithinMargins.item = 'view'
centerXWithinMargins.attribute = 'centerXWithinMargins'
centerXWithinMargins.xAxis = true

function trailingMargin(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'view',
      attribute: 'trailingMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'trailingMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
trailingMargin.item = 'view'
trailingMargin.attribute = 'trailingMargin'
trailingMargin.xAxis = true

function top(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'view',
      attribute: 'top',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'top',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
top.item = 'view'
top.attribute = 'top'
top.yAxis = true

function centerY(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'view',
      attribute: 'centerY',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'centerY',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
centerY.item = 'view'
centerY.attribute = 'centerY'
centerY.yAxis = true

function firstBaseline(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'view',
      attribute: 'firstBaseline',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'firstBaseline',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
firstBaseline.item = 'view'
firstBaseline.attribute = 'firstBaseline'
firstBaseline.yAxis = true

function lastBaseline(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'view',
      attribute: 'lastBaseline',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'lastBaseline',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
lastBaseline.item = 'view'
lastBaseline.attribute = 'lastBaseline'
lastBaseline.yAxis = true

function bottom(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'view',
      attribute: 'bottom',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'bottom',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
bottom.item = 'view'
bottom.attribute = 'bottom'
bottom.yAxis = true

function topMargin(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'view',
      attribute: 'topMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'topMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
topMargin.item = 'view'
topMargin.attribute = 'topMargin'
topMargin.yAxis = true

function bottomMargin(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'view',
      attribute: 'bottomMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'bottomMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
bottomMargin.item = 'view'
bottomMargin.attribute = 'bottomMargin'
bottomMargin.yAxis = true

function centerYWithinMargins(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'view',
      attribute: 'centerYWithinMargins',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'view',
    attribute: 'centerYWithinMargins',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
centerYWithinMargins.item = 'view'
centerYWithinMargins.attribute = 'centerYWithinMargins'
centerYWithinMargins.yAxis = true

function width(
  relatedBy: ConstantRelation,
  itemOrConstant:
    | ViewDimensionFunction
    | SuperviewDimensionFunction
    | number
    | MathOperation,
  multiplier?: number | MathOperation,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    typeof itemOrConstant === 'function' &&
    (itemOrConstant as ViewDimensionFunction).item
  ) {
    return {
      item: 'view',
      attribute: 'width',
      relatedBy: relatedBy,
      toItem: (itemOrConstant as ViewDimensionFunction).item,
      toAttribute: (itemOrConstant as ViewDimensionFunction).attribute,
      multiplier:
        typeof multiplier === 'function'
          ? processMathOperation(multiplier)
          : multiplier,
      constant:
        typeof constant === 'function'
          ? processMathOperation(constant)
          : constant
    }
  }
  return {
    item: 'view',
    attribute: 'width',
    relatedBy: relatedBy,
    toItem: undefined,
    toAttribute: undefined,
    constant:
      typeof itemOrConstant === 'function'
        ? processMathOperation(itemOrConstant! as MathOperation)
        : itemOrConstant!
  }
}
width.item = 'view'
width.attribute = 'width'
width.dimension = true

function height(
  relatedBy: ConstantRelation,
  itemOrConstant:
    | ViewDimensionFunction
    | SuperviewDimensionFunction
    | number
    | MathOperation,
  multiplier?: number | MathOperation,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    typeof itemOrConstant === 'function' &&
    (itemOrConstant as ViewDimensionFunction).item
  ) {
    return {
      item: 'view',
      attribute: 'height',
      relatedBy: relatedBy,
      toItem: (itemOrConstant as ViewDimensionFunction).item,
      toAttribute: (itemOrConstant as ViewDimensionFunction).attribute,
      multiplier:
        typeof multiplier === 'function'
          ? processMathOperation(multiplier)
          : multiplier,
      constant:
        typeof constant === 'function'
          ? processMathOperation(constant)
          : constant
    }
  }
  return {
    item: 'view',
    attribute: 'height',
    relatedBy: relatedBy,
    toItem: undefined,
    toAttribute: undefined,
    constant:
      typeof itemOrConstant === 'function'
        ? processMathOperation(itemOrConstant! as MathOperation)
        : itemOrConstant!
  }
}
height.item = 'view'
height.attribute = 'height'
height.dimension = true

export const view = {
  left: left as ViewXAxisFunction,
  right: right as ViewXAxisFunction,
  leading: leading as ViewXAxisFunction,
  centerX: centerX as ViewXAxisFunction,
  trailing: trailing as ViewXAxisFunction,
  leftMargin: leftMargin as ViewXAxisFunction,
  rightMargin: rightMargin as ViewXAxisFunction,
  leadingMargin: leadingMargin as ViewXAxisFunction,
  trailingMargin: trailingMargin as ViewXAxisFunction,
  top: top as ViewYAxisFunction,
  centerY: centerY as ViewYAxisFunction,
  firstBaseline: firstBaseline as ViewYAxisFunction,
  lastBaseline: lastBaseline as ViewYAxisFunction,
  bottom: bottom as ViewYAxisFunction,
  topMargin: topMargin as ViewYAxisFunction,
  bottomMargin: bottomMargin as ViewYAxisFunction,
  centerYWithinMargins: centerYWithinMargins as ViewYAxisFunction,
  width: width as ViewDimensionFunction,
  height: height as ViewDimensionFunction
}
