import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.survey.app',
  appName: 'SurveyApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  
};

export default config;
