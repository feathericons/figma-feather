import { Global, jsx } from '@emotion/core'
import { version } from 'feather-icons/package.json'
import React from 'react'
import ReactDOM from 'react-dom'
import IconButton from './components/icon-button'
import SearchInput from './components/search-input'
import theme from './theme'
import './ui.css'
import useSearch from './use-search'
import { icons } from 'feather-icons'
import ParamsList from './components/params'
import Params from './state/params'

function App() {
  const [query, setQuery] = React.useState('')
  const results = useSearch(query)

  const [showParams, setShowParams] = React.useState(false)
  const { params } = Params.useContainer()

  return (
    <div>
      <Global
        styles={{ body: { margin: 0, fontFamily: 'Inter, sans-serif' } }}
      />
      <SearchInput
        value={query}
        onChange={event => setQuery(event.target.value)}
        rightElement={<IconButton name={icons.menu.name} contents={icons.menu.contents} stroke={2} onClick={() => setShowParams(last => !last)}/>}
        css={{
          position: 'sticky',
          top: 0,
          borderBottom: '1px solid #E6E6E6',
        }}
      />
      <ParamsList show={showParams}/>
      <div css={{ padding: theme.space[2] }}>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridGap: theme.space[1],
          }}
        >
          {results.map(icon => (
            <IconButton key={icon.name} name={icon.name} contents={icon.contents} stroke={params.stroke as number} onClick={() => parent.postMessage({ pluginMessage: { type: 'PLACE_ICON', icon: icon.name, params } }, '*')} />
          ))}
        </div>
        <div
          css={{
            marginTop: theme.space[2],
            padding: theme.space[2],
            fontSize: theme.fontSizes[0],
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          Feather v{version}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Params.Provider><App /></Params.Provider>, document.getElementById('root'))
