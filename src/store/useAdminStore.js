import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'deltazone2026'

const useAdminStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username, password) => {
        if (username === ADMIN_USER && password === ADMIN_PASS) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: 'admin-auth' }
  )
)

export default useAdminStore
