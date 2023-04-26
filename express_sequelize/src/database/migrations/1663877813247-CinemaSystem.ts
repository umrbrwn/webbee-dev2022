import { QueryInterface, literal } from 'sequelize';

export default {
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
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('users', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: 'varchar',
        allowNull: false
      },
      password: {
        type: 'varchar',
        allowNull: false
      },
      isAdmin: {
        type: 'boolean',
        allowNull: false
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      }
    });

    await queryInterface.createTable('movies', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: 'varchar',
        allowNull: false
      },
      description: {
        type: 'varchar',
        allowNull: false
      },
      duration: {
        type: 'integer',
        allowNull: false
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      }
    });

    await queryInterface.createTable('shows', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true
      },
      movieId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id'
        }
      },
      startTime: {
        type: 'timestamp',
        allowNull: false
      },
      endTime: {
        type: 'timestamp',
        allowNull: false
      },
      createdAt: {
        type: 'timestamp',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: 'timestamp',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('seats', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: 'varchar',
        allowNull: false
      },
      showId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'Shows',
          key: 'id'
        }
      },
      createdAt: {
        type: 'timestamp',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: 'timestamp',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('bookings', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      showId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'Shows',
          key: 'id'
        }
      },
      createdAt: {
        type: 'timestamp',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: 'timestamp',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('booking_details', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true
      },
      showSeatId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'seats',
          key: 'id'
        }
      },
      bookingId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'bookings',
          key: 'id'
        }
      },
      price: {
        type: 'decimal',
        allowNull: false
      },
      createdAt: {
        type: 'timestamp',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: 'timestamp',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      }
    });


  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('movies');
    await queryInterface.dropTable('shows');
    await queryInterface.dropTable('seats');
    await queryInterface.dropTable('bookings');
    await queryInterface.dropTable('booking_details');
  },
};
