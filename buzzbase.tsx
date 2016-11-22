/**
 * Created by rburson on 2/5/16.
 */
'use strict';

import * as React from 'react';
import {View, Text, TextInput, Image, ListView, TouchableHighlight, Navigator, BackAndroid} from 'react-native'
import {Log, LogLevel, Workbench, WorkbenchLaunchAction, PaneContext, FormContext, ListContext, DetailsContext, EntityRec, Prop} from 'catavolt-sdk'
import {
    CatavoltPane,
    CvLogin,
    CvAppWindow,
    CvWorkbench,
    CvLauncher,
    CvNavigation,
    CvForm,
    CvListPane,
    CvRecord,
    CvProp,
    CvResource, CvLoginCallback, CvContext, CvLaunchActionCallback, CvQueryPaneCallback, CvAction, CvActionCallback,
    CvValueAdapter, CvNavigationResult, CvEvent, CvProps, CvLoginResult
} from 'catreact'

import mStyles from './style_main'
import lStyles from './style_buzz'
import ReactElement = __React.ReactElement;
var styles = Object.assign(lStyles, mStyles);

Log.logLevel(LogLevel.DEBUG);

export var CvBuzzApp = React.createClass({


    render: function () {
        return <Navigator
            initialRoute={{name: 'Buzz Stream', index: 0}}
            renderScene={this._renderScene}
        />
    },

    _renderScene: function (route, nav) {
        switch (route.index) {
            case 0:
                return <BuzzLogin navigator={nav}/>;
            case 1:
                return <BuzzWorkbench navigator={nav} loginResult={route.loginResult}/>;
            case 2:
                return <BuzzStreams navigator={nav} loginResult={route.loginResult} navigationResult={route.navigationResult}/>;
            case 3:
                return <BuzzMessages navigator={nav} loginResult={route.loginResult} navigationResult={route.navigationResult}/>;
        }
    },

});

const BuzzLogin = React.createClass<{navigator:any}, {}>({

    getInitialState: function () {
        return {
            tenantId: 'catavolt-dev',
            gatewayUrl: 'www.catavolt.net',
            userId: 'rob',
            password: 'rob123',
            clientType: 'RICH_CLIENT',
        }
    },
    
    render: function () {
        return (
            <CatavoltPane>
                <View style={[styles.container, styles.main]}>
                    <View style={[styles.bg1, styles.paddingMd, styles.col]}>
                        <CvLogin loginListeners={[(e:CvEvent<CvLoginResult>)=>{this.props.navigator.push({index:1, loginResult:e.eventObj})}]}
                                 renderer={(cvContext:CvContext, callback:CvLoginCallback)=>{
                            if(!callback.isLoggedIn()) {
                                return ( 
                                <View style={[styles.col]}>
                                    <TextInput style={{height:40}} value={this.state.tenantId}
                                               onChangeText={this.handleValueChange.bind(this, 'tenantId')}/>
                                    <TextInput style={{height:40}} value={this.state.gatewayUrl}
                                               onChangeText={this.handleValueChange.bind(this, 'gatewayUrl')}/>
                                    <TextInput style={{height:40}} value={this.state.userId}
                                               onChangeText={this.handleValueChange.bind(this, 'userId')}/>
                                    <TextInput style={{height:40}} value={this.state.password}
                                               onChangeText={this.handleValueChange.bind(this, 'password')}/>
                                    <View style={{flexDirection: 'row', margin: 15, justifyContent: 'center'}}>
                                        <TouchableHighlight onPress={()=>{
                                            callback.login(this.state.gatewayUrl, this.state.tenantId,
                                                this.state.clientType, this.state.userId, this.state.password);}}>
                                            <View style={[styles.loginButton]}>
                                                    <Text style={[styles.loginButtonText]}>Login</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                                );
                            } else {
                                return null;
                            }
                        }}/>
                    </View>
                </View>
            </CatavoltPane>
        )
    },
    
    /*
    */
    
    handleValueChange: function (field, text) {
        var nextState = {};
        nextState[field] = text;
        this.setState(nextState);
    }
});

