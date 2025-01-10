export type OriginalMode = 'o'
export type CropMode = 'c'
export type ResizeCropMode = 'rc'
export type ExactMode = 'e'
export type PortraitMode = 'p'
export type LandscapeMode = 'l'
export type AutoMode = 'a'
export type FillMode = 'fill'
export type ResizeCropFocalPointMode = 'rcf'

export type Mode =
  | OriginalMode
  | CropMode
  | ResizeCropMode
  | ExactMode
  | PortraitMode
  | LandscapeMode
  | AutoMode
  | FillMode
  | ResizeCropFocalPointMode

export type SizeMode = CropMode | ResizeCropMode | ExactMode | PortraitMode | LandscapeMode | AutoMode

export type SizeNumber = number
export type SizeShortString = `${number}`
export type SizeLongString = `${number}x${number}`
export type SizeShortTuple = [number]
export type SizeLongTuple = [number, number]
export type Size = SizeLongString | SizeShortString | SizeNumber | SizeShortTuple | SizeLongTuple

export type FillShortString = `${number},${number},${number}`
export type FillLongString = `${number},${number},${number},${number}`
export type FillShortTuple = [number, number, number]
export type FillLongTuple = [number, number, number, number]
export type Fill = FillShortString | FillLongString | FillShortTuple | FillLongTuple

export type TopFocalPoint = 't'
export type TopLeftFocalPoint = 'tl'
export type TopRightFocalPoint = 'tr'
export type BottomFocalPoint = 'b'
export type BottomLeftFocalPoint = 'bl'
export type BottomRightFocalPoint = 'br'
export type LeftFocalPoint = 'l'
export type RightFocalPoint = 'r'
export type CenterFocalPoint = 'c'

export type FocalPoint =
  | TopFocalPoint
  | TopLeftFocalPoint
  | TopRightFocalPoint
  | BottomFocalPoint
  | BottomLeftFocalPoint
  | BottomRightFocalPoint
  | LeftFocalPoint
  | RightFocalPoint
  | CenterFocalPoint

export type Parameter = Fill | FocalPoint

export type CdnUrl = `${string}.cloudfront.net` | `${string}.cdn.netflexapp.com`

export type FilePath = `${number}/${string}`
