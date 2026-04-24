import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Cart } from './Cart'
import { mockCartItems } from '../../data/products'

describe('Cart', () => {
  it('exibe a mensagem "Seu carrinho está vazio" quando não há itens', () => {
    render(<Cart items={[]} onRemove={jest.fn()} />)

    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument()
  })

  it('renderiza todos os itens do carrinho', () => {
    render(<Cart items={mockCartItems} onRemove={jest.fn()} />)

    expect(screen.getByText('Camiseta Básica')).toBeInTheDocument()
    expect(screen.getByText('Tênis Esportivo')).toBeInTheDocument()
  })

  it('exibe o total correto somando os itens', () => {
    render(<Cart items={mockCartItems} onRemove={jest.fn()} />)

    expect(screen.getByText(/299,70/)).toBeInTheDocument()
  })

  it('chama onRemove com o id correto ao clicar em "Remover"', async () => {
    const onRemove = jest.fn()

    render(<Cart items={mockCartItems} onRemove={onRemove} />)

    const botoes = screen.getAllByRole('button', { name: /remover/i })

    await userEvent.click(botoes[0])

    expect(onRemove).toHaveBeenCalledWith(1)
  })

  it('não exibe o total quando o carrinho está vazio', () => {
    render(<Cart items={[]} onRemove={jest.fn()} />)

    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })
})