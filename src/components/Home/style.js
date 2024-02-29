import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.bgColor};
  margin-top: 90px;
  margin-left: 130px;
`

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  height: 25vh;
  width: 80vw;
  background-size: cover;
`
export const BannerLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const BannerLogo = styled.img`
  height: 30px;
  width: 60px;
`
export const BannerText = styled.p`
  color: ${props => props.color};
  font-size: 16px;
  font-family: 'Roboto';
`
export const GetButton = styled.button`
  color: ${props => props.color};
  font-size: 16px;
  border: solid green 1px;
  border-radius: 5px;
  background-color: transparent;
`
export const CloseIcon = styled.button`
  align-self: flex-start;
  height: 20px;
  width: 30px;
`
export const PopContainer = styled.div`
  display: flex;
  align-self: flex-start;
  position: fixed;
  top: 0;
`
export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor};
`
export const FailureImage = styled.img`
  height: 30vh;
  width: 45vw;
`
export const FailureHeading = styled.h1`
  color: ${props => props.color};
  font-size: 26px;
  font-family: 'Roboto';
`
export const FailureDescription = styled.p`
  color: ${props => props.color};
  font-size: 16px;
  font-family: 'Roboto';
  margin-bottom: 10px;
`
export const RetryButton = styled.button`
  background-color: #00306e;
  height: 20px;
  width: 40px;
  border-radius: 6px;
  color: #ffffff;
`
export const InputElement = styled.input`
  height: 25px;
  width: 500px;
  border: solid #64748b 1px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`
export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px;
  background-color: #ffffff;
`
export const SearchButton = styled.button`
  height: 25px;
  width: 35px;
  border: solid #64748b 1px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`
export const UlContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: transparent;
`
export const ListOfVideo = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 25vw;
`
export const ListBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
