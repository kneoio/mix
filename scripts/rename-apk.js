import { readFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
const version = packageJson.version;

const sourcePath = join(rootDir, 'src-capacitor', 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
const targetPath = join(rootDir, `mixpla-v${version}.apk`);

copyFileSync(sourcePath, targetPath);
console.log(`APK copied to: mixpla-v${version}.apk`);
