import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import GlobalLoading from '@/components/common/GlobalLoading'

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Suspense fallback={<GlobalLoading />}>
          {/* <LazyComponent /> */}
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
