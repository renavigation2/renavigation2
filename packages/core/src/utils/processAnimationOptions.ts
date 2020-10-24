import { AnimationOptions } from '../ios/typings/AnimationOptions'
import { processBoolean, ProcessedBoolean } from './processBoolean'

export interface ProcessedAnimationOptions {
  animated?: ProcessedBoolean
  duration?: number
  delay?: number
  curve?: 'easeInOut' | 'easeIn' | 'easeOut' | 'linear'
  damping?: number
  velocity?: number
}

export function processAnimationOptions(
  options?: AnimationOptions | null
): ProcessedAnimationOptions | undefined {
  if (options) {
    return {
      ...options,
      animated: processBoolean(options.animated)
    }
  }
  return undefined
}
