//arquivo criado com as explicações
import { test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
//Passando yarn playwright test nomesuite consigo executar apenas a suite
//Passar dentro do arqgumento page o comando request que é o objeto que meda acesso em requisição HTTP em apis

test('Deve poder cadastrar uma nova tarefa', async ({ page, request }) => {
    
    const task: TaskModel = {
        name: 'Ler um livro de TypeScript',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + task.name)
    await page.goto('http://localhost:3000/')
    //fill é a função que preenche um campo, e recebe dois argumentos
    //o primeiro é localizador e o segundo é o valor que eu quero usar
    //await page.fill('#newTask', 'Ler um livro de TypeScript')
    //outras possibilidades de localizador
    //input[placeholder="Add a new Task"]
    //input[type=text]
    //input[class*=InputNewTask]
    //locator -> Recebe um localizador não uso await porque não é um step que tenha promessa de fazel algo
    const inputTaskName = page.locator('#newTask')
    await inputTaskName.fill(task.name)
    //.press é uma função que simular uma tecla do teclado no caso o enter.
    //await inputTaskName.press('Enter')
    //await page.click('//button[contains(text(), “Create”)]')
    //recurso exclusivo do playwright
    await page.click('css=button >> text=Create')
    //npmjs.com -> possui todos os pacotes feito em node
    //getByTestId -> função para buscar elemento pelo data-testid
    //const target = page.getByTestId('tast-item')
    //await expect(target).toHaveText()
    //usando a class quando não tem data-testid
    //const target = page.locator('.task-item')
    //await expect(target).toHaveText(taskName)
    //Só funciona quando tem apenas um item
    const target = page.locator(`css=.task-item p + text=${task.name}`)
    await expect(target).toBeVisible()
})