import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Navigation from '../Navigation'
import PlayVideoView from '../PlayVideoView'
import NextContext from '../../context/NextContext'

import {
  VideoItemDetailsViewContainer,
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

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: [],
    isLiked: false,
    isDisLiked: false,
  }

  componentDidMount() {
    this.fetchVideoDetails()
  }

  formattedData = data => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
  })

  fetchVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.formattedData(data)
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLiked = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisLiked: false,
    }))
  }

  onClickDisLiked = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
      isLiked: false,
    }))
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

  renderPlayVideoView = () => {
    const {videoDetails, isLiked, isDisLiked} = this.state
    return (
      <PlayVideoView
        videoDetails={videoDetails}
        clickLiked={this.onClickLiked}
        clickDisLiked={this.onClickDisLiked}
        clickSaved={this.onClickSaved}
        isLiked={isLiked}
        isDisLiked={isDisLiked}
      />
    )
  }

  onRetry = () => {
    this.fetchVideoDetails()
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

  renderVideoDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderPlayVideoView()
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
          const {isLightTheme} = value
          const bgColor = isLightTheme ? '#f9f9f9' : '#0f0f0f'
          return (
            <div data-testid="videoItemDetails">
              <Header />
              <Navigation />
              <VideoItemDetailsViewContainer bgColor={bgColor}>
                {this.renderVideoDetailsView()}
              </VideoItemDetailsViewContainer>
            </div>
          )
        }}
      </NextContext.Consumer>
    )
  }
}

export default VideoItemDetails
