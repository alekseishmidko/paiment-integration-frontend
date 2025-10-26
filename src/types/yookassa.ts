interface YooMoneyCheckoutWidgetCustomizationColors {
    control_primary?: string
    control_primary_content?: string
    background?: string
    text?: string
    border?: string
    control_secondary?: string
}

type PaymentMethod =
    | 'bank_card'
    | 'yoo_money'
    | 'mir_pay'
    | 'sber_loan'
    | 'sberbank'
    | 'spb'
    | 'tinkoff_bank'

interface YooMoneyCheckoutWidgetCustomization {
    modal?: boolean
    colors?: YooMoneyCheckoutWidgetCustomizationColors
    payment_methods?: PaymentMethod[]
}

interface YooMoneyCheckoutWidgetParams {
    confirmation_token: string
    return_url?: string
    error_callback: (error: string) => void
    customization?: YooMoneyCheckoutWidgetCustomization
}

interface YooMoneyCheckoutWidget {
    render: (id?: string) => Promise<undefined | undefined>
    destroy: () => void
    on: (
        event: 'success' | 'fail' | 'complete' | 'modal_close',
        callback: () => void
    ) => void
}
