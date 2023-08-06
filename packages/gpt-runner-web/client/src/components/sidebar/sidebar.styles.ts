import { VSCodeTextField } from '@vscode/webview-ui-toolkit/react'
import { styled } from 'styled-components'
import { backDropBg } from '../../styles/utils'

export const SidebarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
  overflow: hidden;
`

export const SidebarTopBlurContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding: 0 0.5rem;
  ${backDropBg}
`

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
`

export const SidebarSearchWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  align-items: center;
  height: var(--my-input-height);
`

export const SidebarUnderSearchWrapper = styled.div`
  font-size: var(--type-ramp-base-font-size);
`

export const SidebarSearch = styled(VSCodeTextField)`
  flex: 1;

  &::part(root) {
    border-radius: 0.25rem;
    overflow: hidden;
  }
`

export const SidebarSearchRightWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: stretch;
`

export const SidebarTreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`
