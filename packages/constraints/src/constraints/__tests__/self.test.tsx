import { view } from '../view'
import { superview } from '../superview'

it('self constraints', () => {
  expect(view.bottom('equalTo', superview.bottom, 200)).toEqual({
    attribute: 'bottom',
    constant: 200,
    item: 'view',
    relatedBy: 'equalTo',
    toAttribute: 'bottom',
    toItem: 'superview'
  })
  expect(view.width('equalTo', view.height, 1, 0)).toEqual({
    attribute: 'width',
    constant: 0,
    item: 'view',
    multiplier: 1,
    relatedBy: 'equalTo',
    toAttribute: 'height',
    toItem: 'view'
  })
})
