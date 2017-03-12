import React, { Component, PropTypes } from 'react'
import autoBind from 'react-auto-bind'

export class Visibility extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.winOut = false
    this.timer = null
  }

  componentDidMount () {
    this.visibilityChange = null
    this.hiddenProp = null
    this.addVisibility()
  }

  componentWillUnmount () {
    if (this.visibilityChange) {
      document.removeEventListener(this.visibilityChange, this.onVisibilitychange, false)
    }
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  onVisibilitychange () {
    switch (document[this.hiddenProp]) {
      case 'visible':
        this.onWinFocus()
        break
      case 'hidden':
        this.onWinBlur()
        break
    }
  }

  onWinBlur () {
    this.winOut = true
    this.props.onWinBlur()
  }

  onWinFocus () {
    if (this.winOut) {
      this.winOut = false
      this.props.onWinFocus()
    }
  }

  isHidden () {
    return document[this.hiddenProp] === 'hidden'
  }

  iOSFallback () {
    if (document.body.dataset.os === 'iOS') {
      this.onWinBlur()
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.timer = setInterval(this.onWinFocus, 3000)
    }
  }

  addVisibility () {
    if (this.visibilityChange) {
      document.removeEventListener(this.visibilityChange, this.onVisibilitychange, false)
    }

    let hidden, visibilityState, visibilityChange

    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden'
      visibilityChange = 'visibilitychange'
      visibilityState = 'visibilityState'
    } else if (typeof document.mozHidden !== 'undefined') {
      hidden = 'mozHidden'
      visibilityChange = 'mozvisibilitychange'
      visibilityState = 'mozVisibilityState'
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden'
      visibilityChange = 'msvisibilitychange'
      visibilityState = 'msVisibilityState'
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden'
      visibilityChange = 'webkitvisibilitychange'
      visibilityState = 'webkitVisibilityState'
    }

    if (typeof document.addEventListener === 'undefined' || typeof hidden === 'undefined') {
      return
    }

    this.visibilityChange = visibilityChange
    this.hiddenProp = visibilityState

    document.addEventListener(visibilityChange, this.onVisibilitychange, false)
  }
  render () {
    return (
      <div />
    )
  }
}

Visibility.propTypes = {
  onWinFocus: PropTypes.func,
  onWinBlur: PropTypes.func
}

Visibility.defaultProps = {
  onWinFocus: () => {},
  onWinBlur: () => {}
}

export default Visibility
