import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.mixpla.app',
  appName: 'Mixpla',
  webDir: 'src-capacitor/www',
  server: {
    hostname: 'localhost',
    androidScheme: 'capacitor',
    cleartext: true
  }
};

export default config;
