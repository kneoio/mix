<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="col-auto">
        <q-btn flat icon="arrow_back" label="Back" @click="goBack" />
      </div>
      <div class="col text-center">
        <div class="text-h5">{{ stationName }}</div>
        <div class="text-caption text-grey-7">{{ displayStatusText }}</div>
      </div>
      <div class="col-auto" style="width: 80px;"></div>
    </div>

    <div class="column q-gutter-lg">
      <q-card flat>
        <q-card-section>
          <div class="text-body2 q-mb-md">{{ formatStatusText( currentStatus ) }}</div>
          <div class="text-subtitle2 q-mb-sm">Description</div>
          <div class="text-body2">{{ description }}</div>
        </q-card-section>
      </q-card>

      <q-card flat>
        <q-tabs v-model="activeTab" dense class="text-grey" active-color="primary" indicator-color="primary"
          align="left">
          <q-tab name="submitSong" label="Submit Song" />
          <q-tab name="postMessage" label="Post Message" />
        </q-tabs>
        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="submitSong">
            <q-form @submit.prevent="handleSubmit" class="gt-sm" style="max-width: 50%;">
              <div class="q-gutter-md">
                <div class="row items-center">
                  <div class="col-3 text-body2 text-right q-pr-md">Artist</div>
                  <div class="col">
                    <q-input v-model="form.artist" outlined dense />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-body2 text-right q-pr-md">Title</div>
                  <div class="col">
                    <q-input v-model="form.title" outlined dense />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-body2 text-right q-pr-md">Album</div>
                  <div class="col">
                    <q-input v-model="form.album" outlined dense />
                  </div>
                </div>
                <div class="row items-start">
                  <div class="col-3 text-body2 text-right q-pr-md" style="padding-top: 8px;">Genres</div>
                  <div class="col-9">
                    <q-select v-model="form.genres" :options="referencesStore.genreOptions" outlined dense multiple
                      use-chips emit-value map-options />
                  </div>
                </div>
                <div class="row items-start">
                  <div class="col-3 text-body2 text-right q-pr-md" style="padding-top: 8px;">Description</div>
                  <div class="col">
                    <q-input v-model="form.description" outlined dense type="textarea" :rows="3" />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-body2 text-right q-pr-md">Email</div>
                  <div class="col-4">
                    <q-input v-model="form.email" outlined dense type="email" />
                  </div>
                  <div class="col-auto">
                    <q-btn class="q-ml-sm" :label="codeSent ? 'Resend code' : 'Send code'" color="primary" outline dense
                      :loading="sendingCode" :disable="sendingCode || !isValidEmail( form.email )"
                      @click="sendCode" />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-body2 text-right q-pr-md">Confirmation Code</div>
                  <div class="col-4">
                    <q-input v-model="form.confirmationCode" outlined dense />
                  </div>
                </div>

                <div class="row items-start">
                  <div class="col-3"></div>
                  <div class="col">
                    <q-uploader v-model="fileList" label="Audio File (mp3, wav)" accept="audio/*,.mp3,.wav"
                      :max-files="1" :disable="submitting" @added="handleUpload" @removed="handleRemove" flat bordered
                      style="width: 100%" />
                    <q-banner v-if=" uploadStatus " :class="`bg-${uploadStatus.type} text-white q-mt-sm`" dense>
                      {{ uploadStatus.message }}
                    </q-banner>

                    <q-expansion-item v-if=" policyText " label="Submission Policy" class="q-mt-sm" dense>
                      <q-card>
                        <q-card-section class="text-body2">
                          {{ policyText }}
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>

                    <q-expansion-item :label="referencesStore.musicUploadAgreement.title" class="q-mt-sm" dense>
                      <div class="q-pa-sm" v-html="referencesStore.musicUploadAgreement.clause"></div>
                    </q-expansion-item>

                    <div class="q-mt-sm">
                      <q-checkbox v-model="form.agree" dense>
                        <span :class="!form.agree ? 'text-negative' : ''">I agree with the Music Upload Agreement</span>
                      </q-checkbox>
                      <q-checkbox v-model="form.isShareable" dense>
                        I agree that Mixpla can share this song with other radio stations
                      </q-checkbox>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-3"></div>
                  <div class="col">
                    <div class="row justify-end q-gutter-sm">
                      <q-btn label="Reset" outline @click="resetForm" :disable="submitting" />
                      <q-btn label="Submit" type="submit" color="primary" :loading="submitting"
                        :disable="submitting || isUploading" />
                    </div>
                  </div>
                </div>
              </div>
            </q-form>

            <q-form @submit.prevent="handleSubmit" class="lt-md">
              <div class="q-gutter-md">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <q-input v-model="form.artist" label="Artist" outlined dense />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-input v-model="form.title" label="Title" outlined dense />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-input v-model="form.album" label="Album (optional)" outlined dense />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-select v-model="form.genres" :options="referencesStore.genreOptions" label="Genres" outlined
                      dense multiple use-chips emit-value map-options />
                  </div>
                </div>

                <q-input v-model="form.description" label="Description (optional)" outlined dense type="textarea"
                  :rows="3" />

                <EmailVerifyFields :email="form.email" :confirmation-code="form.confirmationCode"
                  :sending-code="sendingCode" :code-sent="codeSent" :can-send="isValidEmail( form.email )"
                  @update:email="( v: string ) => ( form.email = v )"
                  @update:confirmationCode="( v: string ) => ( form.confirmationCode = v )" @send-code="sendCode" />

                <div>
                  <q-uploader v-model="fileList" label="Audio File (mp3, wav)" accept="audio/*,.mp3,.wav" :max-files="1"
                    :disable="submitting" @added="handleUpload" @removed="handleRemove" flat bordered
                    style="width: 100%" />
                  <q-banner v-if=" uploadStatus " :class="`bg-${uploadStatus.type} text-white q-mt-sm`" dense>
                    {{ uploadStatus.message }}
                  </q-banner>

                  <q-expansion-item v-if=" policyText " label="Submission Policy" class="q-mt-sm" dense>
                    <q-card>
                      <q-card-section class="text-body2">
                        {{ policyText }}
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>

                  <q-expansion-item :label="referencesStore.musicUploadAgreement.title" class="q-mt-sm" dense>
                    <q-card>
                      <q-card-section class="text-body2" style="white-space: pre-wrap">
                        {{ referencesStore.musicUploadAgreement.clause }}
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>

                  <div class="q-mt-sm">
                    <q-checkbox v-model="form.agree" dense>
                      <span :class="!form.agree ? 'text-negative' : ''">I agree with the Music Upload Agreement</span>
                    </q-checkbox>
                    <q-checkbox v-model="form.isShareable" dense>
                      I agree that Mixpla can share this song with other radio stations
                    </q-checkbox>
                  </div>
                </div>

                <div class="row justify-end q-gutter-sm">
                  <q-btn label="Reset" outline @click="resetForm" :disable="submitting" />
                  <q-btn label="Submit" type="submit" color="primary" :loading="submitting"
                    :disable="submitting || isUploading" />
                </div>
              </div>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="postMessage">
            <q-form @submit.prevent="handleMessageSubmit" class="gt-sm" style="max-width: 50%;">
              <div class="q-gutter-md">
                <div class="row items-center">
                  <div class="col-3 text-body2 text-right q-pr-md">From</div>
                  <div class="col">
                    <q-input v-model="messageForm.from" outlined dense />
                  </div>
                </div>
                <div class="row items-start">
                  <div class="col-3 text-body2 text-right q-pr-md" style="padding-top: 8px;">Message</div>
                  <div class="col">
                    <q-input v-model="messageForm.content" outlined dense type="textarea" :rows="3" />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-body2 text-right q-pr-md">Email</div>
                  <div class="col-4">
                    <q-input v-model="messageForm.email" outlined dense type="email" />
                  </div>
                  <div class="col-auto">
                    <q-btn class="q-ml-sm" :label="messageCodeSent ? 'Resend code' : 'Send code'" color="primary" outline dense
                      :loading="sendingMessageCode" :disable="sendingMessageCode || !isValidEmail( messageForm.email )"
                      @click="sendMessageCode" />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-body2 text-right q-pr-md">Confirmation Code</div>
                  <div class="col-4">
                    <q-input v-model="messageForm.confirmationCode" outlined dense />
                  </div>
                </div>

                <div class="row items-start">
                  <div class="col-3"></div>
                  <div class="col">
                    <q-expansion-item :label="referencesStore.messagePostingAgreement.title" dense>
                      <div class="q-pa-sm" v-html="referencesStore.messagePostingAgreement.clause"></div>
                    </q-expansion-item>

                    <q-checkbox v-model="messageForm.agree" dense class="q-mt-sm">
                      <span :class="!messageForm.agree ? 'text-negative' : ''">I agree with the Message Posting
                        Agreement</span>
                    </q-checkbox>
                  </div>
                </div>

                <div class="row">
                  <div class="col-3"></div>
                  <div class="col">
                    <div class="row justify-end q-gutter-sm">
                      <q-btn label="Reset" outline @click="resetMessageForm" :disable="submittingMessage" />
                      <q-btn label="Submit" type="submit" color="primary" :loading="submittingMessage"
                        :disable="submittingMessage" />
                    </div>
                  </div>
                </div>
              </div>
            </q-form>

            <q-form @submit.prevent="handleMessageSubmit" class="lt-md">
              <div class="q-gutter-md">
                <q-input v-model="messageForm.from" label="From" outlined dense />
                <q-input v-model="messageForm.content" label="Message" outlined dense type="textarea" :rows="3" />

                <EmailVerifyFields :email="messageForm.email" :confirmation-code="messageForm.confirmationCode"
                  :sending-code="sendingMessageCode" :code-sent="messageCodeSent"
                  :can-send="isValidEmail( messageForm.email )"
                  @update:email="( v: string ) => ( messageForm.email = v )"
                  @update:confirmationCode="( v: string ) => ( messageForm.confirmationCode = v )"
                  @send-code="sendMessageCode" />

                <q-expansion-item :label="referencesStore.messagePostingAgreement.title" dense>
                  <q-card>
                    <q-card-section class="text-body2" style="white-space: pre-wrap">
                      {{ referencesStore.messagePostingAgreement.clause }}
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-checkbox v-model="messageForm.agree" dense>
                  <span :class="!messageForm.agree ? 'text-negative' : ''">I agree with the Message Posting
                    Agreement</span>
                </q-checkbox>

                <div class="row justify-end q-gutter-sm">
                  <q-btn label="Reset" outline @click="resetMessageForm" :disable="submittingMessage" />
                  <q-btn label="Submit" type="submit" color="primary" :loading="submittingMessage"
                    :disable="submittingMessage" />
                </div>
              </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useStationStatusStore } from 'src/stores/stationStatusStore'
