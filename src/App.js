
import './App.scss';
import 'carbon-components/scss/globals/scss/styles.scss';


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Search } from 'carbon-components-react';
import * as userinfoActions from './actions/userinfo';

import Header from './containers/header/header';
import Sidebar from './containers/sidebar/sidebar';
import Container from './container/container';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Header titleArr={this.props.userinfo.sidebarData} />
          <div className="sidebar-out">
            <Sidebar sidebarArr={this.props.userinfo.sidebarData} action={this.props.userinfoActions} />
          </div>
          <div className="main">
            <div className="search-title">
              <Search small={true} placeHolderText="search" />
            </div>
            <div className="main-content" >
              <Container data={this.props.userinfo} action={this.props.userinfoActions} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch('/sidebar/sidebar.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.userinfoActions.login({
          sidebarData: responseJson
        })
      })
  }

}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userinfoActions: bindActionCreators(userinfoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
