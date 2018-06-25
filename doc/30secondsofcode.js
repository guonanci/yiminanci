// arr
const take = (arr, n = 1) => arr.slice(0, n)
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length)
const without = (arr, ...args) => arr.filter(v => !args.includes(v))


// browser
const bottomVisible = () => document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
const createElement = str => {
  const el = document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}
const detectDeviceType = () => /Andriod|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
const elementContains = (parent, child) => parent !== child && parent.contains(child)
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
})
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName]
// getStyle(document.querySelector('p'), 'font-size') // '16px'
const hasClass = (el, className) => el.classList.contains(className)
const httpsRedirect = () => {
  if (location.protocal !== 'https:') {
    location.replace('https://' + location.href.split('//')[1])
  }
}
const isBrowserTabFocused = () => !document.hidden
const nodeListToArr = nodeList => Array.prototype.slice.call(nodeLiset)
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts)
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
const setStyle = (el, ruleName, val) => (el.style[ruleName] = val)
const show = (...el) => [...el].forEach(e => (e.style.display = ''))
const smoothScroll = el => document.querySelector(el).scrollIntoView({ behavior: 'smooth' })
const toggleClass = (el, className) => el.classList.toggle(className)


// date
const getColonTimeFromDate = (date = new Date()) => date.toTimeString().slice(0, 8)
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24)


// function
const attempt = (fn, ...args) => {
  try {
    return fn(...args)
  } catch (e) {
    return e instanceof Error ? e : new Error(e)
  }
}
const bind = (fn, context, ...args) => () => fn.apply(context, args.concat(...arguments))
const chainAsync = fns => {
  let curr = 0
  const next = () => fns[curr++](next)
  next()
}
