import { create } from 'zustand'
import {DashboardType} from "@/types/dashboard.type";

interface DashboardState {
    dashboards: DashboardType[]
    addDashboard: (dashboard: DashboardType) => void
    setDashboards: (dashboards: DashboardType[]) => void
    clearDashboards: () => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
    dashboards: [],

    addDashboard: (dashboard) =>
        set((state) => ({
            dashboards: [...state.dashboards, dashboard],
        })),

    setDashboards: (dashboards) => set({ dashboards }),

    clearDashboards: () => set({ dashboards: [] }),
}))