import { useSubmissionStore } from 'src/stores/submissionStore'
import { useReferencesStore } from 'src/stores/referencesStore'
import EmailVerifyFields from 'src/components/EmailVerifyFields.vue'
type QUploadFile = { name: string; __status: string }

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const stationStatusStore = useStationStatusStore()
const submissionStore = useSubmissionStore()
const referencesStore = useReferencesStore()
const stationSlug = computed( () => String( route.params.slug || '' ) )
const { stationName, currentStatus, description, displayStatusText } = storeToRefs( stationStatusStore )
const { formatStatusText } = stationStatusStore
const activeTab = ref( 'submitSong' )

const form = ref( {
  artist: '',
  title: '',
  genres: [] as string[],
  email: '',
  description: '',
  album: '',
  agree: false,
  confirmationCode: '',
  isShareable: false
} )

const messageForm = ref( {
  from: '',
  content: '',
  email: '',
  confirmationCode: '',
  agree: false
} )

const fileList = ref<QUploadFile[]>( [] )
const currentUploadId = ref<string | null>( null )
const uploadedFileName = ref<string>( '' )
const submitting = ref( false )
const sendingCode = ref( false )
const codeSent = ref( false )
const submittingMessage = ref( false )
const sendingMessageCode = ref( false )
const messageCodeSent = ref( false )
const uploadStatus = ref<{ type: 'info' | 'positive' | 'negative', message: string } | null>( null )
const policy = ref<string>( '' )
const stationColor = ref<string>( '' )
const stationAvailableSongs = ref<number | null>( null )