const BuzzWorkbench = React.createClass<{navigator:any, loginResult:CvLoginResult}, {}>({

    componentDidMount: function () {
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            if (this.props.navigator.getCurrentRoutes().length > 2) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    },

    render: function () {
        return (
            <CatavoltPane>
                <View style={[styles.container, styles.main]}>
                    <CvAppWindow loginResult={this.props.loginResult}>
                        <View style={[styles.col]}>
                            <CvWorkbench workbenchId={"AAABACffAAAABpZL"} renderer={(cvContext:CvContext)=>{
                                const workbench:Workbench = cvContext.scopeCtx.scopeObj as Workbench;
                                return(
                                <View style={[styles.col]}>
                                    <View style={[styles.titleRow, styles.hlColor1]}><Text style={[styles.titleRowText]}>{workbench.name}</Text></View>
                                    <View style={[styles.row, styles.launcherRow]}>
                                        <View style={[styles.colRowItem, styles.launcherRowItem]}>
                                            <CvLauncher actionId={"AAABACfaAAAABpIk"}
                                                launchListeners={[
                                                    (event:CvEvent<CvNavigationResult>)=> this.props.navigator.push({index:2,
                                                        loginResult:this.props.loginResult, navigationResult:event.eventObj})
                                                ]}
                                                renderer={(cvContext:CvContext, callback:CvLaunchActionCallback)=>{
                                                    const launcher = cvContext.scopeCtx.scopeObj as WorkbenchLaunchAction;
                                                    return (
                                                        <TouchableHighlight onPress={()=>{callback.fireLaunchAction()}}>
                                                                <View style={[styles.bg1, styles.fillContainer, styles.centerContents]}>
                                                                    <Image style={[styles.launcherIcon]} source={{uri: launcher.iconBase}}/>
                                                                    <Text>{launcher.name}</Text>
                                                                </View>
                                                        </TouchableHighlight>
                                                     )
                                            }}/> 
                                        </View>
                                    </View>
                                </View>
                                ); 
                            }}/>
                        </View>
                    </CvAppWindow>
                </View>
            </CatavoltPane>
        );
    }
});

