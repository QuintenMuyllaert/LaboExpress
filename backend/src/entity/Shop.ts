import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
export class Shop {
	@ObjectIdColumn({ name: "_id" })
	shopid: ObjectID;
	@Column()
	name: string;
	@Column()
	city: string;
	@Column()
	twentyFourSeven: boolean;
}
