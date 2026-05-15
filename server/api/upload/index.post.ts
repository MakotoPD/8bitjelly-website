import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { requireAdmin } from '~~/server/utils/auth'

let _s3: S3Client | null = null

function getS3() {
  if (_s3) return _s3
  const config = useRuntimeConfig()
  _s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey,
    },
  })
  return _s3
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parts = await readMultipartFormData(event)
  const filePart = parts?.find(p => p.name === 'file')
  if (!filePart?.data?.length) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  const config = useRuntimeConfig()
  if (!config.r2AccountId || !config.r2Bucket) {
    throw createError({ statusCode: 500, message: 'R2 not configured' })
  }

  const originalName = filePart.filename || 'upload'
  const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg'
  const safeName = originalName
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40)
  const folder = (getQuery(event).folder as string | undefined)?.replace(/[^a-z0-9/_-]/gi, '') || 'uploads'
  const key = `${folder}/${Date.now()}-${safeName}.${ext}`

  const contentType = filePart.type || (
    ['jpg', 'jpeg'].includes(ext) ? 'image/jpeg' :
    ext === 'png' ? 'image/png' :
    ext === 'webp' ? 'image/webp' :
    ext === 'gif' ? 'image/gif' :
    'application/octet-stream'
  )

  await getS3().send(new PutObjectCommand({
    Bucket: config.r2Bucket,
    Key: key,
    Body: filePart.data,
    ContentType: contentType,
  }))

  return { url: `${config.r2PublicUrl}/${key}` }
})
