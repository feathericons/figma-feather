import { jsx } from '@emotion/core'
import { icons } from 'feather-icons'
import theme from '../theme'
import SearchIcon from './search-icon'

const ICON_COUNT = Object.keys(icons).length

interface SearchInputProps extends React.HTMLProps<HTMLDivElement> {
  value: string
  rightElement: any
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchInput({ value, onChange, rightElement, ...props }: SearchInputProps) {
  return (
    <div css={{ position: 'relative', display: 'flex' }} {...props}>
      <div
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: theme.space[1],
        }}
      >
        <SearchIcon css={{ fill: '#333' }} />
      </div>
      <input
        autoFocus
        type="search"
        value={value}
        onChange={onChange}
        placeholder={`Search ${ICON_COUNT} icons`}
        css={{
          flex: 1,
          height: 40,
          padding: `0 ${theme.space[4]} 0 36px`,
          fontFamily: 'inherit',
          fontSize: theme.fontSizes[0],
          border: 0,
          outline: 0,
        }}
      />
      { rightElement }
    </div>
  )
}

export default SearchInput
