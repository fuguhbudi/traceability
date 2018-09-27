import themes from "themes";

export default {
    buttonGroup: {
        // ...themes.fl1,
        // ...themes.ph5
    },
    buttonItemContainer: {
        ...themes.fl1,
        ...themes.ph5
    },
    buttonItemStacked: {
        ...themes.mt15,
        ...themes.ph0,
        flex: 0,
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    buttonItemText: {
        ...themes.textBold,
        ...themes.paint.neutral
    },
    buttonItemNofill: {
        ...themes.textBold,
        ...themes.paint.primary
    },
    buttonWithIcon: {
        ...themes.pl30,
        ...themes.pr23,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
};
