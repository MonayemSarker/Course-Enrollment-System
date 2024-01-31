import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1706700986519 implements MigrationInterface {
    name = 'NewMigration1706700986519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`abstract_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`demo_migration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`demo_migration\``);
        await queryRunner.query(`DROP TABLE \`abstract_entity\``);
    }

}
