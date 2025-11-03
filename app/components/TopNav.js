export default function TopNav() {
  return (
    <nav className="top-nav">
      <div className="top-nav-content">
        <div className="top-nav-links">
          <span className="top-nav-link top-nav-link-here" data-tooltip="Я здесь">
            <span className="top-nav-dot"></span>
            ModrinthProxy
          </span>
          <a href="https://client.modrinth.black" className="top-nav-link" data-tooltip="Скачать Minecraft клиент и сервер всех версий">
            Клиент<span className="top-nav-separator">/</span>Сервер
          </a>
          <a href="https://rp.modrinth.black" className="top-nav-link" data-tooltip="Перепаковка защищённых ресурспаков">
            RP Перепак
          </a>
          <a href="https://jar.modrinth.black" className="top-nav-link" data-tooltip="Перевод плагинов онлайн (InJarTranslator)">
            Перевод Плагинов
          </a>
          <a href="https://dm.modrinth.black" className="top-nav-link" data-tooltip="Редактор DeluxeMenu и AbstractMenus">
            Редактор DeluxeMenu
          </a>
          <a href="https://ping.white-minecraft.net" className="top-nav-link" data-tooltip="Проверить доступность Minecraft серверов">
            Пинг Серверов
          </a>
        </div>
      </div>
    </nav>
  )
}
