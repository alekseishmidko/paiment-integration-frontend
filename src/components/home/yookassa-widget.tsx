import { useEffect, useState } from 'react'

interface YookassaWidgetProps {
    payment: {
        id: string
        token: string
    }
}

export function YookassaWidget({ payment }: YookassaWidgetProps) {
    const [isPaymentFormLoading, setIsPaymentFormLoading] = useState(true)
    const [isLoadedScript, setIsLoadedScript] = useState(false)

    useEffect(() => {
        const scriptTag = document.createElement('script')

        scriptTag.src =
            'https://yookassa.ru/checkout-widget/v1/checkout-widget.js'

        scriptTag.addEventListener('load', () => {
            setIsLoadedScript(true)
        })

        document.body.appendChild(scriptTag)
    }, [])

    useEffect(() => {
        if (!isLoadedScript || !payment.token) return

        const checkout = new window.YooMoneyCheckoutWidget({
            confirmation_token: payment.token,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/${payment.id}/success`,
            customization: {
                colors: {
                    control_primary: '#F97316',
                    control_primary_content: '#FFFFFF'
                }
            },
            error_callback(error: string) {
                console.error(error)
            }
        })

        setIsPaymentFormLoading(false)
        checkout.render('payment-form')
    }, [isLoadedScript, payment.token])

    return (
        <div className='flex items-center justify-center'>
            {isPaymentFormLoading && <div>Loading...</div>}

            <div id='payment-form' className='w-full' />
        </div>
    )
}
