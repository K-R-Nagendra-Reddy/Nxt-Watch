import {
  ItemLink,
  GameItemList,
  ThumbNailImage,
  TitleText,
  ViewText,
} from './style'

import NextContext from '../../context/NextContext'

const GamingVideoItem = props => {
  const {gameDetails} = props
  const {id, thumbnailUrl, title, viewsCount} = gameDetails
  return (
    <NextContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const textColor = isLightTheme ? '#231f20' : '#f9f9f9'
        return (
          <ItemLink to={`/videos/${id}`}>
            <GameItemList>
              <ThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
              <TitleText color={textColor}>{title}</TitleText>
              <ViewText color={textColor}>
                {' '}
                {viewsCount} Watching Worldwide
              </ViewText>
            </GameItemList>
          </ItemLink>
        )
      }}
    </NextContext.Consumer>
  )
}

export default GamingVideoItem