const BuzzStreams = React.createClass<{navigator:any, loginResult:CvLoginResult, navigationResult:CvNavigationResult}, {}>({
    render: function () {
        return (
            <CatavoltPane>
                <View style={[styles.container, styles.main]}>
                    <CvAppWindow loginResult={this.props.loginResult}>
                        <View style={[styles.col]}>
                            <CvNavigation navigationResult={this.props.navigationResult} renderer={(cvContext:CvContext)=>{
                                const formContext:FormContext = cvContext.scopeCtx.scopeObj as FormContext;
                                return(
                                <View style={[styles.col, styles.bg1]}>
                                    <CvForm>
                                        <View style={[styles.col]}>
                                            <View style={[styles.row, styles.bg3]}>
                                                <TouchableHighlight onPress={()=>{this.props.navigator.pop();}}>
                                                    <Text style={{alignSelf:'flex-start', color:'#ffffff'}}>{'< Back'}</Text>
                                                </TouchableHighlight>
                                            </View>
                                            <View style={[styles.titleRow, styles.hlColor1]}>
                                                <Text style={[styles.headerTextLight, styles.marginSm, {alignSelf: 'center'}]}>{formContext.paneTitle}</Text>
                                            </View>
                                            <CvListPane paneRef={0} recordPageSize={50} queryRenderer={(cvContext:CvContext, callback:CvQueryPaneCallback)=>{
                                                const listContext:ListContext = cvContext.scopeCtx.scopeObj;
                                                const dataSource = new ListView.DataSource({rowHasChanged: function(r1, r2) { return r1 !== r2; } });
                                                const records:Array<EntityRec> = listContext.scroller.buffer;
                                                return (
                                                    <ListView style={[styles.col, styles.marginMd]} dataSource={dataSource.cloneWithRows(records)}
                                                        enableEmptySections={true}
                                                        renderRow={entityRec => (
                                                            <CvRecord entityRec={entityRec} renderer={(cvContext:CvContext)=>{
                                                                 //select "this record" so that the action can find the target via the selectionProvider
                                                                const selectionAdapter:CvValueAdapter<Array<string>> = new CvValueAdapter<Array<string>>();
                                                                selectionAdapter.createValueListener()([entityRec.objectId]);
                                                                return (
                                                                <CvAction actionId={listContext.listDef.defaultActionId} paneContext={listContext}
                                                                    navigationListeners={[(event:CvEvent<CvNavigationResult>)=>{this.props.navigator.push({index:3,
                                                                       loginResult:this.props.loginResult, navigationResult:event.eventObj})}]}
                                                                    selectionProvider={selectionAdapter}
                                                                    renderer={(cvContext:CvContext, callback?:CvActionCallback)=>{
                                                                        return (
                                                                        <TouchableHighlight onPress={callback.fireAction}>
                                                                            <View style={[styles.listRow]}>
                                                                                <CvProp propName={'name'} wrapperElemName={Text} style={[styles.textMd, styles.textBold]}/>
                                                                            </View>
                                                                        </TouchableHighlight>
                                                                        ); 
                                                                }}/>
                                                                );
                                                            }}/>
                                                        )
                                                    }/>
                                                );
                                            }}/>
                                        </View>
                                    </CvForm>
                                </View>
                                );
                            }}/>
                        </View>
                    </CvAppWindow>
                </View>
            </CatavoltPane>
        );
    }
});

