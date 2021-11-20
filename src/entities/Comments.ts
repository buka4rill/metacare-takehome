import "reflect-metadata";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Comments {
  @PrimaryKey()
  id!: number;

  @Property({ type: "text", nullable: false })
  comment!: string;

  @Property({ type: "text", nullable: false })
  movieId!: string;

  @Property({ type: "text", nullable: false })
  movieEpisodeId!: string;

  @Property({ nullable: false })
  commentCount: number;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
