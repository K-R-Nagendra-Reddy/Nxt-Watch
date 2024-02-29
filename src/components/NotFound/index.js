import Header from '../Header'
import Navigation from '../Navigation'
import NextContext from '../../context/NextContext'

import {
  NotFoundContainer,
  NotFoundVideosView,
  NotFoundVideosImage,
  NotFoundVideosHeading,
  NotFoundVideosNote,
} from './style'

const NotFound = () => (
  <NextContext.Consumer>
    {value => {
      const {isLightTheme} = value
      const bgColor = isLightTheme ? '#f9f9f9' : '#181818'
      const HeadingColor = isLightTheme ? '#1e293b' : '#f1f5f9'
      const noteColor = isLightTheme ? '#475569' : '#e2e8f0'
      const notFindImageUrl = isLightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <>
          <Header />
          <Navigation />
          <NotFoundContainer bgColor={bgColor}>
            <NotFoundVideosView>
              <NotFoundVideosImage src={notFindImageUrl} alt="not found" />
              <NotFoundVideosHeading HeadingColor={HeadingColor}>
                Page Not Found
              </NotFoundVideosHeading>
              <NotFoundVideosNote noteColor={noteColor}>
                We are sorry, the page you requested could not be found.
              </NotFoundVideosNote>
            </NotFoundVideosView>
          </NotFoundContainer>
        </>
      )
    }}
  </NextContext.Consumer>
)

export default NotFound
