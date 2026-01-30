import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export function createVitePlugins() {
  return [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ]
}
