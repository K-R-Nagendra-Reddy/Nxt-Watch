import {CgPlayListAdd} from 'react-icons/cg'

import Header from '../Header'
import Navigation from '../Navigation'
import TrendingVideoItem from '../TrendingVideoItem'

import NextContext from '../../context/NextContext'

import {
  SavedContainer,
  SavedTitleIconContainer,
  SavedVideoTitle,
  SavedVideoList,
  SavedText,
  NoSavedVideosView,
  NoSavedVideosImage,
  NoSavedVideosHeading,
  NoSavedVideosNote,
} from './style'

const SavedVideos = () => (
  <NextContext.Consumer>
    {value => {
      const {isLightTheme, savedVideos} = value
      const bgColor = isLightTheme ? '#f9f9f9' : '#0f0f0f'
      const textColor = isLightTheme ? '#231f20' : '#f9f9f9'
      const headingColor = isLightTheme ? '#1e293b' : '#f1f5f9'
      const noteColor = isLightTheme ? '#475569' : '#e2e8f0'

      return (
        <>
          <Header />
          <Navigation />
          <SavedContainer data-testid="savedVideos" bgColor={bgColor}>
            <SavedVideoTitle>
              <SavedTitleIconContainer>
                <CgPlayListAdd size={35} color="#ff0000" />
              </SavedTitleIconContainer>
              <SavedText color={textColor}>Saved Videos</SavedText>
            </SavedVideoTitle>
            {savedVideos.length > 0 ? (
              <SavedVideoList>
                {savedVideos.map(each => (
                  <TrendingVideoItem key={each.id} videoDetails={each} />
                ))}
              </SavedVideoList>
            ) : (
              <NoSavedVideosView>
                <NoSavedVideosImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                />
                <NoSavedVideosHeading headingColor={headingColor}>
                  No saved videos found
                </NoSavedVideosHeading>
                <NoSavedVideosNote noteColor={noteColor}>
                  You can save your videos while watching them
                </NoSavedVideosNote>
              </NoSavedVideosView>
            )}
          </SavedContainer>
        </>
      )
    }}
  </NextContext.Consumer>
)

export default SavedVideos
