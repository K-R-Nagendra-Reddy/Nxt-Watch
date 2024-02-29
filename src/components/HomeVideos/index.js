import {
  NoVideosView,
  NoVideosImage,
  NoVideosHeading,
  NoVideosNote,
  RetryButton,
  VideoCardList,
} from './style'

import NextContext from '../../context/NextContext'
import HomeVideoItem from '../HomeVideoItem'

const HomeVideos = props => {
  const {details, onRetry} = props
  const Length = details.length
  const onClickRetry = () => {
    onRetry()
  }

  return (
    <NextContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const headingColor = isLightTheme ? '#1e293b' : '#f1f5f9'
        const noteColor = isLightTheme ? '#e2e8f0' : '#475569'
        const bgColor = isLightTheme ? '#f9f9f9' : '#181818'
        return Length > 0 ? (
          <VideoCardList bgColor={bgColor}>
            {details.map(each => (
              <HomeVideoItem key={each.id} video={each} />
            ))}
          </VideoCardList>
        ) : (
          <NoVideosView>
            <NoVideosImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <NoVideosHeading headingColor={headingColor}>
              No Search results found
            </NoVideosHeading>
            <NoVideosNote noteColor={noteColor}>
              Try different keywords or remove search filter
            </NoVideosNote>
            <RetryButton type="button" onClick={onClickRetry}>
              Retry
            </RetryButton>
          </NoVideosView>
        )
      }}
    </NextContext.Consumer>
  )
}

export default HomeVideos
