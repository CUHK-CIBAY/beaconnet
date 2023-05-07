import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  'neo4j+s://50630da3.databases.neo4j.io',
  neo4j.auth.basic('neo4j', '1VoxGjet256LiHRZVUohfN9FNKq65uFHwXUoW_l6x4E'),
);

export default driver;
