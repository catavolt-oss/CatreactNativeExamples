/**
 * Created by rburson on 2/1/16.
 */
'use strict';
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    headerTextLight: {
        color: '#ffffff',
        fontSize: 15,
    },
    headerTextDark: {
        color: '#333333',
        fontSize: 15,
    },
    launcherRow: {
        justifyContent: 'space-around',
        backgroundColor: '#cccccc',
        padding: 20
    },
    launcherRowItem: {
        backgroundColor: '#ffffff',
        width: 100,
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    launcherIcon: {
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        margin: 5,
    },
    bg1: {
        backgroundColor: '#ffffff'
    },
    bg2: {
        backgroundColor: '#cccccc'
    },
    bg3: {
        backgroundColor: '#777777'
    },
    hlColor1: {
        backgroundColor: '#4C8C14',
    },
    hlColor2: {
        backgroundColor: '#b02067'
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleRowText: {
        color: '#ffffff'
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4C8C14',
        padding: 10,
        borderRadius: 3
    },
    loginButtonText: {
        color: '#ffffff',
        backgroundColor: '#4C8C14'
    },
    /***** List *****/
    listRow: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        padding: 10
    },
    messagePanel: {
        backgroundColor: '#ffffff',
        marginTop: 3,
        marginRight: 8,
        marginLeft: 8,
        borderRadius: 5,
        borderColor: '#999999',
        borderWidth: 1
    },
    newMessageRow: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
    },
    newMessageText: {
        color: '#b02067',
        fontSize: 10
    },
    messageListPanel: {
        backgroundColor: '#cccccc',
        marginRight: 8,
        marginLeft: 8,
    },
    messageItemRow: {
        backgroundColor: '#ffffff',
        margin: 8,
        padding: 5,
    },
    hr: {
        backgroundColor: '#aaaaaa',
        height: 1
    },
    likesRow: {
        backgroundColor: '#4C8C14'
    },
    likesText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 5
    },
    attachmentPanel: {
        backgroundColor: '#cccccc',
        padding: 5,
        justifyContent: 'center'
    },
    commentRow: {
        backgroundColor: '#cccccc',
        padding: 5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
