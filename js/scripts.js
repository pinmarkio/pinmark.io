import Typed from 'typed.js'
import smoothscroll from 'smoothscroll-polyfill'

const typeStrings = [
  'best french food in the city',
  'shortcut to the beach',
  'bar with literally 50 beers on tap',
  'nice tea place in Petit Socco',
  'store open 24/7',
  'square where all the food trucks go',
  'makeout spot in the park'
]

const shuffle = array => array.sort(() => Math.random() - 0.5)

const typeahead = element => {
  new Typed(element, {
    strings: shuffle(typeStrings),
    typeSpeed: 45,
    backSpeed: 20,
    startDelay: 150,
    backDelay: 800,
    loop: true,
    showCursor: false
  })
}

const scrollTo = event => {
  if (!event.target.dataset || !event.target.dataset.scrollId) return
  const to = document.getElementById(event.target.dataset.scrollId)

  to.scrollIntoView({ behavior: 'smooth' })
}

const setSmoothscrolls = () => {
  const smoothScrolls = document.querySelectorAll('.smoothscroll')

  for (const el of smoothScrolls) {
    el.addEventListener('click', scrollTo)
    pluginRefs.push({ type: 'smoothscroll', ref: el })
  }
}

const init = () => {
  typeahead('#type-places')
  setSmoothscrolls()
}

init()
