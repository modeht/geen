export const d = {
  imports: [
    {
      module: "'typeorm'",
      text: 'import {\r\n' +
        '\tColumn,\r\n' +
        '\tCreateDateColumn,\r\n' +
        '\tEntity,\r\n' +
        '\tJoinColumn,\r\n' +
        '\tManyToMany,\r\n' +
        '\tManyToOne,\r\n' +
        '\tOneToMany,\r\n' +
        '\tOneToOne,\r\n' +
        '\tPrimaryGeneratedColumn,\r\n' +
        '\tUpdateDateColumn,\r\n' +
        "} from 'typeorm';",
      identifiers: [
        { expression: 'Column' },
        { expression: 'CreateDateColumn' },
        { expression: 'Entity' },
        { expression: 'JoinColumn' },
        { expression: 'ManyToMany' },
        { expression: 'ManyToOne' },
        { expression: 'OneToMany' },
        { expression: 'OneToOne' },
        { expression: 'PrimaryGeneratedColumn' },
        { expression: 'UpdateDateColumn' }
      ]
    },
    {
      module: "'../../category-fitlers/entities/category-filters.entity'",
      text: "import { CategoryFilterEntity } from '../../category-fitlers/entities/category-filters.entity';",
      identifiers: [ { expression: 'CategoryFilterEntity' } ]
    },
    {
      module: "'../../translations/entities/translation.entity'",
      text: "import { TranslationEntity } from '../../translations/entities/translation.entity';",
      identifiers: [ { expression: 'TranslationEntity' } ]
    },
    {
      module: "'../../media/entities/media.entity'",
      text: "import { MediaEntity } from '../../media/entities/media.entity';",
      identifiers: [ { expression: 'MediaEntity' } ]
    },
    {
      module: "'../../ads/entities/ad.entity'",
      text: "import { AdEntity } from '../../ads/entities/ad.entity';",
      identifiers: [ { expression: 'AdEntity' } ]
    },
    {
      module: "'../../users/entities/user.entity'",
      text: "import { UserEntity } from '../../users/entities/user.entity';",
      identifiers: [ { expression: 'UserEntity' } ]
    },
    {
      module: "'../../users/entities/user-interests.entity'",
      text: "import { UserInterestEntity } from '../../users/entities/user-interests.entity';",
      identifiers: [ { expression: 'UserInterestEntity' } ]
    },
    {
      module: "'../../banners/entities/banner.entity'",
      text: "import { BannerEntity } from '../../banners/entities/banner.entity';",
      identifiers: [ { expression: 'BannerEntity' } ]
    }
  ],
  enums: [
    {
      text: 'enum testenum {}',
      identifiers: [ { expression: 'testenum' } ]
    }
  ],
  classes: [
    {
      name: 'CategoryEntity',
      decorators: [
        {
          text: "@Entity({\r\n\tname: 'categories',\r\n})",
          functions: [
            {
              expression: 'Entity',
              identifiers: [ { expression: 'Entity' } ],
              props: [
                {
                  statement: "name: 'categories'",
                  identifiers: [ { expression: 'name' } ]
                }
              ]
            }
          ]
        }
      ],
      identifiers: [ { expression: 'CategoryEntity' } ],
      properties: [
        {
          name: 'id',
          type: 'number',
          decorators: [
            {
              text: '@PrimaryGeneratedColumn()',
              functions: [
                {
                  expression: 'PrimaryGeneratedColumn',
                  identifiers: [ { expression: 'PrimaryGeneratedColumn' } ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'id' } ]
        },
        {
          name: 'name',
          type: 'string | null',
          decorators: [
            {
              text: "@Column({ type: 'varchar', nullable: true })",
              functions: [
                {
                  expression: 'Column',
                  identifiers: [ { expression: 'Column' } ],
                  props: [
                    {
                      statement: "type: 'varchar'",
                      identifiers: [ { expression: 'type' } ]
                    },
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'name' } ]
        },
        {
          name: 'testenum',
          type: 'testenum',
          decorators: [
            {
              text: "@Column({ type: 'enum', enum: testenum, nullable: true })",
              functions: [
                {
                  expression: 'Column',
                  identifiers: [ { expression: 'Column' } ],
                  props: [
                    {
                      statement: "type: 'enum'",
                      identifiers: [ { expression: 'type' } ]
                    },
                    {
                      statement: 'enum: testenum',
                      identifiers: [
                        { expression: 'enum' },
                        { expression: 'testenum' }
                      ]
                    },
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'testenum' }, { expression: 'testenum' } ]
        },
        {
          name: 'interestedIn',
          type: 'UserInterestEntity[] | null',
          decorators: [
            {
              text: '@OneToMany(() => UserInterestEntity, (interest) => interest.category, {\r\n' +
                '\t\tnullable: true,\r\n' +
                '\t\tcascade: true,\r\n' +
                '\t})',
              functions: [
                {
                  expression: 'OneToMany',
                  identifiers: [ { expression: 'OneToMany' } ],
                  arrowFn: [
                    {
                      def: '() => UserInterestEntity',
                      identifiers: [ { expression: 'UserInterestEntity' } ]
                    },
                    {
                      def: '(interest) => interest.category',
                      identifiers: [
                        { expression: 'interest' },
                        { expression: 'interest' },
                        { expression: 'category' }
                      ]
                    }
                  ],
                  props: [
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    },
                    {
                      statement: 'cascade: true',
                      identifiers: [ { expression: 'cascade' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [
            { expression: 'interestedIn' },
            { expression: 'UserInterestEntity' }
          ]
        },
        {
          name: 'banners',
          type: 'BannerEntity | null',
          decorators: [
            {
              text: '@OneToMany(() => BannerEntity, (banner) => banner.category, {\r\n' +
                '\t\tcascade: true,\r\n' +
                '\t\tnullable: true,\r\n' +
                '\t})',
              functions: [
                {
                  expression: 'OneToMany',
                  identifiers: [ { expression: 'OneToMany' } ],
                  arrowFn: [
                    {
                      def: '() => BannerEntity',
                      identifiers: [ { expression: 'BannerEntity' } ]
                    },
                    {
                      def: '(banner) => banner.category',
                      identifiers: [
                        { expression: 'banner' },
                        { expression: 'banner' },
                        { expression: 'category' }
                      ]
                    }
                  ],
                  props: [
                    {
                      statement: 'cascade: true',
                      identifiers: [ { expression: 'cascade' } ]
                    },
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'banners' }, { expression: 'BannerEntity' } ]
        },
        {
          name: 'icon',
          type: 'MediaEntity | null',
          decorators: [
            {
              text: '@ManyToOne(() => MediaEntity, (media) => media.categories, {\r\n' +
                '\t\tcascade: true,\r\n' +
                '\t\tnullable: true,\r\n' +
                '\t})',
              functions: [
                {
                  expression: 'ManyToOne',
                  identifiers: [ { expression: 'ManyToOne' } ],
                  arrowFn: [
                    {
                      def: '() => MediaEntity',
                      identifiers: [ { expression: 'MediaEntity' } ]
                    },
                    {
                      def: '(media) => media.categories',
                      identifiers: [
                        { expression: 'media' },
                        { expression: 'media' },
                        { expression: 'categories' }
                      ]
                    }
                  ],
                  props: [
                    {
                      statement: 'cascade: true',
                      identifiers: [ { expression: 'cascade' } ]
                    },
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    }
                  ]
                }
              ]
            },
            {
              text: "@JoinColumn({\r\n\t\tname: 'mediaId',\r\n\t})",
              functions: [
                {
                  expression: 'JoinColumn',
                  identifiers: [ { expression: 'JoinColumn' } ],
                  props: [
                    {
                      statement: "name: 'mediaId'",
                      identifiers: [ { expression: 'name' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'icon' }, { expression: 'MediaEntity' } ]
        },
        {
          name: 'translations',
          type: 'TranslationEntity[] | null',
          decorators: [
            {
              text: '@OneToMany(() => TranslationEntity, (translations) => translations.category, {\r\n' +
                '\t\tnullable: true,\r\n' +
                '\t\tcascade: true,\r\n' +
                '\t})',
              functions: [
                {
                  expression: 'OneToMany',
                  identifiers: [ { expression: 'OneToMany' } ],
                  arrowFn: [
                    {
                      def: '() => TranslationEntity',
                      identifiers: [ { expression: 'TranslationEntity' } ]
                    },
                    {
                      def: '(translations) => translations.category',
                      identifiers: [
                        { expression: 'translations' },
                        { expression: 'translations' },
                        { expression: 'category' }
                      ]
                    }
                  ],
                  props: [
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    },
                    {
                      statement: 'cascade: true',
                      identifiers: [ { expression: 'cascade' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [
            { expression: 'translations' },
            { expression: 'TranslationEntity' }
          ]
        },
        {
          name: 'filters',
          type: 'CategoryFilterEntity[] | null',
          decorators: [
            {
              text: '@OneToMany(() => CategoryFilterEntity, (categoryFilter) => categoryFilter.category, {\r\n' +
                '\t\tnullable: true,\r\n' +
                '\t\tcascade: true,\r\n' +
                '\t})',
              functions: [
                {
                  expression: 'OneToMany',
                  identifiers: [ { expression: 'OneToMany' } ],
                  arrowFn: [
                    {
                      def: '() => CategoryFilterEntity',
                      identifiers: [ { expression: 'CategoryFilterEntity' } ]
                    },
                    {
                      def: '(categoryFilter) => categoryFilter.category',
                      identifiers: [
                        { expression: 'categoryFilter' },
                        { expression: 'categoryFilter' },
                        { expression: 'category' }
                      ]
                    }
                  ],
                  props: [
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    },
                    {
                      statement: 'cascade: true',
                      identifiers: [ { expression: 'cascade' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [
            { expression: 'filters' },
            { expression: 'CategoryFilterEntity' }
          ]
        },
        {
          name: 'ads',
          type: 'AdEntity[]',
          decorators: [
            {
              text: '@ManyToMany(() => AdEntity, (ad) => ad.categories, {\r\n' +
                "\t\tonDelete: 'SET NULL',\r\n" +
                '\t})',
              functions: [
                {
                  expression: 'ManyToMany',
                  identifiers: [ { expression: 'ManyToMany' } ],
                  arrowFn: [
                    {
                      def: '() => AdEntity',
                      identifiers: [ { expression: 'AdEntity' } ]
                    },
                    {
                      def: '(ad) => ad.categories',
                      identifiers: [
                        { expression: 'ad' },
                        { expression: 'ad' },
                        { expression: 'categories' }
                      ]
                    }
                  ],
                  props: [
                    {
                      statement: "onDelete: 'SET NULL'",
                      identifiers: [ { expression: 'onDelete' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'ads' }, { expression: 'AdEntity' } ]
        },
        {
          name: 'filter',
          type: 'CategoryFilterEntity | null',
          decorators: [
            {
              text: '@ManyToOne(() => CategoryFilterEntity, (categoryFilter) => categoryFilter.categories, {\r\n' +
                '\t\tnullable: true,\r\n' +
                '\t})',
              functions: [
                {
                  expression: 'ManyToOne',
                  identifiers: [ { expression: 'ManyToOne' } ],
                  arrowFn: [
                    {
                      def: '() => CategoryFilterEntity',
                      identifiers: [ { expression: 'CategoryFilterEntity' } ]
                    },
                    {
                      def: '(categoryFilter) => categoryFilter.categories',
                      identifiers: [
                        { expression: 'categoryFilter' },
                        { expression: 'categoryFilter' },
                        { expression: 'categories' }
                      ]
                    }
                  ],
                  props: [
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    }
                  ]
                }
              ]
            },
            {
              text: "@JoinColumn({\r\n\t\tname: 'filterId',\r\n\t})",
              functions: [
                {
                  expression: 'JoinColumn',
                  identifiers: [ { expression: 'JoinColumn' } ],
                  props: [
                    {
                      statement: "name: 'filterId'",
                      identifiers: [ { expression: 'name' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [
            { expression: 'filter' },
            { expression: 'CategoryFilterEntity' }
          ]
        },
        {
          name: 'visible',
          type: 'boolean',
          decorators: [
            {
              text: "@Column({ type: 'boolean', default: true })",
              functions: [
                {
                  expression: 'Column',
                  identifiers: [ { expression: 'Column' } ],
                  props: [
                    {
                      statement: "type: 'boolean'",
                      identifiers: [ { expression: 'type' } ]
                    },
                    {
                      statement: 'default: true',
                      identifiers: [ { expression: 'default' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'visible' } ]
        },
        {
          name: 'isArchived',
          type: 'boolean',
          decorators: [
            {
              text: "@Column({ type: 'boolean', default: false })",
              functions: [
                {
                  expression: 'Column',
                  identifiers: [ { expression: 'Column' } ],
                  props: [
                    {
                      statement: "type: 'boolean'",
                      identifiers: [ { expression: 'type' } ]
                    },
                    {
                      statement: 'default: false',
                      identifiers: [ { expression: 'default' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'isArchived' } ]
        },
        {
          name: 'index',
          type: 'number | null',
          decorators: [
            {
              text: "@Column({ type: 'int', nullable: true })",
              functions: [
                {
                  expression: 'Column',
                  identifiers: [ { expression: 'Column' } ],
                  props: [
                    {
                      statement: "type: 'int'",
                      identifiers: [ { expression: 'type' } ]
                    },
                    {
                      statement: 'nullable: true',
                      identifiers: [ { expression: 'nullable' } ]
                    }
                  ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'index' } ]
        },
        {
          name: 'createdAt',
          type: 'Date',
          decorators: [
            {
              text: '@CreateDateColumn()',
              functions: [
                {
                  expression: 'CreateDateColumn',
                  identifiers: [ { expression: 'CreateDateColumn' } ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'createdAt' }, { expression: 'Date' } ]
        },
        {
          name: 'updatedAt',
          type: 'Date',
          decorators: [
            {
              text: '@UpdateDateColumn()',
              functions: [
                {
                  expression: 'UpdateDateColumn',
                  identifiers: [ { expression: 'UpdateDateColumn' } ]
                }
              ]
            }
          ],
          identifiers: [ { expression: 'updatedAt' }, { expression: 'Date' } ]
        }
      ]
    }
  ]
}