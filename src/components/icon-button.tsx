import { jsx } from '@emotion/core'
import theme from '../theme'

interface IconButtonProps {
  name: string
  contents: string
  onClick: () => void
  stroke?: number
}

function IconButton({ name, contents, onClick, stroke }: IconButtonProps) {
  return (
    <button
      aria-label={name}
      onClick={onClick}
      css={{
        padding: theme.space[2],
        color: '#333',
        background: 'white',
        border: 0,
        borderRadius: theme.radii[1],
        appearance: 'none',
        outline: 0,
        '&:hover': {
          background: '#F0F0F0',
        },
        '&:focus, &:active': {
          boxShadow: `inset 0 0 0 2px ${theme.colors.blue}`,
        },
      }}
    >
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke == null ? 2 : stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: contents }}
      />
    </button>
  )
}

export default IconButton
