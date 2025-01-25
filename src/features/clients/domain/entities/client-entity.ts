import { z } from "zod";

const schema = z.object({
  id: z.number().optional(),
  uid: z.string().optional(),
  name: z.string(),
});

type Init = {
  id?: number | undefined;
  uid?: string | undefined;
  name: string;
};

export type ClientInsertDTO = {
  name: Pick<Init, "name">;
};

export type ClientUpdateDTO = Init;

export class ClientEntity {
  public id?: number | undefined;
  public uid: string | undefined;
  public name: string;

  private constructor(init: Init) {
    this.id = init.id;
    this.uid = init.uid;
    this.name = init.name;
  }

  static fromJson(json: Record<string, any>) {
    try {
      const data = schema.parse(json);
      return new ClientEntity(data);
    } catch (error) {
      console.log(error);
    }
  }
}
