import React from 'react'
import { connect } from 'react-redux'

function App() {
    return(
        <div>Hello~</div>
    )
}

export default connect(
    function mapStoreToProps() {},
    function mapDispatchToProps() {}
)(App)