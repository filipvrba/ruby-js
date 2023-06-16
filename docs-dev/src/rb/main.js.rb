import '../css/bootstrap.min.css'
import '../css/style.css'

import './constants'
import './objects'
import './elements'

import './core/events'

document.querySelector('#app').innerHTML = """
<div class='py-3'>
  <elm-header></elm-header>
  <main>
    <elm-content></elm-content>
  </main>
  <elm-footer></elm-footer>
</div>
"""
