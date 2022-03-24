export function getNodeRect (node) {
  let boundingNode = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  }
  if (node) {
   const {
      top,
      right,
      bottom,
      left,
      width,
      height,
    } = node.getBoundingClientRect() 

    boundingNode.top = top

    boundingNode.right = right

    boundingNode.bottom = bottom

    boundingNode.left = left

    boundingNode.width = width

    boundingNode.height = height
  }

  // console.log('boundingNode....................', boundingNode)

  return boundingNode
}

export function inView ({ top, right, bottom, left, w, h, threshold = 0 }) {
  return (
    top >= 0 + threshold &&
    left >= 0 + threshold &&
    bottom <= h - threshold &&
    right <= w - threshold
  )
}

export function isBody (node) {
  return (
    node === document.querySelector('body') ||
    node === document.querySelector('html')
  )
}

export const isHoriz = pos => /(left|right)/.test(pos)
export const isOutsideX = (val, windowWidth) => val > windowWidth
export const isOutsideY = (val, windowHeight) => val > windowHeight
export const safe = sum => (sum < 0 ? 0 : sum)

export function bestPositionOf (positions) {
  return Object.keys(positions)
    .map(p => ({
      position: p,
      value: positions[p],
    }))
    .sort((a, b) => b.value - a.value)
    .map(p => p.position)
}

export function getWindow () {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  return { w, h }
}
