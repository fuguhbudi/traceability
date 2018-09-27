import themes from "themes";

export default {
    buttonGroup: {
        // ...themes.fl1,
        // ...themes.ph5
    },
    buttonItemContainer: {
        ...themes.fl1,
    },
    buttonItemStacked: {
        ...themes.mt15,
        flex: 0,
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    boxItem: {
        ...themes.bgNeutral,
        ...themes.borderLight,
        ...themes.br5,
        ...themes.pl18,
        marginLeft: 0,
    },
    buttonItemText: {
        color: '#000f23'
    },
};
