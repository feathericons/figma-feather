import { icons } from 'feather-icons'

figma.showUI(__html__, { width: 300, height: 400 })

figma.ui.onmessage = message => {
  const icon = figma.createNodeFromSvg(icons[message.type].toSvg())
  icon.name = message.type
  figma.currentPage.selection = [icon]
  figma.viewport.scrollAndZoomIntoView([icon])
}
