import { defineStore } from 'pinia'
import { unsecuredClient, publicApi } from 'src/api/apiClient'
import type { AxiosProgressEvent } from 'axios'

export const useSubmissionStore = defineStore('submission', () => {

  type Station = {
    name: string
    slugName: string
    managedBy?: string
    djName?: string
    djPreferredLang?: string
    djStatus?: string
    currentStatus?: string
    countryCode?: string
    color?: string
    description?: string
    availableSongs?: number
    submissionPolicy?: string
    animation?: {
      enabled: boolean
      type: string
      speed: number
    }
  }

  interface SubmissionPayload {
    brand: string
    artist: string
    title: string
    genres: string[]
    email: string
    confirmationCode: string
    description: string
    album: string
    uploadId: string | undefined
    newlyUploaded: string[]
    contributorEmail: string
    agreedAt: string
    termsText: string
    isShareable: boolean
    shareable: boolean
    agreementVersion: string
    messageFrom: string
    attachedMessage: string
  }

  async function getStation(brand: string): Promise<Station> {
    const url = `${publicApi}/radio/all-stations/${encodeURIComponent(brand)}`
    const res = await unsecuredClient.get(url)
    return res.data as Station
  }

  async function sendCode(email: string): Promise<void> {
    const url = `/api/messaging/send-code/${encodeURIComponent(email)}`
    await unsecuredClient.post(url)
  }

  async function uploadFile(
      file: File,
      brand: string,
      entityId: string,
      uploadId: string,
      onProgress: (progress: { percent: number }) => void
  ): Promise<{ metadata?: { title?: string; artist?: string; album?: string; genre?: string } }> {
    const formData = new FormData()
    formData.append('file', file)
    const url = `${publicApi}/radio/${encodeURIComponent(brand)}/submissions/files/${encodeURIComponent(entityId)}?uploadId=${uploadId}`

    const res = await unsecuredClient.post<{ metadata?: { title?: string; artist?: string; album?: string; genre?: string } }>(url, formData, {
      maxContentLength: 200 * 1024 * 1024,
      maxBodyLength: 200 * 1024 * 1024,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        try {
          const total = progressEvent.total ?? file.size ?? 0
          const loaded = progressEvent.loaded ?? 0
          const percent = total > 0 ? Math.min(99, Math.round((loaded / total) * 100)) : 0
          onProgress({ percent })
        } catch { /* noop */ }
      }
    })

    return res.data
  }

  async function submit(slug: string, data: SubmissionPayload): Promise<void> {
    const url = `${publicApi}/radio/${encodeURIComponent(slug)}/submissions`
    await unsecuredClient.post(url, data)
  }

  async function postMessage(slug: string, data: {
    confirmationCode: string
    from: string
    content: string
    email: string
    agreedAt: string
    userAgent: string
  }): Promise<void> {
    const url = `${publicApi}/radio/${encodeURIComponent(slug)}/messages`
    await unsecuredClient.post(url, data)
  }

  return {
    getStation,
    sendCode,
    uploadFile,
    submit,
    postMessage
  }
})
