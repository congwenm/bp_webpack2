import moment from 'moment'
// import styles from './assets/stylesheets/application.css';
// import "normalize.css"; // work due to resolve
import styles from './style.css'

var rightNow = moment().format('MMMM do YYYY, h:mm:ss a')

console.log(rightNow)

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Hello world</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
