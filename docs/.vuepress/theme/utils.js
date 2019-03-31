import axios from 'axios'

export function getCodefund(template = 'default') {
  return {};
}
export function isGitee() {
  const origin = window.location.origin
  if (origin.includes('gitee.io')) {
    return true
  }
  return false
}
