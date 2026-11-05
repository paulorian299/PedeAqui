
import { useState } from 'react';

const produtosIniciais = [
  { id: 1, nome: 'Hambúrguer Clássico', descricao: 'Pão, carne, queijo e salada', preco: 22.90, emoji: '🍔' },
  { id: 2, nome: 'Pizza de Calabresa', descricao: 'Calabresa, queijo e molho especial', preco: 39.90, emoji: '🍕' },
  { id: 3, nome: 'Batata Frita', descricao: 'Porção crocante', preco: 16.00, emoji: '🍟' },
  { id: 4, nome: 'Refrigerante', descricao: 'Lata 350ml', preco: 6.00, emoji: '🥤' }
];

export default function App() {
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [carrinho, setCarrinho] = useState([]);
  const [restaurante, setRestaurante] = useState('Meu Restaurante');
  const [cor, setCor] = useState('#f97316');
  const [pagina, setPagina] = useState('loja');

  function adicionar(produto) {
    setCarrinho(atual => {
      const existe = atual.find(item => item.id === produto.id);
      if (existe) {
        return atual.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...atual, { ...produto, quantidade: 1 }];
    });
  }

  function remover(id) {
    setCarrinho(atual =>
      atual.filter(item => item.id !== id)
    );
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  return (
    <div style={{ '--cor': cor }} className="aplicativo">
      <header>
        <h1>🎁 GiftHub</h1>
        <span>{restaurante}</span>
      </header>

      <nav>
        <button onClick={() => setPagina('loja')}>Loja</button>
        <button onClick={() => setPagina('painel')}>Painel</button>
        <button onClick={() => setPagina('produtos')}>Produtos</button>
        <button onClick={() => setPagina('carrinho')}>
          Carrinho ({carrinho.reduce((s, i) => s + i.quantidade, 0)})
        </button>
      </nav>

      <main>
        {pagina === 'loja' && (
          <>
            <section className="banner">
              <h2>{restaurante}</h2>
              <p>Seu pedido favorito está aqui!</p>
            </section>

            <h2>Nosso cardápio</h2>

            <div className="produtos">
              {produtos.map(produto => (
                <article className="produto" key={produto.id}>
                  <div className="emoji">{produto.emoji}</div>
                  <h3>{produto.nome}</h3>
                  <p>{produto.descricao}</p>
                  <strong>
                    {produto.preco.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </strong>
                  <button onClick={() => adicionar(produto)}>
                    Adicionar ao carrinho
                  </button>
                </article>
              ))}
            </div>
          </>
        )}

        {pagina === 'carrinho' && (
          <section>
            <h2>Meu carrinho</h2>
            {carrinho.map(item => (
              <article className="item-carrinho" key={item.id}>
                <span>{item.emoji} {item.nome} x {item.quantidade}</span>
                <button onClick={() => remover(item.id)}>Remover</button>
              </article>
            ))}
            <h3>Total: {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}</h3>
            <button onClick={() => alert('Finalização de pedido será integrada na próxima etapa.')}>
              Finalizar pedido
            </button>
          </section>
        )}

        {pagina === 'painel' && (
          <section className="painel">
            <h2>Painel administrativo</h2>
            <p>Gerencie a identidade da sua loja.</p>
            <label>Nome do restaurante</label>
            <input
              value={restaurante}
              onChange={e => setRestaurante(e.target.value)}
            />
            <label>Cor da loja</label>
            <input
              type="color"
              value={cor}
              onChange={e => setCor(e.target.value)}
            />
          </section>
        )}

        {pagina === 'produtos' && (
          <section>
            <h2>Gerenciar produtos</h2>
            <button onClick={() => {
              const nome = prompt('Nome do produto:');
              if (!nome?.trim()) return;
              const preco = Number(prompt('Preço do produto:'));
              if (!Number.isFinite(preco) || preco <= 0) return;
              setProdutos(atual => [
                ...atual,
                {
                  id: Date.now(),
                  nome,
                  descricao: 'Produto da loja',
                  preco,
                  emoji: '🍽️'
                }
              ]);
            }}>
              + Novo produto
            </button>

            {produtos.map(produto => (
              <article className="item-carrinho" key={produto.id}>
                <span>{produto.emoji} {produto.nome}</span>
                <button onClick={() =>
                  setProdutos(atual =>
                    atual.filter(p => p.id !== produto.id)
                  )
                }>
                  Excluir
                </button>
              </article>
            ))}
          </section>
        )}
      </main>

      <footer>GiftHub © 2026 - Seu delivery, sua marca.</footer>
    </div>
  );
}
