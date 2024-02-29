import {Link} from 'react-router-dom'
import {formatDistanceToNow, parse, addYears} from 'date-fns'
import {
  ListItem,
  ThumbnailImage,
  VideoDetails,
  ProfileImage,
  ContentSection,
  Title,
  ChannelName,
  ViewsAndDate,
  Dot,
} from './style'

import NextContext from '../../context/NextContext'

import './index.css'

const HomeVideoItem = props => {
  const {video} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewsCount,
    publishedAt,
    name,
    profileImageUrl,
  } = video

  console.log('this is Home video item route')

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
          <Link to={`/videos/${id}`} className="link">
            <ListItem>
              <ThumbnailImage src={thumbnailUrl} alt="video thumbnail" />
              <VideoDetails>
                <ProfileImage src={profileImageUrl} alt="channel logo" />
                <ContentSection>
                  <Title color={textColor}>{title}</Title>
                  <ChannelName color={textColor}>{name}</ChannelName>
                  <ViewsAndDate color={textColor}>
                    {viewsCount} views <Dot>&#8226;</Dot>{' '}
                    {`${yearsDifference} years ago`}
                  </ViewsAndDate>
                </ContentSection>
              </VideoDetails>
            </ListItem>
          </Link>
        )
      }}
    </NextContext.Consumer>
  )
}

export default HomeVideoItem
