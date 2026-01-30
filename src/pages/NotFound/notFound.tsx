import { useNavigate } from 'react-router-dom'
import { FileQuestion, Home, ArrowRight, Layers } from 'lucide-react'
import './notFound.scss'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="notfound-container">
      {/* 背景装饰 */}
      <div className="notfound__decoration">
        <Layers size={300} />
      </div>

      <div className="notfound__content">
        {/* 错误图标 */}
        <div className="notfound__icon">
          <FileQuestion size={80} />
        </div>

        {/* 错误代码 */}
        <div className="notfound__code" aria-label="404 错误">
          404
        </div>

        {/* 标题 */}
        <h1 className="notfound__title">页面找不到了</h1>

        {/* 描述 */}
        <p className="notfound__description">
          抱歉，你访问的页面不存在、已被删除或暂时无法访问
          <br />
          请检查网址是否正确，或尝试其他操作
        </p>

        {/* 操作按钮 */}
        <div className="notfound__actions">
          <button
            className="notfound__btn notfound__btn--primary"
            onClick={() => navigate('/', { replace: true })}
          >
            <Home size={18} />
            <span>回到首页</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
