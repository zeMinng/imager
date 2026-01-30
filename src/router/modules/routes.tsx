import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ErrorThrower } from '@/components/common/ErrorBoundary'
import Layout from '@/components/layouts'
import Dashboard from '@/pages/Dashboard'

const Stitcher = lazy(() => import('@/pages/Stitcher/Stitcher'))
const NotFound = lazy(() => import('@/pages/NotFound/notFound'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorThrower />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'stitcher',
        element: (
          <Stitcher />
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default routes
