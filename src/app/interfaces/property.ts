/*
 Interface de propriété permet de déterminer les valeurs attendu pour la création d'une propriété
*/
export interface Property {
  title: string;
  category: string;
  surface: string;
  rooms: string;
  description?: string;
  price: string;
  sold: boolean;
  photos?: any[];
}
