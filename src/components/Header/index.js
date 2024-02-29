import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import NextContext from '../../context/NextContext'

import {
  NavbarHeader,
  HeaderLogo,
  ActionsContainer,
  ThemeButton,
  LogoutButton,
  LogoutIconButton,
  ProfileImage,
  ModalContainer,
  CloseButton,
  ConfirmButton,
  ModalDesc,
  ButtonsContainer,
  LogoLink,
} from './style'

const Header = props => (
  <NextContext.Consumer>
    {value => {
      const {isLightTheme, toggleTheme} = value
      const color = isLightTheme ? '#00306e' : '#ffffff'
      const bgColor = isLightTheme ? '#f1f5f9' : '#231f20'

      const onChangeTheme = () => {
        toggleTheme()
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <NavbarHeader bgColor={bgColor}>
          <LogoLink to="/">
            <HeaderLogo
              src={
                isLightTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              }
              alt="website logo"
            />
          </LogoLink>
          <ActionsContainer>
            <ThemeButton
              type="button"
              data-testid="theme"
              onClick={onChangeTheme}
            >
              {isLightTheme ? (
                <BsMoon size={25} />
              ) : (
                <BsBrightnessHigh color="#ffffff" size={25} />
              )}
            </ThemeButton>
            <ProfileImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <LogoutButton type="button" bgColor={bgColor} color={color}>
                  Logout
                </LogoutButton>
              }
            >
              {close => (
                <ModalContainer>
                  <ModalDesc>Are you sure, you want to logout?</ModalDesc>
                  <ButtonsContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>
                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
            <Popup
              modal
              trigger={
                <LogoutIconButton type="button">
                  {' '}
                  <FiLogOut size={25} color={color} />{' '}
                </LogoutIconButton>
              }
              className="popup-content"
            >
              {close => (
                <ModalContainer>
                  <ModalDesc>Are you sure, you want to logout?</ModalDesc>
                  <ButtonsContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>
                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
          </ActionsContainer>
        </NavbarHeader>
      )
    }}
  </NextContext.Consumer>
)

export default withRouter(Header)
