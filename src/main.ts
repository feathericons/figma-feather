import { icons } from 'feather-icons'

figma.showUI(__html__, { width: 300, height: 400 })

figma.ui.onmessage = message => {
  let targetParent : (BaseNode & ChildrenMixin) | null = figma.currentPage
  let targetX : number = figma.viewport.center.x
  let targetY : number = figma.viewport.center.y

  if(figma.currentPage.selection.length > 0) {
    const topSelectedItem : BaseNode = figma.currentPage.selection[0]

    // if the top selected item is an icon, delete it and select
    // its parent and position for insertion of the new one
    if(topSelectedItem.getPluginData('iconType')) {
      const selectedIcon = topSelectedItem as (FrameNode & GeometryMixin)
      targetParent = selectedIcon.parent 
      targetX = selectedIcon.x
      targetY = selectedIcon.y
      selectedIcon.remove()
    } else {
      if(canAcceptChildren(topSelectedItem) || 
         canAcceptChildren(topSelectedItem.parent))
      {
        // in case our selected node can accept children, place icon in it
        if(canAcceptChildren(topSelectedItem)) {
          targetParent = topSelectedItem as (FrameNode & GeometryMixin)
        // in case selected note can not accept children (like a rectangle)
        // but its parent can, place icon in the parent
        } else {
          targetParent = topSelectedItem.parent as (FrameNode & GeometryMixin)
        }
        targetX = targetParent.type=="FRAME" ? 0 : targetParent.x
        targetY = targetParent.type=="FRAME" ? 0 : targetParent.y
      }
    }
  }
  const icon = figma.createNodeFromSvg(icons[message.type].toSvg()) as (FrameNode & GeometryMixin)
  icon.setPluginData('iconType',message.type)
  icon.name = message.type
  icon.x = targetX
  icon.y = targetY
  if (targetParent){
    targetParent.appendChild(icon)
  }
  figma.currentPage.selection = [icon]
}

const canAcceptChildren = (node:BaseNode | null) =>
  ["FRAME","PAGE","GROUP", "COMPONENT"].includes(node ? node.type : '')

