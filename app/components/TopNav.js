export default function TopNav() {
  return (
    <nav className="top-nav">
      <div className="top-nav-content">
        <div className="top-nav-links">
          <a href="https://modrinth.white-minecraft.net" className="top-nav-link top-nav-link-here">
            <span className="top-nav-dot"></span>
            ModrinthProxy
          </a>
          <a href="https://client.white-minecraft.net" className="top-nav-link">
            Клиент<span className="top-nav-separator">/</span>Сервер
          </a>
          <a href="https://dm.white-minecraft.net" className="top-nav-link">
            Редактор DeluxeMenu
          </a>
        </div>
      </div>
    </nav>
  )
}

