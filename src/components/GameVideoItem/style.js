import styled from 'styled-components'

import {Link} from 'react-router-dom'

export const ItemLink = styled(Link)`
  text-decoration: none;
`
export const GameItemList = styled.li`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 300px;
`
export const ThumbNailImage = styled.img`
  width: 100%;
`
export const TitleText = styled.p`
  color: ${props => props.color};
  font-family: 'Roboto';
  font-size: 16px;
`
export const ViewText = styled.p`
  color: ${props => props.color};
  font-family: 'Roboto';
  font-size: 13px;
`
