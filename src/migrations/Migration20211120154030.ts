import { Migration } from '@mikro-orm/migrations';

export class Migration20211120154030 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comments" drop column "comment_count";');
  }

}
