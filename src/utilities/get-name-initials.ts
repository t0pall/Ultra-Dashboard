export const getNameInitials = (name: string, count = 2) => {
  const names = name.split(' ')
  const initials = names.map(n => n[0]).join('')
  const filtered = initials.replace(/[^a-zA-ZА-Яа-я]/g, '')
  return filtered.slice(0, count).toUpperCase()
}