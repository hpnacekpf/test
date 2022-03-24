import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactNotificationsSystem from 'react-notification-system-redux'
import Icon from 'antd/lib/icon'
import { notification } from 'constants/index'

class Notification extends Component {
  render() {
    const { notifications } = this.props
    let alert = []
    if (notifications && notifications.length > 0) {
      alert = notifications.map((x) => {
        let titleImage
        switch (x.level) {
          case notification.Success:
            titleImage = <Icon type="check" className="mr-3" />
            break
          case notification.Error:
            titleImage = (
              <img
                src={require('img/error-noti.png')}
                className="img-fluid mr-3"
                alt={'success'}
              />
            )
            break
          case notification.Warning:
            titleImage = (
              <img
                src={require('img/warning.png')}
                className="img-fluid mr-3"
                alt={'success'}
              />
            )
            break
          case notification.Info:
            titleImage = (
              <img
                src={require('img/info.png')}
                className="img-fluid mr-3"
                alt={'success'}
              />
            )
            break
          default:
            titleImage = x.title
            break
        }
        return {
          ...x,
          title: titleImage,
          autoDismiss: 2
        }
      })
    }
    const style = {
      Containers: {
        DefaultStyle: {
          position: 'fixed',
          zIndex: 999999
        },
        tr: {
          top: '10px',
          right: '10px',
          bottom: 'auto',
          left: 'auto'
        }
      },
      Title: {
        DefaultStyle: {
          fontSize: '14px',
          margin: 0,
          padding: 0,
          fontWeight: 'bold'
        },
        success: {
          color: '#3C763D'
        }
      },
      NotificationItem: {
        DefaultStyle: {
          position: 'relative',
          overflow: 'hidden',
          margin: '0 0 6px',
          padding: '15px',
          width: '300px',
          borderRadius: 0,
          borderWidth: 1,
          borderStyle: 'solid',
          backgroundPosition: '15px center',
          backgroundRepeat: 'no-repeat',
          boxShadow: 'none',
          fontWeight: '400',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          color: '#ffffff',
          fontFamily: 'Cabin, sans-serif'
        },
        success: {
          backgroundColor: '#CBF3DC',
          borderColor: '#9DE8BC',
          color: '#3C763D'
        },
        error: {
          backgroundColor: '#bd362f'
        },
        info: {
          backgroundColor: '#2f96b4'
        },
        warning: {
          backgroundColor: '#f89406'
        }
      },
      Dismiss: {
        DefaultStyle: {
          display: 'none'
        }
      }
    }
    return <ReactNotificationsSystem notifications={alert} style={style} />
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications
})

export default connect(
  mapStateToProps,
  null
)(Notification)
