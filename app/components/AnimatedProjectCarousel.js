'use client'

import Link from 'next/link'

const AnimatedProjectCarousel = () => {

  const row1Projects = [
    { id: 'rko-utility-mod', name: 'Rko Utility Mod', description: 'just a simple utility mod', icon: 'https://cdn.modrinth.com/data/tIYAxNfc/03c8a69709cb4e59eda1ab1149418443ea991d9a_96.webp', type: 'mod', slug: 'rko-utility-mod', color: 'from-yellow-500 to-orange-500' },
    { id: 'awesome-pottery-sherds', name: 'Awesome Pottery Sherds', description: 'Makes pottery sherds look good', icon: 'https://cdn.modrinth.com/data/tGpUg7y2/e1e5e9bb987d6d795f0e907d470ded424f529459_96.webp', type: 'resourcepack', slug: 'awesome-pottery-sherds', color: 'from-purple-500 to-pink-500' },
    { id: 'timesword', name: 'Time Sword', description: 'A sword that lets you control time', icon: 'https://cdn.modrinth.com/data/tIUJ4Oij/1eae6be14ec5d60e2b4cd9e11cfd5c927b8a053d.png', type: 'mod', slug: 'timesword', color: 'from-red-500 to-orange-500' },
    { id: 'zombie-horses-from-abandoned-villages', name: 'Zombie Horses From Abandoned Villages', description: 'Zombie Horses spawn in the animal pens of Zombie Villages instead of normal animals', icon: 'https://cdn.modrinth.com/data/tHIgRTL7/9d10848a32a8454f162128b14e1a00207725aa42_96.webp', type: 'mod', slug: 'zombie-horses-from-abandoned-villages', color: 'from-blue-500 to-cyan-500' },
    { id: 'horrorbrew-hysteria', name: 'Horrorbrew Hysteria', description: 'A Minecraft mod mainly based around Horrorbrews (and Mario\'s Madness)', icon: 'https://cdn.modrinth.com/data/tGFzejyY/d3e7bbe96c9f8b19ab672cb5f117617d61f1d7b3.png', type: 'mod', slug: 'horrorbrew-hysteria', color: 'from-green-500 to-teal-500' },
    { id: 'creeper-refreshedfa', name: 'Creeper Recrafted:FA', description: 'This resource pack makes the creeper look more plant/moss like but with Fresh Animations', icon: 'https://cdn.modrinth.com/data/tGJ0zjx8/4b5a363c59941fd1b6e4bffd45b13be0cf22ace8_96.webp', type: 'resourcepack', slug: 'creeper-refreshedfa', color: 'from-indigo-500 to-purple-500' },
    { id: 'eye-blocks', name: 'Eye Blocks', description: 'Eye building blocks for Minecraft', icon: 'https://cdn.modrinth.com/data/tHDGQzOO/aded937e4bf683e5f93ada0e797ad25ed526b178.png', type: 'mod', slug: 'eye-blocks', color: 'from-green-500 to-teal-500' },
    { id: 'betterendbetternether-create-recipe-compat', name: 'BetterEnd/BetterNether - Create Recipe Compat', description: 'adds mechanical saw recipes for BetterEnd/BetterNether logs', icon: 'https://cdn.modrinth.com/data/tHWWE4mi/9c83c71ce08afd3f76aa1c2f3c1e3fa586f37aec_96.webp', type: 'mod', slug: 'betterendbetternether-create-recipe-compat', color: 'from-purple-500 to-indigo-500' },
    { id: 'postplaceholderapi', name: 'PostPlaceholderAPI', description: 'Get placeholders using get requests', icon: 'https://cdn.modrinth.com/data/tGfdeRqJ/44902230feaace2bbcff31a30131758fb4f14456.png', type: 'mod', slug: 'postplaceholderapi', color: 'from-orange-500 to-red-500' },
    { id: 'academicals', name: 'Academicals', description: 'Making armor into academicals (academic costumes). Made by gfdsggafg.', icon: 'https://cdn.modrinth.com/data/tIEKJv1f/14ee7bbe32458bfe04d5d6d53e5ae9648111a575.png', type: 'resourcepack', slug: 'academicals', color: 'from-red-500 to-pink-500' },
    { id: 'technology-tacio-477', name: 'Stressed Technology- Tacio Ind', description: 'This Tacio Industries modpack offers many mods that improve atomization and overall gameplay', icon: 'https://cdn.modrinth.com/data/tIW9896L/a6e23583770473a2f5f8058737b1c56887500df6_96.webp', type: 'modpack', slug: 'technology-tacio-477', color: 'from-amber-500 to-yellow-500' },
    { id: 'hellium', name: 'Hellium', description: 'Hellium is a Light-weight, Well Researched FPS Boosting Modpack. Curated by Skybula.', icon: 'https://cdn.modrinth.com/data/tGbDQfZP/9b7b0ca35b895ccfdffdb41b6f2f558a7d6f638f_96.webp', type: 'modpack', slug: 'hellium', color: 'from-cyan-500 to-blue-500' },
    { id: 'feedme', name: 'FeedMe', description: 'A simple plugin that allows you to use a command to refill your hunger instead of eating food!', icon: 'https://cdn.modrinth.com/data/tIlpfpzu/5cf4bf87caaf73bd6bb76623f486f0d73c82f4c1_96.webp', type: 'mod', slug: 'feedme', color: 'from-green-500 to-lime-500' },
    { id: 'detail-armor-bar-re-equipment', name: 'Detail Armor Bar Re-equipment', description: 'The detail armor bar adds more information to the armor bar.', icon: 'https://cdn.modrinth.com/data/tIjpvPBH/3f336a56e895dac48118d89866edd6bca525355b.png', type: 'mod', slug: 'detail-armor-bar-re-equipment', color: 'from-blue-500 to-cyan-500' }
  ]

  const row2Projects = [
    { id: 'more-recipes-undo-quartz-block', name: 'More Recipes: Undo Quartz Block', description: 'Uncraft Quartz Block to Nether Quartz.', icon: 'https://cdn.modrinth.com/data/tIandZiy/af0df36f804aeb670d22219bf328549e446a1ea7_96.webp', type: 'mod', slug: 'more-recipes-undo-quartz-block', color: 'from-green-500 to-emerald-500' },
    { id: 'mash-up-addon', name: 'Mash-Up Addon', description: 'An addon that adds all the Mash-Up worlds into Legacy4J!', icon: 'https://cdn.modrinth.com/data/tGogOrip/b90f33e9183f1e9c60326bf76fe4ef36fc544dd0_96.webp', type: 'resourcepack', slug: 'mash-up-addon', color: 'from-pink-500 to-rose-500' },
    { id: 'persistent-pearls', name: 'Persistent Pearls', description: 'Prevent Ender Pearls from despawning when their owner dies, making stasis chambers more viable.', icon: 'https://cdn.modrinth.com/data/tGM9405E/fc7c63b8e7d27468f650298b7bbcdd2b4bc44bbf.png', type: 'mod', slug: 'persistent-pearls', color: 'from-orange-500 to-red-500' },
    { id: 'necessities-mod', name: 'Necessities', description: 'Essentials like teleportation, time, weather, nicknames, and more for better server management.', icon: 'https://cdn.modrinth.com/data/tHmlPJQE/b3db4f67b08afa00cafa27d1570b76a7cac1c756_96.webp', type: 'mod', slug: 'necessities-mod', color: 'from-amber-500 to-yellow-500' },
    { id: 'migration-on-distortion', name: 'Migration On Distortion', description: 'Migration On Distortion is a build aimed at realism and preserving most vanilla mechanics and adding new ones', icon: 'https://cdn.modrinth.com/data/tI72zO10/2a0fed1e95b65e28dc2d2eff469195b35f05c122_96.webp', type: 'modpack', slug: 'migration-on-distortion', color: 'from-cyan-500 to-blue-500' },
    { id: 'simply-refreshed', name: 'Simply Refreshed', description: 'A modpack designed to add more to the game while keeping the same vanilla like feel!', icon: 'https://cdn.modrinth.com/data/tIVGVUx8/76a9582a88050da7db63205895dab8cb067a2832_96.webp', type: 'modpack', slug: 'simply-refreshed', color: 'from-teal-500 to-green-500' },
    { id: 'steel-block-mod', name: 'Steel-Block-mod', description: 'This mod adds a new steel block to expand your block inventory. (this mod only contains one new block)', icon: 'https://cdn.modrinth.com/data/tH68LPRm/e031bcd3aa947e25bb4b66b71a2ecf3e12ff880c_96.webp', type: 'mod', slug: 'steel-block-mod', color: 'from-blue-500 to-purple-500' },
    { id: 'commandtokens', name: 'CommandTokens', description: 'Configurable \'token\' items that run commands when held and right clicked. Useful for servers.', icon: 'https://cdn.modrinth.com/data/tH3Vm2RA/25db2cf45e1e9e50df4f4c5be90e80b21e552576_96.webp', type: 'mod', slug: 'commandtokens', color: 'from-amber-500 to-yellow-500' },
    { id: 'immersiveengineering', name: 'Immersive Engineering', description: 'Retrofuturism, industry and multiblocks!', icon: 'https://cdn.modrinth.com/data/tIm2nV03/icon.png', type: 'mod', slug: 'immersiveengineering', color: 'from-green-500 to-lime-500' },
    { id: 'pick-me-up!', name: 'Pick Me Up!', description: 'With this mod you can pick up any mob in the game even ones bigger than you..', icon: 'https://cdn.modrinth.com/data/tIAIS85X/4da000ea702195f353b76c6fbd357e6d2f50205e_96.webp', type: 'mod', slug: 'pick-me-up!', color: 'from-red-500 to-pink-500' },
    { id: 'cross-totems', name: 'Cross totems', description: 'Replaces the totem with an Orthodox cross and the sound of using the totem', icon: 'https://cdn.modrinth.com/data/tH8IzFOc/2527523c521cfaa2da5a3b025792bfa450d77b1d.png', type: 'resourcepack', slug: 'cross-totems', color: 'from-purple-500 to-indigo-500' },
    { id: 'vanilla-tweaks-apple-skin-cake-hunger-bar', name: 'Vanilla tweaks apple skin cake hunger bar', description: 'Addon for Cake hunger bar from vanilla tweaks website, which adds compatibility with Apple skin', icon: 'https://cdn.modrinth.com/data/tIU4a2l1/6763c12149b99616f84ca4d8390762020a12a282_96.webp', type: 'resourcepack', slug: 'vanilla-tweaks-apple-skin-cake-hunger-bar', color: 'from-indigo-500 to-blue-500' },
    { id: 'ptrlib', name: 'PTRLib', description: 'A craftstudio importer and rendering library.', icon: 'https://cdn.modrinth.com/data/tIKBCqVe/icon.png', type: 'mod', slug: 'ptrlib', color: 'from-cyan-500 to-teal-500' }
  ]

  const row3Projects = [
    { id: 'wet-socks', name: 'Wet Socks DataPack', description: 'A datapack that adds one thing: Socks that can get wet and provide some advantages', icon: 'https://cdn.modrinth.com/data/tGxfKokm/7c5968720b7f41557d892a026bc01c5bbe554556.png', type: 'mod', slug: 'wet-socks', color: 'from-blue-500 to-purple-500' },
    { id: 'toastys-music-and-disc-pack', name: 'Toasty\'s Music and Disc Pack', description: 'Replaces almost all music in the game', icon: 'https://cdn.modrinth.com/data/tGxDfrV1/54d782fdb6c4a8a8345d7000bed373a9ad5a45d1_96.webp', type: 'resourcepack', slug: 'toastys-music-and-disc-pack', color: 'from-red-500 to-orange-500' },
    { id: 'devs-better-armor-icons-gold-edition', name: 'Dev\'s Better Armor Icons - Gold Edition', description: 'A resource-pack that reworks the armor bar icons.', icon: 'https://cdn.modrinth.com/data/tHVJwG08/554d4510343607eeaab14a47c4f5f66fa9a541d9_96.webp', type: 'resourcepack', slug: 'devs-better-armor-icons-gold-edition', color: 'from-purple-500 to-indigo-500' },
    { id: 'blossomback', name: 'BlossomBack', description: 'Blossom-series /back command and utilities', icon: 'https://cdn.modrinth.com/data/tHwJbPJm/icon.png', type: 'mod', slug: 'blossomback', color: 'from-red-600 to-pink-500' },
    { id: 'bear-traps', name: 'Bear Traps', description: 'Adds Bear Traps to the game, they can be used to damage mobs that step on them and keep them in place', icon: 'https://cdn.modrinth.com/data/tH5q1h9a/40eb2fa6a9e70348fc69c7a7145d73becf6eee47_96.webp', type: 'mod', slug: 'bear-traps', color: 'from-green-600 to-blue-500' },
    { id: 'quiche-smp2', name: 'Quiche SMP2', description: 'Custom Tweaks for the Quiche SMP2. Hosted by AlexisTheGeek.', icon: 'https://cdn.modrinth.com/data/tH3bj48p/49a97b56541b9b58bf3cd65722de52c1ee6ab510.png', type: 'mod', slug: 'quiche-smp2', color: 'from-stone-500 to-gray-600' },
    { id: 'zen-font', name: 'Zen Font', description: 'A Crisp & Clear Font', icon: 'https://cdn.modrinth.com/data/tGPo774G/f8e7ea3564988eb84de65766cd1ded6c7461e900_96.webp', type: 'resourcepack', slug: 'zen-font', color: 'from-amber-600 to-orange-500' },
    { id: 'rautopickup', name: 'rAutoPickup', description: 'system to add blocks to your inventory', icon: 'https://cdn.modrinth.com/data/tGJaBa5M/5793d299f928b1418380605f45ee2b8c64baffaa_96.webp', type: 'mod', slug: 'rautopickup', color: 'from-cyan-500 to-teal-500' },
    { id: 'unusual-prehistory-forge', name: 'Unusual Prehistory', description: 'A mod that focuses adding in a wide variety of prehistoric animals and features into Minecraft\'s world!', icon: 'https://cdn.modrinth.com/data/tHu3oHNo/bd57c516d86e6fda2ddf3bdaf55d8ee621141653_96.webp', type: 'mod', slug: 'unusual-prehistory-forge', color: 'from-red-500 to-rose-500' },
    { id: 'betteranimations', name: 'King\'s Better Animations', description: 'Uses KosmX\'s Player Animation mod and GeckoLib to add in better animations', icon: 'https://cdn.modrinth.com/data/tHdAF0Io/bb11d5471097df242a5dafbbfafacf87ae64507c_96.webp', type: 'mod', slug: 'betteranimations', color: 'from-indigo-500 to-blue-500' },
    { id: 'herobrine-data-pack', name: 'Herobrine Data Pack', description: 'Adds Herobrine into your Minecraft world.', icon: 'https://cdn.modrinth.com/data/tIpM8Nei/8fa0ff84fde477028a4e2ead00cf8012e01b0d3c_96.webp', type: 'mod', slug: 'herobrine-data-pack', color: 'from-orange-500 to-red-500' },
    { id: 'survicadopack', name: 'OhioCraft Pack', description: 'Light adventure modpack made in Ohio', icon: 'https://cdn.modrinth.com/data/tIhfsDLv/4ee7356f59955b0614f353a86373fb0d08c4a408_96.webp', type: 'modpack', slug: 'survicadopack', color: 'from-teal-500 to-green-500' }
  ]

  const manyRow1 = Array(20).fill(row1Projects).flat()
  const manyRow2 = Array(20).fill(row2Projects).flat()
  const manyRow3 = Array(20).fill(row3Projects).flat()

  return (
    <div className="relative py-12">
      <div className="full-bleed overflow-hidden">
        <div className="flex animate-scroll-left gap-6">
          {manyRow1.map((project, index) => (
            <div key={`row1-${index}`} className="flex-shrink-0">
            <Link
              href={`/${project.type}/${project.slug}`}
                className="group relative block w-72 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-5 rounded-2xl border border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 flex-shrink-0">
                  <img 
                    src={project.icon} 
                    alt={project.name} 
                    className="w-full h-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-modrinth-green transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </div>
        ))}
        </div>
      </div>

      <div className="full-bleed overflow-hidden mt-8">
        <div className="flex animate-scroll-right gap-6">
          {manyRow2.map((project, index) => (
            <div key={`row2-${index}`} className="flex-shrink-0">
            <Link
              href={`/${project.type}/${project.slug}`}
                className="group relative block w-72 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-5 rounded-2xl border border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 flex-shrink-0">
                  <img 
                    src={project.icon} 
                    alt={project.name} 
                    className="w-full h-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-modrinth-green transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </div>
        ))}
        </div>
      </div>

      <div className="full-bleed overflow-hidden mt-8">
        <div className="flex animate-scroll-left gap-6">
          {manyRow3.map((project, index) => (
            <div key={`row3-${index}`} className="flex-shrink-0">
            <Link
              href={`/${project.type}/${project.slug}`}
                className="group relative block w-72 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-5 rounded-2xl border border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 flex-shrink-0">
                  <img 
                    src={project.icon} 
                    alt={project.name} 
                    className="w-full h-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-modrinth-green transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedProjectCarousel