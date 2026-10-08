import { imageSource } from '../../utils/image.js'

export default function Image({ src, alt, ...props }) {
  return <img src={imageSource(src)} alt={alt} {...props} />
}