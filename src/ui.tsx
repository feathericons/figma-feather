import { Global, jsx } from '@emotion/core'
import { version } from 'feather-icons/package.json'
import React from 'react'
import ReactDOM from 'react-dom'
import IconButton from './components/icon-button'
import SearchInput from './components/search-input'
import { StreamlineLogo } from './components/streamline-logo'
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
        onChange={(event) => setQuery(event.target.value)}
        css={{
          position: 'sticky',
          top: 0,
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      />
      <div
        css={{ padding: theme.space[2], display: 'grid', gap: theme.space[2] }}
      >
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridGap: theme.space[1],
            '&:empty': {
              display: 'none',
            },
          }}
        >
          {results.map((icon) => (
            <IconButton name={icon.name} contents={icon.contents} />
          ))}
        </div>
        <div
          css={{
            padding: theme.space[2],
            fontSize: theme.fontSizes[0],
            color: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          {results.length === 0 ? 'No results · ' : ''}Feather v{version}
        </div>
      </div>
      <div
        css={{
          position: 'sticky',
          bottom: 0,
          background: 'linear-gradient(rgba(255, 255, 255, 0), #fff 50%)',
          padding: theme.space[2],
          paddingTop: 0,
        }}
      >
        <a
          href="https://bit.ly/3uRGrCf"
          target="_blank"
          rel="noopener noreferrer"
          css={{
            display: 'block',
            padding: theme.space[2],
            fontSize: theme.fontSizes[0],
            textAlign: 'center',
            textDecoration: 'none',
            color: 'currentColor',
            backgroundColor: '#e5f4ff',
            borderRadius: theme.radii[1],
            border: '1px solid #d6eaf9',
            '&:hover': {
              backgroundColor: '#d6eaf9',
            },
          }}
        >
          Access 170,000 more icons by <StreamlineLogo /> →
        </a>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
