'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useLoginMutation } from '@/api/hooks'

import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

import { AuthWrapper } from './auth-wrapper'

const loginSchema = z.object({
    email: z.email({ message: 'Введите корректный адрес электронной почты' }),
    password: z
        .string()
        .min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
        .max(128, { message: 'Пароль должен содержать не более 128 символов' })
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const router = useRouter()

    const { mutate, isPending } = useLoginMutation({
        onSuccess() {
            router.push('/dashboard')
        }
    })

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: LoginFormValues) => {
        mutate(values)
    }

    return (
        <AuthWrapper
            title='Войти'
            description='Введите свои данные для входа в аккаунт'
            bottomText='Еще нет аккаунта?'
            bottomTextLink='Регистрация'
            bottomLinkHref='/auth/register'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='tyler.derden@fightclub.com'
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='******'
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        size='lg'
                        className='w-full'
                        disabled={isPending}
                    >
                        Продолжить
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    )
}
