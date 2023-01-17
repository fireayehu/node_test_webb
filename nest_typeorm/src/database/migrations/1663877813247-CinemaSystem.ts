import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  name = 'CinemaSystem1663877813247';
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    /**
     *
     *
     *  THIS SECTION IS FOR CREATING TABLES
     *
     *
     */

    /**
     * User Table
     *  NB - For the sake of simplicity administrator are diffentiated using isAdmin boolean field
     */
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'firstName', type: 'varchar' },
          { name: 'lastName', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'isAdmin', type: 'boolean' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    /**
     * Movie Table
     */
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    /**
     * Show Room Table
     */
    await queryRunner.createTable(
      new Table({
        name: 'show_room',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'totalSeats', type: 'integer' },
          { name: 'totalRemainingSeats', type: 'integer' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    /**
     * Seat Type Table
     */
    await queryRunner.createTable(
      new Table({
        name: 'seat_type',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    /**
     * Seating Table
     */
    await queryRunner.createTable(
      new Table({
        name: 'seating',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'code', type: 'varchar' },
          { name: 'showRoomId', type: 'integer' },
          { name: 'seatTypeId', type: 'integer' },
          { name: 'addOnPrice', type: 'decimal' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    /**
     * Movie Session Table (Used for movie time and show for each show room)
     */
    await queryRunner.createTable(
      new Table({
        name: 'movie_session',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movieId', type: 'integer' },
          { name: 'showRoomId', type: 'integer' },
          { name: 'time', type: 'timestamp' },
          { name: 'price', type: 'decimal' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    /**
     * Booking Table
     */
    await queryRunner.createTable(
      new Table({
        name: 'booking',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'userId', type: 'integer' },
          { name: 'movieSessionId', type: 'integer' },
          { name: 'seatingId', type: 'integer' },
          { name: 'totalPrice', type: 'decimal' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    /**
     *
     *
     *  THIS SECTION IS FOR CREATING FOREIGN KEY
     *
     *
     */

    /**
     * Booking table foreign key
     */

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      }),
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['movieSessionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie_session',
      }),
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['seatingId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seating',
      }),
    );

    /**
     * Seating table foreign key
     */

    await queryRunner.createForeignKey(
      'seating',
      new TableForeignKey({
        columnNames: ['showRoomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'show_room',
      }),
    );

    await queryRunner.createForeignKey(
      'seating',
      new TableForeignKey({
        columnNames: ['seatTypeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seat_type',
      }),
    );

    /**
     * Movie Session foreign key
     */

    await queryRunner.createForeignKey(
      'movie_session',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie',
      }),
    );

    await queryRunner.createForeignKey(
      'movie_session',
      new TableForeignKey({
        columnNames: ['showRoomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'show_room',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
