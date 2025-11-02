import { api } from '../instance'
import type { PlanResponse } from '../types'

export const getAllPlans = async () =>
    await api.get<PlanResponse[]>('/plans').then(res => res.data)

export const getPlanById = async (id: string) =>
    await api.get<PlanResponse>(`/plans/${id}`).then(res => res.data)
