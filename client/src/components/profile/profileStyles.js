import { StyleSheet } from 'react-native'



export default StyleSheet.create({
    iconColor: {
        color: 'white'
    },
    header: {
        backgroundColor: "#039be5"
    },

    gradientBox: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
    },

    pendingCard: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginTop: '5%',
    },

    userImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        resizeMode: 'cover'
    },
    userName: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },

    gridCol: {
        flexDirection: 'row',
        height: 100,
        padding: 20,
        margin: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white',

    },
    gridCell: {
        flex: 0.3,
        justifyContent: 'center',
         borderRightWidth: 0.5,
         borderColor: 'white',
    },
    gridCellValue: {
        flex: 1,
        justifyContent: 'center',
    },
    gridText: {
        color:'white',
    },
    gridTextvalue: {
        textAlign: 'right',
        color:'white'
    },




})