'use strict';
import * as React from 'react';
import { AppRegistry, View } from 'react-native';
import { Log, LogLevel } from 'catavolt-sdk';
import { CvBuzzApp } from './buzzbase';
import mStyles from './style_main';
import lStyles from './style_buzz';
var styles = Object.assign(lStyles, mStyles);
Log.logLevel(LogLevel.DEBUG);
const CatreactNativeExamples = React.createClass({
    render: function () {
        return (React.createElement(View, {style: [styles.container]}, React.createElement(View, {style: [styles.header]}), React.createElement(CvBuzzApp, null)));
    }
});
AppRegistry.registerComponent('CatreactNativeExamples', () => CatreactNativeExamples);
