import hotReloadExtension from 'hot-reload-extension-vite';

export default {
  plugins: [
    hotReloadExtension({
      log: true,
      backgroundPath: '/src/main.tsx' // relative path to background script file
    })
  ]
};