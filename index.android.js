'use strict';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Log, LogLevel } from 'catavolt-sdk';
import mStyles from './style_main';
import lStyles from './style_buzz';
var styles = Object.assign(lStyles, mStyles);
import { CvBuzzApp } from './buzzbase';
Log.logLevel(LogLevel.DEBUG);
const CatreactNativeExamples = React.createClass({
    render: function () {
        return React.createElement(CvBuzzApp, null);
    },
});
AppRegistry.registerComponent('CatreactNativeExamples', () => CatreactNativeExamples);
