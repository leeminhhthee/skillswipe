const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)

// Thêm phần mở rộng cần thiết
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

// Tắt experimental package exports nếu cần
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
 
module.exports = withNativeWind(config, { input: './global.css' })