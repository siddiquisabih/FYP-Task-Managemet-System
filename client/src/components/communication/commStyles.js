import { StyleSheet } from "react-native";
export default StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: "#039be5"
    },
    message: {
        paddingLeft: 10,
        paddingTop: 10,
        fontFamily: 'Cochin',
        // fontWeight: 'bold',
        color: 'red'
    },
    messageHeading: {
        paddingLeft: 10,
        paddingTop: 10,
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        color: 'black'
    },

    date: {
        paddingLeft: 10,
        fontFamily: 'Cochin',
    },
    description: {
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: 'Cochin',
        fontWeight: 'bold',

    },
    descriptionCommText: {
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: 'Cochin',
        // fontWeight: 'bold',

    },

    mainCard: {
        // marginLeft: 12,
        // marginRight: 12,
        // marginTop: 12,
        // width: '90%',
        // marginLeft: '5%',
        // marginTop: '5%',
        borderRadius: 10,
        // marginTop: '5%'
        // backgroundColor: '#e1bee7'

    },
    pendingCard: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        // marginLeft: '5%',
        marginTop: '5%',
        // borderRadius: 50,

    },
    statusHeading: {
        alignSelf: 'center',
        color: 'white'

    },
    number: {
        alignSelf: 'center',
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        color: 'white'

    },
    gradientBox: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
    },
    iconColor: {
        color: 'white'
    },
    updateButton: {
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 15,
        marginRight: 15,
    },

    label: {
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        // textAlign: 'center'

    },
    textbox: {
        width: '90%',
        marginLeft: "5%",
        color: 'white'

    },
    datePicker: {
        width: '90%',
        marginLeft: "5%",

    },
    textarea: {
        width: '90%',
        marginLeft: "5%",
        borderRadius: 20,
        borderColor: 'white',
        color: 'white'
    },
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginBottom: 10,
        marginTop: 10,
    },
    inputText: {
        color: 'white'
    },


    // image card

    imageCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        marginRight: 5
    },
    // image card end

    contentContainer: {
        paddingVertical: 20,

    },
    imageAttach: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
    },

    userImage: {
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 15,
    },

    otherText: {
        alignSelf: 'center',
        // marginLeft: 10,
        paddingLeft: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        color: 'white',
        width: "60%"
    },


    otherHead: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'flex-start',
    },

    userHead: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'flex-end',
        width: '100%',

    },

    userText: {
        alignSelf: 'center',
        marginLeft: 10,
        paddingLeft: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'blue',
        color: 'white',
        width: "60%"
    },

    userTextImage: {
        marginLeft: 5,
        marginTop: 15,
        // marginBottom: 15,
        marginRight: 5,
    },
    OtherImage: {

        marginLeft: 5,
        marginTop: 15,
        // marginBottom: 15,
        marginRight: 5,
    },

    messageTextarea: {
        width: '85%',
        // marginLeft: "5%",
        borderRadius: 20,
        borderColor: 'white',
        color: 'white',
        marginBottom: 10
    },
    timeText: {
        fontSize: 15,
        textAlign: 'center',
        color: 'gray',
    },


})