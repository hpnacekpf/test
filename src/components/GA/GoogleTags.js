let initialized = false;
let debug = false;

const verifyInit = () => {
  if (!initialized) {
    console.warn(
      'Google tags not initialized before using call GoogleTags.init with required params',
    );
  }
  return initialized;
};

export default {
  //function init google tags
  init() {
    initialized = (typeof window !== 'undefined') && !!window.dataLayer;
  },

  trackEvent(data){
    console.log('trackEvent......................')
    if (!verifyInit()) {
      return;
    }
    console.log('data......................', verifyInit(), data)
    if(data && data.length > 0){
      data.map(item => {
        window.dataLayer.push(item);
      })
    }

    if (debug) {
      console.log(`called gtag('event', '${event}');`);
      if (data) {
        console.log('with data', data);
      }
    }
    return false;

  }
}
