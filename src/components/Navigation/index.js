import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import NextContext from '../../context/NextContext'

import {
  NavigationLgContainer,
  NavOptions,
  NavLink,
  NavLinkContainer,
  NavText,
  ContactInfo,
  ContactHeading,
  ContactIcons,
  ContactNote,
  ContactImage,
  NavigationSmallContainer,
  NavBar,
} from './style'

class Navigation extends Component {
  renderTabItems = () => (
    <NextContext.Consumer>
      {value => {
        const {isLightTheme, activeTab, changeTab} = value
        const bgColor = isLightTheme ? '#f1f5f9' : '#231f20'
        const textColor = isLightTheme ? '#231f20' : '#f1f5f9'
        const activeTabBg = isLightTheme ? '#cbd5e1' : '#475569'

        const onClickTabHome = () => {
          changeTab('Home')
        }

        const onClickTabTrending = () => {
          changeTab('Trending')
        }

        const onClickTabGaming = () => {
          changeTab('Gaming')
        }

        const onClickTabSaved = () => {
          changeTab('Saved')
        }

        return (
          <NavBar>
            <NavigationLgContainer bgColor={bgColor}>
              <NavOptions>
                <NavLink to="/">
                  <NavLinkContainer
                    key="home"
                    bgColor={activeTab === 'Home' ? activeTabBg : 'none'}
                    onClick={onClickTabHome}
                  >
                    <AiFillHome
                      size={30}
                      color={activeTab === 'Home' ? '#ff0b37' : '#909090'}
                    />
                    <NavText color={textColor}>Home</NavText>
                  </NavLinkContainer>
                </NavLink>
                <NavLink to="/trending">
                  <NavLinkContainer
                    key="trending"
                    bgColor={activeTab === 'Trending' ? activeTabBg : 'none'}
                    onClick={onClickTabTrending}
                  >
                    <HiFire
                      size={30}
                      color={activeTab === 'Trending' ? '#ff0b37' : '#909090'}
                    />
                    <NavText color={textColor}>Trending</NavText>
                  </NavLinkContainer>
                </NavLink>
                <NavLink to="/gaming">
                  <NavLinkContainer
                    key="gaming"
                    bgColor={activeTab === 'Gaming' ? activeTabBg : 'none'}
                    onClick={onClickTabHome}
                  >
                    <SiYoutubegaming
                      size={30}
                      color={activeTab === 'Gaming' ? '#ff0b37' : '#909090'}
                    />
                    <NavText color={textColor}>Gaming</NavText>
                  </NavLinkContainer>
                </NavLink>
                <NavLink to="/saved-videos">
                  <NavLinkContainer
                    key="saved"
                    bgColor={activeTab === 'Saved' ? activeTabBg : 'none'}
                    onClick={onClickTabSaved}
                  >
                    <CgPlayListAdd
                      size={30}
                      color={activeTab === 'Saved' ? '#ff0b37' : '#909090'}
                    />
                    <NavText color={textColor}>Saved Videos</NavText>
                  </NavLinkContainer>
                </NavLink>
              </NavOptions>

              <ContactInfo>
                <ContactHeading color={textColor}>CONTACT US</ContactHeading>
                <ContactIcons>
                  <ContactImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <ContactImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <ContactImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </ContactIcons>
                <ContactNote color={textColor}>
                  Enjoy! Now to see your channels and recommendations!
                </ContactNote>
              </ContactInfo>
            </NavigationLgContainer>
            <NavigationSmallContainer bgColor={bgColor}>
              <NavLink to="/">
                <AiFillHome
                  size={30}
                  onClick={onClickTabHome}
                  color={activeTab === 'Home' ? '#ff0b37' : '#909090'}
                />
              </NavLink>
              <NavLink to="/trending">
                <HiFire
                  size={30}
                  onClick={onClickTabTrending}
                  color={activeTab === 'Trending' ? '#ff0b37' : '#909090'}
                />
              </NavLink>
              <NavLink to="/gaming">
                <SiYoutubegaming
                  size={30}
                  onClick={onClickTabGaming}
                  color={activeTab === 'Gaming' ? '#ff0b37' : '#909090'}
                />
              </NavLink>
              <NavLink to="/saved-videos">
                <CgPlayListAdd
                  size={30}
                  onClick={onClickTabHome}
                  color={activeTab === 'Saved' ? '#ff0b37' : '#909090'}
                />
              </NavLink>
            </NavigationSmallContainer>
          </NavBar>
        )
      }}
    </NextContext.Consumer>
  )

  render() {
    return <>{this.renderTabItems()}</>
  }
}

export default Navigation
