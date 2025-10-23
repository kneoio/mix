<template>
  <q-page class="q-px-md q-pb-md q-pt-md full-height-page">
    <ListHeader :title="$t( 'menu.dashboard' )" :show-back="false" :show-new="false" :show-delete="false" />

    <div v-if=" loading " class="flex justify-center items-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <q-carousel
      v-else-if=" stations.length > 0 "
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      infinite
      class="rounded-borders dashboard-carousel q-mt-md"
    >
      <q-carousel-slide
        v-for="station in stations"
        :key="station.id"
        :name="station.id"
        class="column no-wrap flex-center"
      >
        <div class="dashboard-content">
          <div class="row items-center q-mb-xl">
            <div class="text-h6">{{ station.slugName }}</div>
            <span
              class="live-status"
              :class="{ 'live-on-air': isHeartbeatActive( station.slugName ) }"
            >
              On Air
            </span>
            <q-space />
            <q-badge :color="getStatusColor( station.slugName )" :label="getStatusText( station.slugName )" />
          </div>

          <q-btn-group class="q-mb-xl">
            <q-btn unelevated color="primary" icon="play_arrow" :label="$t( 'dashboard.start' )"
              :loading="isStarting( station.id )" :disable="isOnline( station.slugName )"
              @click="handleStart( station.slugName )" size="md" />
            <q-btn unelevated color="negative" icon="stop" :label="$t( 'dashboard.stop' )" :loading="isStopping( station.id )"
              :disable="!canStop( station.slugName )" @click="handleStop( station.slugName )" size="md" />
          </q-btn-group>

          <div class="q-mb-xl">
            <div class="text-subtitle2 q-mb-xs">{{ $t( 'dashboard.status' ) }}</div>
            <div class="text-caption text-grey-7">
              {{ $t( 'dashboard.listeners' ) }}: {{ getListeners( station.slugName ) }}
            </div>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs">{{ $t( 'dashboard.livePlaylist' ) }}</div>
            <div v-if=" getCombinedPlaylist( station.slugName ).length > 0 " class="text-caption">
              <div v-for=" ( item, idx ) in getCombinedPlaylist( station.slugName ).slice( 0, 5 ) " :key="idx" class="q-mb-sm playlist-item">
                <div class="row items-center">
                  <div class="col text-left">
                    {{ item?.artist || '' }}
                  </div>
                  <div class="col text-right">
                    {{ item?.title ? cleanTitle( item.title ) : 'N/A' }}
                  </div>
                  <div class="col-auto q-ml-sm">
                    <q-badge v-if="item.isPlayingNow" color="negative" label="Playing" size="xs" />
                    <q-badge v-else-if="item.isQueued" color="info" label="Queued" size="xs" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-caption text-grey-7">
              {{ $t( 'dashboard.noPlaylist' ) }}
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div v-else class="text-center q-mt-xl text-grey-6">
      {{ $t( 'dashboard.noData' ) }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import { useDashboardStore } from 'src/stores/dashboardStore'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'
import { apiClient } from 'src/api/apiClient'
import ListHeader from 'src/components/ListHeader.vue'

const dashboardStore = useDashboardStore()
const radioStationsStore = useRadioStationsStore()
const loading = ref( false )
const slide = ref('')

const stations = computed( () => radioStationsStore.getEntries )

const getStatusColor = ( slugName: string ) => {
  const data = dashboardStore.getStationData( slugName )
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

const getStatusText = ( slugName: string ) => {
  const data = dashboardStore.getStationData( slugName )
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

const getListeners = ( slugName: string ) => {
  const data = dashboardStore.getStationData( slugName )
  return data?.currentListeners || 0
}

const startingStations = ref<Set<string>>( new Set() )
const stoppingStations = ref<Set<string>>( new Set() )

const isStarting = ( stationId: string ) => startingStations.value.has( stationId )
const isStopping = ( stationId: string ) => stoppingStations.value.has( stationId )

const isOnline = ( slugName: string ) => {
  const data = dashboardStore.getStationData( slugName )
  return data?.status === 'ON_LINE' || data?.status === 'WARMING_UP' || data?.status === 'QUEUE_SATURATED' || data?.status === 'WAITING_FOR_CURATOR'
}

const canStop = ( slugName: string ) => {
  const data = dashboardStore.getStationData( slugName )
  return isOnline( slugName ) || data?.status === 'IDLE'
}

const isHeartbeatActive = ( slugName: string ) => {
  const data = dashboardStore.getStationData( slugName )
  return data?.heartbeat === true
}

const handleStart = async ( slugName: string ) => {
  const station = stations.value.find( s => s.slugName === slugName )
  if ( !station ) return
  startingStations.value.add( station.id )
  try {
    await apiClient.put( `/${slugName}/queue/action`, { action: 'start' } )
  } finally {
    startingStations.value.delete( station.id )
  }
}

const handleStop = async ( slugName: string ) => {
  const station = stations.value.find( s => s.slugName === slugName )
  if ( !station ) return
  stoppingStations.value.add( station.id )
  try {
    await apiClient.put( `/${slugName}/queue/action`, { action: 'stop' } )
  } finally {
    stoppingStations.value.delete( station.id )
  }
}

interface PlaylistItem {
  title?: string
  artist?: string
  duration?: number
  mergingType?: string | null
  queueType?: string
  obtained?: boolean
  source?: string
  isQueued?: boolean
  isPlayingNow?: boolean
}

interface SongStatistics {
  songMetadata?: {
    title?: string
    artist?: string
    [key: string]: unknown
  }
  title?: string
  artist?: string
  [key: string]: unknown
}

interface PlaylistManagerStats {
  livePlaylist?: PlaylistItem[]
  queued?: PlaylistItem[]
  [key: string]: unknown
}

const cleanTitle = ( title: string | undefined | null ): string => {
  if ( !title || typeof title !== 'string' ) return 'N/A'
  return title.replace( /^(#+|--+)\s*/, '' ).replace( /[#-]/g, '|' ).trim()
}

const getCurrentTrack = ( slugName: string ): string => {
  const data = dashboardStore.getStationData( slugName )
  const songStats = data?.songStatistics as SongStatistics | undefined
  if ( !songStats ) return 'N/A'
  const title = songStats?.songMetadata?.title ?? songStats?.title
  if ( !title ) return 'N/A'
  return cleanTitle( title )
}

const isCurrentSong = ( slugName: string, fragment: PlaylistItem ): boolean => {
  const currentTrack = getCurrentTrack( slugName )
  if ( !currentTrack || currentTrack === 'N/A' ) return false
  const fragmentTitle = fragment?.title
  if ( !fragmentTitle ) return false
  const cleanFragment = cleanTitle( fragmentTitle )
  return cleanFragment === currentTrack
}

const getCombinedPlaylist = ( slugName: string ) => {
  const data = dashboardStore.getStationData( slugName )
  const playlistStats = data?.playlistManagerStats as PlaylistManagerStats | undefined
  const livePlaylist = playlistStats?.livePlaylist || []
  const queued = playlistStats?.queued || []

  const combined = [
    ...livePlaylist.map( ( item: PlaylistItem ) => ( { ...item, isQueued: false, isPlayingNow: isCurrentSong( slugName, item ) } ) ),
    ...queued.slice().reverse().map( ( item: PlaylistItem ) => ( { ...item, isQueued: true, isPlayingNow: isCurrentSong( slugName, item ) } ) )
  ]

  return combined
}

onMounted( async () => {
  loading.value = true
  try {
    await radioStationsStore.fetchRadioStations( 1, 100 )
    slide.value = stations.value[0]?.id || ''
    const activeStation = stations.value.find( s => s.id === slide.value )
    if ( activeStation ) {
      dashboardStore.startStationPolling( activeStation.slugName )
    }
  } finally {
    loading.value = false
  }
} )

watch( slide, ( newSlide, oldSlide ) => {
  if ( newSlide !== oldSlide ) {
    const oldStation = stations.value.find( s => s.id === oldSlide )
    const newStation = stations.value.find( s => s.id === newSlide )

    if ( oldStation ) {
      dashboardStore.stopStationPolling( oldStation.slugName )
    }
    if ( newStation ) {
      dashboardStore.startStationPolling( newStation.slugName )
    }
  }
} )

onBeforeUnmount( () => {
  const activeStation = stations.value.find( s => s.id === slide.value )
  if ( activeStation ) {
    dashboardStore.stopStationPolling( activeStation.slugName )
  }
} )
</script>

<style scoped>
.full-height-page {
  height: 100%;
}

.dashboard-carousel {
  height: calc(100vh - 200px);
}

.dashboard-content {
  width: 100%;
  max-width: 600px;
}

.live-status {
  font-weight: 400;
  font-size: 18px;
  margin-left: 16px;
}

.live-on-air {
  color: #ef4444 !important;
  text-shadow: 0 0 10px rgba(239, 68, 68, 1), 0 0 18px rgba(239, 68, 68, 0.6);
  font-weight: 600 !important;
  animation: subtle-pulse 2s ease-in-out infinite;
}

.playlist-item {
  padding: 4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.playlist-item:last-child {
  border-bottom: none;
}

@keyframes subtle-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

@media (max-width: 599px) {
  .dashboard-content {
    max-width: 100%;
  }
}
</style>
