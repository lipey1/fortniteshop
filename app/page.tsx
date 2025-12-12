import ShopDisplay from '@/components/ShopDisplay'
import Timer from '@/components/Timer'

async function getShopData() {
    try {
        // API pública do Fortnite - não requer chave
        const res = await fetch('https://fortnite-api.com/v2/shop', {
            next: { revalidate: 300 } // Revalida a cada 5 minutos
        })

        if (!res.ok) {
            throw new Error('Failed to fetch shop data')
        }

        const data = await res.json()
        // Debug: log da estrutura da API (remover em produção)
        if (process.env.NODE_ENV === 'development') {
            console.log('API Response Structure:', JSON.stringify(data, null, 2).substring(0, 500))
        }
        return data
    } catch (error) {
        console.error('Error fetching shop data:', error)
        return null
    }
}

export default async function Home() {
    const shopData = await getShopData()

    return (
        <main style={{
            minHeight: '100vh',
            padding: '2rem',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                <header style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Fortnite Item Shop
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                    }}>
                        Loja Diária de Hoje
                    </p>
                    <Timer />
                </header>

                {shopData && shopData.data ? (
                    <ShopDisplay shopData={shopData.data} />
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        background: 'var(--bg-card)',
                        borderRadius: '1rem',
                        border: '1px solid var(--border)',
                    }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Não foi possível carregar os dados da loja. Tente novamente mais tarde.
                        </p>
                    </div>
                )}
            </div>
        </main>
    )
}

