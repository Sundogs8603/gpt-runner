import { useState } from 'react'
import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { Children, IconWrapper, NameWrapper, TreeItemRow, TreeItemRowLeftSlot, TreeItemRowRightSlot, TreeItemWrapper } from './tree-item.styles'

export type TreeItemBaseStateOtherInfo = Record<string, any>
export interface TreeItemBaseState<OtherInfo extends TreeItemBaseStateOtherInfo = TreeItemBaseStateOtherInfo> {
  id: string
  name: string
  path: string
  isLeaf: boolean
  children?: TreeItemProps<OtherInfo>[]
  isFocused?: boolean
  otherInfo?: OtherInfo
}

export interface TreeItemState<OtherInfo extends TreeItemBaseStateOtherInfo = TreeItemBaseStateOtherInfo> extends TreeItemBaseState<OtherInfo> {
  isHovering: boolean
  isExpanded: boolean
}

export interface TreeItemProps<OtherInfo extends TreeItemBaseStateOtherInfo = TreeItemBaseStateOtherInfo> extends TreeItemBaseState<OtherInfo> {
  defaultIsExpanded?: boolean
  renderLeftSlot?: (props: TreeItemState<OtherInfo>) => React.ReactNode
  renderRightSlot?: (props: TreeItemState<OtherInfo>) => React.ReactNode
  onExpand?: (props: TreeItemState<OtherInfo>) => void
  onCollapse?: (props: TreeItemState<OtherInfo>) => void
  onClick?: (props: TreeItemState<OtherInfo>) => void
  onContextMenu?: (props: TreeItemState<OtherInfo>) => void
}

export function TreeItem<OtherInfo extends TreeItemBaseStateOtherInfo = TreeItemBaseStateOtherInfo>(props: TreeItemProps<OtherInfo>) {
  const { renderLeftSlot, renderRightSlot, onExpand, onCollapse, onClick, onContextMenu, ...baseStateProps } = props
  const {
    name,
    isLeaf,
    children,
    defaultIsExpanded = false,
    isFocused = false,
  } = baseStateProps
  const [isHovering, setIsHovering] = useState(false)
  const [isExpanded, setIsExpanded] = useState(defaultIsExpanded)

  const stateProps = { ...baseStateProps, isHovering, isExpanded }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    onContextMenu?.(stateProps)
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded)
    if (!isLeaf) {
      if (isExpanded)
        onCollapse?.(stateProps)

      else
        onExpand?.(stateProps)
    }
    else {
      onClick?.(stateProps)
    }
  }

  const contentVariants: Variants = {
    expanded: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 1, height: 0 },
  }

  return (
    <TreeItemWrapper>
      <TreeItemRow
        tabIndex={0}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        $isFocused={isFocused}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        <TreeItemRowLeftSlot>
          <IconWrapper>
            {renderLeftSlot?.(stateProps)}
          </IconWrapper>
          <NameWrapper>
            {name}
          </NameWrapper>
        </TreeItemRowLeftSlot>
        <TreeItemRowRightSlot onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          {renderRightSlot?.(stateProps)}
        </TreeItemRowRightSlot>
      </TreeItemRow>

      {/* child nodes */}
      <AnimatePresence initial={false}>
        {!isLeaf && (
          <motion.div
            initial="collapsed"
            animate={isExpanded ? 'expanded' : 'collapsed'}
            exit="collapsed"
            variants={contentVariants}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
            }}
          >
            <Children >
              {children?.map(child => (
                <TreeItem key={child.id} {...child} />
              ))}
            </Children>

          </motion.div>
        )}
      </AnimatePresence>

    </TreeItemWrapper>
  )
}