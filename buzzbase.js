/**
 * Created by rburson on 2/5/16.
 */
'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { View, Text, TextInput, Image, ListView, TouchableHighlight, Navigator, BackAndroid } from 'react-native';
import { Log, LogLevel } from 'catavolt-sdk';
import { CatavoltPane, CvLogin, CvAppWindow, CvWorkbench, CvLauncher, CvNavigation, CvForm, CvListPane, CvRecord, CvProp, CvResource, CvAction, CvValueAdapter } from 'catreact';
import mStyles from './style_main';
import lStyles from './style_buzz';
var styles = Object.assign(lStyles, mStyles);
Log.logLevel(LogLevel.DEBUG);
export var CvBuzzApp = React.createClass({
    render: function () {
        return React.createElement(Navigator, {initialRoute: { name: 'Buzz Stream', index: 0 }, renderScene: this._renderScene});
    },
    _renderScene: function (route, nav) {
        switch (route.index) {
            case 0:
                return React.createElement(BuzzLogin, {navigator: nav});
            case 1:
                return React.createElement(BuzzWorkbench, {navigator: nav, loginResult: route.loginResult});
            case 2:
                return React.createElement(BuzzStreams, {navigator: nav, loginResult: route.loginResult, navigationResult: route.navigationResult});
            case 3:
                return React.createElement(BuzzMessages, {navigator: nav, loginResult: route.loginResult, navigationResult: route.navigationResult});
        }
    },
});
const BuzzLogin = React.createClass({
    getInitialState: function () {
        return {
            tenantId: 'catavolt-dev',
            gatewayUrl: 'www.catavolt.net',
            userId: 'rob',
            password: 'rob123',
            clientType: 'RICH_CLIENT',
        };
    },
    render: function () {
        return (React.createElement(CatavoltPane, null, React.createElement(View, {style: [styles.container, styles.main]}, React.createElement(View, {style: [styles.bg1, styles.paddingMd, styles.col]}, React.createElement(CvLogin, {loginListeners: [(e) => { this.props.navigator.push({ index: 1, loginResult: e.eventObj }); }], renderer: (cvContext, callback) => {
            if (!callback.isLoggedIn()) {
                return (React.createElement(View, {style: [styles.col]}, React.createElement(TextInput, {style: { height: 40 }, value: this.state.tenantId, onChangeText: this.handleValueChange.bind(this, 'tenantId')}), React.createElement(TextInput, {style: { height: 40 }, value: this.state.gatewayUrl, onChangeText: this.handleValueChange.bind(this, 'gatewayUrl')}), React.createElement(TextInput, {style: { height: 40 }, value: this.state.userId, onChangeText: this.handleValueChange.bind(this, 'userId')}), React.createElement(TextInput, {style: { height: 40 }, value: this.state.password, onChangeText: this.handleValueChange.bind(this, 'password')}), React.createElement(View, {style: { flexDirection: 'row', margin: 15, justifyContent: 'center' }}, React.createElement(TouchableHighlight, {onPress: () => {
                    callback.login(this.state.gatewayUrl, this.state.tenantId, this.state.clientType, this.state.userId, this.state.password);
                }}, React.createElement(View, {style: [styles.loginButton]}, React.createElement(Text, {style: [styles.loginButtonText]}, "Login"))))));
            }
            else {
                return null;
            }
        }})))));
    },
    /*
    */
    handleValueChange: function (field, text) {
        var nextState = {};
        nextState[field] = text;
        this.setState(nextState);
    }
});
const BuzzWorkbench = React.createClass({
    componentDidMount: function () {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator.getCurrentRoutes().length > 2) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    },
    render: function () {
        return (React.createElement(CatavoltPane, null, React.createElement(View, {style: [styles.container, styles.main]}, React.createElement(CvAppWindow, {loginResult: this.props.loginResult}, React.createElement(View, {style: [styles.col]}, React.createElement(CvWorkbench, {workbenchId: "AAABACffAAAABpZL", renderer: (cvContext) => {
            const workbench = cvContext.scopeCtx.scopeObj;
            return (React.createElement(View, {style: [styles.col]}, React.createElement(View, {style: [styles.titleRow, styles.hlColor1]}, React.createElement(Text, {style: [styles.titleRowText]}, workbench.name)), React.createElement(View, {style: [styles.row, styles.launcherRow]}, React.createElement(View, {style: [styles.colRowItem, styles.launcherRowItem]}, React.createElement(CvLauncher, {actionId: "AAABACfaAAAABpIk", launchListeners: [
                    (event) => this.props.navigator.push({ index: 2,
                    loginResult: this.props.loginResult, navigationResult: event.eventObj })
            ], renderer: (cvContext, callback) => {
                const launcher = cvContext.scopeCtx.scopeObj;
                return (React.createElement(TouchableHighlight, {onPress: () => { callback.fireLaunchAction(); }}, React.createElement(View, {style: [styles.bg1, styles.fillContainer, styles.centerContents]}, React.createElement(Image, {style: [styles.launcherIcon], source: { uri: launcher.iconBase }}), React.createElement(Text, null, launcher.name))));
            }})))));
        }}))))));
    }
});
const BuzzStreams = React.createClass({
    render: function () {
        return (React.createElement(CatavoltPane, null, React.createElement(View, {style: [styles.container, styles.main]}, React.createElement(CvAppWindow, {loginResult: this.props.loginResult}, React.createElement(View, {style: [styles.col]}, React.createElement(CvNavigation, {navigationResult: this.props.navigationResult, renderer: (cvContext) => {
            const formContext = cvContext.scopeCtx.scopeObj;
            return (React.createElement(View, {style: [styles.col, styles.bg1]}, React.createElement(CvForm, null, React.createElement(View, {style: [styles.col]}, React.createElement(View, {style: [styles.row, styles.bg3]}, React.createElement(TouchableHighlight, {onPress: () => { this.props.navigator.pop(); }}, React.createElement(Text, {style: { alignSelf: 'flex-start', color: '#ffffff' }}, '< Back'))), React.createElement(View, {style: [styles.titleRow, styles.hlColor1]}, React.createElement(Text, {style: [styles.headerTextLight, styles.marginSm, { alignSelf: 'center' }]}, formContext.paneTitle)), React.createElement(CvListPane, {paneRef: 0, recordPageSize: 50, queryRenderer: (cvContext, callback) => {
                const listContext = cvContext.scopeCtx.scopeObj;
                const dataSource = new ListView.DataSource({ rowHasChanged: function (r1, r2) { return r1 !== r2; } });
                const records = listContext.scroller.buffer;
                return (React.createElement(ListView, {style: [styles.col, styles.marginMd], dataSource: dataSource.cloneWithRows(records), enableEmptySections: true, renderRow: entityRec => (React.createElement(CvRecord, {entityRec: entityRec, renderer: (cvContext) => {
                    //select "this record" so that the action can find the target via the selectionProvider
                    const selectionAdapter = new CvValueAdapter();
                    selectionAdapter.createValueListener()([entityRec.objectId]);
                    return (React.createElement(CvAction, {actionId: listContext.listDef.defaultActionId, paneContext: listContext, navigationListeners: [(event) => {
                            this.props.navigator.push({ index: 3,
                                loginResult: this.props.loginResult, navigationResult: event.eventObj });
                        }], selectionProvider: selectionAdapter, renderer: (cvContext, callback) => {
                        return (React.createElement(TouchableHighlight, {onPress: callback.fireAction}, React.createElement(View, {style: [styles.listRow]}, React.createElement(CvProp, {propName: 'name', wrapperElemName: Text, style: [styles.textMd, styles.textBold]}))));
                    }}));
                }}))}));
            }})))));
        }}))))));
    }
});
const BuzzMessages = React.createClass({
    render: function () {
        return (React.createElement(CatavoltPane, null, React.createElement(View, {style: [styles.container, styles.main]}, React.createElement(CvAppWindow, {loginResult: this.props.loginResult}, React.createElement(View, {style: [styles.col]}, React.createElement(CvNavigation, {navigationResult: this.props.navigationResult, renderer: (cvContext) => {
            const formContext = cvContext.scopeCtx.scopeObj;
            return (React.createElement(CvForm, null, React.createElement(View, {style: [styles.col]}, React.createElement(View, {style: [styles.row, styles.bg3]}, React.createElement(TouchableHighlight, {onPress: () => { this.props.navigator.pop(); }}, React.createElement(Text, {style: { alignSelf: 'flex-start', color: '#ffffff' }}, '< Back'))), React.createElement(View, {style: [styles.titleRow, styles.bg2]}, React.createElement(Text, {style: [styles.headerTextDark, styles.marginSm]}, formContext.formDef.label)), React.createElement(View, {style: [styles.col, styles.messagePanel]}, React.createElement(View, {style: [styles.bg1, styles.marginSm]}, React.createElement(Text, {style: [styles.marginLeftSm, styles.textLg]}, "Messages")), React.createElement(View, {style: [styles.col, styles.messageListPanel]}, React.createElement(View, {style: [styles.row, styles.hr]}), React.createElement(View, {style: [styles.rowItem, styles.newMessageRow]}, React.createElement(TouchableHighlight, {onPress: () => { }}, React.createElement(View, {style: [styles.newMessageButton]}, React.createElement(CvNativeResource, {resourceName: 'icon-action-join.png', style: { width: 24, height: 24 }}), React.createElement(Text, {style: styles.newMessageText}, "New Message")))), React.createElement(View, {style: [styles.row, styles.hr]}), React.createElement(CvListPane, {paneRef: 0, recordPageSize: 50, queryRenderer: (cvContext, callback) => {
                const listContext = cvContext.scopeCtx.scopeObj;
                const dataSource = new ListView.DataSource({ rowHasChanged: function (r1, r2) { return r1 !== r2; } });
                const records = listContext.scroller.buffer;
                return (React.createElement(ListView, {style: [styles.col, styles.marginMd], enableEmptySections: true, dataSource: dataSource.cloneWithRows(records), renderRow: entityRec => (React.createElement(CvRecord, {entityRec: entityRec, renderer: cvContext => (React.createElement(View, {style: [styles.rowItem, styles.messageItemRow]}, React.createElement(View, {style: [styles.col]}, React.createElement(View, {style: [styles.row, styles.marginBottomSm, { alignItems: 'center' }]}, React.createElement(CvNativeProp, {propName: 'avatar_large', style: [styles.rowItem, { width: 40, height: 40 }]}), React.createElement(View, {style: [styles.colRowItem, styles.marginLeftSm, { flex: 1, justifyContent: 'center', alignItems: 'flex-start' }]}, React.createElement(CvNativeProp, {style: [styles.textMd, styles.textBold], propName: 'created-by'}), React.createElement(CvNativeProp, {style: [styles.textSm], propName: 'group_name'}), React.createElement(CvNativeProp, {style: [styles.textSm], propName: 'created-at'})), React.createElement(View, {style: [styles.rowItem, { alignSelf: 'flex-end' }]}, React.createElement(CvNativeProp, {propName: 'is_flagged', handler: (prop) => {
                    return prop.value ?
                        React.createElement(CvNativeResource, {resourceName: 'icon-bookmark.png', style: { width: 24, height: 38 }}) :
                        React.createElement(CvNativeResource, {resourceName: 'icon-bookmark-unchecked.png', style: { width: 24, height: 38 }});
                }}))), React.createElement(View, {style: [styles.row, styles.likesRow]}, React.createElement(CvNativeProp, {propName: 'likes_count', defaultValue: '0', style: [styles.likesText]}), React.createElement(Text, {style: [styles.likesText]}, "liked"), React.createElement(CvNativeProp, {propName: 'comments_count', defaultValue: '0', style: [styles.likesText]}), React.createElement(Text, {style: [styles.likesText]}, "comments")), React.createElement(View, {style: [styles.row]}, React.createElement(CvNativeProp, {propName: 'title', style: [styles.marginMd]})), React.createElement(View, {style: [styles.col]}, React.createElement(CvNativeProp, {propName: 'body_preview', style: [styles.marginMd, styles.bg1]})), (() => {
                    const prop = entityRec.propAtName('number_of_attachments');
                    const attachments = [];
                    if (prop && prop.value > 0) {
                        const numAttachments = prop.value;
                        if (numAttachments == 1) {
                            attachments.push(React.createElement(CvNativeProp, {propName: 'attachment_preview_1', key: '1', style: [{ flex: 1, width: 300, height: 250, overflow: 'hidden' }, styles.bg1], imageResizeMode: 'contain'}));
                        }
                        else if (numAttachments % 2) {
                            for (let i = 1; i < numAttachments; i++) {
                                attachments.push(React.createElement(CvNativeProp, {propName: 'attachment_preview_' + i, key: '' + i, style: [{ flex: 1, width: 150, height: 250, overflow: 'hidden' }, styles.bg1], imageResizeMode: 'contain'}));
                            }
                            attachments.push(React.createElement(CvNativeProp, {propName: 'attachment_preview_' + numAttachments, key: '' + numAttachments, style: [{ flex: 1, width: 300, height: 500, overflow: 'hidden' }, styles.bg1], imageResizeMode: 'contain'}));
                        }
                        else {
                            for (let i = 1; i <= numAttachments; i++) {
                                attachments.push(React.createElement(CvNativeProp, {propName: 'attachment_preview_' + i, key: '' + i, style: [{ flex: 1, width: 150, height: 250, overflow: 'hidden' }, styles.bg1], imageResizeMode: 'contain'}));
                            }
                        }
                        return React.createElement(View, {style: [styles.row, styles.attachmentPanel]}, attachments);
                    }
                    else {
                        return null;
                    }
                })(), React.createElement(View, {style: [styles.row, styles.marginTopSm, styles.commentRow]}, React.createElement(CvNativeResource, {resourceName: 'icon-action-comment.png', style: [styles.rowItem, { width: 24, height: 24 }]})))))}))}));
            }}))))));
        }}))))));
    }
});
export var CvNativeResource = React.createClass({
    getDefaultProps: function () {
        return {
            type: 'image',
            resourceName: null,
            resourceUrl: null,
            className: null,
            fallbackImageUrl: null,
            style: null
        };
    },
    render: function () {
        return React.createElement(CvResource, {resourceName: this.props.resourceName, resourceUrl: this.props.resourceUrl, resourceRenderer: (resourceUrl) => (resourceUrl && this.props.type === 'image') ? React.createElement(Image, {style: this.props.style, source: { uri: resourceUrl }}) : null});
    }
});
export var CvNativeProp = React.createClass({
    getDefaultProps: function () {
        return {
            propName: null,
            defaultValue: null,
            isVisible: null,
            paneContext: null,
            entityRec: null,
            wrapperElemName: Text,
            wrapperElemProps: null,
            overrideValue: null,
            currencySymbol: '$',
            percentageSymbol: '%',
            style: null,
            handler: null,
            imageStyle: null,
            imageResizeMode: 'stretch'
        };
    },
    render: function () {
        /* We can't do ES7 style rest destructuring in Typescript yet... */
        const passthroughProps = {
            propName: this.props.propName,
            defaultValue: this.props.defaultValue,
            paneContext: this.props.paneContext,
            handler: this.props.handler,
            isVisible: this.props.isVisible,
            entityRec: this.props.entityRec,
            wrapperElemName: this.props.wrapperElemName,
            wrapperElemProps: this.props.wrapperElemProps,
            overrideValue: this.props.overrideValue,
            currencySymbol: this.props.currencySymbol,
            percentageSymbol: this.props.percentageSymbol,
            style: this.props.style
        };
        return React.createElement(CvProp, __assign({}, passthroughProps, {booleanRenderer: (boolVal) => {
            return boolVal ? React.createElement(Text, null, "Yes") : React.createElement(Text, null, "No");
        }, binaryRenderer: (binaryUrl) => {
            const style = this.props.imageStyle ? this.props.imageStyle : this.props.style;
            return binaryUrl ? React.createElement(Image, {resizeMode: this.props.imageResizeMode, style: style, source: { uri: binaryUrl }}) : null;
        }}));
    }
});
