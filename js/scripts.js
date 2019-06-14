import '@babel/polyfill'
import 'whatwg-fetch'

import Typed from 'typed.js'
import smoothscroll from 'smoothscroll-polyfill'
import notie from 'notie'

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
  smoothscroll.polyfill()

  const smoothScrolls = document.querySelectorAll('.smoothscroll')
  for (const el of smoothScrolls) el.addEventListener('click', scrollTo)
}

const submitEmailForm = async event => {
  event.preventDefault()
  const { email: { value: email }, name: { value: name } } = event.target.form.elements
  const errors = []

  if (!name || name.trim() === '') errors.push('name')
  if (!email || email.trim() === '') errors.push('email')

  if (errors.length > 0) {
    notie.alert({
      type: 'warning',
      text: `Please make sure to enter a real ${errors.join(' and ')}!`
    })

    return
  }

  try {
      const request = await window.fetch('https://api.pinmark.io/notify_me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    })

    const response = await request.json()

    if (response.error) throw new Error('response.error')

    notie.alert({
      type: 'success',
      text: `Thanks ${name}! We'll be in touch! 👋`
    })
  } catch (error) {
    console.error(error)
    notie.alert({
      type: 'error',
      text: `Oops – something went wrong...`
    })
  }
}

const init = () => {
  typeahead('#type-places')
  setSmoothscrolls()

  document.getElementById('submit-email-form').addEventListener('click', submitEmailForm)
}

init()
