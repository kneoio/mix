<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-sm-6">
      <q-input :model-value="email" @update:model-value="onEmail" label="Email" outlined dense type="email">
        <template v-slot:after>
          <q-btn :label="codeSent ? 'Resend code' : 'Send code'" color="primary" outline dense :loading="sendingCode"
            :disable="sendingCode || !canSend" @click="$emit( 'send-code' )" />
        </template>
      </q-input>
    </div>
    <div class="col-12 col-sm-6">
      <q-input :model-value="confirmationCode" @update:model-value="onCode" label="Confirmation Code" outlined dense />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  email: string
  confirmationCode: string
  sendingCode: boolean
  codeSent: boolean
  canSend: boolean
}>()

const emit = defineEmits<{
  ( e: 'update:email', v: string ): void
  ( e: 'update:confirmationCode', v: string ): void
  ( e: 'send-code' ): void
}>()

function onEmail( v: string | number | null ) {
  emit( 'update:email', String( v || '' ) )
}

function onCode( v: string | number | null ) {
  emit( 'update:confirmationCode', String( v || '' ) )
}
</script>
