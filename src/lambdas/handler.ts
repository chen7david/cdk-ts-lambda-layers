import * as logic from '/opt/business-logic';

export const handler = async (event: any = {}): Promise<any> => {
  console.log(`Addition:${logic.add(2, 3)}`);
};