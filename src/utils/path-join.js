export default function pathJoin(parts, separator = '/') {
  return parts
    .map((part, index) => {
      if (index > 0) {
        return part.replace(new RegExp(`^\\${separator}`), '');
      }

      if (index !== parts.length - 1) {
        return part.replace(new RegExp(`\\${separator}$`), '');
      }

      return part;
    })
    .filter((part) => part != null && part !== '')
    .join(separator);
}
