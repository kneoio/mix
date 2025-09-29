export interface BroadcasterType {
  id?: string
  name?: string
}

export interface RadioStation {
  id: string;
  author: string;
  regDate: string;
  lastModifier: string;
  lastModifiedDate: string;
  status: BrandStatus;
  title: string;
  localizedName: Record<string, string>;
  country: string;
  description: string;
  color: string;
  slugName: string;
  url: string;
  hlsUrl: string;
  iceCastUrl?: string;
  mixplaUrl?: string;
  actionUrl: string;
  bitRate?: number;
  aiAgentId?: string;
  aiOverriding?: AiOverriding;
  profileId?: string;
  profileOverriding?: ProfileOverriding;
  timeZone?: string;
  managedBy?: ManagedBy;
  aiControlAllowed?: boolean;
  submissionPolicy?: SubmissionPolicy;
  messagingPolicy?: SubmissionPolicy;
  schedule?: {
      enabled: boolean;
  };
}

export interface RadioStationStatus {
  name: string;
  slugName: string;
  managedBy?: ManagedBy;
  djName?: string;
  djPreferredLang?: string;
  djStatus?: string;
  currentStatus: BrandStatus;
  countryCode: string;
  color: string;
  description: string;
  availableSongs: number;
  submissionPolicy?: SubmissionPolicy;
  messagingPolicy?: SubmissionPolicy;
  animation?: unknown;
}

export interface ProfileOverriding {
  name: string;
  description: string;
}

export interface AiOverriding {
  name: string;
  prompt: string;
  talkativity: number;
  preferredVoice: string;
}


export interface SubmissionPayload {
  brand: string;
  artist: string;
  title: string;
  genres: string[];
  email: string;
  description: string;
  uploadId?: string;
  newlyUploaded?: string[];
  confirmationCode?: string;
  album?: string;
  representedInBrands?: string[];
  contributorEmail?: string;
  isShareable?: boolean;
  attachedMessage?: string;
  country?: string;
  agreedAt?: string;
  termsText?: string;
  agreementVersion?: string;
}


export interface SoundFragment {
  slugName: string;
  id: string | null;
  author: string;
  regDate: string;
  lastModifier: string;
  lastModifiedDate: string;
  type: FragmentType;
  title?: string;
  artist?: string;
  genres: string[];
  album?: string;
  url: string;
  description: string;
  actionUrl: string;
  defaultBrandId: string;
  representedInBrands: string[];
  //uploadedFiles: UploadFileInfo[];
}

export interface SoundFragmentSave {
  type: FragmentType;
  title?: string;
  artist?: string;
  genres: string[];
  album?: string;
  description: string;
  representedInBrands: string[];
  newlyUploaded: string[];
  tempFileIds?: string[];
}

// Minimal filter dto for listing/search
export interface SoundFragmentFilterDTO {
  type?: FragmentType
  genre?: string
  brandId?: string
}

export enum SubmissionPolicy {
  NOT_ALLOWED = "NOT_ALLOWED",
  REVIEW_REQUIRED = "REVIEW_REQUIRED",
  NO_RESTRICTIONS = "NO_RESTRICTIONS"
}


export enum BrandStatus {
  OFF_LINE = "OFF_LINE",
  ON_LINE = "ON_LINE",
  QUEUE_SATURATED = "QUEUE_SATURATED",
  WARMING_UP = "WARMING_UP",
  WAITING_FOR_CURATOR = "WAITING_FOR_CURATOR",
  IDLE = "IDLE",
  SYSTEM_ERROR = "SYSTEM_ERROR",
}

export enum ManagedBy {
  ITSELF = "ITSELF",
  AI_AGENT = "AI_AGENT",
  MIX = "MIX"
}

export enum FragmentType {
  SONG = "SONG",
  ADVERTISEMENT = "ADVERTISEMENT"
}

export interface PageParams {
  page?: number
  size?: number
}
