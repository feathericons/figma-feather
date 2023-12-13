import { jsx } from '@emotion/core'
import theme from '../theme'

interface IconButtonProps {
  name: string
  contents: string
}

function IconButton({ name, contents }: IconButtonProps) {
  return (
    <button
      key={name}
      aria-label={name}
      onClick={() => parent.postMessage({ pluginMessage: { type: name } }, '*')}
      css={{
        padding: theme.space[2],
        color: '#333',
        background: 'transparent',
        border: 0,
        borderRadius: theme.radii[1],
        appearance: 'none',
        cursor: 'pointer',
        outline: 0,
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.06)',
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
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: contents }}
      />
    </button>
  )
}

export default IconButton
