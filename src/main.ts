import { icons } from 'feather-icons'

figma.showUI(__html__, { width: 300, height: 400 })

figma.ui.onmessage = message => {
  if (message.type == 'PLACE_ICON') { 
    const icon = figma.createNodeFromSvg(icons[message.icon].toSvg({
      'stroke-width': message.params.stroke,
    }))
    if (message.params.lockChildren) {
      icon.children.forEach(node => node.locked = true)
    }
    icon.name = message.icon
    icon.x = figma.viewport.center.x
    icon.y = figma.viewport.center.y
    figma.currentPage.selection = [icon]
  } else if (message.type == 'STATE_REQUEST') {
    figma.clientStorage.getAsync('figma-feather-state').then(figma.ui.postMessage)
  } else if (message.type == 'STATE_SAVE') {
    figma.clientStorage.setAsync('figma-feather-state', message.payload)
  }
}