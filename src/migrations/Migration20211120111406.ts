import { Migration } from '@mikro-orm/migrations';

export class Migration20211120111406 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comments" add column "movie_episode_id" text not null;');
  }

}
