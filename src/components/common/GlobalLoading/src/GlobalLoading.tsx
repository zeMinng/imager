import './GlobalLoading.scss'

const appTitle = import.meta.env.VITE_APP_TITLE

export const GlobalLoadingComponent: React.FC = () => {
  return (
    <div className="global-loading">
      <div className="global-loading__container">
        <div className="global-loading__spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <div className="global-loading__title">{appTitle}</div>
        <div className="global-loading__subtitle">正在加载中...</div>
      </div>
      <div className="global-loading__background"></div>
    </div>
  )
}
