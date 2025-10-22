<template>
  <q-page class="q-px-md q-pb-md q-pt-md">
    <ListHeader :title="$t( 'menu.dashboard' )" :show-back="false" :show-new="false" :show-delete="false" />

    <div v-if=" loading " class="flex justify-center items-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else-if=" stations.length > 0 " class="q-mt-md">
      <div class="row q-col-gutter-md">
        <div v-for=" station in stations " :key="station.id" class="col-12 col-md-6 col-lg-4">
          <q-card flat bordered>
            <q-card-section>
              <div class="row items-center q-mb-sm">
                <div class="text-h6">{{ station.slugName }}</div>
                <q-space />
                <q-badge :color="getStatusColor( station.id )" :label="getStatusText( station.id )" />
              </div>

              <q-btn-group class="q-mb-md">
                <q-btn unelevated color="primary" icon="play_arrow" :label="$t( 'dashboard.start' )"
                  :loading="isStarting( station.id )" :disable="isOnline( station.id )"
                  @click="handleStart( station.id )" size="sm" />
                <q-btn unelevated color="negative" icon="stop" :label="$t( 'dashboard.stop' )" :loading="isStopping( station.id )"
                  :disable="!isOnline( station.id )" @click="handleStop( station.id )" size="sm" />
              </q-btn-group>

              <div class="q-mb-sm">
                <div class="text-subtitle2 q-mb-xs">{{ $t( 'dashboard.status' ) }}</div>
                <div class="text-caption text-grey-7">
                  {{ $t( 'dashboard.listeners' ) }}: {{ getListeners( station.id ) }}
                </div>
              </div>

              <div>
                <div class="text-subtitle2 q-mb-xs">{{ $t( 'dashboard.livePlaylist' ) }}</div>
                <div v-if=" getPlaylist( station.id ).length > 0 " class="text-caption">
                  <div v-for=" ( item, idx ) in getPlaylist( station.id ).slice( 0, 3 ) " :key="idx" class="q-mb-xs">
                    {{ item }}
                  </div>
                </div>
                <div v-else class="text-caption text-grey-7">
                  {{ $t( 'dashboard.noPlaylist' ) }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div v-else class="text-center q-mt-xl text-grey-6">
      {{ $t( 'dashboard.noData' ) }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useDashboardStore } from 'src/stores/dashboardStore'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'
import { apiClient } from 'src/api/apiClient'
import ListHeader from 'src/components/ListHeader.vue'

const dashboardStore = useDashboardStore()
const radioStationsStore = useRadioStationsStore()
const loading = ref( false )

const stations = computed( () => radioStationsStore.getEntries )

const getStatusColor = ( stationId: string ) => {
  const data = dashboardStore.getStationData( stationId )
  if ( !data ) return 'grey'
  switch ( data.status ) {
    case 'ON_LINE':
    case 'QUEUE_SATURATED':
      return 'positive'
    case 'WARMING_UP':
    case 'WAITING_FOR_CURATOR':
      return 'warning'
    case 'IDLE':
    case 'SYSTEM_ERROR':
      return 'negative'
    default:
      return 'grey'
  }
}

const getStatusText = ( stationId: string ) => {
  const data = dashboardStore.getStationData( stationId )
  const status = data?.status
  if ( status === 'ON_LINE' ) return 'Online'
  if ( status === 'WARMING_UP' ) return 'Warming Up'
  if ( status === 'QUEUE_SATURATED' ) return 'Queue Saturated'
  if ( status === 'WAITING_FOR_CURATOR' ) return 'Waiting for Curator'
  if ( status === 'IDLE' ) return 'Idle'
  if ( status === 'SYSTEM_ERROR' ) return 'System Error'
  if ( status === 'OFF_LINE' ) return 'Offline'
  return status || 'Unknown'
}

const getListeners = ( stationId: string ) => {
  const data = dashboardStore.getStationData( stationId )
  return data?.currentListeners || 0
}

const startingStations = ref<Set<string>>( new Set() )
const stoppingStations = ref<Set<string>>( new Set() )

const isStarting = ( stationId: string ) => startingStations.value.has( stationId )
const isStopping = ( stationId: string ) => stoppingStations.value.has( stationId )

const isOnline = ( stationId: string ) => {
  const data = dashboardStore.getStationData( stationId )
  return data?.status === 'ON_LINE' || data?.status === 'WARMING_UP' || data?.status === 'QUEUE_SATURATED' || data?.status === 'WAITING_FOR_CURATOR'
}

const handleStart = async ( stationId: string ) => {
  startingStations.value.add( stationId )
  try {
    await apiClient.put( `/${stationId}/queue/action`, { action: 'start' } )
  } finally {
    startingStations.value.delete( stationId )
  }
}

const handleStop = async ( stationId: string ) => {
  stoppingStations.value.add( stationId )
  try {
    await apiClient.put( `/${stationId}/queue/action`, { action: 'stop' } )
  } finally {
    stoppingStations.value.delete( stationId )
  }
}

const getPlaylist = ( stationId: string ) => {
  const data = dashboardStore.getStationData( stationId )
  const playlistStats = data?.playlistManagerStats as { livePlaylist?: unknown[] } | undefined
  const livePlaylist = playlistStats?.livePlaylist || []
  return livePlaylist.map( ( item: unknown ) => {
    const playlistItem = item as { title?: string; artist?: string }
    const title = playlistItem?.title || 'N/A'
    const artist = playlistItem?.artist || ''
    return artist ? `${artist} — ${title}` : title
  } )
}

onMounted( async () => {
  loading.value = true
  try {
    await radioStationsStore.fetchRadioStations( 1, 100 )
    stations.value.forEach( station => {
      dashboardStore.connectStation( station.id )
    } )
  } finally {
    loading.value = false
  }
} )

onBeforeUnmount( () => {
  stations.value.forEach( station => {
    dashboardStore.disconnectStation( station.id )
  } )
} )
</script>
