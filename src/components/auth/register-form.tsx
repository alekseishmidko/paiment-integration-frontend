'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useRegisterMutation } from '@/api/hooks'

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

const registerSchema = z.object({
    name: z.string().min(1, { message: 'Имя обязательно' }),
    email: z.email({ message: 'Введите корректный адрес электронной почты' }),
    password: z
        .string()
        .min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
        .max(128, { message: 'Пароль должен содержать не более 128 символов' })
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
    const router = useRouter()

    const { mutate, isPending } = useRegisterMutation({
        onSuccess() {
            router.push('/dashboard')
        }
    })

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: RegisterFormValues) => {
        mutate(values)
    }

    return (
        <AuthWrapper
            title='Регистрация'
            description='Заполните форму ниже, чтобы создать аккаунт'
            bottomText='Уже есть аккаунт?'
            bottomTextLink='Войти'
            bottomLinkHref='/auth/login'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Тайлер Дерден'
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
