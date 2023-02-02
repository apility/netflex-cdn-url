import {
  CdnUrl,
  FilePath,
  OriginalMode,
  SizeMode,
  Size,
  FillMode,
  ResizeCropFocalPointMode,
  Fill,
  FocalPoint,
  Mode,
  Parameter,
  SizeString,
  FillTupleShort,
  FillStringShort,
  FillStringLong,
} from './types'

export const createCdnFileUrl = <C extends CdnUrl, F extends FilePath>(cdnUrl: CdnUrl, filePath: F) => {
  const cdnUrlWithScheme = cdnUrl.startsWith('http')
    ? cdnUrl
    : `https://${cdnUrl}`

  return `${cdnUrlWithScheme}/${filePath}` as `http${number}://${C}/${F}`
}

const normalizeSize = (size: Size): SizeString => {
  if (typeof size === 'string') {
    return (size.includes('x') ? size : `${size}x${size}`) as SizeString
  }

  if (typeof size === 'number') {
    return `${size}x${size}`
  }

  return `${size.at(1)}x${size.at(-1)}` as SizeString
}

const normalizeFill = <F extends Fill>(fill: F)  => (
  typeof fill === 'string'
    ? fill as F extends FillStringShort ? FillStringShort : FillStringLong
    : fill.join(',') as F extends FillTupleShort ? FillStringShort : FillStringLong
)

export function createCdnMediaUrl <C extends CdnUrl, F extends FilePath>(
  cdnUrl: C,
  filePath: F,
  mode: OriginalMode,
): `http${string}://${C}/media/${OriginalMode}/${F}`
export function createCdnMediaUrl<C extends CdnUrl, F extends FilePath, SM extends SizeMode> (
  cdnUrl: C,
  filePath: F,
  mode: SM,
  size: Size,
): `http${string}://${C}/media/${SM}/${SizeString}/${F}`
export function createCdnMediaUrl<C extends CdnUrl, F extends FilePath, FI extends Fill> (
  cdnUrl: C,
  filePath: F,
  mode: FillMode,
  size: Size,
  fill: FI,
): `http${string}://${C}/media/${FillMode}/${SizeString}/${FI extends (FillTupleShort | FillStringShort) ? FillStringShort : FillStringLong}/${F}`
export function createCdnMediaUrl<C extends CdnUrl, F extends FilePath, FP extends FocalPoint> (
  cdnUrl: C,
  filePath: F,
  mode: ResizeCropFocalPointMode,
  size: Size,
  focalPoint: FP,
): `http${string}://${C}/media/${ResizeCropFocalPointMode}/${SizeString}/${FP}/${F}`
export function createCdnMediaUrl<C extends CdnUrl, F extends FilePath, M extends Mode, P extends Parameter> (
  cdnUrl: C,
  filePath: F,
  mode: M,
  size?: Size,
  parameter?: P,
): `http${string}://${C}/media/${M}/${F}` |
  `http${string}://${C}/media/${M}/${SizeString}/${F}` |
  `http${string}://${C}/media/${M}/${SizeString}/${M extends ResizeCropFocalPointMode ? (P extends FocalPoint ? P : never) : (P extends (FillTupleShort | FillStringShort) ? FillStringShort : FillStringLong)}/${F}`
export function createCdnMediaUrl (
  cdnUrl: CdnUrl,
  filePath: FilePath,
  mode: Mode,
  size?: Size,
  parameter?: Parameter,
): string {
  const cdnUrlWithScheme = cdnUrl.startsWith('http')
    ? cdnUrl
    : `https://${cdnUrl}`

  if (mode === 'o') {
    return `${cdnUrlWithScheme}/media/${mode}/${filePath}`
  } else if (mode === 'rcf') {
    return `${cdnUrlWithScheme}/media/${mode}/${normalizeSize(size!)}/${parameter}/${filePath}`
  } else if (mode === 'fill') {
    return `${cdnUrlWithScheme}/media/${mode}/${normalizeSize(size!)}/${normalizeFill(parameter as Fill)}/${filePath}`
  } else {
    return `${cdnUrlWithScheme}/media/${mode}/${normalizeSize(size!)}/${filePath}`
  }
}