const policyText = computed( () => {
  if ( policy.value === 'REVIEW_REQUIRED' ) {
    return 'Your song will be reviewed by the station owner and published if it meets the station policy.'
  }
  if ( policy.value === 'NO_RESTRICTIONS' ) {
    return 'Your song will be queued to play automatically. The station may remove it after one or more plays.'
  }
  return ''
} )

const isUploading = computed( () => {
  const file = fileList.value[0]
  return file && file.__status === 'uploading'
} )

const isValidEmail = ( email: string ): boolean => {
  return /.+@.+\..+/.test( email || '' )
}

const validateForm = (): string | null => {
  if ( !form.value.artist?.trim() ) return 'Artist is required'
  if ( !form.value.title?.trim() ) return 'Title is required'
  if ( !form.value.email?.trim() ) return 'Email is required'
  if ( !isValidEmail( form.value.email ) ) return 'Enter a valid email'
  if ( !form.value.genres?.length ) return 'Select at least one genre'
  if ( !fileList.value.length || !uploadedFileName.value ) return 'Audio file is required'
  if ( !form.value.agree ) return 'You must agree to the terms'
  if ( codeSent.value && !form.value.confirmationCode?.trim() ) return 'Confirmation code is required'
  return null
}

const showNotification = ( type: 'positive' | 'negative' | 'warning' | 'info', message: string ) => {
  $q.notify( {
    type,
    message,
    position: 'top'
  } )
}

