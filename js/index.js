const model = {
	cats : [
		{
			name: 'Johnny',
			clicks: 0,
			url: '',
		},
		{
			name: 'Fofu',
			clicks: 0,
			url: '',
		},
		{
			name: 'Mimi',
			clicks: 0,
			url: '',
		},
		{
			name: 'Balotério',
			clicks: 0,
			url: '',
		},
		{
			name: 'Raposinha',
			clicks: 0,
			url: '',
		},
		{
			name: 'Pintinha',
			clicks: 0,
			url: '',
		},
		{
			name: 'Juliana',
			clicks: 0,
			url: '',
		}
	],
}

class Octopus {

	constructor(model, view) {
		this.model = model;
	}

	getCats() {
		return this.model.cats;
	}

	getCat(index) {
		return this.getCats()[index];
	}

	catClicked(id, cb) {
		const cat = this.getCat(id);
		cat.clicks = cat.clicks + 1;
		cb();
	}

	updateCat(id, cat) {
		Object.assign(this.getCat(id), cat);
	}
};

class View {

	constructor(octopus) {
		this.octopus = octopus;
		this.catPic = $('#catPic');
		this.catName = $('#catName');
		this.catClicks = $('#catClicks');
		this.adminForm = $('form');
		this.adminButton = $('#adminButton');
		this.saveButton = $('#saveButton');
	}

	init(){
		this.octopus.getCats().forEach((cat, index) => {
			$('#buttons')
				.append(`
					<button onClick="view.show(${index})">${cat.name}</button>
				`);
		});
		this.catPic.hide();
		this.adminForm.hide();
		this.adminButton.hide();
	}

	refresh(id){
		const cat = this.octopus.getCat(id);
		this.catPic
			.attr('src', cat.url || `images/cat${id}.jpg`)
			.attr('onClick', `view.catClicked(${id})`)
			.show();

		this.catName.html(cat.name);

		this.catClicks.html(`Clicks: ${cat.clicks}`);

		this.adminButton.show();

		this.saveButton.click(() => {
			this.saveClicked(id);
		})
	}

	catClicked(id) {
		this.octopus.catClicked(id, () => this.refresh(id));
	}

	show(id) {
		this.refresh(id);
	}

	adminClicked() {
		this.adminForm.show();
		this.adminButton.hide();
	}

	cancelClicked() {
		this.adminForm.hide();
		this.adminButton.show();
	}

	saveClicked(id) {
		const getFromName = (name) => this.adminForm.serializeArray().find(field => field.name == name).value;
		const cat = {
			name: getFromName('name'),
			clicks: Number.parseInt(getFromName('clicks')),
			url: getFromName('url'),
		};

		this.octopus.updateCat(id, cat);
		this.refresh(id);
	}
};

const view = new View(new Octopus(model));
view.init();