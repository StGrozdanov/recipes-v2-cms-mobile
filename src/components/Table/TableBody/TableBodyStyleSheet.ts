import { StyleSheet } from "react-native";

export const tableBodyStyles: Record<string, any> = StyleSheet.create({
    lightAdditionalData: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-evenly",
        paddingVertical: 35,
    },

    lightAdditionalDataHeading: {
        marginBottom: 10,
        fontWeight: '400',
        textAlign: 'center',
    },

    lightAdditionalDataContent: {
        textAlign: "center",
        fontWeight: "300",
        fontSize: 12,
    },

    toggledData: {
        display: "none",
    },

    online: {
        color: 'green',
        backgroundColor: "#2ac99111",
        borderColor: "green",
    },

    offline: {
        color: 'darkred',
        backgroundColor: "#ff000010",
        borderColor: "darkred",
    },

    PENDING: {
        color: 'darkgoldenrod',
        backgroundColor: "#ffa50047",
        borderColor: "#b8860b8c",
    },

    APPROVED: {
        color: 'green',
        backgroundColor: "#2ac99111",
        borderColor: "green",
    },

    status: {
        fontWeight: '400',
        borderWidth: 0.8,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 8,
        overflow: 'hidden',
    },

    lightIcons: {
        alignSelf: "center",
        color: "midnightblue",
    },

    darkAdditionalData: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-evenly",
        paddingVertical: 35,
        borderLeftWidth: 1.5,
        borderRightWidth: 1.5,
        borderStartColor: 'rgba(124,113,192,0.6)',
        borderEndColor: 'rgba(124,113,192,0.6)',
    },

    darkAdditionalDataHeading: {
        marginBottom: 10,
        fontWeight: '400',
        textAlign: 'center',
        color: 'floralwhite',
    },

    darkAdditionalDataContent: {
        textAlign: "center",
        fontWeight: "300",
        fontSize: 12,
        color: 'rgba(124,113,192,1)'
    },

    darkOffline: {
        backgroundColor: "#ff000010",
        color: 'darkred',
        borderColor: 'darkred',
    },

    darkIcons: {
        alignSelf: "center",
        color: 'rgba(124,113,192,0.8)',
    },

});