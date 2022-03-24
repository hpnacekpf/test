import utils from 'utils'
import { DEFAULT_FONT_SIZE_AVATAR, DEFAULT_USER_NAME } from 'constants/index';

export const getColorFromCharacter = (character) => {
  switch (character.toUpperCase()) {
    case 'A':
      return '#003b70'
    case 'B':
      return '#2d9cff'
    case 'C':
      return '#f7534f'
    case 'D':
      return '#f9c441'
    case 'E':
      return '#6496ed'
    case 'F':
      return '#00a79d'
    case 'G':
      return '#0093ae'
    case 'H':
      return '#f21914'
    case 'I':
      return '#ffa9a9'
    case 'J':
      return '#67c1e4'
    case 'K':
      return '#9fcc48'
    case 'L':
      return '#f37365'
    case 'M':
      return '#0071b8'
    case 'N':
      return '#005ece'
    case 'O':
      return '#7adddd'
    case 'P':
      return '#ffab54'
    case 'Q':
      return '#49eba0'
    case 'R':
      return '#52cb14'
    case 'S':
      return '#847dff'
    case 'T':
      return '#4d3ff4'
    case 'U':
      return '#79ae12'
    case 'V':
      return '#237a75'
    case 'W':
      return '#0091c9'
    case 'X':
      return '#a721b6'
    case 'Y':
      return '#fc61d4'
    case 'Z':
      return '#cb215a'
    case '0':
      return '#619cfc'
    case '1':
      return '#3a5cf8'
    case '2':
      return '#7bcec9'
    case '3':
      return '#cb2182'
    case '4':
      return '#703aff'
    case '5':
      return '#2135cb'
    case '6':
      return '#00d6be'
    case '7':
      return '#cba421'
    case '8':
      return '#e8ca63'
    case '9':
      return '#990000'
    default:
      return 'rgb(185, 185, 185)'
  }
}

export const getAvatarBackground = (username) => {
  if (!username) {
    return {
      username: DEFAULT_USER_NAME.charAt('0'),
      background: 'rgb(185, 185, 185)'
    }
  }

  const abbrUsername = utils.getAbbreviate(username)
  const abbr = abbrUsername.charAt('0')
  return {
    username: abbr,
    background: getColorFromCharacter(abbr)
  }
}

export const getFontSizeAvatar = (size) => {
  return size ? size / 2 : DEFAULT_FONT_SIZE_AVATAR
}