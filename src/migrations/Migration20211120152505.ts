import { Migration } from '@mikro-orm/migrations';

export class Migration20211120152505 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comments" add column "commenter_ip_address" text null;');
  }

}
