import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaRegHeart} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Navigation from '../Navigation'
import GamingVideoItem from '../GameVideoItem'

import {
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureDescription,
  RetryButton,
  GameContainer,
  GameTitle,
  GameIconContainer,
  GamingText,
  GamingList,
  LoaderContainer,
} from './style'

import NextContext from '../../context/NextContext'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Game extends Component {
  state = {gamingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchGameVideos()
  }

  fetchGameVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const result = await response.json()
      console.log(result)
      const updatedData = result.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewsCount: each.view_count,
      }))
      this.setState({
        gamingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <NextContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const Color = isLightTheme ? '#000000' : '#ffffff'
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color={Color} height="50" width="50" />
          </div>
        )
      }}
    </NextContext.Consumer>
  )

  onRetry = () => {
    this.fetchGameVideos()
  }

  renderFailureView = () => (
    <NextContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const bgColor = isLightTheme ? '#f9f9f9' : '#181818'
        const color = isLightTheme ? '#000000' : '#ffffff'
        return (
          <FailureContainer bgColor={bgColor}>
            <FailureImage
              src={
                isLightTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              }
              alt="failure view"
            />
            <FailureHeading color={color}>
              Oops! Something Went Wrong
            </FailureHeading>
            <FailureDescription color={color}>
              We are having some trouble to complete your request. Please try
              again.
            </FailureDescription>
            <RetryButton type="button" onClick={this.onRetry}>
              Retry
            </RetryButton>
          </FailureContainer>
        )
      }}
    </NextContext.Consumer>
  )

  renderSuccessView = () => {
    const {gamingVideos} = this.state
    return (
      <GamingList>
        {gamingVideos.map(each => (
          <GamingVideoItem key={each.id} gameDetails={each} />
        ))}
      </GamingList>
    )
  }

  renderGamingVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <NextContext.Consumer>
        {value => {
          const {isLightTheme, toggleTheme} = value
          const bgColor = isLightTheme ? '#f9f9f9' : '#0f0f0f'
          const textColor = isLightTheme ? '#0f0f0f' : '#f9f9f9'

          const onClickTheme = () => {
            toggleTheme()
          }

          return (
            <div data-testid="gaming">
              <Header />
              <Navigation />
              <GameContainer
                data-testid="gaming"
                style={{backgroundColor: bgColor}}
                onClick={onClickTheme}
              >
                <GameTitle>
                  <GameIconContainer>
                    <FaRegHeart size={35} color="#ff0000" />
                  </GameIconContainer>
                  <GamingText color={textColor}>Gaming</GamingText>
                </GameTitle>
                {this.renderGamingVideos()}
              </GameContainer>
            </div>
          )
        }}
      </NextContext.Consumer>
    )
  }
}

export default Game
