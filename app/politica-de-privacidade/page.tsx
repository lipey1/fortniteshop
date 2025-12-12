import Link from 'next/link'

export const metadata = {
  title: 'Política de Privacidade - Fortnite Shop',
  description: 'Política de Privacidade do Fortnite Shop',
}

export default function PrivacyPolicy() {
  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div style={{
          marginBottom: '2rem',
        }}>
          <Link 
            href="/"
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            ← Voltar para a Loja
          </Link>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '1rem',
          padding: '3rem',
          border: '1px solid var(--border)',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Política de Privacidade
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontSize: '0.9rem',
          }}>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--accent)',
            }}>
              Sobre o Site
            </h2>
            <p style={{
              color: 'var(--text-primary)',
              lineHeight: '1.8',
              marginBottom: '1rem',
            }}>
              O Fortnite Shop é um site informativo que exibe a loja diária do Fortnite. 
              Utilizamos uma API não oficial do Fortnite para obter os dados da loja.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--accent)',
            }}>
              Coleta de Dados
            </h2>
            <p style={{
              color: 'var(--text-primary)',
              lineHeight: '1.8',
              marginBottom: '1rem',
            }}>
              Não coletamos informações pessoais dos usuários. O site apenas exibe informações 
              públicas da loja do Fortnite obtidas através de uma API não oficial.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--accent)',
            }}>
              Cookies
            </h2>
            <p style={{
              color: 'var(--text-primary)',
              lineHeight: '1.8',
              marginBottom: '1rem',
            }}>
              Este site pode utilizar cookies básicos para melhorar a experiência de navegação. 
              Você pode desativar os cookies nas configurações do seu navegador.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--accent)',
            }}>
              API de Terceiros
            </h2>
            <p style={{
              color: 'var(--text-primary)',
              lineHeight: '1.8',
              marginBottom: '1rem',
            }}>
              Utilizamos uma API não oficial do Fortnite (fortnite-api.com) para obter os dados da loja. 
              Não somos responsáveis pelas práticas de privacidade ou disponibilidade desta API. 
              Este site não é afiliado à Epic Games ou ao Fortnite.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--accent)',
            }}>
              Alterações
            </h2>
            <p style={{
              color: 'var(--text-primary)',
              lineHeight: '1.8',
              marginBottom: '1rem',
            }}>
              Podemos atualizar esta política de privacidade periodicamente. 
              A data da última atualização está indicada no topo desta página.
            </p>
          </section>

          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <Link 
              href="/"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              ← Voltar para a Loja
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