const BuzzMessages = React.createClass<{navigator:any, loginResult:CvLoginResult, navigationResult:CvNavigationResult}, {}>({
    render: function () {
        return (
            <CatavoltPane>
                <View style={[styles.container, styles.main]}>
                    <CvAppWindow loginResult={this.props.loginResult}>
                        <View style={[styles.col]}>
                            <CvNavigation navigationResult={this.props.navigationResult} renderer={(cvContext:CvContext)=>{
                                const formContext:FormContext = cvContext.scopeCtx.scopeObj as FormContext;
                                return (
                                <CvForm>
                                    <View style={[styles.col]}>
                                        <View style={[styles.row, styles.bg3]}>
                                            <TouchableHighlight onPress={()=>{this.props.navigator.pop();}}>
                                                <Text style={{alignSelf:'flex-start', color:'#ffffff'}}>{'< Back'}</Text>
                                            </TouchableHighlight>
                                        </View>
                                        <View style={[styles.titleRow, styles.bg2]}>
                                              <Text style={[styles.headerTextDark, styles.marginSm]}>{formContext.formDef.label}</Text>
                                        </View>
                                        <View style={[styles.col, styles.messagePanel]}>
                                            <View style={[styles.bg1, styles.marginSm]}>
                                                <Text style={[styles.marginLeftSm, styles.textLg]}>Messages</Text>
                                            </View>
                                            <View style={[styles.col, styles.messageListPanel]}>
                                                <View style={[styles.row, styles.hr]}/>
                                                <View style={[styles.rowItem, styles.newMessageRow]}>
                                                    <CvNativeResource resourceName={'icon-action-join.png'} style={{width:24,height:24}}/>
                                                    <TouchableHighlight onPress={()=>{}}>
                                                        <Text style={styles.newMessageText}>New Message</Text>
                                                    </TouchableHighlight>
                                                </View>
                                                <View style={[styles.row, styles.hr]}/>
                                                <CvListPane paneRef={0} recordPageSize={50} queryRenderer={(cvContext:CvContext, callback:CvQueryPaneCallback)=>{
                                                    const listContext:ListContext = cvContext.scopeCtx.scopeObj;
                                                    const dataSource = new ListView.DataSource({rowHasChanged: function(r1, r2) { return r1 !== r2; } });
                                                    const records:Array<EntityRec> = listContext.scroller.buffer;
                                                    return (
                                                    <ListView style={[styles.col, styles.marginMd]} enableEmptySections={true}
                                                        dataSource={dataSource.cloneWithRows(records)} renderRow={entityRec=>(
                                                        <CvRecord entityRec={entityRec} renderer={cvContext=>(
                                                            <View style={[styles.rowItem, styles.messageItemRow]}>
                                                                <View style={[styles.col]}>
                                                                    <View style={[styles.row, styles.marginBottomSm, {alignItems: 'center'}]}>
                                                                        <CvNativeProp propName={'avatar_large'} style={[styles.rowItem, {width:40, height:40}]}/>
                                                                        <View style={[styles.colRowItem, styles.marginLeftSm, {flex:1, justifyContent: 'center', alignItems:'flex-start'}]}>
                                                                            <CvNativeProp style={[styles.textMd, styles.textBold]} propName={'created-by'}/>
                                                                            <CvNativeProp style={[styles.textSm]} propName={'group_name'}/>
                                                                            <CvNativeProp style={[styles.textSm]} propName={'created-at'}/>
                                                                        </View>
                                                                        <View style={[styles.rowItem, {alignSelf:'flex-end'}]}>
                                                                            <CvNativeProp propName={'is_flagged'} handler={(prop)=>{
                                                                                        return prop.value ?
                                                                                            <CvNativeResource resourceName={'icon-bookmark.png'} style={{width:24, height:38}}/> :
                                                                                            <CvNativeResource resourceName={'icon-bookmark-unchecked.png'} style={{width:24, height:38}}/>
                                                                            }}/>
                                                                        </View>
                                                                    </View>
                                                                    <View style={[styles.row, styles.likesRow]}>
                                                                        <CvNativeProp propName={'likes_count'} defaultValue={'0'} style={[styles.likesText]}/>
                                                                        <Text style={[styles.likesText]}>liked</Text>
                                                                        <CvNativeProp propName={'comments_count'} defaultValue={'0'} style={[styles.likesText]}/>
                                                                        <Text style={[styles.likesText]}>comments</Text>
                                                                    </View>
                                                                    <View style={[styles.row]}><CvNativeProp propName={'title'} style={[styles.marginMd]}/></View>
                                                                    <View style={[styles.col]}><CvNativeProp propName={'body_preview'} style={[styles.marginMd, styles.bg1]}/></View>
                                                                    {(()=>{
                                                                            const prop = entityRec.propAtName('number_of_attachments');
                                                                            const attachments = [];
                                                                            if(prop && prop.value > 0) {
                                                                                const numAttachments = prop.value;
                                                                                if(numAttachments == 1) {
                                                                                    attachments.push(<CvNativeProp propName={'attachment_preview_1'} key={'1'}
                                                                                    style={[{flex: 1, width:300,height:500, overflow:'hidden', resizeMode:'contain'}, styles.bg1]}/>)
                                                                                } else if (numAttachments % 2){
                                                                                    for(let i = 1; i < numAttachments; i++) {
                                                                                        attachments.push(<CvNativeProp propName={'attachment_preview_' + i} key={'' + i}
                                                                                        style={[{flex: 1, width:150,height:250, overflow:'hidden', resizeMode:'contain'}, styles.bg1]}/>)
                                                                                    }
                                                                                    attachments.push(<CvNativeProp propName={'attachment_preview_' + numAttachments} key={'' + numAttachments}
                                                                                        style={[{flex: 1, width:300,height:500, overflow:'hidden', resizeMode:'contain'}, styles.bg1]}/>)
                                                                                } else {
                                                                                    for(let i = 1; i <= numAttachments; i++) {
                                                                                        attachments.push(<CvNativeProp propName={'attachment_preview_' + i} key={'' + i}
                                                                                        style={[{flex: 1, width:150,height:250, overflow:'hidden', resizeMode:'contain'}, styles.bg1]}/>)
                                                                                    }
                                                                                }
                                                                                return <View style={[styles.row, styles.attachmentPanel]}>{attachments}</View>
                                                                            } else {
                                                                                return null;
                                                                            }
                                                                    })()}
                                                                    <View style={[styles.row, styles.marginTopSm, styles.commentRow]}>
                                                                        <CvNativeResource resourceName={'icon-action-comment.png'} style={[styles.rowItem, {width:24,height:24}]}/>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        )}/>
                                                        )
                                                    }/>);
                                                }}/>
                                            </View>
                                        </View>
                                    </View>
                                </CvForm>
                                );
                            }}/>
                        </View>
                    </CvAppWindow>
                </View>
            </CatavoltPane>
        );
    }
});

