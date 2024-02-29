import {Component} from 'react'
import Popup from 'reactjs-popup'
import {IoIosClose} from 'react-icons/io'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {
  HomeContainer,
  PopupContainer,
  BannerLeftContainer,
  BannerLogo,
  BannerText,
  GetButton,
  CloseIcon,
  PopContainer,
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureDescription,
  RetryButton,
  InputContainer,
  SearchButton,
  InputElement,
} from './style'

import HomeVideos from '../HomeVideos'
import Header from '../Header'
import Navigation from '../Navigation'

import NextContext from '../../context/NextContext'

const overlayStyles = {
  top: 0,
}

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {homeVideos: [], searched: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchHomeVideos()
  }

  onClickSearchButton = () => {
    this.fetchHomeVideos()
  }

  fetchHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searched} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const url = `https://apis.ccbp.in/videos/all?search=${searched}`
    const response = await fetch(url, options)
    // console.log(response.ok)
    if (response.ok === true) {
      const result = await response.json()
      // console.log(result)
      const updatedData = result.videos.map(each => ({
        id: each.id,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewsCount: each.view_count,
      }))
      // console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        homeVideos: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searched: event.target.value})
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

  onRetry = () => {
    this.setState({searched: ''}, this.fetchHomeVideos)
  }

  renderSuccessView = () => {
    const {homeVideos} = this.state
    return <HomeVideos details={homeVideos} onRetry={this.onRetry} />
  }

  renderHomeVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searched} = this.state

    return (
      <>
        <Header />
        <Navigation />
        <HomeContainer data-testid="home">
          <PopContainer>
            <Popup open position="top left" overlayStyle={overlayStyles}>
              {close => (
                <PopupContainer>
                  <BannerLeftContainer data-testid="banner">
                    <BannerLogo
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                    />
                    <BannerText>
                      Buy Nxt Watch Premium prepaid plans with UPI
                    </BannerText>
                    <GetButton type="button">GET IT NOW</GetButton>
                  </BannerLeftContainer>
                  <CloseIcon
                    type="button"
                    onClick={() => close()}
                    data-testid="close"
                  >
                    <IoIosClose />
                  </CloseIcon>
                </PopupContainer>
              )}
            </Popup>
          </PopContainer>
          <InputContainer>
            <InputElement
              placeholder="Search"
              id="search"
              type="search"
              value={searched}
              onChange={this.onChangeSearch}
            />
            <SearchButton
              data-testid="searchButton"
              type="button"
              onClick={this.onClickSearchButton}
            >
              {' '}
              <FaSearch />
            </SearchButton>
          </InputContainer>

          {this.renderHomeVideos()}
        </HomeContainer>
      </>
    )
  }
}

export default Home
