'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var readConfigFromFile = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filename) {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return readFile(filename, 'utf8');

                    case 3:
                        data = _context.sent;
                        return _context.abrupt('return', JSON.parse(data));

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', {});

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 7]]);
    }));

    return function readConfigFromFile(_x) {
        return _ref.apply(this, arguments);
    };
}();

var fetchAsset = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(assetNameParts) {
        var url, response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        url = getAssetUrl.apply(undefined, assetNameParts);
                        _context2.next = 3;
                        return request(url);

                    case 3:
                        response = _context2.sent;
                        _context2.prev = 4;
                        return _context2.abrupt('return', JSON.parse(response.body));

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](4);
                        return _context2.abrupt('return', null);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 8]]);
    }));

    return function fetchAsset(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var getAssetData = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(assetNameParts) {
        var unfoldingLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
        var assetDataTree;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return fetchAsset(assetNameParts);

                    case 2:
                        assetDataTree = _context3.sent;

                        if (assetDataTree) {
                            _context3.next = 5;
                            break;
                        }

                        return _context3.abrupt('return', []);

                    case 5:
                        return _context3.abrupt('return', unfoldTreeNode(assetDataTree, unfoldingLevel));

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function getAssetData(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var getDeviceData = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(automationApi, automationApiData) {
        var assetNamePart1, assetNamePart2;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        assetNamePart1 = automationApi === 'selenium' ? automationApiData[2] : automationApiData[1];
                        assetNamePart2 = automationApi === 'selenium' ? automationApiData[4] : automationApiData[2];
                        _context4.next = 4;
                        return getAssetData([automationApi, assetNamePart1, assetNamePart2], 2);

                    case 4:
                        return _context4.abrupt('return', _context4.sent);

                    case 5:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getDeviceData(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

var getAutomationApiInfo = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(automationApi) {
        var automationApiData, devicesData;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return getAssetData([automationApi]);

                    case 2:
                        automationApiData = _context5.sent;
                        _context5.next = 5;
                        return _pinkie2.default.all(automationApiData.map(function (data) {
                            return getDeviceData(automationApi, data);
                        }));

                    case 5:
                        devicesData = _context5.sent;


                        automationApiData = automationApiData.map(function (data, index) {
                            return concatDeviceData(data, devicesData[index]);
                        }).filter(function (data) {
                            return data.length;
                        });

                        automationApiData = (0, _lodash.flatten)(automationApiData);

                        return _context5.abrupt('return', automationApiData.map(function (data) {
                            return formatAutomationApiData(automationApi, data);
                        }).filter(function (data) {
                            return data;
                        }));

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function getAutomationApiInfo(_x8) {
        return _ref5.apply(this, arguments);
    };
}();

var _saucelabsConnector = require('saucelabs-connector');

var _saucelabsConnector2 = _interopRequireDefault(_saucelabsConnector);

var _desiredCapabilities = require('desired-capabilities');

var _desiredCapabilities2 = _interopRequireDefault(_desiredCapabilities);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _pinkie = require('pinkie');

var _pinkie2 = _interopRequireDefault(_pinkie);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _lodash = require('lodash');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTH_FAILED_ERROR = 'Authentication failed. Please assign the correct username and access key ' + 'to the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables.';

var SAUCE_LABS_REQUESTED_MACHINES_COUNT = 1;
var WAIT_FOR_FREE_MACHINES_REQUEST_INTERVAL = 60000;
var WAIT_FOR_FREE_MACHINES_MAX_ATTEMPT_COUNT = 45;
var MAX_TUNNEL_CONNECT_RETRY_COUNT = 3;

var AUTOMATION_APIS = ['selenium', 'appium', 'selendroid'];

var MAC_OS_MAP = {
    'macOS Catalina': 'macOS 10.15',
    'macOS Mojave': 'macOS 10.14',
    'macOS High Sierra': 'macOS 10.13',
    'macOS Sierra': 'macOS 10.12',
    'OS X El Capitan': 'OS X 10.11',
    'OS X Yosemite': 'OS X 10.10'
};

var promisify = function promisify(fn) {
    return (0, _pify2.default)(fn, _pinkie2.default);
};
var request = promisify(_request2.default, _pinkie2.default);
var readFile = _util2.default.promisify(fs.readFile);

var formatAssetPart = function formatAssetPart(str, filler) {
    return str.toLowerCase().replace(/[\s.]/g, filler);
};
var getAssetNameEnding = function getAssetNameEnding(part1, part2) {
    return part1 && part2 ? formatAssetPart(part1, '_') + '_' + formatAssetPart(part2, '-') : '';
};
var getAssetName = function getAssetName(automationApi) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return automationApi + '_' + getAssetNameEnding.apply(undefined, args);
};
var getAssetUrl = function getAssetUrl() {
    return 'https://wiki-assets.saucelabs.com/data/' + getAssetName.apply(undefined, arguments) + '.json';
};

var isSelenium = function isSelenium(platformInfo) {
    return platformInfo.automationApi === 'selenium';
};
var isAppium = function isAppium(platformInfo) {
    return platformInfo.automationApi === 'appium';
};
var isSelendroid = function isSelendroid(platformInfo) {
    return platformInfo.automationApi === 'selendroid';
};

function unfoldTreeNode(node) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

    if (!node) return [];

    var unfoldedChildren = node.list && level > 0 ? (0, _lodash.flatten)(node.list.map(function (child) {
        return unfoldTreeNode(child, level - 1);
    })) : [node.list ? node.list : []];

    return unfoldedChildren.map(function (child) {
        return [node.name].concat(child);
    });
}

function concatDeviceData(automationApiData, devicesData) {
    return devicesData.map(function (data) {
        return automationApiData.concat(data);
    });
}

function formatAutomationApiData(automationApi, automationApiData) {
    var formattedData = {
        automationApi: automationApi,
        platformGroup: automationApiData[1],
        device: automationApiData[2]
    };

    if (isSelenium(formattedData)) {
        formattedData.os = automationApiData[4];
        formattedData.browserName = automationApiData[6];
        formattedData.browserVersion = automationApiData[7];

        if (formattedData.browserName === 'MS Edge') formattedData.browserName = 'MicrosoftEdge';else if (formattedData.browserName === 'IE') formattedData.browserName = 'Internet Explorer';

        if (MAC_OS_MAP[formattedData.os]) formattedData.os = MAC_OS_MAP[formattedData.os];
    } else {
        formattedData.os = automationApiData[5];
        formattedData.api = (0, _lodash.find)(automationApiData, function (item) {
            return item && item.api;
        }).api;
        formattedData.platformGroup = formattedData.platformGroup.replace(/^(.+?)(\s.*)?$/, '$1');

        var isAndroid = formattedData.platformGroup === 'Android';
        var isAndroidJellyBean = isAndroid && parseFloat(formattedData.os) >= 4.4;
        var isAndroidOnSelendroid = isAndroid && isSelendroid(formattedData);
        var isAndroidOnAppium = isAndroid && isAppium(formattedData);
        var isUnsupportedAndroid = isAndroid && (isAndroidJellyBean ? isAndroidOnSelendroid : isAndroidOnAppium);

        if (isUnsupportedAndroid) return null;
    }

    return formattedData;
}

function getCorrectedSize(currentClientAreaSize, currentWindowSize, requestedSize) {
    var horizontalChrome = currentWindowSize.width - currentClientAreaSize.width;
    var verticalChrome = currentWindowSize.height - currentClientAreaSize.height;

    return {
        width: requestedSize.width + horizontalChrome,
        height: requestedSize.height + verticalChrome
    };
}

function getAppiumBrowserName(platformInfo) {
    if (platformInfo.platformGroup === 'iOS') return 'Safari';

    if (platformInfo.device.indexOf('Samsung') > -1) return 'chrome';

    return 'Browser';
}

exports.default = {
    connectorPromise: _pinkie2.default.resolve(null),
    openedBrowsers: {},
    aliasesCache: [],
    platformsInfo: [],
    availableAliases: [],

    tunnelConnectRetryCount: 0,

    isMultiBrowser: true,

    _getConnector: function _getConnector() {
        var _this = this;

        this.connectorPromise = this.connectorPromise.then(function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(connector) {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (connector) {
                                    _context6.next = 4;
                                    break;
                                }

                                connector = new _saucelabsConnector2.default(process.env['SAUCE_USERNAME'], process.env['SAUCE_ACCESS_KEY'], {
                                    connectorLogging: false
                                });

                                _context6.next = 4;
                                return connector.connect();

                            case 4:

                                _this.tunnelConnectRetryCount = 0;
                                return _context6.abrupt('return', connector);

                            case 6:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this);
            }));

            return function (_x9) {
                return _ref6.apply(this, arguments);
            };
        }()).catch(function (error) {
            _this.tunnelConnectRetryCount++;

            if (_this.tunnelConnectRetryCount > MAX_TUNNEL_CONNECT_RETRY_COUNT) throw error;

            _this.connectorPromise = _pinkie2.default.resolve(null);

            return _this._getConnector();
        });

        return this.connectorPromise;
    },
    _disposeConnector: function _disposeConnector() {
        var _this2 = this;

        this.connectorPromise = this.connectorPromise.then(function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(connector) {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (!connector) {
                                    _context7.next = 3;
                                    break;
                                }

                                _context7.next = 3;
                                return connector.disconnect();

                            case 3:
                                return _context7.abrupt('return', null);

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this2);
            }));

            return function (_x10) {
                return _ref7.apply(this, arguments);
            };
        }());

        return this.connectorPromise;
    },
    _fetchPlatformInfoAndAliases: function _fetchPlatformInfoAndAliases() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
            var automationApiInfoPromises, platformsInfo, unstructuredBrowserNames;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            automationApiInfoPromises = AUTOMATION_APIS.map(function (automationApi) {
                                return getAutomationApiInfo(automationApi);
                            });
                            _context8.next = 3;
                            return _pinkie2.default.all(automationApiInfoPromises);

                        case 3:
                            platformsInfo = _context8.sent;


                            _this3.platformsInfo = (0, _lodash.flatten)(platformsInfo);

                            unstructuredBrowserNames = _this3.platformsInfo.map(function (platformInfo) {
                                return _this3._createAliasesForPlatformInfo(platformInfo);
                            });


                            _this3.availableBrowserNames = (0, _lodash.flatten)(unstructuredBrowserNames);

                        case 7:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this3);
        }))();
    },
    _createAliasesForPlatformInfo: function _createAliasesForPlatformInfo(platformInfo) {
        if (platformInfo.device === 'Android Emulator') {
            return [this._createAliasesForPlatformInfo((0, _lodash.assign)({}, platformInfo, { device: 'Android Emulator Tablet' })), this._createAliasesForPlatformInfo((0, _lodash.assign)({}, platformInfo, { device: 'Android Emulator Phone' }))];
        }

        var name = isSelenium(platformInfo) ? platformInfo.browserName : platformInfo.device;
        var version = isSelenium(platformInfo) ? platformInfo.browserVersion : platformInfo.os;
        var platform = isSelenium(platformInfo) ? platformInfo['os'] : '';

        return name + '@' + version + (platform ? ':' + platform : '');
    },
    _createQuery: function _createQuery(capabilities) {
        var _parseCapabilities$ = (0, _desiredCapabilities2.default)(capabilities)[0],
            browserName = _parseCapabilities$.browserName,
            browserVersion = _parseCapabilities$.browserVersion,
            platform = _parseCapabilities$.platform;


        var query = {
            name: browserName.toLowerCase(),
            version: browserVersion.toLowerCase(),
            platform: platform.toLowerCase()
        };

        if (/^android emulator/.test(query.name)) {
            query.deviceType = query.name.replace('android emulator ', '');
            query.name = 'android emulator';
        }

        return query;
    },
    _filterPlatformInfo: function _filterPlatformInfo(query) {
        return this.platformsInfo.filter(function (info) {
            var browserNameMatched = info.browserName && info.browserName.toLowerCase() === query.name;
            var deviceNameMatched = info.device && info.device.toLowerCase() === query.name;

            var majorBrowserVersionMatch = info.browserVersion && info.browserVersion.match(/^\d+/);
            var majorBrowserVersion = info.browserVersion && majorBrowserVersionMatch && majorBrowserVersionMatch[0];
            var browserVersionMatched = info.browserVersion === query.version || majorBrowserVersion === query.version;

            var platformVersionMatched = info.os === query.version;
            var platformNameMatched = info.os.toLowerCase() === query.platform;

            var isAnyVersion = query.version === 'any';
            var isAnyPlatform = query.platform === 'any';

            var desktopBrowserMatched = browserNameMatched && (browserVersionMatched || isAnyVersion) && (platformNameMatched || isAnyPlatform);

            var mobileBrowserMatched = deviceNameMatched && (platformVersionMatched || isAnyVersion);

            return desktopBrowserMatched || mobileBrowserMatched;
        });
    },
    _generateMobileCapabilities: function _generateMobileCapabilities(query, platformInfo) {
        var capabilities = { deviceName: platformInfo.device };

        if (platformInfo.automationApi === 'appium') {
            capabilities.browserName = getAppiumBrowserName(platformInfo);
            capabilities.platformName = platformInfo.platformGroup;

            if (query.version !== 'any') capabilities.platformVersion = query.version;
        } else {
            capabilities.browserName = platformInfo.platformGroup;
            capabilities.platform = platformInfo.api;

            if (query.version !== 'any') capabilities.version = query.version;
        }

        if (query.deviceType) capabilities.deviceType = query.deviceType;

        return capabilities;
    },
    _generateDesktopCapabilities: function _generateDesktopCapabilities(query) {
        var capabilities = { browserName: query.name };

        if (query.version !== 'any') capabilities.version = query.version;

        if (query.platform !== 'any') capabilities.platform = query.platform;
        if (process.env['SAUCE_SCREEN_RESOLUTION']) capabilities.screenResolution = process.env['SAUCE_SCREEN_RESOLUTION'];
        return capabilities;
    },
    _generateCapabilities: function _generateCapabilities(browserName) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
            var query, platformInfo, capabilities, capabilitiesOverride;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            query = _this4._createQuery(browserName);
                            platformInfo = _this4._filterPlatformInfo(query)[0];
                            capabilities = platformInfo.platformGroup === 'Desktop' ? _this4._generateDesktopCapabilities(query) : _this4._generateMobileCapabilities(query, platformInfo);
                            capabilitiesOverride = {};

                            if (!process.env['SAUCE_CAPABILITIES_OVERRIDES_PATH']) {
                                _context9.next = 8;
                                break;
                            }

                            _context9.next = 7;
                            return readConfigFromFile(process.env['SAUCE_CAPABILITIES_OVERRIDES_PATH']);

                        case 7:
                            capabilitiesOverride = _context9.sent;

                        case 8:
                            return _context9.abrupt('return', (0, _assign2.default)({}, capabilities, capabilitiesOverride));

                        case 9:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this4);
        }))();
    },


    // API
    init: function init() {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return _this5._fetchPlatformInfoAndAliases();

                        case 2:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this5);
        }))();
    },
    dispose: function dispose() {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.next = 2;
                            return _this6._disposeConnector();

                        case 2:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, _this6);
        }))();
    },
    openBrowser: function openBrowser(id, pageUrl, browserName) {
        var _this7 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
            var capabilities, connector, jobOptions, newBrowser, sessionUrl;
            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            if (!(!process.env['SAUCE_USERNAME'] || !process.env['SAUCE_ACCESS_KEY'])) {
                                _context12.next = 2;
                                break;
                            }

                            throw new Error(AUTH_FAILED_ERROR);

                        case 2:
                            _context12.next = 4;
                            return _this7._generateCapabilities(browserName);

                        case 4:
                            capabilities = _context12.sent;
                            _context12.next = 7;
                            return _this7._getConnector();

                        case 7:
                            connector = _context12.sent;
                            _context12.next = 10;
                            return connector.waitForFreeMachines(SAUCE_LABS_REQUESTED_MACHINES_COUNT, WAIT_FOR_FREE_MACHINES_REQUEST_INTERVAL, WAIT_FOR_FREE_MACHINES_MAX_ATTEMPT_COUNT);

                        case 10:
                            _context12.t0 = _assign2.default;
                            _context12.t1 = {
                                jobName: process.env['SAUCE_JOB'],
                                build: process.env['SAUCE_BUILD']
                            };

                            if (!process.env['SAUCE_CONFIG_PATH']) {
                                _context12.next = 18;
                                break;
                            }

                            _context12.next = 15;
                            return readConfigFromFile(process.env['SAUCE_CONFIG_PATH']);

                        case 15:
                            _context12.t2 = _context12.sent;
                            _context12.next = 19;
                            break;

                        case 18:
                            _context12.t2 = {};

                        case 19:
                            _context12.t3 = _context12.t2;
                            jobOptions = (0, _context12.t0)(_context12.t1, _context12.t3);
                            _context12.next = 23;
                            return connector.startBrowser(capabilities, pageUrl, jobOptions);

                        case 23:
                            newBrowser = _context12.sent;


                            _this7.openedBrowsers[id] = newBrowser;

                            _context12.next = 27;
                            return connector.getSessionUrl(newBrowser);

                        case 27:
                            sessionUrl = _context12.sent;


                            _this7.setUserAgentMetaInfo(id, '' + sessionUrl);

                        case 29:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, _this7);
        }))();
    },
    closeBrowser: function closeBrowser(id) {
        var _this8 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
            var connector;
            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            _context13.next = 2;
                            return _this8._getConnector();

                        case 2:
                            connector = _context13.sent;
                            _context13.next = 5;
                            return connector.stopBrowser(_this8.openedBrowsers[id]);

                        case 5:

                            delete _this8.openedBrowsers[id];

                        case 6:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, _this8);
        }))();
    },
    isValidBrowserName: function isValidBrowserName(browserName) {
        var _this9 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            return _context14.abrupt('return', (0, _desiredCapabilities2.default)(browserName).length === 1 && !!_this9._filterPlatformInfo(_this9._createQuery(browserName)).length);

                        case 1:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, _this9);
        }))();
    },
    getBrowserList: function getBrowserList() {
        var _this10 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
            return _regenerator2.default.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            return _context15.abrupt('return', _this10.availableBrowserNames);

                        case 1:
                        case 'end':
                            return _context15.stop();
                    }
                }
            }, _callee15, _this10);
        }))();
    },
    resizeWindow: function resizeWindow(id, width, height, currentWidth, currentHeight) {
        var _this11 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
            var currentWindowSize, currentClientAreaSize, requestedSize, correctedSize;
            return _regenerator2.default.wrap(function _callee16$(_context16) {
                while (1) {
                    switch (_context16.prev = _context16.next) {
                        case 0:
                            _context16.next = 2;
                            return _this11.openedBrowsers[id].getWindowSize();

                        case 2:
                            currentWindowSize = _context16.sent;
                            currentClientAreaSize = { width: currentWidth, height: currentHeight };
                            requestedSize = { width: width, height: height };
                            correctedSize = getCorrectedSize(currentClientAreaSize, currentWindowSize, requestedSize);
                            _context16.next = 8;
                            return _this11.openedBrowsers[id].setWindowSize(correctedSize.width, correctedSize.height);

                        case 8:
                        case 'end':
                            return _context16.stop();
                    }
                }
            }, _callee16, _this11);
        }))();
    },
    takeScreenshot: function takeScreenshot(id, screenshotPath) {
        var _this12 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
            return _regenerator2.default.wrap(function _callee17$(_context17) {
                while (1) {
                    switch (_context17.prev = _context17.next) {
                        case 0:
                            _context17.next = 2;
                            return _this12.openedBrowsers[id].saveScreenshot(screenshotPath);

                        case 2:
                        case 'end':
                            return _context17.stop();
                    }
                }
            }, _callee17, _this12);
        }))();
    },
    reportJobResult: function reportJobResult(id, jobResult, jobData) {
        var _this13 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
            var browser, jobPassed;
            return _regenerator2.default.wrap(function _callee18$(_context18) {
                while (1) {
                    switch (_context18.prev = _context18.next) {
                        case 0:
                            if (!(jobResult !== _this13.JOB_RESULT.done && jobResult !== _this13.JOB_RESULT.errored)) {
                                _context18.next = 2;
                                break;
                            }

                            return _context18.abrupt('return');

                        case 2:
                            browser = _this13.openedBrowsers[id];
                            jobPassed = jobResult === _this13.JOB_RESULT.done && jobData.total === jobData.passed;
                            _context18.next = 6;
                            return browser.sauceJobStatus(jobPassed);

                        case 6:
                        case 'end':
                            return _context18.stop();
                    }
                }
            }, _callee18, _this13);
        }))();
    }
};
module.exports = exports['default'];
