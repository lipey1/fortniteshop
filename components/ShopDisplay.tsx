'use client'

import Image from 'next/image'

interface Item {
  id?: string
  name?: string
  description?: string
  type?: {
    value?: string
    displayValue?: string
  }
  rarity?: {
    value?: string
    displayValue?: string
  }
  images?: {
    icon?: string
    featured?: string
    background?: string
    smallIcon?: string
  }
}

interface ShopEntry {
  offerId?: string
  devName?: string
  offerType?: string
  prices?: Array<{
    currencyType: string
    currencySubType?: string
    regularPrice: number
    finalPrice: number
    saleExpiration?: string
    basePrice: number
  }>
  categories?: string[]
  dailyLimit?: number
  weeklyLimit?: number
  monthlyLimit?: number
  items?: Item[]
  brItems?: Item[] // Algumas APIs usam brItems em vez de items
  finalPrice?: number
  regularPrice?: number
}

interface ShopData {
  featured?: {
    entries: ShopEntry[]
  }
  daily?: {
    entries: ShopEntry[]
  }
  entries?: ShopEntry[] // Para estrutura plana da API
}

const rarityColors: { [key: string]: string } = {
  common: 'var(--rarity-common)',
  uncommon: 'var(--rarity-uncommon)',
  rare: 'var(--rarity-rare)',
  epic: 'var(--rarity-epic)',
  legendary: 'var(--rarity-legendary)',
}

function getRarityColor(rarity: string): string {
  return rarityColors[rarity.toLowerCase()] || rarityColors.common
}

export default function ShopDisplay({ shopData }: { shopData: ShopData }) {
  // Se a API retornar featured/daily separados, use-os
  // Caso contrário, se houver entries plano, categorize-os
  let featuredItems: ShopEntry[] = []
  let dailyItems: ShopEntry[] = []

  if (shopData.featured?.entries && shopData.daily?.entries) {
    // Estrutura com featured e daily separados
    featuredItems = shopData.featured.entries
    dailyItems = shopData.daily.entries
  } else if (shopData.entries) {
    // Estrutura plana - categorizar baseado em categories ou offerType
    shopData.entries.forEach(entry => {
      // Se tiver "featured" nas categories ou offerType, é destaque
      const isFeatured = entry.categories?.some(cat => 
        cat.toLowerCase().includes('featured')
      ) || entry.offerType?.toLowerCase().includes('featured')
      
      if (isFeatured) {
        featuredItems.push(entry)
      } else {
        dailyItems.push(entry)
      }
    })
  } else {
    // Fallback: tentar usar featured/daily mesmo que vazios
    featuredItems = shopData.featured?.entries || []
    dailyItems = shopData.daily?.entries || []
  }

  const renderEntry = (entry: ShopEntry) => {
    // Verifica se há items ou brItems (dependendo da estrutura da API)
    const items = entry.items || entry.brItems || []
    if (!items || items.length === 0) return null
    
    // Pega o primeiro item da oferta (geralmente há apenas um)
    const mainItem = items[0]
    if (!mainItem) return null

    const rarity = mainItem.rarity?.value || mainItem.rarity?.displayValue?.toLowerCase() || 'common'
    const rarityColor = getRarityColor(rarity)

    return (
      <div
        key={entry.offerId || Math.random().toString()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '1rem',
          overflow: 'hidden',
          border: `2px solid ${rarityColor}`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)'
          e.currentTarget.style.boxShadow = `0 10px 30px ${rarityColor}40`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          background: `linear-gradient(135deg, ${rarityColor}20 0%, ${rarityColor}05 100%)`,
        }}>
          {(mainItem.images?.featured || mainItem.images?.icon || mainItem.images?.smallIcon) && (
            <Image
              src={mainItem.images?.featured || mainItem.images?.icon || mainItem.images?.smallIcon || ''}
              alt={mainItem.name || 'Item'}
              fill
              style={{ objectFit: mainItem.images?.featured ? 'cover' : 'contain', padding: mainItem.images?.featured ? '0' : '1rem' }}
              unoptimized
            />
          )}
          {!mainItem.images?.featured && !mainItem.images?.icon && !mainItem.images?.smallIcon && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--text-secondary)',
            }}>
              Sem imagem
            </div>
          )}
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            {mainItem.type?.displayValue || 'Item'}
          </div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: rarityColor,
          }}>
            {mainItem.name || 'Item sem nome'}
          </h3>
          {mainItem.description && (
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginBottom: '1rem',
              lineHeight: '1.4',
            }}>
              {mainItem.description}
            </p>
          )}
          {items.length > 1 && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.5rem',
            }}>
              +{items.length - 1} item{items.length > 2 ? 's' : ''} adicional{items.length > 2 ? 'is' : ''}
            </div>
          )}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: 'var(--accent)',
              }}>
                {entry.finalPrice || entry.regularPrice || entry.prices?.[0]?.finalPrice || 'N/A'}
              </span>
              <span style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
              }}>
                V-Bucks
              </span>
            </div>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.75rem',
              background: `${rarityColor}30`,
              color: rarityColor,
              borderRadius: '1rem',
              border: `1px solid ${rarityColor}`,
            }}>
              {mainItem.rarity?.displayValue || 'Comum'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {featuredItems.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            ⭐ Destaques
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {featuredItems.map(renderEntry)}
          </div>
        </section>
      )}

      {dailyItems.length > 0 && (
        <section>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            🎯 Diário
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {dailyItems.map(renderEntry)}
          </div>
        </section>
      )}

      {featuredItems.length === 0 && dailyItems.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'var(--bg-card)',
          borderRadius: '1rem',
          border: '1px solid var(--border)',
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Nenhum item disponível na loja no momento.
          </p>
        </div>
      )}
    </div>
  )
}

