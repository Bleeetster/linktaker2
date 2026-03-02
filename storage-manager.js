import { Storage } from "./modules/storage.js"
import { Loger, ErrorHandler } from "./modules/logger.js"
const loger = new Loger()
const errorHandler = new ErrorHandler()
const storage = new Storage(loger, errorHandler)

const linksList = document.getElementById('linksList');
const clearAllBtn = document.getElementById('clearAllBtn');
const template = document.getElementById('linkTemplate');

// Загружаем и отображаем ссылки при открытии попапа
document.addEventListener('DOMContentLoaded', async () => {
	await renderLinks(await loadLinks());
});

// Очистить весь список
clearAllBtn.addEventListener('click', async () => {
	await storage.clear();
	await renderLinks(await loadLinks());
});

// Обработка кликов по списку (делегирование)
linksList.addEventListener('click', async (e) => {
	const target = e.target;
	const item = target.closest('.link-item');
	if (!item) return;

	const index = parseInt(item.dataset.index, 10);
	const links = await loadLinks();

	console.log(target);
	if (target.classList.contains('delete-btn')) {
		links.splice(index, 1);
		await storage.remove(index);
		await renderLinks(links);
	} 
	// else if (target.classList.contains('move-up-btn')) {
		// if (index > 0) {
			// [links[index - 1], links[index]] = [links[index], links[index - 1]];
			// await renderLinks(links);
		// }
	// } else if (target.classList.contains('move-down-btn')) {
		// if (index < links.length - 1) {
		// 	[links[index], links[index + 1]] = [links[index + 1], links[index]];
		// 	await saveLinks(links);
		// 	await renderLinks(links);
		// }
	// }
});

// Получить массив ссылок из localStorage
async function loadLinks() {
	try {
		const data = await storage.get();
		return data;
	} catch (e) {
		errorHandler.logError(e);
		return [];
	}
}

// Отрисовать список ссылок
async function renderLinks(links) {
	linksList.innerHTML = ''; // очищаем контейнер

	if (!links || links.length === 0) {
		const emptyDiv = document.createElement('div');
		emptyDiv.className = 'empty-message';
		emptyDiv.textContent = 'Список пуст';
		linksList.appendChild(emptyDiv);
		return;
	}

	links.forEach((link, index) => {
		// Клонируем содержимое шаблона
		const clone = document.importNode(template.content, true);
		const item = clone.querySelector('.link-item');
		item.dataset.index = index; // запоминаем позицию

		console.log(link);
		// Заполняем заголовок и URL
		const titleDiv = clone.querySelector('.link-title');
		const urlDiv = clone.querySelector('.link-url');
		titleDiv.textContent = link.title || link.url || 'Без названия';
		urlDiv.textContent = link.url || '';

		linksList.appendChild(clone);
	});
}
