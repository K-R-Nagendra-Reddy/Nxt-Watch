import styled from 'styled-components'

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
export const GameContainer = styled.div`
background-color:${props => props.bgColor}
min-height:95vh;
margin-top:60px;
margin-bottom:60px;
overflow-y:scroll;
@media screen and (min-width:768px){
    margin-left:120px;
    margin-bottom:0px;
}
`
export const GameTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 35px;
`
export const GameIconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 80px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    margin-left: 40px;
  }
`
export const GamingText = styled.h1`
  font-size: 25px;
  font-family: 'Roboto';
  color: ${props => props.color};
  @media screen and (min-width: 768px) {
    font-size: 35px;
  }
`

export const GamingList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  margin-left: 55px;
  padding: 5px;
`
export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`
