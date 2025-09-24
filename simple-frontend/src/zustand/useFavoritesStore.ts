import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { userstate } from "./Uzerstate"


type FavoriteStore = {
  favorites: string[]
  toggleFavorite: (id: string) => void
}

export const useFavoritesStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) => {
        const current = get().favorites
        const newFavs = current.includes(id)
          ? current.filter((i) => i !== id)
          : [...current, id]
        set({ favorites: newFavs })
      },
    }),
    {
      name: (() => {
        const user = userstate.getState().globalstate
        return user ? `favorites_${user.id}` : "favorites_guest"
      })(),
      storage: createJSONStorage(() => localStorage),
    }
  )
)
