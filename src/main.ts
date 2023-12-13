import { icons } from 'feather-icons'

figma.showUI(__html__, { width: 340, height: 420 })

figma.ui.onmessage = (message) => {
  const icon = figma.createNodeFromSvg(icons[message.type].toSvg())
  icon.name = message.type
  icon.x = figma.viewport.center.x
  icon.y = figma.viewport.center.y
  figma.currentPage.selection = [icon]
}
