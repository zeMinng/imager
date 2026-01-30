import './Footer.scss'

const APP_NAME = import.meta.env.VITE_APP_TITLE || 'Imager'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span className="copyright">
          &copy; {currentYear > 2026 ? '2026-' + currentYear : currentYear} {' '}
          <a href="https://github.com/zeMinng/imager" target="_blank" rel="noopener noreferrer">{APP_NAME}</a>
          , Inc. All rights reserved
        </span>
        <span className="separator">·</span>
        <span className="author">
          Created by{' '}
          <a href="https://github.com/zeMinng" target="_blank" rel="noopener noreferrer">
            zeMinng
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
