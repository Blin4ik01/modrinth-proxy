import versionsData from './mcVersions.json'

class MinecraftVersions {
  constructor(data) {
    this.release = data.release
    this.full = data.full
  }

  getRelease() {
    return [...this.release]
  }

  getFull() {
    return [...this.full]
  }

  getAll() {
    return {
      release: this.getRelease(),
      full: this.getFull()
    }
  }
}

const mcVersions = new MinecraftVersions(versionsData)

export const MC_VERSIONS_RELEASE = mcVersions.getRelease()
export const MC_VERSIONS_FULL = mcVersions.getFull()
