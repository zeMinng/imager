import { useState } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { RotateCcw, Home, RefreshCw } from 'lucide-react'
import './index.scss'

/**
 * https://zh-hans.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
function ErrorFallback({
  error,
  resetErrorBoundary,
  componentStack,
}: FallbackProps & { componentStack?: string }) {
  const [showStack] = useState(true)
  const handleGoHome = () => (window.location.href = '/')
  const handleReload = () => window.location.reload()

  return (
    <div className="error-boundary">
      <div className="error-result">
        <div className="error-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M32 20v16M32 44h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="error-result-title">出现了一些问题</h1>
        <div className="error-details">
          <div className="error-outline">
            <h2 className="error-title">错误信息：</h2>
            <p className="error-message">{(error as any).message}</p>
          </div>
          {componentStack && (
            <details className="error-stack" open={showStack}>
              <summary>错误详情</summary>
              <pre>{componentStack}</pre>
            </details>
          )}
        </div>
        <div className="error-actions">
          <button className="error-btn error-btn-primary" onClick={resetErrorBoundary}>
            <RotateCcw className="error-btn-icon" size={16} />
            重试
          </button>
          <button className="error-btn" onClick={handleGoHome}>
            <Home className="error-btn-icon" size={16} />
            返回首页
          </button>
          <button className="error-btn" onClick={handleReload}>
            <RefreshCw className="error-btn-icon" size={16} />
            重新加载页面
          </button>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundaryComponent({ children }: { children: ReactNode }) {
  const [componentStack, setComponentStack] = useState<string | undefined>(undefined)

  return (
    <ErrorBoundary
      FallbackComponent={(props) => <ErrorFallback {...props} componentStack={componentStack} />}
      onError={(error: unknown, info: ErrorInfo) => {
        const { message, stack } = error as Error // 错误信息
        const { componentStack } = info // 组件栈
        /** 1. 生产模式：上报错误 */
        reportError({ message, stack, componentStack })
        /** 2. UI 模式：保存组件栈 */
        setComponentStack(componentStack ?? undefined)
      }}
      onReset={() => {
        /** 重置组件栈 */
        setComponentStack(undefined)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

/** 错误上报 */
const reportError = (payload: any) => {
  // componentStack 是给前端开发者定位组件错误的（UI 更友好）
  // stack 是更低层信息（通常不适合直接展示在 UI）
  console.error('上报错误：', payload)
}
