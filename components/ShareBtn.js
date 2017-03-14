import React from 'react'
import Visibility from './visibility'
import autoBind from 'react-auto-bind'

class SharePopup extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  copyClicked (e) {
    const t = e.currentTarget
    const c = t.dataset.copytarget
    const inp = (c ? document.querySelector(c) : null)

    if (inp && inp.select) {
      inp.select()
      try {
        document.execCommand('copy')
        inp.blur()
      } catch (err) {
        alert('Please copy manually')
      }
    }
    this.props.sharedBy('copy')
  }

  whatsappClicked (e) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let link = ''
    if (/android/i.test(userAgent)) {
      link = 'https://play.google.com/store/apps/details?id=com.whatsapp'
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      link = 'https://itunes.apple.com/app/id310633997'
    }
    const delay = 1000
    const start = new Date().getTime()
    setTimeout(() => {
      var end = new Date().getTime()
      if ((this.visibility && this.visibility.isHidden()) || (end - start >= delay * 2)) return
      window.open(link, '_blank')
    }, delay)
    this.props.sharedBy('whatsapp')
  }

  fbClicked () {
    this.props.sharedBy('fb')
  }

  twitterClicked () {
    this.props.sharedBy('twitter')
  }

  gmailClicked () {
    this.props.sharedBy('gmail')
  }

  render () {
    const text = this.props.text + ' ' + this.props.url
    const gmailURL = `https://mail.google.com/mail/u/0/?view=cm&ui=2&tf=0&fs=1&su=${this.props.text}&body=Check out this awesome property %0A${this.props.url}`
    return (
      <div className='share-popup'>
        {this.props.shareModalOpen && <Visibility ref={(node) => { this.visibility = node }} />}
        <a className='sp-tab' href={`whatsapp://send?text=${text}`} onClick={this.whatsappClicked}>
          <div className='icon whatsapp' />
          <span className='text'>WhatsApp</span>
        </a>
        <a className='sp-tab' href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(this.props.url)}&p[title]=${encodeURIComponent(this.props.text)}`} onClick={this.fbClicked} target='_blank'>
          <div className='icon fb' />
          <span className='text'>Facebook</span>
        </a>
        <a className='sp-tab' href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.props.text)}&url=${encodeURIComponent(this.props.url)}`} onClick={this.twitterClicked} target='_blank'>
          <div className='icon twitter' />
          <span className='text'>Twitter</span>
        </a>
        <a className='sp-tab' href={gmailURL} onClick={this.gmailClicked} target='_blank'>
          <div className='icon gmail' />
          <span className='text'>Mail</span>
        </a>
        <div className='sp-tab copy' onClick={this.copyClicked} data-copytarget='#url'>
          <div className='copy-input'>
            <input type='text' id='url' defaultValue={this.props.url} readOnly />
          </div>
          <div>
            <div className='icon copy' />
            <span className='text'>Copy to clipboard</span>
          </div>
        </div>
      </div>
    )
  }
}

export default class ShareBtn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shareModalOpen: false
    }
    this.toggleShare = this.toggleShare.bind(this)
  }

  toggleShare () {
    if (!this.state.shareModalOpen && this.props.onShareBtnClick) {
      this.props.onShareBtnClick()
    }
    if (navigator && navigator.share !== undefined) {
      navigator.share({
        title: this.props.text,
        text: this.props.text + this.props.url,
        url: this.props.url
      }).then(() => console.log('Successful share'))
      .catch(error => console.log('Error sharing:', error))
    } else {
      document.body.style.overflow = !this.state.shareModalOpen ? 'hidden' : 'auto'
      this.setState({shareModalOpen: !this.state.shareModalOpen})
    }
  }

  render () {
    return (
      <div className={`share-btn ${this.props.className}`}>
        <div onClick={this.toggleShare}>
          {this.props.displayText}
        </div>
        <div className={`share-modal ${this.state.shareModalOpen ? 'open' : ''}`}>
          <div className='overlay' onClick={this.toggleShare} />
          <SharePopup {...this.props} toggleShare={this.toggleShare} shareModalOpen={this.state.shareModalOpen} />
        </div>
      </div>
    )
  }
}

ShareBtn.propTypes = {
  url: React.PropTypes.string,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  displayText: React.PropTypes.string,
  onShareBtnClick: React.PropTypes.func
}

ShareBtn.defaultProps = {
  url: '',
  text: '',
  className: '',
  displayText: 'Share',
  onShareBtnClick: () => {}
}

SharePopup.propTypes = {
  url: React.PropTypes.string,
  text: React.PropTypes.string,
  shareModalOpen: React.PropTypes.bool,
  toggleShare: React.PropTypes.func,
  sharedBy: React.PropTypes.func
}

ShareBtn.defaultProps = {
  sharedBy: (medium) => {
    console.log('Shared via ', medium)
  }
}
