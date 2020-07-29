import { computeScore } from './computeScore'
import { stableSort } from './stableSort'
import { compareIndexes } from './compareIndexes'
import { RouteBranch } from '../typings/RouteBranch'

export function rankRouteBranches(branches: RouteBranch[]): void {
  const pathScores = branches.reduce<Record<string, number>>((memo, [path]) => {
    memo[path] = computeScore(path)
    return memo
  }, {})

  // Sorting is stable in modern browsers, but we still support IE 11, so we
  // need this little helper.
  stableSort(branches, (a, b) => {
    const [aPath, , aIndexes] = a
    const aScore = pathScores[aPath]

    const [bPath, , bIndexes] = b
    const bScore = pathScores[bPath]

    return aScore !== bScore
      ? bScore - aScore // Higher score first
      : compareIndexes(aIndexes, bIndexes)
  })
}
