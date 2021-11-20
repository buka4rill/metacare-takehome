import { Migration } from '@mikro-orm/migrations';

export class Migration20211120121609 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comments" add column "comment_count" int4 not null;');
  }

}
