// Copy this file into config.dev.ts and config.prod.ts
// for dev settings and prod settings respectively

const FB_CONFIG = {
  accessToken: '123456789012345|8exAMp1e3iDWxl92d6pgj0xC3a8',
  xfbml: true,
  version: 'v2.6'
};

const TWITTER_CONFIG = {
  BEARER_TOKEN: 'AAAAAEXAMPLEAAAAAAAAMmWwEXAMPLE9tGRvIFnIR8XYXmEXAMpLEGgjX0%3' +
                'Dup2JDExAmplEJKGaEXAmpLetYSGumkyExAMplEx0FMB1vOlvN0'
};

const ENV = {
  // change this to true, in config.prod.ts
  PROD: false,
  FB_CONFIG,
  TWITTER_CONFIG
};

export default ENV;