export interface CvNativeResourceProps {
    className?:string;
    style?:{},
    type?:string;
    fallbackImageUrl?:string,
    resourceName?:string
    resourceUrl?:string;
}

export var CvNativeResource = React.createClass<CvNativeResourceProps, any>({

    getDefaultProps: function () {
        return {
            type: 'image',
            resourceName: null,
            resourceUrl: null,
            className: null,
            fallbackImageUrl: null,
            style: null
        }
    },

    render: function () {

        return <CvResource resourceName={this.props.resourceName}
           resourceUrl={this.props.resourceUrl}
           resourceRenderer={(resourceUrl)=>
                (resourceUrl && this.props.type === 'image') ? <Image style={this.props.style} source={{uri: resourceUrl}}/> : null
           }/>
    }

});

export interface CvNativePropProps extends CvProps {
    /**
     * style to apply to the property.  wrapperElemProps will override this value
     */
    style?:{}
    /**
     * Rendering override.  Simple callback function to access the sdk {Prop} object
     */
    ,
    handler?:(o:Prop) => {};
    /**
     * Function that allows for visibility control.  Accepts sinlge param of sdk {Prop} object.  Should return true
     * if the component should be rendered, false if the component should be hidden.
     */
    isVisible?:(o:Prop) => boolean;
    /**
     * The name of this property.  The given (or enclosing) sdk {EnityRec} will be searched for the sdk {Prop} of this name
     */
    propName:string;
    /**
     * Default to be used if this sdk {Prop} value is null or undefined
     */
    defaultValue?:string;
    /**
     * The sdk {EntityRec} that owns this sdk {Prop}
     */
    entityRec?:EntityRec;
    /**
     * The containing PaneContext
     */
    paneContext?:PaneContext;
    /**
     * The wrapper element name for this prop value (should be html)
     */
    wrapperElemName?:any;
    /**
     * The wrapper element props
     */
    wrapperElemProps?:any;
    /**
     * Force the value of this prop to be the given value
     */
    overrideValue?:string;
    /**
     * Currency symbol to use for 'money' types
     */
    currencySymbol?:string;
    /**
     * Percentage symbol to use for percentage types
     */
    percentageSymbol?:string;
    /**
     * The style to apply to image elements
     */
    imageStyle?:{}
}

export var CvNativeProp = React.createClass<CvNativePropProps, any>({

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
            imageStyle: null
        }
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
        }

        return <CvProp {...passthroughProps}
            booleanRenderer={(boolVal)=>{
                return boolVal ? <Text>Yes</Text> : <Text>No</Text>
            }}
            binaryRenderer={(binaryUrl)=>{
                const style = this.props.imageStyle ? this.props.imageStyle : this.props.style;
                return binaryUrl ? <Image style={style} source={{uri: binaryUrl}}/> : null;
            }
        }/>

    }

});
