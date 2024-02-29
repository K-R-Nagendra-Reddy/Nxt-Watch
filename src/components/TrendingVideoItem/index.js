import {formatDistanceToNow, parse, addYears} from 'date-fns'
import NextContext from '../../context/NextContext'

import {
  ItemLink,
  TrendingListItem,
  TrendingThumbNailImage,
  TrendingVideoDetails,
  TrendingProfileImage,
  TrendingContentSection,
  TrendingTitle,
  TrendingChannelName,
  TrendingViewsAndDate,
  TrendingDot,
} from './style'

const TrendingVideoItem = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewsCount,
    publishedAt,
    name,
    profileImageUrl,
  } = videoDetails

  const dateString = publishedAt
  const dateObject = parse(dateString, 'MMM dd, yyyy', new Date())
  const currentDate = new Date()

  // Calculate the difference in years
  const yearsDifference = currentDate.getFullYear() - dateObject.getFullYear()

  // Add the calculated years to the original date
  const futureDate = addYears(dateObject, yearsDifference)

  // Use formatDistanceToNow to get the relative time
  const distance = formatDistanceToNow(futureDate)
  // console.log(`Over ${yearsDifference} years ago`)

  return (
    <NextContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const textColor = isLightTheme ? '#231f20' : '#f9f9f9'
        return (
          <ItemLink to={`/videos/${id}`} className="link">
            <TrendingListItem>
              <TrendingThumbNailImage
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <TrendingVideoDetails>
                <TrendingProfileImage
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <TrendingContentSection>
                  <TrendingTitle color={textColor}>{title}</TrendingTitle>
                  <TrendingChannelName color={textColor}>
                    {name}
                  </TrendingChannelName>
                  <TrendingViewsAndDate color={textColor}>
                    {viewsCount} views <TrendingDot> &#8226; </TrendingDot>
                    {`${yearsDifference} years ago`}
                  </TrendingViewsAndDate>
                </TrendingContentSection>
              </TrendingVideoDetails>
            </TrendingListItem>
          </ItemLink>
        )
      }}
    </NextContext.Consumer>
  )
}

export default TrendingVideoItem
