import React from 'react'

const InstaShareContext = React.createContext({
  showSearchOutput: false,
  searchCaptionInput: '',
  changeSearchCaptionInput: () => {},
  toggleSearchOutput: () => {},
})

export default InstaShareContext
