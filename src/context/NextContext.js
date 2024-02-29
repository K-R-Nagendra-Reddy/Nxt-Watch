import React from 'react'

const NextContext = React.createContext({
  isLightTheme: true,
  savedVideos: [],
  activeTab: 'Home',
  toggleTheme: () => {},
  changeTab: () => {},
  addVideo: () => {},
})

export default NextContext
