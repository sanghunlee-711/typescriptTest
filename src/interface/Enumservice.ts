export interface EnumServiceItem {
  created: string;
  douzoneCode: string;
  id: number;
  isUsed: boolean;
  modified: string;
  name: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  active?: string;
  serial?: number;
  serialActive?: string;
  showSerial?: string;
}

export type EnumServiceItems = Array<EnumServiceItem>;
