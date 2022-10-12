import { Mode } from '../../common/types';
import { Browser, PlatformID } from '../common/types/types-common';
import ManifestBase = chrome.runtime.ManifestBase;
import ManifestV3 = chrome.runtime.ManifestV3;
import ManifestV2 = chrome.runtime.ManifestV2;
import { accessibleResources } from './public-resources';
import { deduplicateArray } from '../../common/helpers';

const generateIconSet = () => ({
  '16': 'icons/16.png',
  '48': 'icons/48.png',
  '64': 'icons/64.png',
  '96': 'icons/96.png',
  '128': 'icons/128.png',
  '256': 'icons/256.png',
  '512': 'icons/512.png',
});

const getAllowedMicrosoftSentinelUrls = (mode: Mode) => {
  return [
    'https://portal.azure.com/*',
    'https://logsextension.hosting.portal.azure.net/*',
    'https://*.reactblade.portal.azure.net/*',
    ...(mode === Mode.development ? ['http://localhost/*'] : []),
  ];
};

const getAllowedMicrosoftDefenderUrls = (mode: Mode) => {
  return [
    'https://api-eu.securitycenter.windows.com/*',
    'https://security.microsoft.com/*',
    ...(mode === Mode.development ? ['http://localhost/*'] : []),
  ];
};

const packageJsonPath = '../../package.json';

export const getVersion = () => {
  const { version } = require(packageJsonPath);
  delete require.cache[require.resolve(packageJsonPath)];
  return version;
};

export const getDescription = () => {
  const { description } = require(packageJsonPath);
  delete require.cache[require.resolve(packageJsonPath)];
  return description;
};

const getCommonManifest = (mode: Mode): ManifestBase => {
  return {
    version: getVersion(),
    description: getDescription(),
    name: 'The Prime Hunt',
    manifest_version: 3,
    icons: generateIconSet(),
    content_scripts: [
      {
        matches: getAllowedMicrosoftSentinelUrls(mode),
        'all_frames': true,
        js: ['content.js'],
        run_at: 'document_end',
      },
      {
        matches: getAllowedMicrosoftDefenderUrls(mode),
        js: ['content.js'],
        run_at: 'document_end',
      },
    ],
    permissions: [
      'webRequest',
    ],
  };
};

const buildActionV2 = () => {
  return {
    browser_action: {
      default_icon: generateIconSet(),
    },
  };
};

const buildActionV3 = () => {
  return {
    action: {
      default_icon: generateIconSet(),
    },
  };
};

const buildBackgroundV3 = () => {
  return {
    background: {
      service_worker: 'background.js',
    },
  };
};

const buildBackgroundV2 = () => {
  return {
    background: {
      scripts: ['background.js'],
    },
  };
};


const buildAccessibleResourcesV3 = (mode: Mode) => {
  return {
    web_accessible_resources: Object.keys(accessibleResources).map(type => {
      if (type === PlatformID.MicrosoftSentinel) {
        return {
          resources: accessibleResources[type],
          matches: getAllowedMicrosoftSentinelUrls(mode),
        };
      }
      if (type === PlatformID.MicrosoftDefender) {
        return {
          resources: accessibleResources[type],
          matches: getAllowedMicrosoftDefenderUrls(mode),
        };
      }
      return {
        resources: accessibleResources[type],
        matches: ['<all_urls>'],
      };
    }),
  };
};

const buildAccessibleResourcesV2 = () => {
  return {
    web_accessible_resources: Object.values(accessibleResources)
      .reduce((res, resources) => {
        return [
          ...res,
          ...resources,
        ];
      }, []),
  };
};

const getManifestV3 = (mode: Mode): ManifestV3 => {
  return {
    ...getCommonManifest(mode),
    manifest_version: 3,
    host_permissions: [
      '<all_urls>',
    ],
    ...buildAccessibleResourcesV3(mode),
    ...buildActionV3(),
    ...buildBackgroundV3(),
  };
};

const getManifestV2 = (mode: Mode): ManifestV2 => {
  const commonManifest = getCommonManifest(mode);
  return {
    ...commonManifest,
    manifest_version: 2,
    permissions: [
      ...commonManifest.permissions,
      '<all_urls>',
    ],
    ...buildAccessibleResourcesV2(),
    ...buildActionV2(),
    ...buildBackgroundV2(),
  };
};

export const buildManifest = (browser: Browser, mode: Mode) => {
  if (browser === Browser.firefox) {
    return getManifestV2(mode);
  }

  if (browser === Browser.edge) {
    return getManifestV3(mode);
  }

  if (browser === Browser.chrome) {
    const manifest = getManifestV3(mode);
    manifest.externally_connectable = {
      matches: deduplicateArray([
        ...getAllowedMicrosoftSentinelUrls(mode),
        ...getAllowedMicrosoftDefenderUrls(mode),
      ]),
    };
    return manifest;
  }

  return getManifestV3(mode);
};

