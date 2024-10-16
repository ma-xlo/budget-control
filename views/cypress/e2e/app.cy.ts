
class RegisterForm {
  elements = {
    nameInput: () => cy.get('input[name="name"]'),
    valueInput: () => cy.get('input[name="value"]'),

    statusSelectTrigger: () => cy.get('#status-select-trigger'),


    categorySelectTrigger: () => cy.get('#category-select-trigger'),
    dueDataSelectTrigger: () => cy.get('#due-date-select-trigger'),

    submitButton: () => cy.get('#submit-add-expense')
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
    this.elements.categorySelectTrigger().click()
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
      value: "",
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
    
    it(`E não selecionar nenhuma categoria`, () => {
      registerForm.elements.categorySelectTrigger().click()
    })
    
    it('Então clico no botão "Salvar"', () => {
      registerForm.elements.submitButton().click()
    })

    it('Então devo ver a mensagem "É necessário preencher o valor" abaixo do campo de valor', () => {
      registerForm.elements.valueInput().parent().find('div').find('span').find('p').should('have.text', 'É necessário preencher o valor')
    })

    it('E devo ver a mensagem "É necessário selecionar uma categoria" abaixo do campo de categoria', () => {
      registerForm.elements.categorySelectTrigger().parent().find('div').find('span').find('p').should('have.text', 'É necessário selecionar uma categoria')
    })
  })
})