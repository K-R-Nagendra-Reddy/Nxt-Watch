import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Game from './components/Game'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

import NextContext from './context/NextContext'

import './App.css'

class App extends Component {
  state = {isLightTheme: true, savedVideos: [], activeTab: 'Home'}

  changeTab = tab => {
    this.setState({activeTab: tab})
  }

  toggleTheme = () => {
    this.setState(prevState => ({isLightTheme: !prevState.isLightTheme}))
  }

  addVideo = video => {
    const {savedVideos} = this.state
    const index = savedVideos.findIndex(each => each.id === video.id)
    if (index === -1) {
      this.setState({savedVideos: [...savedVideos, video]})
    } else {
      savedVideos.splice(index, 1)
      this.setState({savedVideos})
    }
  }

  removeVideo = id => {
    const {savedVideos} = this.state
    const updatedSavedVideos = savedVideos.filter(each => each.id !== id)
    this.setState({savedVideos: updatedSavedVideos})
  }

  render() {
    console.log('this is app.js')
    const {savedVideos, isLightTheme, activeTab} = this.state

    return (
      <NextContext.Provider
        value={{
          isLightTheme,
          savedVideos,
          activeTab,
          toggleTheme: this.toggleTheme,
          changeTab: this.changeTab,
          addVideo: this.addVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Game} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </NextContext.Provider>
    )
  }
}

export default App
