interface RadioStation {
	id?: number;
	naam: string;
}

class RadioRepository {
	database: RadioStation[] = [];

	constructor() {}

	getAll(): RadioStation[] {
		return this.database;
	}

	getById(id: number): RadioStation | undefined {
		return this.database.find((radioStation) => radioStation.id === id);
	}

	add(radioStation: RadioStation): number {
		if (!radioStation.id) {
			radioStation.id = this.database.length + 1;
		}
		this.database.push(radioStation);
		return radioStation.id;
	}

	delete(id: number): void {
		this.database = this.database.filter((radioStation) => radioStation.id !== id);
	}
}

export default new RadioRepository();