const applyMetadataFromUpload = ( res: { metadata?: { title?: string; artist?: string; album?: string; genre?: string } } ) => {
  try {
    const md = res?.metadata || null
    if ( !md ) return

    if ( !form.value.title && md.title ) {
      form.value.title = String( md.title )
    }
    if ( !form.value.artist && md.artist ) {
      form.value.artist = String( md.artist )
    }
    if ( !form.value.album && md.album ) {
      form.value.album = String( md.album )
    }

    const incomingGenre = md.genre
    if ( Array.isArray( form.value.genres ) && ( !form.value.genres.length ) && incomingGenre ) {
      const opts = referencesStore.genreOptions || []
      const match = opts.find( ( o: { value?: string; label?: string } ) => {
        const val = ( o?.value ?? '' ).toString()
        const label = ( o?.label ?? '' ).toString()
        const g = incomingGenre.toString()
        return val.localeCompare( g, undefined, { sensitivity: 'accent' } ) === 0 ||
          label.localeCompare( g, undefined, { sensitivity: 'accent' } ) === 0
      } )
      if ( match && match.value ) {
        form.value.genres = [match.value]
      }
    }
  } catch { /* noop */ }
}

const handleUpload = async ( files: readonly File[] | readonly { file?: File }[] ) => {
  try {
    if ( !files || files.length === 0 ) {
      throw new Error( 'No file selected for upload' )
    }

    const firstItem = files[0]
    if ( !firstItem ) {
      throw new Error( 'No file selected for upload' )
    }

    const file = 'file' in firstItem ? firstItem.file : firstItem

    if ( !file || !( file instanceof File ) ) {
      throw new Error( 'No file selected for upload' )
    }

    uploadStatus.value = { type: 'info', message: 'Uploading file...' }
    const uploadId = crypto.randomUUID()
    currentUploadId.value = uploadId
    const originalFileName = file.name

    const res = await submissionStore.uploadFile(
      file,
      stationSlug.value,
      'temp',
      uploadId,
      ( progress ) => {
        console.log( 'Upload progress:', progress.percent )
      }
    )

    uploadedFileName.value = originalFileName
    applyMetadataFromUpload( res )
    const md = res?.metadata || {}
    const title = md?.title || ''
    const artist = md?.artist || ''
    const niceName = title || originalFileName
    const composed = artist ? `${niceName} — ${artist}` : `${niceName}`
    uploadStatus.value = {
      type: 'positive',
      message: `Uploaded: ${composed}`
    }

  } catch ( e: unknown ) {
    console.error( '[Upload] Error', e )
    const errorMessage = ( e as { response?: { data?: { message?: string } }; message?: string } )?.response?.data?.message || ( e as { message?: string } )?.message || 'Upload failed'
    uploadStatus.value = { type: 'negative', message: errorMessage }
    showNotification( 'negative', errorMessage )
  }
}

const handleRemove = () => {
  uploadedFileName.value = ''
  currentUploadId.value = null
  uploadStatus.value = null
}

const sendCode = async () => {
  if ( !isValidEmail( form.value.email ) ) return

  try {
    sendingCode.value = true
    await submissionStore.sendCode( form.value.email )
    codeSent.value = true
    showNotification( 'positive', 'Confirmation code sent to your email' )
  } catch ( e: unknown ) {
    const errorMessage = ( e as { response?: { data?: { message?: string } } } )?.response?.data?.message || 'Failed to send code'
    showNotification( 'negative', errorMessage )
  } finally {
    sendingCode.value = false
  }
}

