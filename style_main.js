/**
 * Created by rburson on 1/27/16.
 */
/**
 * These are intended to be reusable styles across all apps
 * Use in combination with local styles for a given app
 */
'use strict';
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    /***** General *****/
    main: {
        backgroundColor: '#cccccc'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        height: 20,
    },
    /** margin presets */
    marginTiny: { margin: 3 },
    marginTopTiny: { marginTop: 3 },
    marginRightTiny: { marginRight: 3 },
    marginBottomTiny: { marginBottom: 3 },
    marginLeftTiny: { marginLeft: 3 },
    marginSm: { margin: 5 },
    marginTopSm: { marginTop: 5 },
    marginRightSm: { marginRight: 5 },
    marginBottomSm: { marginBottom: 5 },
    marginLeftSm: { marginLeft: 5 },
    marginMd: { margin: 10 },
    marginTopMd: { marginTop: 10 },
    marginRightMd: { marginRight: 10 },
    marginBottomMd: { marginBottom: 10 },
    marginLeftMd: { marginLeft: 10 },
    marginLg: { margin: 20 },
    marginTopLg: { marginTop: 20 },
    marginRightLg: { marginRight: 20 },
    marginBottomLg: { marginBottom: 20 },
    marginLeftLg: { marginLeft: 20 },
    marginXLg: { margin: 30 },
    marginTopXLg: { marginTop: 30 },
    marginRightXLg: { marginRight: 30 },
    marginBottomXLg: { marginBottom: 30 },
    marginLeftXLg: { marginLeft: 30 },
    /** padding presets */
    paddingTiny: { padding: 3 },
    paddingTopTiny: { paddingTop: 3 },
    paddingRightTiny: { paddingRight: 3 },
    paddingBottomTiny: { paddingBottom: 3 },
    paddingLeftTiny: { paddingLeft: 3 },
    paddingSm: { padding: 5 },
    paddingTopSm: { paddingTop: 5 },
    paddingRightSm: { paddingRight: 5 },
    paddingBottomSm: { paddingBottom: 5 },
    paddingLeftSm: { paddingLeft: 5 },
    paddingMd: { padding: 10 },
    paddingTopMd: { paddingTop: 10 },
    paddingRightMd: { paddingRight: 10 },
    paddingBottomMd: { paddingBottom: 10 },
    paddingLeftMd: { paddingLeft: 10 },
    paddingLg: { padding: 20 },
    paddingTopLg: { paddingTop: 20 },
    paddingRightLg: { paddingRight: 20 },
    paddingBottomLg: { paddingBottom: 20 },
    paddingLeftLg: { paddingLeft: 20 },
    paddingXLg: { padding: 30 },
    paddingTopXLg: { paddingTop: 30 },
    paddingRightXLg: { paddingRight: 30 },
    paddingBottomXLg: { paddingBottom: 30 },
    paddingLeftXLg: { paddingLeft: 30 },
    /***** Grid/Table *****/
    col: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    rowItem: {
        flexDirection: 'row',
    },
    colRowItem: {
        flexDirection: 'column',
    },
    /***** Images *****/
    logo: {
        alignSelf: 'center',
    },
    iconMd: {},
    /***** Text/Fonts *****/
    textTiny: { fontSize: 5 },
    textSm: { fontSize: 10 },
    textMd: { fontSize: 15 },
    textLg: { fontSize: 20 },
    textXLg: { fontSize: 30 },
    textBold: { fontWeight: 'bold' },
    /*** Utility ****/
    fillContainer: {
        flex: 1,
        alignSelf: 'stretch'
    },
    centerContents: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
