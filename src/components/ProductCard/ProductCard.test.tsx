import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from './ProductCard'
import { mockProduct, mockOutOfStockProduct } from '../../data/products'

/**
 * Exercício 1 — ProductCard
 *
 * Nível de dificuldade: Intermediário (scaffolding parcial)
 * O render() já está feito em alguns casos. Você escreve as queries e assertions.
 *
 * Conceitos praticados:
 *  - screen.getByRole / screen.getByText
 *  - toBeInTheDocument()
 *  - Assertions negativas (.not.)
 *  - userEvent.click()
 *  - toHaveBeenCalledWith()
 *  - toBeDisabled()
 */

describe('ProductCard', () => {
  it('renderiza o nome do produto', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />)

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
  })

  it('renderiza o preço formatado em reais (R$)', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />)

    expect(screen.getByText('R$ 49,90')).toBeInTheDocument()
  })

  it('exibe o badge "Esgotado" quando o produto está fora de estoque', () => {
    render(<ProductCard product={mockOutOfStockProduct} onAddToCart={jest.fn()} />)

    expect(screen.getByText('Esgotado')).toBeInTheDocument()
  })

  it('não exibe o badge "Esgotado" quando o produto está em estoque', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />)

    expect(screen.queryByText('Esgotado')).not.toBeInTheDocument()
  })

  it('chama onAddToCart com o id correto ao clicar no botão', async () => {
    const onAddToCart = jest.fn()

    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)

    const botao = screen.getByRole('button', { name: /adicionar ao carrinho/i })
    await userEvent.click(botao)

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct.id)
  })

  it('o botão fica desabilitado quando o produto está fora de estoque', () => {
    render(<ProductCard product={mockOutOfStockProduct} onAddToCart={jest.fn()} />)

    const botao = screen.getByRole('button', { name: /adicionar ao carrinho/i })

    expect(botao).toBeDisabled()


    // TODO: encontre o botão "Adicionar ao Carrinho" e verifique que está desabilitado
    // Dica: use getByRole('button', { name: ... }) e o matcher toBeDisabled()
  })
})
