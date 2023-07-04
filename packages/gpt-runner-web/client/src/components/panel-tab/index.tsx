import type { CSSProperties } from 'react'
import { memo } from 'react'
import type { TabProps } from '../tab'
import { Tab } from '../tab'
import {
  PanelTabContainer,
  PanelTabContent,
} from './panel-tab.styles'

export interface PanelTabProps<T extends string = string> extends Pick<TabProps<T>, 'defaultActiveId' | 'items' | 'onChange' | 'activeId'> {
  style?: CSSProperties
  tabStyle?: CSSProperties
}

export function PanelTab_<T extends string = string>(props: PanelTabProps<T>) {
  const { style, tabStyle, ...otherProps } = props

  return (
    <PanelTabContainer style={style}>
      <PanelTabContent>
        <Tab
          style={tabStyle}
          {...otherProps}
        />
      </PanelTabContent>
    </PanelTabContainer>
  )
}

PanelTab_.displayName = 'PanelTab'

export const PanelTab = memo(PanelTab_) as typeof PanelTab_
