import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckoutForm } from './CheckoutForm'

describe('CheckoutForm', () => {
  it('renderiza todos os campos do formulário', () => {
    render(<CheckoutForm onSubmit={jest.fn()} />)

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()
  })

  it('exibe erro quando o nome está vazio ao tentar submeter', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: /finalizar/i }))

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
  })

  it('exibe erro quando o e-mail é inválido', async () => {
    render(<CheckoutForm onSubmit={jest.fn()} />)

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'nao-é-email')
    await userEvent.click(screen.getByRole('button', { name: /finalizar/i }))

    expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
  })

  it('exibe erro quando o CEP tem menos de 8 dígitos', async () => {
    render(<CheckoutForm onSubmit={jest.fn()} />)

    await userEvent.type(screen.getByLabelText(/cep/i), '1234')
    await userEvent.click(screen.getByRole('button', { name: /finalizar/i }))

    expect(screen.getByText('CEP deve ter 8 dígitos')).toBeInTheDocument()
  })

  it('chama onSubmit com os dados corretos quando o formulário é válido', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText(/nome/i), 'Onofre Augusto')
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'onofre@email.com')
    await userEvent.type(screen.getByLabelText(/cep/i), '36770000')

    await userEvent.click(screen.getByRole('button', { name: /finalizar/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      nome: 'Onofre Augusto',
      email: 'onofre@email.com',
      cep: '36770000',
    })
  })

  it('não chama onSubmit quando há erros de validação', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: /finalizar/i }))

    expect(onSubmit).not.toHaveBeenCalled()
  })
})