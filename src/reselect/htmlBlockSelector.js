import { createSelector } from 'reselect'

const getData = state => state.htmlBlock
  ? state.htmlBlock.htmlBlock
  : null

export const selectHtmlBlock = () =>
  createSelector(
    [getData],
    htmlBlock => htmlBlock
  )