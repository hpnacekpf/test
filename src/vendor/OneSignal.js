export const initializeOneSignal = (OneSignal, appId) => {
  OneSignal.push(function() {
    OneSignal.init({
      appId: appId,
      notifyButton: {
        enable: true
      },
      allowLocalhostAsSecureOrigin: true
    })
    //OneSignal.showNativePrompt();
  })
}

export const subscribeOneSignal = (OneSignal, setPlayIds) => {
  OneSignal.push(function() {
    OneSignal.isPushNotificationsEnabled(function(isEnabled) {
      console.log('isEnabled subscribed user is : ' + isEnabled)
      if (isEnabled) {
        OneSignal.getUserId(function(userId) {
          setPlayIds(userId)
          console.log('player_id of the subscribed user is : ' + userId)
        })
      } else {
        // OneSignal.showSlidedownPrompt();
      }
    })
  })

  OneSignal.push(function() {
    OneSignal.on('subscriptionChange', function(isSubscribed) {
      console.log("The user's subscription state is now: " + isSubscribed)
      OneSignal.push(function() {
        OneSignal.getUserId(function(userId) {
          setPlayIds(userId)
          console.log('OneSignal User ID:', userId)
        })
      })
    })
  })
}
