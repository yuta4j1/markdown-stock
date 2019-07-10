const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
    "globals": {
        "ts-jest": {
            tsConfig: {
                importHelpers: true,
            },
            autoMapModuleNames: true
        }
    },
    cache: false,
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        "vue"
    ],
    transform: {
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    "moduleDirectories": [
        ".",
        "components",
        "node_modules"
      ],
    roots: ["<rootDir>"],
    // moduleNameMapper: {
    //     "@components/([^\\.]*)$": "<rootDir>/components/$1"
    // },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    snapshotSerializers: ['jest-serializer-vue'],
    moduleNameMapper
}