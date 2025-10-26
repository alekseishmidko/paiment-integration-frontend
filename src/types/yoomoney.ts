export {}

declare global {
    interface Window {
        YooMoneyCheckoutWidget: new (
            params: YooMoneyCheckoutWidgetParams
        ) => YooMoneyCheckoutWidget
    }
}
