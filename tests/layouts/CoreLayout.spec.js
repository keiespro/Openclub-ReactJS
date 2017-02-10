import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { CoreLayout } from 'layouts/CoreLayout/CoreLayout'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<CoreLayout {...props} />)
}

describe('(Layout) Core', function () {
  let _component
  let _props
  let _child

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    // TODO: deal with apis in tests
    _props = {
      children : _child,
      users: {
        loading: false,
        data: {
          profile_picture: ''
        }
      }
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })
})
