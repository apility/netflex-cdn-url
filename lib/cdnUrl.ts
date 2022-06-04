import {
  CdnUrl,
  OriginalMode,
  SizeMode,
  Size,
  FillMode,
  ResizeCropFocalPointMode,
  Fill,
  FocalPoint,
  Mode,
  Parameter,
} from './types'

export const createCdnFileUrl = (cdnUrl: CdnUrl, filePath: string) => (
  `//${cdnUrl}/${filePath}`
)

export function createCdnMediaUrl (cdnUrl: CdnUrl, filePath: string, mode: OriginalMode): string
export function createCdnMediaUrl (cdnUrl: CdnUrl, filePath: string, mode: SizeMode, size: Size): string
export function createCdnMediaUrl (cdnUrl: CdnUrl, filePath: string, mode: FillMode, size: Size, fill: Fill): string
export function createCdnMediaUrl (
  cdnUrl: CdnUrl,
  filePath: string,
  mode: ResizeCropFocalPointMode,
  size: Size,
  focalPoint: FocalPoint,
): string
export function createCdnMediaUrl (
  cdnUrl: CdnUrl,
  filePath: string,
  mode: Mode,
  size?: Size,
  parameter?: Parameter,
): string
export function createCdnMediaUrl (
  cdnUrl: CdnUrl,
  filePath: string,
  mode: Mode,
  size?: Size,
  parameter?: Parameter,
): string {
  if (mode === 'fill' || mode === 'rcf') {
    return `//${cdnUrl}/media/${mode}/${size}/${parameter}/${filePath}`
  } else if (mode === 'o') {
    return `//${cdnUrl}/media/${mode}/${filePath}`
  } else {
    return `//${cdnUrl}/media/${mode}/${size}/${filePath}`
  }
}