const handleSubmit = async () => {
  const validationError = validateForm()
  if ( validationError ) {
    showNotification( 'negative', validationError )
    return
  }

  if ( isUploading.value ) {
    showNotification( 'warning', 'Please wait for the file upload to complete' )
    return
  }

  submitting.value = true

  try {
    const termsText = `${referencesStore.musicUploadAgreement.title}\n\n${referencesStore.musicUploadAgreement.clause}`

    const payload = {
      brand: stationSlug.value,
      artist: form.value.artist,
      title: form.value.title,
      genres: form.value.genres,
      email: form.value.email,
      confirmationCode: codeSent.value ? form.value.confirmationCode : '',
      description: form.value.description,
      album: form.value.album || '',
      uploadId: currentUploadId.value || undefined,
      newlyUploaded: [uploadedFileName.value],
      contributorEmail: form.value.email,
      agreedAt: new Date().toISOString(),
      termsText,
      isShareable: form.value.isShareable,
      shareable: form.value.isShareable,
      agreementVersion: referencesStore.musicUploadAgreement.version,
      messageFrom: '',
      attachedMessage: ''
    }

    await submissionStore.submit( stationSlug.value, payload )

    showNotification( 'positive', 'Thanks! Your song was submitted.' )
    resetForm()

  } catch ( e: unknown ) {
    console.error( '[Submit] Error', e )
    const errorMessage = ( e as { response?: { data?: { message?: string } }; message?: string } )?.response?.data?.message || ( e as { message?: string } )?.message || 'Submission failed'
    showNotification( 'negative', errorMessage )
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    artist: '',
    title: '',
    genres: [],
    email: '',
    description: '',
    album: '',
    agree: false,
    confirmationCode: '',
    isShareable: false
  }
  fileList.value = []
  uploadedFileName.value = ''
  currentUploadId.value = null
  uploadStatus.value = null
  codeSent.value = false
}

const sendMessageCode = async () => {
  if ( !isValidEmail( messageForm.value.email ) ) return

  try {
    sendingMessageCode.value = true
    await submissionStore.sendCode( messageForm.value.email )
    messageCodeSent.value = true
    showNotification( 'positive', 'Confirmation code sent to your email' )
  } catch ( e: unknown ) {
    const errorMessage = ( e as { response?: { data?: { message?: string } } } )?.response?.data?.message || 'Failed to send code'
    showNotification( 'negative', errorMessage )
  } finally {
    sendingMessageCode.value = false
  }
}

const validateMessageForm = (): string | null => {
  if ( !messageForm.value.from?.trim() ) return 'From is required'
  if ( !messageForm.value.content?.trim() ) return 'Message is required'
  if ( !messageForm.value.email?.trim() ) return 'Email is required'
  if ( !isValidEmail( messageForm.value.email ) ) return 'Enter a valid email'
  if ( !messageForm.value.confirmationCode?.trim() ) return 'Confirmation code is required'
  if ( !messageForm.value.agree ) return 'You must agree to the Message Posting Agreement'
  return null
}

const handleMessageSubmit = async () => {
  const validationError = validateMessageForm()
  if ( validationError ) {
    showNotification( 'negative', validationError )
    return
  }

  submittingMessage.value = true

  try {
    const payload = {
      confirmationCode: messageForm.value.confirmationCode,
      from: messageForm.value.from,
      content: messageForm.value.content,
      email: messageForm.value.email,
      agreedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    }

    await submissionStore.postMessage( stationSlug.value, payload )

    showNotification( 'positive', 'Thanks! Your message was sent.' )
    resetMessageForm()

  } catch ( e: unknown ) {
    console.error( '[Submit Message] Error', e )
    const errorMessage = ( e as { response?: { data?: { message?: string } }; message?: string } )?.response?.data?.message || ( e as { message?: string } )?.message || 'Submission failed'
    showNotification( 'negative', errorMessage )
  } finally {
    submittingMessage.value = false
  }
}

const resetMessageForm = () => {
  messageForm.value = {
    from: '',
    content: '',
    email: '',
    confirmationCode: '',
    agree: false
  }
  messageCodeSent.value = false
}

function goBack() {
  void router.back()
}

onMounted( async () => {
  await stationStatusStore.fetchStation( stationSlug.value )

  try {
    const station = await submissionStore.getStation( stationSlug.value )
    policy.value = station?.submissionPolicy || ''
    stationColor.value = station?.color || ''
    stationAvailableSongs.value = station?.availableSongs ?? 0
  } catch {
    policy.value = ''
    stationColor.value = ''
    stationAvailableSongs.value = null
  }

  try {
    await referencesStore.fetchGenres()
  } catch ( e ) {
    console.error( 'Failed to fetch genres', e )
  }
} )
</script>
