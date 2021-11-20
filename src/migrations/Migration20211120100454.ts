import { Migration } from '@mikro-orm/migrations';

export class Migration20211120100454 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comments" rename column "movie_episode_id" to "movie_id";');
  }

}
