
class RegisterForm {
  elements = {
    nameInput: () => cy.get('input[name="name"]'),
    valueInput: () => cy.get('input[name="value"]'),

    statusSelectTrigger: () => cy.get('#status-select-trigger'),
    categorySelectField: () => cy.get('#category-select-trigger')
  }

  typeName(text: string) {
    if (!text) return
    this.elements.nameInput().type(text)
  }

  typeValue(text: string) {
    if (!text) return
    this.elements.valueInput().type(text)
  }

  selectStatus(status: string) {
    this.elements.statusSelectTrigger().click()
    cy.get(`div[data-value="${status}"]`).click()
  }

  selectCategory(category: string) {
    this.elements.categorySelectField().click()
    cy.get(`div[data-value="${category}"]`).click()
  }
}

const registerForm = new RegisterForm()

describe('Cadastro de despesa', () => {
  
  it('Autenticar na plataforma', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('mhenrique.sousa43@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()

    cy.get('div[role="button"]').click()
  })
  
  describe('Tentar cadastrar uma despesa com valor inválido', () => {
    const input = {
      status: "Aberta",
      name: "Jantar com amigos",
      category: "Alimentação",
      value: "",
      date: "",
    }

  
    it(`Quando eu clicar no botão de status e selecionar a opção "${input.status}"`, () => {
      registerForm.selectStatus(input.status)
    })
    
    it(`E preencher o campo "Nome" com "${input.name}"`, () => {
      registerForm.typeName(input.name)
    })
    
    it('E preencher o campo "Valor" com ""', () => {
      registerForm.typeValue(input.value)
    })
    
    it(`Quando eu preencher o campo "Categoria" com "${input.category}"`, () => {
      registerForm.selectCategory(input.category)
    })

    it('E preencher o campo "Data" com ""')
    

    it('Então clico no botão "Salvar"')

    it('Então devo ver a mensagem "Por favor, insira um valor válido" acima do campo de valor')

    it('E devo ver a mensagem "Por favor, insira uma data válida" acima do campo de data')

    it('E os campos de valor e data devem exibir um ícone de aviso')
  })
})