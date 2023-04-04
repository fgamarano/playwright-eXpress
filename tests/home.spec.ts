import { test, expect } from '@playwright/test'

//Criando o caso de teste
//para eu trabalhar com playwright eu preciso pegar o objeto page que fica como argumento da função
//O JavaScript e o TypeScript são linguagens assíncronas, tudo roda de uma vez só.
//No plawright precisa ser declarativo, devo utilizar async, para que eu consiga utilizar o await

test('webapp deve está online', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')
    //comando para esperar por uma quantidade de tempo, antes de fechar a janela
    //com o modo debug não preciso do awaitForTimeout
    //await page.waitForTimeout(3000)
})

//comentar tudo CTRL + ;
// function imprimeNome() {
//    console.log('Fernanda Gamarano')
// }

// mesma coisa que o de cima
// const imprimeNome() = () => {
//    console.log('Fernanda Gamarano')
// }
//ver relatorio: yarn playwright show-report
//comando para abrir o navegador: yarn playwright test --headed
//comando debug: yarn playwright test --debug