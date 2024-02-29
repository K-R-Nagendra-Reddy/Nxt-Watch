import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import Navigation from '../Navigation'
import NextContext from '../../context/NextContext'
import TrendingVideoItem from '../TrendingVideoItem'

import {
  TrendingContainer,
  TitleIconContainer,
  TrendingVideoTitle,
  TrendingVideoList,
  TrendingText,
  LoaderContainer,
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureDescription,
  RetryButton,
} from './style'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {trendingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchTrendingVideos()
  }

  fetchTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/videos/trending'

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const result = await response.json()
      console.log(result)
      const updatedResult = result.videos.map(each => ({
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewsCount: each.view_count,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      }))
      this.setState({
        trendingVideos: updatedResult,
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
          <LoaderContainer data-testid="loader">
            <Loader type="ThreeDots" color={Color} height="50" width="50" />
          </LoaderContainer>
        )
      }}
    </NextContext.Consumer>
  )

  onRetry = () => {
    this.fetchTrendingVideos()
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
    const {trendingVideos} = this.state
    return (
      <TrendingVideoList>
        {trendingVideos.map(each => (
          <TrendingVideoItem key={each.id} videoDetails={each} />
        ))}
      </TrendingVideoList>
    )
  }

  renderTrendingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <NextContext.Consumer>
        {value => {
          const {isLightTheme, toggleTheme} = value
          const bgColor = isLightTheme ? '#f9f9f9' : '#0f0f0f'
          const textColor = isLightTheme ? '#0f0f0f' : '#f9f9f9'

          const onClickToggle = () => {
            toggleTheme()
          }

          return (
            <div data-testid="trending">
              <Header />
              <Navigation />
              <TrendingContainer
                data-testid="trending"
                style={{backgroundColor: bgColor}}
                onClick={onClickToggle}
              >
                <TrendingVideoTitle>
                  <TitleIconContainer>
                    <HiFire size={35} color="#ff0000" />
                  </TitleIconContainer>
                  <TrendingText color={textColor}>Trending</TrendingText>
                </TrendingVideoTitle>
                {this.renderTrendingVideos()}
              </TrendingContainer>
            </div>
          )
        }}
      </NextContext.Consumer>
    )
  }
}

export default Trending
