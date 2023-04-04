import { test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'


let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})


test.describe('Cadastro', () => {
    test('Deve poder cadastrar uma nova tarefa', async ({ request }) => {
        const task = data.success as TaskModel

        await deleteTaskByHelper(request, task.name)
        //instanciando a classe
        //eu crio uma constante e o typescrip ativa essa classe

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)
    })

    test('não deve permitir tarefa duplicada', async ({ request }) => {
        const task = data.duplicate as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already exists!')
    })

    test('campo obriatorio', async () => {
        const task = data.required as TaskModel

        await tasksPage.go()
        await tasksPage.create(task)

        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')
    })
})

test.describe('Atualização', () => {
    test('marcar a tarefa como concluida', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)
    })
})

test.describe('Exclusão', () => {
    test('deve excluir uma tarefa', async ({ request }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.remove(task.name)
        await tasksPage.shouldNotExist(task.name)
    })
});

