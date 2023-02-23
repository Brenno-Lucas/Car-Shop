import { model, Model, models, Schema, SchemaDefinition, SchemaDefinitionType } from 'mongoose';

abstract class AbstractODM<T> {
  protected Schema: Schema;
  public model: Model<T>;

  constructor(schemaInfo: SchemaDefinition<SchemaDefinitionType<T>>, collection: string) {
    this.Schema = new Schema<T>({ ...schemaInfo }, { versionKey: false });
    this.model = models[collection] || model(collection, this.Schema);
  }
}

export default AbstractODM;