import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from 'src/api/apiClient'

export const useReferencesStore = defineStore('references', () => {
  const genreOptions = ref<Array<{label: string, value: string}>>([])

  const countryOptions = [
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "GB" },
    { label: "Deutschland", value: "DE" },
    { label: "France", value: "FR" },
    { label: "Latvija", value: "LV" },
    { label: "España", value: "ES" },
    { label: "Portugal", value: "PT" },
    { label: "Қазақстан", value: "KZ" },
    { label: "日本", value: "JP" },
    { label: "中国", value: "CN" },
    { label: "한국", value: "KR" },
    { label: "भारत", value: "IN" },
    { label: "Україна", value: "UA" },
    { label: "Suomi", value: "FI" },
    { label: "Norge", value: "NO" },
    { label: "Sverige", value: "SE" },
    { label: "Polska", value: "PL" },
    { label: "Italia", value: "IT" },
    { label: "Türkiye", value: "TR" },
    { label: "საქართველო", value: "GE" }
  ];

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Português", value: "pt" },
    { label: "Қазақша", value: "kk" },
    { label: "Español", value: "es" },
    { label: "Français", value: "fr" },
    { label: "Deutsch", value: "de" },
    { label: "Русский", value: "ru" },
    { label: "Latviešu", value: "lv" },
    { label: "日本語", value: "ja" },
    { label: "中文", value: "zh" },
    { label: "한국어", value: "ko" },
    { label: "हिंदी", value: "hi" },
    { label: "Українська", value: "uk" },
    { label: "Suomi", value: "fi" },
    { label: "Norsk", value: "no" },
    { label: "Svenska", value: "sv" },
    { label: "Polski", value: "pl" },
    { label: "Italiano", value: "it" },
    { label: "Türkçe", value: "tr" },
    { label: "ქართული", value: "ka" }
  ]

  const managedByOptions = [
    { label: "Itself", value: "ITSELF" },
    { label: "AI DJ", value: "MIX" }
  ]

  const timezones = [
    { label: 'UTC (+0)', value: 'UTC' },
    { label: 'Europe/London (+0/+1)', value: 'Europe/London' },
    { label: 'Europe/Riga (+2/+3)', value: 'Europe/Riga' },
    { label: 'Europe/Paris (+1/+2)', value: 'Europe/Paris' },
    { label: 'Europe/Lisbon (+0/+1)', value: 'Europe/Lisbon' },
    { label: 'Europe/Berlin (+1/+2)', value: 'Europe/Berlin' },
    { label: 'Europe/Rome (+1/+2)', value: 'Europe/Rome' },
    { label: 'Europe/Madrid (+1/+2)', value: 'Europe/Madrid' },
    { label: 'Europe/Kiev (+2/+3)', value: 'Europe/Kiev' },
    { label: 'Europe/Helsinki (+2/+3)', value: 'Europe/Helsinki' },
    { label: 'Europe/Oslo (+1/+2)', value: 'Europe/Oslo' },
    { label: 'Europe/Stockholm (+1/+2)', value: 'Europe/Stockholm' },
    { label: 'Europe/Warsaw (+1/+2)', value: 'Europe/Warsaw' },
    { label: 'Europe/Istanbul (+3)', value: 'Europe/Istanbul' },
    { label: 'Asia/Tbilisi (+4)', value: 'Asia/Tbilisi' },
    { label: 'Asia/Almaty (+6)', value: 'Asia/Almaty' },
    { label: 'Asia/Astana (+6)', value: 'Asia/Astana' },
    { label: 'Asia/Tashkent (+5)', value: 'Asia/Tashkent' },
    { label: 'America/New York (-5/-4)', value: 'America/New_York' },
    { label: 'America/Los Angeles (-8/-7)', value: 'America/Los_Angeles' },
    { label: 'America/Sao Paulo (-3)', value: 'America/Sao_Paulo' },
    { label: 'America/Argentina/Buenos Aires (-3)', value: 'America/Argentina/Buenos_Aires' },
    { label: 'America/Bogota (-5)', value: 'America/Bogota' },
    { label: 'America/Lima (-5)', value: 'America/Lima' },
    { label: 'America/Santiago (-4/-3)', value: 'America/Santiago' },
    { label: 'America/Caracas (-4)', value: 'America/Caracas' },
    { label: 'America/La Paz (-4)', value: 'America/La_Paz' },
    { label: 'America/Asuncion (-4/-3)', value: 'America/Asuncion' },
    { label: 'America/Montevideo (-3)', value: 'America/Montevideo' },
    { label: 'America/Guyana (-4)', value: 'America/Guyana' },
    { label: 'Asia/Tokyo (+9)', value: 'Asia/Tokyo' },
    { label: 'Asia/Shanghai (+8)', value: 'Asia/Shanghai' },
    { label: 'Asia/Seoul (+9)', value: 'Asia/Seoul' },
    { label: 'Asia/Kolkata (+5:30)', value: 'Asia/Kolkata' },
    { label: 'Asia/Dubai (+4)', value: 'Asia/Dubai' },
    { label: 'Africa/Cairo (+2)', value: 'Africa/Cairo' },
    { label: 'Africa/Lagos (+1)', value: 'Africa/Lagos' },
    { label: 'Africa/Johannesburg (+2)', value: 'Africa/Johannesburg' },
    { label: 'Africa/Nairobi (+3)', value: 'Africa/Nairobi' },
    { label: 'Africa/Casablanca (+1)', value: 'Africa/Casablanca' },
    { label: 'Africa/Algiers (+1)', value: 'Africa/Algiers' },
    { label: 'Africa/Tunis (+1)', value: 'Africa/Tunis' },
    { label: 'Africa/Addis Ababa (+3)', value: 'Africa/Addis_Ababa' },
    { label: 'Africa/Accra (+0)', value: 'Africa/Accra' },
    { label: 'Africa/Dakar (+0)', value: 'Africa/Dakar' },
    { label: 'Australia/Sydney (+10/+11)', value: 'Australia/Sydney' }
  ]

  const musicUploadAgreement = ref<{ title: string; clause: string; version: string }>({
    title: 'Music Upload Agreement',
    version: '1.0',
    clause:
      '<p>By uploading music to this service, you confirm that:</p>' +
      '<ul>' +
      '<li><strong>Ownership or License</strong>: You own the copyright to this music OR have proper licensing/permission to distribute it.</li>' +
      '<li><strong>Free to Use</strong>: The music is either your original work, public domain, or licensed under terms that permit sharing on this platform.</li>' +
      '<li><strong>No Infringement</strong>: Your upload does not violate any third-party copyrights, trademarks, or other intellectual property rights.</li>' +
      '<li><strong>Legal Responsibility</strong>: You accept full legal responsibility for any copyright claims or disputes arising from your upload.</li>' +
      '<li><strong>Removal Rights</strong>: We reserve the right to remove any content that violates copyright or receives valid takedown requests.</li>' +
      '<li><strong>Content Standards</strong>: The music does not contain content that promotes violence, war, hate speech, discrimination, or offensive religious content.</li>' +
      '<li><strong>Content Guidelines</strong>: The content complies with general broadcasting standards and applicable content regulations.</li>' +
      '<li><strong>Indemnification</strong>: You agree to defend and hold harmless the service from any legal claims related to your uploaded content.</li>' +
      '</ul>'
  })

  const messagePostingAgreement = ref<{ title: string; clause: string; version: string }>({
    title: 'Message Posting Agreement',
    version: '1.0',
    clause:
      '<p>By posting a message to this service, you agree that:</p>' +
      '<ul>' +
      '<li><strong>Appropriate Content</strong>: Your message does not contain violence, racism, hate speech, discrimination, or harassment of any kind.</li>' +
      '<li><strong>Respectful Communication</strong>: You will communicate respectfully and avoid offensive, threatening, or abusive language.</li>' +
      '<li><strong>No Harmful Content</strong>: Your message does not promote illegal activities, self-harm, or dangerous behavior.</li>' +
      '<li><strong>Personal Responsibility</strong>: You are fully responsible for the content of your message and its consequences.</li>' +
      '<li><strong>Moderation Rights</strong>: We reserve the right to review, edit, or remove messages that violate these guidelines.</li>' +
      '<li><strong>Broadcasting Standards</strong>: Your content complies with general broadcasting standards and community guidelines.</li>' +
      '<li><strong>Legal Compliance</strong>: Your message does not violate any applicable laws or regulations.</li>' +
      '<li><strong>Consequences</strong>: Violation of these terms may result in message removal and potential restrictions on future submissions.</li>' +
      '</ul>'
  })
  
  const fetchGenres = async () => {
    const response = await apiClient.get('/dictionary/genres?page=1&size=1000')
    if (!response?.data?.payload) throw new Error('Invalid API response')

    genreOptions.value = response.data.payload.viewData.entries
      .map((entry: {identifier: string, id: string}) => ({
        label: entry.identifier,
        value: entry.id
      }))
      .sort((a: {label: string}, b: {label: string}) => a.label.localeCompare(b.label))
  }

  return {
    genreOptions,
    countryOptions,
    languageOptions,
    managedByOptions,
    timezones,
    musicUploadAgreement,
    messagePostingAgreement,
    fetchGenres
  }
})
