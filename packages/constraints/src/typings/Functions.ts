import { Attribute } from './Attribute'
import { MathOperation } from './Math'
import { ProcessedConstraint } from './ProcessedConstraint'
import {
  ConstantRelation,
  MultiplierRelationX,
  MultiplierRelationY
} from './Relation'

export interface ViewXAxisFunction {
  (
    relatedBy: ConstantRelation,
    item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
    constant?: number | MathOperation
  ): ProcessedConstraint
  (
    relatedBy: MultiplierRelationX,
    item: SuperviewXAxisFunction | SafeAreaXAxisFunction,
    multiplier: number | MathOperation
  ): ProcessedConstraint
  item: 'view'
  attribute: Attribute
  xAxis: true
}

export interface ViewYAxisFunction {
  (
    relatedBy: ConstantRelation,
    item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
    constant?: number | MathOperation
  ): ProcessedConstraint
  (
    relatedBy: MultiplierRelationY,
    item: SuperviewYAxisFunction | SafeAreaYAxisFunction,
    multiplier: number | MathOperation
  ): ProcessedConstraint
  item: 'view'
  attribute: Attribute
  yAxis: true
}

export interface ViewDimensionFunction {
  (
    relatedBy: ConstantRelation,
    constant: number | MathOperation
  ): ProcessedConstraint
  (
    relatedBy: ConstantRelation,
    item: ViewDimensionFunction | SuperviewDimensionFunction,
    multiplier?: number | MathOperation,
    constant?: number | MathOperation
  ): ProcessedConstraint
  item: 'view'
  attribute: Attribute
  dimension: true
}

export interface SuperviewXAxisFunction {
  (
    relatedBy: ConstantRelation,
    item: ViewXAxisFunction | SafeAreaXAxisFunction,
    constant?: number | MathOperation
  ): ProcessedConstraint
  (
    relatedBy: MultiplierRelationX,
    item: ViewXAxisFunction | SafeAreaXAxisFunction,
    multiplier: number | MathOperation
  ): ProcessedConstraint
  item: 'superview'
  attribute: Attribute
  xAxis: true
}

export interface SuperviewYAxisFunction {
  (
    relatedBy: ConstantRelation,
    item: ViewYAxisFunction | SafeAreaYAxisFunction,
    constant?: number | MathOperation
  ): ProcessedConstraint
  (
    relatedBy: MultiplierRelationY,
    item: ViewYAxisFunction | SafeAreaYAxisFunction,
    multiplier: number | MathOperation
  ): ProcessedConstraint
  item: 'superview'
  attribute: Attribute
  yAxis: true
}

export interface SuperviewDimensionFunction {
  (
    relatedBy: ConstantRelation,
    constant: number | MathOperation
  ): ProcessedConstraint
  (
    relatedBy: ConstantRelation,
    item: ViewDimensionFunction | SuperviewDimensionFunction,
    multiplier?: number | MathOperation,
    constant?: number | MathOperation
  ): ProcessedConstraint
  item: 'superview'
  attribute: Attribute
  dimension: true
}

export interface SafeAreaXAxisFunction {
  (
    relatedBy: ConstantRelation,
    item: ViewXAxisFunction | SuperviewXAxisFunction,
    constant?: number | MathOperation
  ): ProcessedConstraint
  (
    relatedBy: MultiplierRelationX,
    item: ViewXAxisFunction | SuperviewXAxisFunction,
    multiplier: number | MathOperation
  ): ProcessedConstraint
  item: 'safeArea'
  attribute: Attribute
  xAxis: true
}

export interface SafeAreaYAxisFunction {
  (
    relatedBy: ConstantRelation,
    item: ViewYAxisFunction | SuperviewYAxisFunction,
    constant?: number | MathOperation
  ): ProcessedConstraint
  (
    relatedBy: MultiplierRelationY,
    item: ViewYAxisFunction | SuperviewYAxisFunction,
    multiplier: number | MathOperation
  ): ProcessedConstraint
  item: 'safeArea'
  attribute: Attribute
  yAxis: true
}
