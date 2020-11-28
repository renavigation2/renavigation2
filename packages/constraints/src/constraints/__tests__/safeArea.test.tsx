import { view } from '../view'
import { safeArea } from '../safeArea'

it('safeArea constraints', () => {
  expect(safeArea.bottom('equalTo', view.bottom, 0)).toEqual({
    attribute: 'bottom',
    constant: 0,
    item: 'safeArea',
    relatedBy: 'equalTo',
    toAttribute: 'bottom',
    toItem: 'view'
  })
  expect(safeArea.centerX('equalTo', view.left)).toEqual({
    attribute: 'centerX',
    item: 'safeArea',
    relatedBy: 'equalTo',
    toAttribute: 'left',
    toItem: 'view'
  })
})
