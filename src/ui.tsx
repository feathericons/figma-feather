import { Global, jsx } from '@emotion/core'
import { version } from 'feather-icons/package.json'
import React from 'react'
import ReactDOM from 'react-dom'
import IconButton from './components/icon-button'
import SearchInput from './components/search-input'
import theme from './theme'
import './ui.css'
import useSearch from './use-search'

function App() {
  const [query, setQuery] = React.useState('')
  const results = useSearch(query)
  return (
    <div>
      <Global
        styles={{ body: { margin: 0, fontFamily: 'Inter, sans-serif' } }}
      />
      <SearchInput
        value={query}
        onChange={event => setQuery(event.target.value)}
        css={{
          position: 'sticky',
          top: 0,
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      />
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

ReactDOM.render(<App />, document.getElementById('root'))
