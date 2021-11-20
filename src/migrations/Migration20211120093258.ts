import { Migration } from '@mikro-orm/migrations';

export class Migration20211120093258 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "comments" ("id" serial primary key, "comment" text not null, "movie_episode_id" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
