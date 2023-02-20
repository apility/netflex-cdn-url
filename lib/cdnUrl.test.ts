import { describe, expect, it } from 'vitest'
import { createCdnFileUrl, createCdnMediaUrl } from './cdnUrl'

describe('createCdnFileUrl', () => {
  const cdnUrl = '0123456789abcd.cloudfront.net'
  const filePath = '1675209600/document.pdf'

  it('adds https scheme to url if scheme isn\'t present in cdnUrl parameter', () => {
    const cdnFileUrl = createCdnFileUrl(cdnUrl, filePath)

    expect(cdnFileUrl).toBe(`https://${cdnUrl}/${filePath}`)
  })

  it('doesn\'t add https scheme to url if http scheme is present in cdnUrl parameter', () => {
    const cdnFileUrl = createCdnFileUrl(`http://${cdnUrl}`, filePath)

    expect(cdnFileUrl).toBe(`http://${cdnUrl}/${filePath}`)
  })

  it('doesn\'t add https scheme to url if https scheme is present in cdnUrl parameter', () => {
    const cdnFileUrl = createCdnFileUrl(`https://${cdnUrl}`, filePath)

    expect(cdnFileUrl).toBe(`https://${cdnUrl}/${filePath}`)
  })
})

describe('createCdnMediaUrl', () => {
  const cdnUrl = '0123456789abcd.cloudfront.net'
  const filePath = '1675209600/image.png'

  it('adds https scheme to url if scheme isn\'t present in cdnUrl parameter', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'o')

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/o/${filePath}`)
  })

  it('doesn\'t add https scheme to url if http scheme is present in cdnUrl parameter', () => {
    const cdnMediaUrl = createCdnMediaUrl(`http://${cdnUrl}`, filePath, 'o')

    expect(cdnMediaUrl).toBe(`http://${cdnUrl}/media/o/${filePath}`)
  })

  it('doesn\'t add https scheme to url if https scheme is present in cdnUrl parameter', () => {
    const cdnMediaUrl = createCdnMediaUrl(`https://${cdnUrl}`, filePath, 'o')

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/o/${filePath}`)
  })

  it('creates original mode urls', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'o')

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/o/${filePath}`)
  })

  it('creates size mode urls with size given as single number', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'c', 100)

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/c/100x100/${filePath}`)
  })

  it('creates size mode urls with size given as short string', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'c', '100')

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/c/100x100/${filePath}`)
  })

  it('creates size mode urls with size given as long string', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'c', '100x200')

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/c/100x200/${filePath}`)
  })

  it('creates size mode urls with size given as short tuple', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'c', [100] as [100])

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/c/100x100/${filePath}`)
  })

  it('creates size mode urls with size given as long tuple', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'c', [100, 200] as [100, 200])

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/c/100x200/${filePath}`)
  })

  it('creates crop mode urls', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'c', 100)

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/c/100x100/${filePath}`)
  })

  it('creates resize crop mode urls', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'rc', 100)

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/rc/100x100/${filePath}`)
  })

  it('creates exact mode urls', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'e', 100)

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/e/100x100/${filePath}`)
  })

  it('creates portrait mode urls', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'p', 100)

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/p/100x100/${filePath}`)
  })

  it('creates landscape mode urls', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'l', 100)

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/l/100x100/${filePath}`)
  })

  it('creates auto mode urls', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'a', 100)

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/a/100x100/${filePath}`)
  })

  it('creates fill mode urls with fill given as short string', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'fill', 100, '255,255,255')

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/fill/100x100/255,255,255/${filePath}`)
  })

  it('creates fill mode urls with fill given as long string', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'fill', 100, '255,255,255,0')

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/fill/100x100/255,255,255,0/${filePath}`)
  })

  it('creates fill mode urls with fill given as short tuple', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'fill', 100, [255, 255, 255] as [255, 255, 255])

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/fill/100x100/255,255,255/${filePath}`)
  })

  it('creates fill mode urls with fill given as long tuple', () => {
    const cdnMediaUrl = createCdnMediaUrl(cdnUrl, filePath, 'fill', 100, [255, 255, 255, 0] as [255, 255, 255, 0])

    expect(cdnMediaUrl).toBe(`https://${cdnUrl}/media/fill/100x100/255,255,255,0/${filePath}`)
  })

  it('creates resize crop focal point mode urls', () => {
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 't')).toBe(`https://${cdnUrl}/media/rcf/1x1/t/${filePath}`)
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 'tl')).toBe(`https://${cdnUrl}/media/rcf/1x1/tl/${filePath}`)
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 'tr')).toBe(`https://${cdnUrl}/media/rcf/1x1/tr/${filePath}`)
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 'b')).toBe(`https://${cdnUrl}/media/rcf/1x1/b/${filePath}`)
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 'bl')).toBe(`https://${cdnUrl}/media/rcf/1x1/bl/${filePath}`)
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 'br')).toBe(`https://${cdnUrl}/media/rcf/1x1/br/${filePath}`)
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 'l')).toBe(`https://${cdnUrl}/media/rcf/1x1/l/${filePath}`)
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 'r')).toBe(`https://${cdnUrl}/media/rcf/1x1/r/${filePath}`)
    expect(createCdnMediaUrl(cdnUrl, filePath, 'rcf', 1, 'c')).toBe(`https://${cdnUrl}/media/rcf/1x1/c/${filePath}`)
  })
})
