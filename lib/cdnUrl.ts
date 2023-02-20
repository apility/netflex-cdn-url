import {
  CdnUrl,
  FilePath,
  Mode,
  OriginalMode,
  SizeMode,
  Size,
  FillMode,
  Fill,
  FillShortTuple,
  FillShortString,
  FillLongString,
  ResizeCropFocalPointMode,
  FocalPoint,
  Parameter,
  SizeShortString,
  SizeNumber,
  SizeLongString,
  SizeShortTuple,
  SizeLongTuple,
} from './types'

export type EnsureCdnUrlScheme<T extends CdnUrl> = T extends `http://${CdnUrl}` | `https://${CdnUrl}`
  ? T
  : `https://${T}`

const ensureCdnUrlScheme = <T extends CdnUrl> (cdnUrl: T) => {
  const cdnUrlWithScheme = cdnUrl.match(/^https?:\/\/.*/)
    ? cdnUrl
    : `https://${cdnUrl}`

  return cdnUrlWithScheme as EnsureCdnUrlScheme<T>
}

export const createCdnFileUrl = <C extends CdnUrl, F extends FilePath> (cdnUrl: C, filePath: F) => (
  `${ensureCdnUrlScheme(cdnUrl)}/${filePath}` as const
)

export type NormalizeSize<T extends Size> = T extends SizeLongString
  ? T
  : T extends SizeShortString | SizeNumber
    ? `${T}x${T}`
    : T extends SizeShortTuple
      ? `${T[0]}x${T[0]}`
      : T extends SizeLongTuple
        ? `${T[0]}x${T[1]}`
        : never

const normalizeSize = <T extends Size>(size: T): NormalizeSize<T> => {
  const normalizedSize = typeof size === 'string'
    ? (size.includes('x') ? size : `${size}x${size}`)
    : typeof size === 'number'
      ? `${size}x${size}`
      : `${size.at(0)}x${size.at(-1)}`

  return normalizedSize as NormalizeSize<T>
}

export type NormalizeFill<T extends Fill> = T extends FillShortString | FillLongString
  ? T
  : T extends FillShortTuple
    ? `${T[0]},${T[1]},${T[2]}`
    : `${T[0]},${T[1]},${T[2]},${T[3]}`

const normalizeFill = <T extends Fill> (fill: T) => {
  const normalizedFill = typeof fill === 'string'
    ? fill
    : fill.join(',')

  return normalizedFill as NormalizeFill<T>
}

export function createCdnMediaUrl<C extends CdnUrl, FP extends FilePath> (
  cdnUrl: C,
  filePath: FP,
  mode: OriginalMode,
): `${EnsureCdnUrlScheme<C>}/media/${OriginalMode}/${FP}`
export function createCdnMediaUrl<C extends CdnUrl, FP extends FilePath, SM extends SizeMode, S extends Size> (
  cdnUrl: C,
  filePath: FP,
  mode: SM,
  size: S,
): `${EnsureCdnUrlScheme<C>}/media/${SM}/${NormalizeSize<S>}/${FP}`
export function createCdnMediaUrl<C extends CdnUrl, FP extends FilePath, F extends Fill, S extends Size> (
  cdnUrl: C,
  filePath: FP,
  mode: FillMode,
  size: S,
  fill: F,
): `${EnsureCdnUrlScheme<C>}/media/${FillMode}/${NormalizeSize<S>}/${NormalizeFill<F>}/${FP}`
export function createCdnMediaUrl<C extends CdnUrl, FP extends FilePath, S extends Size, FPO extends FocalPoint> (
  cdnUrl: C,
  filePath: FP,
  mode: ResizeCropFocalPointMode,
  size: S,
  focalPoint: FPO,
): `${EnsureCdnUrlScheme<C>}/media/${ResizeCropFocalPointMode}/${NormalizeSize<S>}/${FPO}/${FP}`
export function createCdnMediaUrl<C extends CdnUrl, F extends FilePath, M extends Mode, S extends Size, P extends Parameter> (
  cdnUrl: C,
  filePath: F,
  mode: M,
  size?: S,
  parameter?: P,
): `${EnsureCdnUrlScheme<C>}/media/${M}/${F}` |
  `${EnsureCdnUrlScheme<C>}/media/${M}/${NormalizeSize<S>}/${F}` |
  `${EnsureCdnUrlScheme<C>}/media/${M}/${NormalizeSize<S>}/${M extends ResizeCropFocalPointMode
    ? (P extends FocalPoint ? P : never)
    : (P extends Fill ? NormalizeFill<P> : never)
  }/${F}`
export function createCdnMediaUrl (
  cdnUrl: CdnUrl,
  filePath: FilePath,
  mode: Mode,
  size?: Size,
  parameter?: Parameter,
): string {
  const cdnUrlWithScheme = ensureCdnUrlScheme(cdnUrl)

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
