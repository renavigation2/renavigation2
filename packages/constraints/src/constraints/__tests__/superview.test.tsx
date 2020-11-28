import { view } from '../view'
import { superview } from '../superview'
import { safeArea } from '../safeArea'

it('self constraints', () => {
  expect(superview.left('equalTo', safeArea.right, 44)).toEqual({
    attribute: 'left',
    constant: 44,
    item: 'superview',
    relatedBy: 'equalTo',
    toAttribute: 'right',
    toItem: 'safeArea'
  })
  expect(superview.height('equalTo', view.height, 1, 0)).toEqual({
    attribute: 'height',
    constant: 0,
    item: 'superview',
    multiplier: 1,
    relatedBy: 'equalTo',
    toAttribute: 'height',
    toItem: 'view'
  })
})
